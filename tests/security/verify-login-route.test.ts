import { beforeEach, describe, expect, it, vi } from "vitest";

const { signIn, verifyAuthenticationCeremony } = vi.hoisted(() => ({
  signIn: vi.fn(),
  verifyAuthenticationCeremony: vi.fn(),
}));

vi.mock("@/auth", () => ({ signIn }));
vi.mock("@/lib/auth/webauthn-authentication", () => ({
  verifyAuthenticationCeremony,
}));
vi.mock("@/lib/rate-limit", () => ({
  rateLimit: vi.fn(async () => ({ success: true, headers: {} })),
}));

describe("WebAuthn login session handoff", () => {
  beforeEach(() => {
    signIn.mockReset();
    verifyAuthenticationCeremony.mockReset();
    verifyAuthenticationCeremony.mockResolvedValue({
      ok: true,
      userId: "user-1",
      email: "user@example.com",
      newCounter: BigInt(5),
      handoff: "one-time-handoff",
    });
  });

  it("fails closed when Auth.js reports a credentials error", async () => {
    signIn.mockResolvedValue(
      "https://example.com/login?error=CredentialsSignin",
    );
    const { POST } = await import("@/app/api/auth/verify-login/route");

    const response = await POST(
      new Request("https://example.com/api/auth/verify-login", {
        method: "POST",
        body: JSON.stringify({
          challenge: "challenge-1",
          response: {
            id: "credential-id",
            rawId: "credential-id",
            type: "public-key",
            clientExtensionResults: {},
            response: {
              clientDataJSON: "client-data",
              authenticatorData: "authenticator-data",
              signature: "signature",
            },
          },
        }),
      }),
    );

    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({
      verified: false,
      error: "Authentication failed",
    });
  });

  it("returns success only for a successful Auth.js result", async () => {
    signIn.mockResolvedValue("https://example.com/dashboard");
    const { POST } = await import("@/app/api/auth/verify-login/route");

    const response = await POST(
      new Request("https://example.com/api/auth/verify-login", {
        method: "POST",
        body: JSON.stringify({
          challenge: "challenge-1",
          response: {
            id: "credential-id",
            rawId: "credential-id",
            type: "public-key",
            clientExtensionResults: {},
            response: {
              clientDataJSON: "client-data",
              authenticatorData: "authenticator-data",
              signature: "signature",
            },
          },
        }),
      }),
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ verified: true });
    expect(signIn).toHaveBeenCalledTimes(1);
  });
});
