/** Public WhatsApp links use one configured number; missing configuration routes to contact. */
export function getWhatsAppUrl(message = 'Hello ShadowSpark team, I would like to discuss a pilot.'): string {
  const configured = process.env.NEXT_PUBLIC_WHATSAPP_PHONE?.trim() ?? '';
  const phone = configured.replace(/[+\s()-]/g, '');
  if (!/^[1-9]\d{6,14}$/.test(phone) || ['2340000000000', '2349000000000'].includes(phone)) {
    return '/contact';
  }
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
