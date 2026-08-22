import { afterEach, describe, expect, it, vi } from "vitest";

import { getWebAuthnConfig } from "@/lib/auth/webauthn-config";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("WebAuthn configuration", () => {
  it("uses exact local defaults outside production", () => {
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("WEBAUTHN_RP_ID", "");
    vi.stubEnv("WEBAUTHN_ORIGIN", "");

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
      vi.stubEnv("NODE_ENV", "production");
      vi.stubEnv("WEBAUTHN_RP_ID", "example.com");
      vi.stubEnv("WEBAUTHN_ORIGIN", "https://example.com");
      vi.stubEnv(key, "");

      expect(() => getWebAuthnConfig()).toThrow(/required/iu);
    },
  );

  it.each(["https://example.com/", "https://example.com/path"]) (
    "rejects an origin with a path or trailing slash: %s",
    (origin) => {
      vi.stubEnv("NODE_ENV", "production");
      vi.stubEnv("WEBAUTHN_RP_ID", "example.com");
      vi.stubEnv("WEBAUTHN_ORIGIN", origin);

      expect(() => getWebAuthnConfig()).toThrow(/path|trailing/iu);
    },
  );

  it("rejects insecure non-local origins", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("WEBAUTHN_RP_ID", "example.com");
    vi.stubEnv("WEBAUTHN_ORIGIN", "http://example.com");

    expect(() => getWebAuthnConfig()).toThrow(/HTTPS/iu);
  });

  it.each(["https://example.com", "example.com:443"]) (
    "rejects an RP ID containing scheme or port: %s",
    (rpID) => {
      vi.stubEnv("NODE_ENV", "production");
      vi.stubEnv("WEBAUTHN_RP_ID", rpID);
      vi.stubEnv("WEBAUTHN_ORIGIN", "https://example.com");

      expect(() => getWebAuthnConfig()).toThrow(/hostname/iu);
    },
  );
});
