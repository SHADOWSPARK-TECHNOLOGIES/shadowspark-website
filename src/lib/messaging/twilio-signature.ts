import twilio from "twilio";

import { optionalEnv } from "@/lib/env";

export function getTwilioPublicUrl(path: string): string | undefined {
  const base = optionalEnv("TWILIO_PUBLIC_BASE_URL");
  if (!base) return undefined;
  return `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
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

export async function authorizeTwilioWebhook(
  request: Request,
  path: string,
): Promise<{ ok: true; params: Record<string, string> } | { ok: false }> {
  const authToken = optionalEnv("TWILIO_AUTH_TOKEN");
  const publicUrl = getTwilioPublicUrl(path);
  if (!authToken || !publicUrl) {
    console.error("[twilio] TWILIO_AUTH_TOKEN or TWILIO_PUBLIC_BASE_URL is not configured");
    return { ok: false };
  }

  const params = Object.fromEntries(new URLSearchParams(await request.text()));
  const signature = request.headers.get("x-twilio-signature");
  if (!verifyTwilioSignature({ authToken, signature, publicUrl, params })) {
    return { ok: false };
  }
  return { ok: true, params };
}
