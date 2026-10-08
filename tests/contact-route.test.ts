import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Prisma } from '@/generated/prisma/client';

const { rateLimitMock, leadFindUnique, leadCreate, leadUpdate } = vi.hoisted(() => ({
  rateLimitMock: vi.fn(),
  leadFindUnique: vi.fn(),
  leadCreate: vi.fn(),
  leadUpdate: vi.fn(),
}));

vi.mock('@/lib/rate-limit', () => ({ rateLimit: rateLimitMock }));
vi.mock('@/lib/prisma', () => ({
  prisma: {
    lead: {
      findUnique: leadFindUnique,
      create: leadCreate,
      update: leadUpdate,
    },
  },
}));

import { POST } from '@/app/api/contact/route';

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
    leadFindUnique.mockReset();
    leadCreate.mockReset();
    leadUpdate.mockReset();
    leadFindUnique.mockResolvedValue(null);
    leadCreate.mockResolvedValue({ id: 'lead-1' });
    leadUpdate.mockResolvedValue({ id: 'lead-1' });
    process.env.BACKEND_API_URL = 'https://backend.example.test';
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    delete process.env.BACKEND_API_URL;
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
    expect(leadCreate).not.toHaveBeenCalled();
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
    expect(leadCreate).not.toHaveBeenCalled();
    expect(leadUpdate).not.toHaveBeenCalled();
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
    expect(leadFindUnique).not.toHaveBeenCalled();
  });

  it('saves a validated lead without BACKEND_API_URL and does not forward', async () => {
    delete process.env.BACKEND_API_URL;
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    const response = await POST(contactRequest(JSON.stringify(validLead)));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      success: true,
      message: 'Contact request received.',
    });
    expect(leadCreate).toHaveBeenCalledWith({
      data: {
        email: validLead.email,
        status: 'NEW',
        intent: 'contact',
        lastMessage: validLead.message,
        metadata: {
          source: 'website-contact',
          name: validLead.name,
          company: validLead.company,
          message: validLead.message,
        },
      },
      select: { id: true },
    });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(JSON.stringify(errorSpy.mock.calls)).not.toContain(validLead.email);
    expect(JSON.stringify(errorSpy.mock.calls)).not.toContain(validLead.message);
  });

  it('saves the contact page fields, including monthly lead volume', async () => {
    delete process.env.BACKEND_API_URL;
    vi.stubGlobal('fetch', vi.fn());

    const response = await POST(
      contactRequest(
        JSON.stringify({
          ...validLead,
          email: 'Ada@Example.com',
          company: '',
          monthlyLeadVolume: '501-2000',
          message: '',
        }),
      ),
    );

    expect(response.status).toBe(200);
    expect(leadCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          email: 'ada@example.com',
          lastMessage: null,
          metadata: {
            source: 'website-contact',
            name: validLead.name,
            monthlyLeadVolume: '501-2000',
          },
        }),
      }),
    );
  });

  it('updates an existing email lead without clearing stored fields', async () => {
    delete process.env.BACKEND_API_URL;
    leadFindUnique.mockResolvedValue({
      id: 'lead-existing',
      metadata: { source: 'whatsapp', kept: true },
    });

    const response = await POST(contactRequest(JSON.stringify(validLead)));

    expect(response.status).toBe(200);
    expect(leadCreate).not.toHaveBeenCalled();
    expect(leadUpdate).toHaveBeenCalledWith({
      where: { id: 'lead-existing' },
      data: {
        lastMessage: validLead.message,
        metadata: {
          source: 'website-contact',
          kept: true,
          name: validLead.name,
          company: validLead.company,
          message: validLead.message,
        },
      },
      select: { id: true },
    });
  });

  it('saves locally and forwards when BACKEND_API_URL is set', async () => {
    const order: string[] = [];
    leadCreate.mockImplementation(async () => {
      order.push('db');
      return { id: 'lead-1' };
    });
    const fetchMock = vi.fn().mockImplementation(async () => {
      order.push('forward');
      return new Response(null, { status: 201 });
    });
    vi.stubGlobal('fetch', fetchMock);

    const response = await POST(contactRequest(JSON.stringify(validLead)));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      success: true,
      message: 'Contact request received.',
    });
    expect(order).toEqual(['db', 'forward']);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://backend.example.test/v1/leads',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validLead),
      }),
    );
  });

  it('still returns success when the optional backend forward fails', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response('sensitive upstream diagnostic', { status: 500 }),
    );
    vi.stubGlobal('fetch', fetchMock);
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    const response = await POST(contactRequest(JSON.stringify(validLead)));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      success: true,
      message: 'Contact request received.',
    });
    expect(JSON.stringify(body)).not.toContain('sensitive upstream diagnostic');
    expect(JSON.stringify(errorSpy.mock.calls)).not.toContain('sensitive upstream diagnostic');
    expect(JSON.stringify(errorSpy.mock.calls)).not.toContain(validLead.email);
    expect(errorSpy).toHaveBeenCalledWith('[contact] backend forward failed', {
      status: 500,
    });
  });

  it('saves locally when BACKEND_API_URL is not TLS in production', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    process.env.BACKEND_API_URL = 'http://backend.example.test';
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    const response = await POST(contactRequest(JSON.stringify(validLead)));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      success: true,
      message: 'Contact request received.',
    });
    expect(leadCreate).toHaveBeenCalledTimes(1);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('returns a storage error when the database write fails and does not forward', async () => {
    const failure = new Error(`db down for ${validLead.email}: ${validLead.message}`);
    leadFindUnique.mockRejectedValue(failure);
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    const response = await POST(contactRequest(JSON.stringify(validLead)));
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({ error: 'Unable to submit contact request' });
    expect(JSON.stringify(body)).not.toContain(validLead.email);
    expect(JSON.stringify(body)).not.toContain(validLead.message);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(leadCreate).not.toHaveBeenCalled();
    const logged = JSON.stringify(errorSpy.mock.calls);
    expect(logged).not.toContain(validLead.email);
    expect(logged).not.toContain(validLead.message);
    expect(errorSpy).toHaveBeenCalledWith('[contact] lead save failed', {
      name: 'Error',
    });
  });

  it('retries as an update when create hits the email unique constraint', async () => {
    leadCreate.mockRejectedValueOnce(
      new Prisma.PrismaClientKnownRequestError(
        `Unique constraint failed on the fields: (\`email\`) ${validLead.email}`,
        { code: 'P2002', clientVersion: 'test' },
      ),
    );
    leadFindUnique
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({
        id: 'lead-raced',
        metadata: { kept: true },
      });
    delete process.env.BACKEND_API_URL;
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    const response = await POST(contactRequest(JSON.stringify(validLead)));

    expect(response.status).toBe(200);
    expect(leadUpdate).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 'lead-raced' } }),
    );
    expect(JSON.stringify(errorSpy.mock.calls)).not.toContain(validLead.email);
  });
});
