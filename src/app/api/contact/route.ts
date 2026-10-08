import { Prisma } from '@/generated/prisma/client';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';

const BACKEND_ROUTE = '/v1/leads';
const CONTACT_SOURCE = 'website-contact';

const blankToUndefined = (value: unknown): unknown =>
  typeof value === 'string' && value.trim() === '' ? undefined : value;

const contactLeadSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z
      .string()
      .trim()
      .max(254)
      .email()
      .transform((value) => value.toLowerCase()),
    company: z.preprocess(blankToUndefined, z.string().trim().max(200).optional()),
    monthlyLeadVolume: z.preprocess(
      blankToUndefined,
      z.string().trim().max(40).optional(),
    ),
    message: z
      .string()
      .trim()
      .max(5_000)
      .refine((value) => value.length === 0 || value.length >= 10),
  })
  .strict();

type ContactLead = z.infer<typeof contactLeadSchema>;

function getBackendLeadUrl(): string | null {
  const configuredUrl = process.env.BACKEND_API_URL?.trim();
  if (!configuredUrl) {
    return null;
  }

  try {
    const baseUrl = new URL(
      configuredUrl.endsWith('/') ? configuredUrl : `${configuredUrl}/`,
    );
    const isSupportedProtocol =
      baseUrl.protocol === 'https:' ||
      (baseUrl.protocol === 'http:' && process.env.NODE_ENV !== 'production');
    if (!isSupportedProtocol) {
      return null;
    }

    return new URL(BACKEND_ROUTE.slice(1), baseUrl).href;
  } catch {
    return null;
  }
}

function contactMetadata(lead: ContactLead): Prisma.InputJsonObject {
  return {
    source: CONTACT_SOURCE,
    name: lead.name,
    ...(lead.company ? { company: lead.company } : {}),
    ...(lead.monthlyLeadVolume ? { monthlyLeadVolume: lead.monthlyLeadVolume } : {}),
    ...(lead.message ? { message: lead.message } : {}),
  };
}

function mergeMetadata(
  current: Prisma.JsonValue | null,
  incoming: Prisma.InputJsonObject,
): Prisma.InputJsonObject {
  const base: Record<string, Prisma.InputJsonValue | null> = {};
  if (current && typeof current === 'object' && !Array.isArray(current)) {
    for (const [key, entry] of Object.entries(current)) {
      if (
        entry === null ||
        typeof entry === 'string' ||
        typeof entry === 'number' ||
        typeof entry === 'boolean'
      ) {
        base[key] = entry;
        continue;
      }
      base[key] = entry as Prisma.InputJsonValue;
    }
  }
  return { ...base, ...incoming };
}

function isUniqueConflict(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002'
  );
}

function logContactFailure(scope: string, error: unknown): void {
  const name = error instanceof Error ? error.name : 'Error';
  const code =
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    (typeof error.code === 'string' || typeof error.code === 'number')
      ? error.code
      : undefined;
  console.error(`[contact] ${scope}`, code === undefined ? { name } : { name, code });
}

async function saveContactLead(lead: ContactLead): Promise<{ id: string }> {
  const incoming = contactMetadata(lead);
  const lastMessage = lead.message || null;

  const applyUpdate = (id: string, metadata: Prisma.JsonValue | null) =>
    prisma.lead.update({
      where: { id },
      data: {
        lastMessage,
        metadata: mergeMetadata(metadata, incoming),
      },
      select: { id: true },
    });

  const existing = await prisma.lead.findUnique({
    where: { email: lead.email },
    select: { id: true, metadata: true },
  });
  if (existing) {
    return applyUpdate(existing.id, existing.metadata);
  }

  try {
    return await prisma.lead.create({
      data: {
        email: lead.email,
        status: 'NEW',
        intent: 'contact',
        lastMessage,
        metadata: incoming,
      },
      select: { id: true },
    });
  } catch (error) {
    if (!isUniqueConflict(error)) throw error;
    const raced = await prisma.lead.findUnique({
      where: { email: lead.email },
      select: { id: true, metadata: true },
    });
    if (!raced) throw error;
    return applyUpdate(raced.id, raced.metadata);
  }
}

async function forwardContactLead(lead: ContactLead): Promise<void> {
  const configuredUrl = process.env.BACKEND_API_URL?.trim();
  if (!configuredUrl) return;

  const backendLeadUrl = getBackendLeadUrl();
  if (!backendLeadUrl) {
    console.error('[contact] BACKEND_API_URL is invalid; lead saved locally');
    return;
  }

  try {
    const upstreamResponse = await fetch(backendLeadUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(10_000),
    });
    if (!upstreamResponse.ok) {
      console.error('[contact] backend forward failed', {
        status: upstreamResponse.status,
      });
    }
  } catch (error) {
    logContactFailure('backend forward failed', error);
  }
}

/**
 * Validates a public contact request, stores it on the site Lead table, and
 * optionally forwards it when BACKEND_API_URL is set.
 *
 * @param request - Incoming JSON contact request.
 * @returns A JSON response describing validation, storage, or rate limiting.
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const limit = await rateLimit(request, 'contact', 5, '1 m');
    if (!limit.success) {
      return Response.json(
        { error: 'Too many requests' },
        { status: 429, headers: limit.headers },
      );
    }
  } catch {
    console.error('[contact] rate-limit check failed; continuing request');
  }

  let requestBody: unknown;
  try {
    requestBody = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const parsedLead = contactLeadSchema.safeParse(requestBody);
  if (!parsedLead.success) {
    return Response.json(
      {
        error: 'Validation failed',
        fields: parsedLead.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  try {
    await saveContactLead(parsedLead.data);
  } catch (error) {
    logContactFailure('lead save failed', error);
    return Response.json(
      { error: 'Unable to submit contact request' },
      { status: 500 },
    );
  }

  await forwardContactLead(parsedLead.data);

  return Response.json({
    success: true,
    message: 'Contact request received.',
  });
}
