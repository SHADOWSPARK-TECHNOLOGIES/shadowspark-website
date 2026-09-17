import { createHmac } from "node:crypto";

import { afterEach, describe, expect, it, vi } from "vitest";

import { getWhatsAppVerifyToken, verifyMetaSignature } from "@/lib/messaging/meta-signature";

function sign(body: string, secret: string): string {
  return `sha256=${createHmac("sha256", secret).update(body, "utf8").digest("hex")}`;
}

describe("Meta X-Hub-Signature-256", () => {
  const secret = "test-app-secret";
  const body = '{"object":"whatsapp_business_account","entry":[]}';

  it("accepts a valid signature over the exact raw body", () => {
    expect(verifyMetaSignature(body, sign(body, secret), secret)).toBe(true);
  });

  it("rejects a missing signature", () => {
    expect(verifyMetaSignature(body, null, secret)).toBe(false);
    expect(verifyMetaSignature(body, "", secret)).toBe(false);
  });

  it("rejects an invalid signature", () => {
    expect(verifyMetaSignature(body, sign(body, "other-secret"), secret)).toBe(false);
    expect(verifyMetaSignature(body, "sha256=deadbeef", secret)).toBe(false);
    expect(verifyMetaSignature(body, "sha1=abc", secret)).toBe(false);
  });

  it("rejects a signature computed over a mutated body", () => {
    expect(verifyMetaSignature(`${body} `, sign(body, secret), secret)).toBe(false);
  });
});

describe("WhatsApp GET verify token", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("has no built-in fallback token", () => {
    vi.stubEnv("WHATSAPP_VERIFY_TOKEN", "");
    expect(getWhatsAppVerifyToken()).toBeUndefined();
  });
});
