import { constants } from 'node:fs';
import { mkdir, open } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { z } from 'zod';

import { rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';

const BACKEND_ROUTE = '/v1/leads';
const DEFAULT_SINK_PATH = path.join(
  tmpdir(),
  'shadowspark-contact-leads.jsonl',
);

const contactLeadSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(254),
    company: z.string().trim().max(200).optional(),
    message: z.string().trim().min(10).max(5_000),
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

async function storeMissingLead(lead: ContactLead): Promise<void> {
  const configuredPath = process.env.CONTACT_LEAD_SINK_PATH?.trim();
  const sinkPath = configuredPath || DEFAULT_SINK_PATH;
  const record = {
    capturedAt: new Date().toISOString(),
    reason: 'backend-route-missing',
    lead,
  };

  await mkdir(path.dirname(sinkPath), { recursive: true, mode: 0o700 });
  const sink = await open(
    sinkPath,
    constants.O_APPEND |
      constants.O_CREAT |
      constants.O_WRONLY |
      constants.O_NOFOLLOW,
    0o600,
  );
  try {
    await sink.chmod(0o600);
    await sink.appendFile(`${JSON.stringify(record)}\n`, 'utf8');
  } finally {
    await sink.close();
  }
}

/**
 * Validates and forwards a public contact request to the backend lead API.
 *
 * A backend 404 indicates that the lead endpoint is not deployed. In that
 * specific case, the validated request is accepted into a local JSON Lines
 * sink and the missing backend route is returned explicitly.
 *
 * @param request - Incoming JSON contact request.
 * @returns A JSON response describing validation, forwarding, or fallback.
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

  const backendLeadUrl = getBackendLeadUrl();
  if (!backendLeadUrl) {
    console.error('[contact] BACKEND_API_URL is missing or invalid');
    return Response.json(
      { error: 'Contact service is unavailable' },
      { status: 503 },
    );
  }

  let upstreamResponse: Response;
  try {
    upstreamResponse = await fetch(backendLeadUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parsedLead.data),
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    console.error('[contact] backend request failed');
    return Response.json(
      { error: 'Unable to submit contact request' },
      { status: 502 },
    );
  }

  if (upstreamResponse.status === 404) {
    try {
      await storeMissingLead(parsedLead.data);
    } catch {
      console.error('[contact] local JSON sink write failed');
      return Response.json(
        { error: 'Unable to submit contact request' },
        { status: 500 },
      );
    }

    console.warn(
      '[contact] MISSING: /v1/leads; stored request in local JSON sink',
    );
    return Response.json(
      {
        success: true,
        fallback: 'local-json',
        MISSING: [BACKEND_ROUTE],
      },
      { status: 202 },
    );
  }

  if (!upstreamResponse.ok) {
    console.error(
      `[contact] backend rejected request with status ${upstreamResponse.status}`,
    );
    return Response.json(
      { error: 'Unable to submit contact request' },
      { status: 502 },
    );
  }

  return Response.json({ success: true });
}
