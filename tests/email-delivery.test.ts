import { afterEach, expect, it, vi } from 'vitest';
const { send } = vi.hoisted(() => ({ send: vi.fn() }));
vi.mock('resend', () => ({ Resend: class { emails = { send }; } }));
import { sendEmail } from '@/lib/email';
afterEach(() => vi.unstubAllEnvs());
it('does not report a provider rejection as sent', async () => {
  vi.stubEnv('RESEND_API_KEY', 'test-key');
  send.mockResolvedValue({ data: null, error: { message: 'Domain not verified' } });
  expect(await sendEmail('operator@example.com', 'New lead', '<p>lead</p>')).toMatchObject({ sent: false });
});
