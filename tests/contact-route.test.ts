import { chmod, readFile, rm, stat, writeFile } from 'node:fs/promises';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { rateLimitMock } = vi.hoisted(() => ({
  rateLimitMock: vi.fn(),
}));

vi.mock('@/lib/rate-limit', () => ({ rateLimit: rateLimitMock }));

import { POST } from '@/app/api/contact/route';

const sinkPath = `/tmp/shadowspark-contact-route-${process.pid}.jsonl`;
const validLead = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  company: 'Analytical Engines',
  message: 'We need a pilot for our lending workflow.',
};

function contactRequest(body: string): Request {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    rateLimitMock.mockReset();
    rateLimitMock.mockResolvedValue({ success: true, headers: {} });
    process.env.BACKEND_API_URL = 'https://backend.example.test';
    process.env.CONTACT_LEAD_SINK_PATH = sinkPath;
  });

  afterEach(async () => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    delete process.env.BACKEND_API_URL;
    delete process.env.CONTACT_LEAD_SINK_PATH;
    await rm(sinkPath, { force: true });
  });

  it('rejects malformed JSON without contacting the backend', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const response = await POST(contactRequest('{'));

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: 'Invalid request body',
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('enforces the contact field constraints with Zod', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const response = await POST(
      contactRequest(
        JSON.stringify({
          name: 'A',
          email: 'not-an-email',
          message: 'Too short',
        }),
      ),
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({
      error: 'Validation failed',
      fields: {
        email: expect.any(Array),
        message: expect.any(Array),
        name: expect.any(Array),
      },
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects requests when the contact rate limit is exceeded', async () => {
    rateLimitMock.mockResolvedValueOnce({
      success: false,
      headers: { 'Retry-After': '60' },
    });
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const response = await POST(contactRequest(JSON.stringify(validLead)));

    expect(response.status).toBe(429);
    expect(response.headers.get('Retry-After')).toBe('60');
    expect(await response.json()).toEqual({ error: 'Too many requests' });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('posts a validated lead to the configured backend route', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 201 }));
    vi.stubGlobal('fetch', fetchMock);

    const response = await POST(contactRequest(JSON.stringify(validLead)));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true });
    expect(fetchMock).toHaveBeenCalledWith(
      'https://backend.example.test/v1/leads',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validLead),
      }),
    );
  });

  it('stores a backend-404 lead in the local JSON sink and lists MISSING', async () => {
    await writeFile(sinkPath, '', { mode: 0o666 });
    await chmod(sinkPath, 0o666);
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 404 }));
    vi.stubGlobal('fetch', fetchMock);
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

    const response = await POST(contactRequest(JSON.stringify(validLead)));

    expect(response.status).toBe(202);
    expect(await response.json()).toEqual({
      success: true,
      fallback: 'local-json',
      MISSING: ['/v1/leads'],
    });
    const stored = JSON.parse((await readFile(sinkPath, 'utf8')).trim()) as {
      reason: string;
      lead: typeof validLead;
    };
    expect(stored).toMatchObject({
      reason: 'backend-route-missing',
      lead: validLead,
    });
    expect((await stat(sinkPath)).mode & 0o777).toBe(0o600);
    expect(warning).toHaveBeenCalledWith(
      '[contact] MISSING: /v1/leads; stored request in local JSON sink',
    );
  });

  it('returns a service configuration error when BACKEND_API_URL is absent', async () => {
    delete process.env.BACKEND_API_URL;
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const response = await POST(contactRequest(JSON.stringify(validLead)));

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({
      error: 'Contact service is unavailable',
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects a non-TLS backend URL in production', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    process.env.BACKEND_API_URL = 'http://backend.example.test';
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const response = await POST(contactRequest(JSON.stringify(validLead)));

    expect(response.status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('does not expose upstream error details', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response('sensitive upstream diagnostic', { status: 500 }),
    );
    vi.stubGlobal('fetch', fetchMock);
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    const response = await POST(contactRequest(JSON.stringify(validLead)));

    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({
      error: 'Unable to submit contact request',
    });
  });
});
