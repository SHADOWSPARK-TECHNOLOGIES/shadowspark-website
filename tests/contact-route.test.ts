import { beforeEach, describe, expect, it, vi } from 'vitest';
const { rateLimitMock, createLeadMock } = vi.hoisted(() => ({ rateLimitMock: vi.fn(), createLeadMock: vi.fn() }));
vi.mock('@/lib/rate-limit', () => ({ rateLimit: rateLimitMock }));
vi.mock('@/lib/lead-service', () => ({ createLead: createLeadMock }));
import { POST } from '@/app/api/contact/route';
const lead = { name: 'Ada Lovelace', email: 'ada@example.com', company: 'Analytical Engines', message: 'We need a pilot for our lending workflow.', monthlyLeadVolume: '101-500' };
const request = (body: unknown) => new Request('http://localhost/api/contact', { method: 'POST', body: JSON.stringify(body) });
describe('contact persistence', () => {
  beforeEach(() => { vi.resetAllMocks(); rateLimitMock.mockResolvedValue({ success: true, headers: {} }); createLeadMock.mockResolvedValue({ success: true, lead: { id: 'lead-1', metadata: { private: true } } }); });
  it('accepts the actual form payload and saves through the canonical service', async () => {
    const response = await POST(request(lead));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true });
    expect(createLeadMock).toHaveBeenCalledWith({ email: lead.email, metadata: { name: lead.name, company: lead.company, message: lead.message, monthlyLeadVolume: '101-500', source: 'contact' } });
  });
  it.each([null, {}, { ...lead, email: 'invalid' }, { ...lead, message: '' }, { ...lead, extra: 'unexpected' }])('rejects invalid input %j', async body => {
    expect((await POST(request(body))).status).toBe(400);
    expect(createLeadMock).not.toHaveBeenCalled();
  });
  it('does not report success or expose errors when persistence fails', async () => {
    createLeadMock.mockRejectedValue(new Error('database-secret'));
    const response = await POST(request(lead));
    expect(response.status).toBe(500);
    expect(await response.text()).not.toContain('database-secret');
  });
  it('rejects malformed JSON without persistence', async () => {
    const response = await POST(new Request('http://localhost/api/contact', { method: 'POST', body: '{' }));
    expect(response.status).toBe(400);
    expect(createLeadMock).not.toHaveBeenCalled();
  });
  it('does not bypass a failing configured rate limiter', async () => {
    rateLimitMock.mockRejectedValue(new Error('Redis unavailable'));
    expect((await POST(request(lead))).status).toBe(503);
    expect(createLeadMock).not.toHaveBeenCalled();
  });
  it('preserves rate limiting before persistence', async () => {
    rateLimitMock.mockResolvedValue({ success: false, headers: { 'Retry-After': '60' } });
    const response = await POST(request(lead));
    expect(response.status).toBe(429);
    expect(response.headers.get('Retry-After')).toBe('60');
    expect(createLeadMock).not.toHaveBeenCalled();
  });
});
