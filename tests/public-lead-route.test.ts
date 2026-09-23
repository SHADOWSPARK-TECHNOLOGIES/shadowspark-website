import { beforeEach, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
const { save } = vi.hoisted(() => ({ save: vi.fn() }));
vi.mock('@/lib/lead-service', () => ({ createLead: save }));
import { POST } from '@/app/api/lead/route';
const request = (body: unknown) => new NextRequest('http://localhost/api/lead', { method: 'POST', body: JSON.stringify(body) });
beforeEach(() => { save.mockReset(); save.mockResolvedValue({ success: true, lead: { id: 'lead-1', metadata: { privateNotes: 'internal-only' } } }); });
it('returns only a receipt, never stored lead data', async () => {
  const response = await POST(request({ email: 'ada@example.com', name: 'Ada' }));
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ success: true, leadId: 'lead-1' });
});
it.each([null, { email: {} }, { email: 'invalid' }, { email: 'a'.repeat(300) + '@example.com' }])('rejects invalid email input %j', async body => {
  expect((await POST(request(body))).status).toBe(400);
  expect(save).not.toHaveBeenCalled();
});
