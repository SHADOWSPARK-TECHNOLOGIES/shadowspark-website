import twilio from "twilio";

import { optionalEnv } from "@/lib/env";

export function getTwilioAuthToken(): string | undefined {
  return optionalEnv("TWILIO_AUTH_TOKEN");
}

export function getTwilioPublicUrl(path: string): string | undefined {
  const base = optionalEnv("TWILIO_PUBLIC_BASE_URL");
  if (!base) return undefined;
  return `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

export function parseTwilioFormBody(rawBody: string): Record<string, string> {
  const params: Record<string, string> = {};
  for (const [key, value] of new URLSearchParams(rawBody)) {
    params[key] = value;
  }
  return params;
}

export function verifyTwilioSignature(input: {
  authToken: string;
  signature: string | null | undefined;
  publicUrl: string;
  params: Record<string, string>;
}): boolean {
  if (!input.authToken || !input.signature || !input.publicUrl) return false;
  return twilio.validateRequest(
    input.authToken,
    input.signature,
    input.publicUrl,
    input.params,
  );
}
