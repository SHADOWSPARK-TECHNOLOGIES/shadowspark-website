import { afterEach, describe, expect, it } from "vitest";

import { validateEnv } from "@/lib/config/validateEnv";

const KEYS = [
  "DATABASE_URL",
  "AUTH_SECRET",
  "WEBAUTHN_RP_ID",
  "WEBAUTHN_ORIGIN",
  "PAYMENTS_ENABLED",
  "WHATSAPP_ENABLED",
  "WHATSAPP_API_TOKEN",
  "META_ACCESS_TOKEN",
  "WHATSAPP_PHONE_NUMBER_ID",
  "META_PHONE_NUMBER_ID",
] as const;

const original: Record<string, string | undefined> = {};

function snapshotEnv() {
  for (const key of KEYS) original[key] = process.env[key];
}

function restoreEnv() {
  for (const key of KEYS) {
    const value = original[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
}

describe("validateEnv", () => {
  snapshotEnv();
  afterEach(restoreEnv);

  it("throws when DATABASE_URL and AUTH_SECRET are missing", () => {
    delete process.env.DATABASE_URL;
    delete process.env.AUTH_SECRET;
    delete process.env.WEBAUTHN_RP_ID;
    delete process.env.WEBAUTHN_ORIGIN;

    expect(() => validateEnv()).toThrow(/DATABASE_URL/);
  });

  it("fail-closes WhatsApp when WHATSAPP_ENABLED is true and credentials are missing", () => {
    process.env.DATABASE_URL = "postgresql://localhost/shadowspark";
    process.env.AUTH_SECRET = "test-secret";
    process.env.WHATSAPP_ENABLED = "true";
    delete process.env.WHATSAPP_API_TOKEN;
    delete process.env.META_ACCESS_TOKEN;
    delete process.env.WHATSAPP_PHONE_NUMBER_ID;
    delete process.env.META_PHONE_NUMBER_ID;

    expect(() => validateEnv()).toThrow(/WHATSAPP_API_TOKEN/);
  });
});
