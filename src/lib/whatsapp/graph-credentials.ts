import { optionalEnv } from "@/lib/env";

/**
 * Resolve WhatsApp Cloud API Graph credentials.
 * Prefers WhatsApp-named secrets, then Meta-named aliases. One token per request.
 */
export function resolveWhatsAppGraphToken(): string | undefined {
  return optionalEnv("WHATSAPP_API_TOKEN") ?? optionalEnv("META_ACCESS_TOKEN");
}

export function resolveWhatsAppPhoneNumberId(): string | undefined {
  return (
    optionalEnv("WHATSAPP_PHONE_NUMBER_ID") ?? optionalEnv("META_PHONE_NUMBER_ID")
  );
}

export function requireWhatsAppGraphCredentials(): {
  token: string;
  phoneNumberId: string;
} {
  const token = resolveWhatsAppGraphToken();
  const phoneNumberId = resolveWhatsAppPhoneNumberId();
  if (!token) {
    throw new Error(
      "WhatsApp Graph token is not set (WHATSAPP_API_TOKEN or META_ACCESS_TOKEN)",
    );
  }
  if (!phoneNumberId) {
    throw new Error(
      "WhatsApp phone number id is not set (WHATSAPP_PHONE_NUMBER_ID or META_PHONE_NUMBER_ID)",
    );
  }
  return { token, phoneNumberId };
}
