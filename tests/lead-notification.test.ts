import { afterEach, beforeEach, expect, it, vi } from 'vitest';
const mocks = vi.hoisted(() => ({ upsert: vi.fn(), event: vi.fn(), send: vi.fn(), enqueue: vi.fn() }));
vi.mock('@/lib/prisma', () => ({ prisma: { lead: { upsert: mocks.upsert }, systemEvent: { create: mocks.event } } }));
vi.mock('@/lib/email', () => ({ sendEmail: mocks.send }));
vi.mock('@/lib/leads/queue', () => ({ enqueueFollowUp: mocks.enqueue }));
vi.mock('@/lib/demo-service', () => ({ scheduleDemoForLead: vi.fn() }));
vi.mock('@/lib/ledger/index', () => ({ LedgerService: {} }));
import { createLead } from '@/lib/lead-service';
beforeEach(() => {
  vi.resetAllMocks(); vi.stubEnv('CONTACT_INBOX', 'operator@example.com');
  mocks.upsert.mockResolvedValue({ id: 'lead-1', email: 'ada@example.com' });
  mocks.event.mockResolvedValue({}); mocks.send.mockResolvedValue({ sent: true }); mocks.enqueue.mockResolvedValue({});
});
afterEach(() => vi.unstubAllEnvs());
it('notifies the operator after persistence and escapes submitted HTML', async () => {
  await createLead({ email: 'ada@example.com', metadata: { name: '<img src=x onerror=alert(1)>', message: 'Need a demo' } });
  expect(mocks.send).toHaveBeenCalledWith('operator@example.com', expect.any(String), expect.stringContaining('&lt;img'));
  expect(mocks.send.mock.calls[0][2]).not.toContain('<img');
  expect(mocks.upsert.mock.invocationCallOrder[0]).toBeLessThan(mocks.send.mock.invocationCallOrder[0]);
  expect(mocks.event).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ metadata: expect.objectContaining({ notificationStatus: 'sent' }) }) }));
});
it('keeps the saved lead and records notification failure', async () => {
  mocks.send.mockResolvedValue({ sent: false, reason: 'provider rejected' });
  expect(await createLead({ email: 'ada@example.com' })).toMatchObject({ success: true });
  expect(mocks.event).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ metadata: expect.objectContaining({ notificationStatus: 'failed' }) }) }));
});
it('never sends a notification when saving fails', async () => {
  mocks.upsert.mockRejectedValue(new Error('database unavailable'));
  await expect(createLead({ email: 'ada@example.com' })).rejects.toThrow();
  expect(mocks.send).not.toHaveBeenCalled();
});

it('keeps the saved lead if email transport throws', async () => {
  mocks.send.mockRejectedValue(new Error('transport failure'));
  expect(await createLead({ email: 'ada@example.com' })).toMatchObject({ success: true });
  expect(mocks.enqueue).toHaveBeenCalledWith('lead-1');
});
it('records missing inbox configuration without sending to a guessed address', async () => {
  vi.stubEnv('CONTACT_INBOX', '');
  expect(await createLead({ email: 'ada@example.com' })).toMatchObject({ success: true });
  expect(mocks.send).not.toHaveBeenCalled();
  expect(mocks.event).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ metadata: expect.objectContaining({ notificationStatus: 'failed' }) }) }));
});
