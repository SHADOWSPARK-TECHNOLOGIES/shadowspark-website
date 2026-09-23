import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';
import { createLead } from '@/lib/lead-service';

export const runtime = 'nodejs';

const contactLeadSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(254),
    company: z.string().trim().max(200).optional(),
    monthlyLeadVolume: z.string().trim().max(50).optional(),
    message: z.string().trim().min(10).max(5_000),
  })
  .strict();

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
    console.error('[contact] rate-limit check failed');
    return Response.json({ error: 'Contact service is unavailable' }, { status: 503 });
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
    const { email, ...metadata } = parsedLead.data;
    await createLead({ email, metadata: { ...metadata, source: 'contact' } });
    return Response.json({ success: true });
  } catch {
    console.error('[contact] lead persistence failed');
    return Response.json({ error: 'Unable to submit contact request' }, { status: 500 });
  }
}
