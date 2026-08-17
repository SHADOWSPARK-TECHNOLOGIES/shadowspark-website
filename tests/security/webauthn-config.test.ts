import { afterEach, describe, expect, it } from "vitest";

import { getWebAuthnConfig } from "@/lib/auth/webauthn-config";

const originalEnv = { ...process.env };

afterEach(() => {
  process.env = { ...originalEnv };
});

describe("WebAuthn configuration", () => {
  it("uses exact local defaults outside production", () => {
    process.env.NODE_ENV = "test";
    delete process.env.WEBAUTHN_RP_ID;
    delete process.env.WEBAUTHN_ORIGIN;

    expect(getWebAuthnConfig()).toEqual({
      rpID: "localhost",
      rpName: "ShadowSpark Technologies",
      origin: "http://localhost:3000",
      ceremonyTimeoutMs: 60_000,
    });
  });

  it.each(["WEBAUTHN_RP_ID", "WEBAUTHN_ORIGIN"]) (
    "rejects missing %s in production",
    (key) => {
      process.env.NODE_ENV = "production";
      process.env.WEBAUTHN_RP_ID = "example.com";
      process.env.WEBAUTHN_ORIGIN = "https://example.com";
      delete process.env[key];

      expect(() => getWebAuthnConfig()).toThrow(/required/iu);
    },
  );

  it.each(["https://example.com/", "https://example.com/path"]) (
    "rejects an origin with a path or trailing slash: %s",
    (origin) => {
      process.env.NODE_ENV = "production";
      process.env.WEBAUTHN_RP_ID = "example.com";
      process.env.WEBAUTHN_ORIGIN = origin;

      expect(() => getWebAuthnConfig()).toThrow(/path|trailing/iu);
    },
  );

  it("rejects insecure non-local origins", () => {
    process.env.NODE_ENV = "production";
    process.env.WEBAUTHN_RP_ID = "example.com";
    process.env.WEBAUTHN_ORIGIN = "http://example.com";

    expect(() => getWebAuthnConfig()).toThrow(/HTTPS/iu);
  });

  it.each(["https://example.com", "example.com:443"]) (
    "rejects an RP ID containing scheme or port: %s",
    (rpID) => {
      process.env.NODE_ENV = "production";
      process.env.WEBAUTHN_RP_ID = rpID;
      process.env.WEBAUTHN_ORIGIN = "https://example.com";

      expect(() => getWebAuthnConfig()).toThrow(/hostname/iu);
    },
  );
});
