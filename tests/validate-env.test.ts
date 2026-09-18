import { afterEach, describe, expect, it } from "vitest";

import { validateEnv } from "@/lib/config/validateEnv";

const KEYS = [
  "NETLIFY",
  "CONTEXT",
  "DEPLOY_PRIME_URL",
  "DATABASE_URL",
  "AUTH_SECRET",
  "WEBAUTHN_RP_ID",
  "WEBAUTHN_ORIGIN",
  "PAYMENTS_ENABLED",
  "WHATSAPP_ENABLED",
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

  it("throws when DATABASE_URL and AUTH_SECRET are missing outside Netlify preview", () => {
    delete process.env.NETLIFY;
    delete process.env.CONTEXT;
    delete process.env.DATABASE_URL;
    delete process.env.AUTH_SECRET;
    delete process.env.WEBAUTHN_RP_ID;
    delete process.env.WEBAUTHN_ORIGIN;

    expect(() => validateEnv()).toThrow(/DATABASE_URL/);
  });

  it("allows Netlify deploy-preview to boot without DATABASE_URL or AUTH_SECRET", () => {
    process.env.NETLIFY = "true";
    process.env.CONTEXT = "deploy-preview";
    delete process.env.DATABASE_URL;
    delete process.env.AUTH_SECRET;
    delete process.env.WEBAUTHN_RP_ID;
    delete process.env.WEBAUTHN_ORIGIN;
    delete process.env.PAYMENTS_ENABLED;
    delete process.env.WHATSAPP_ENABLED;

    expect(() => validateEnv()).not.toThrow();
  });

  it("treats Netlify function URLs as preview when CONTEXT is absent at runtime", () => {
    process.env.NETLIFY = "true";
    delete process.env.CONTEXT;
    process.env.DEPLOY_PRIME_URL = "https://deploy-preview-31--shadowspark-tech.netlify.app";
    delete process.env.DATABASE_URL;
    delete process.env.AUTH_SECRET;

    expect(() => validateEnv()).not.toThrow();
  });

  it("still fail-closes WhatsApp on preview when WHATSAPP_ENABLED is true", () => {
    process.env.NETLIFY = "true";
    process.env.CONTEXT = "deploy-preview";
    process.env.WHATSAPP_ENABLED = "true";
    delete process.env.WHATSAPP_API_TOKEN;
    delete process.env.META_ACCESS_TOKEN;
    delete process.env.WHATSAPP_PHONE_NUMBER_ID;
    delete process.env.META_PHONE_NUMBER_ID;

    expect(() => validateEnv()).toThrow(/WHATSAPP_API_TOKEN/);
  });
});
