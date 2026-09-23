import { afterEach, expect, it, vi } from 'vitest';
import { getWhatsAppUrl } from '@/lib/whatsapp';
afterEach(() => vi.unstubAllEnvs());
it.each(['', 'your-number', '2340000000000', '2349000000000', '00000000', '1234567890123456'])('falls back safely for unusable number %s', value => {
  vi.stubEnv('NEXT_PUBLIC_WHATSAPP_PHONE', value);
  expect(getWhatsAppUrl()).toBe('/contact');
});
it('formats a configured international number and escapes the message', () => {
  vi.stubEnv('NEXT_PUBLIC_WHATSAPP_PHONE', '+44 7700 900123');
  expect(getWhatsAppUrl('Hello & welcome')).toBe('https://wa.me/447700900123?text=Hello%20%26%20welcome');
});
