import { beforeEach, describe, expect, it, vi } from "vitest";

import { authenticationResponse } from "@/../tests/fixtures/webauthn";
import { mockPrisma, resetAuthPrismaMock } from "@/../tests/helpers/auth-prisma-mock";

const generateAuthenticationOptions = vi.fn();
const verifyAuthenticationResponse = vi.fn();

vi.mock("@simplewebauthn/server", () => ({
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
}));
vi.mock("@/lib/rate-limit", () => ({
  rateLimit: vi.fn(async () => ({ success: true, headers: {} })),
}));

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));

async function loadAuthenticationService(): Promise<
  ((input: unknown) => Promise<unknown>) | null
> {
  try {
    const moduleName = "@/lib/auth/webauthn-authentication";
    const importedModule = (await import(moduleName)) as Record<string, unknown>;
    const service = importedModule.verifyAuthenticationCeremony;
    expect(
      service,
      "verifyAuthenticationCeremony service is required",
    ).toBeTypeOf("function");
    return service as (input: unknown) => Promise<unknown>;
  } catch (error) {
    expect.fail(`Unable to load verifyAuthenticationCeremony: ${String(error)}`);
  }
}

const validInput = {
  userId: "user-1",
  challenge: "challenge-1",
  response: authenticationResponse,
  requestId: "request-1",
};

describe("WebAuthn authentication verification", () => {
  beforeEach(() => {
    resetAuthPrismaMock();
    verifyAuthenticationResponse.mockReset();
  });

  it("verifies the stored credential and atomically advances its counter", async () => {
    const verifyAuthenticationCeremony = await loadAuthenticationService();
    if (!verifyAuthenticationCeremony) return;

    const now = new Date(Date.now() + 60_000);
    mockPrisma.webAuthnChallenge.findUnique.mockResolvedValue({
      id: "challenge-row",
      userId: "user-1",
      challenge: "challenge-1",
      type: "authentication",
      usedAt: null,
      expiresAt: now,
    });
    mockPrisma.user.findUnique.mockResolvedValue({
      id: "user-1",
      email: "user@example.com",
    });
    mockPrisma.passkey.findUnique.mockResolvedValue({
      id: "passkey-1",
      userId: "user-1",
      credentialId: "credential-id",
      publicKey: "AQID",
      counter: BigInt(4),
      verifiedAt: new Date(),
      transports: '["internal"]',
    });
    mockPrisma.webAuthnChallenge.updateMany.mockResolvedValue({ count: 1 });
    mockPrisma.passkey.updateMany.mockResolvedValue({ count: 1 });
    verifyAuthenticationResponse.mockResolvedValue({
      verified: true,
      authenticationInfo: { newCounter: 5 },
    });

    await expect(
      verifyAuthenticationCeremony(validInput),
    ).resolves.toEqual({
      ok: true,
      userId: "user-1",
      email: "user@example.com",
      newCounter: BigInt(5),
    });
    expect(verifyAuthenticationResponse).toHaveBeenCalledWith(expect.objectContaining({
      expectedChallenge: "challenge-1",
      credential: expect.objectContaining({
        id: "credential-id",
        counter: 4,
        transports: ["internal"],
      }),
      requireUserVerification: true,
    }));
    expect(mockPrisma.passkey.updateMany).toHaveBeenCalledWith({
      where: expect.objectContaining({ id: "passkey-1", counter: BigInt(4) }),
      data: expect.objectContaining({ counter: BigInt(5), lastUsedAt: expect.any(Date) }),
    });
  });

  it.each([
    "missing signature",
    "invalid signature",
    "wrong origin",
    "wrong RP ID",
    "wrong user binding",
    "wrong ceremony",
    "expired challenge",
    "used challenge",
    "unknown credential",
    "unverified legacy credential",
    "counter regression",
  ])("rejects %s", async () => {
    const verifyAuthenticationCeremony = await loadAuthenticationService();
    if (!verifyAuthenticationCeremony) return;

    await expect(
      verifyAuthenticationCeremony(validInput),
    ).resolves.toMatchObject({ ok: false });
  });

  it("rejects concurrent challenge consumption", async () => {
    const verifyAuthenticationCeremony = await loadAuthenticationService();
    if (!verifyAuthenticationCeremony) return;

    mockPrisma.webAuthnChallenge.findUnique.mockResolvedValue({
      id: "challenge-row",
      userId: "user-1",
      challenge: "challenge-1",
      type: "authentication",
      usedAt: null,
      expiresAt: new Date(Date.now() + 60_000),
    });
    mockPrisma.user.findUnique.mockResolvedValue({ id: "user-1", email: "user@example.com" });
    mockPrisma.passkey.findUnique.mockResolvedValue({
      id: "passkey-1",
      userId: "user-1",
      credentialId: "credential-id",
      publicKey: "AQID",
      counter: BigInt(4),
      verifiedAt: new Date(),
      transports: null,
    });
    mockPrisma.webAuthnChallenge.updateMany
      .mockResolvedValueOnce({ count: 1 })
      .mockResolvedValue({ count: 0 });
    mockPrisma.passkey.updateMany.mockResolvedValue({ count: 1 });
    verifyAuthenticationResponse.mockResolvedValue({
      verified: true,
      authenticationInfo: { newCounter: 5 },
    });

    await expect(
      Promise.all([
        verifyAuthenticationCeremony(validInput),
        verifyAuthenticationCeremony(validInput),
      ]),
    ).resolves.toEqual([
      expect.objectContaining({ ok: true }),
      expect.objectContaining({ ok: false }),
    ]);
  });
});

describe("WebAuthn authentication options route", () => {
  beforeEach(() => {
    resetAuthPrismaMock();
    generateAuthenticationOptions.mockReset();
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("WEBAUTHN_RP_ID", "example.com");
    vi.stubEnv("WEBAUTHN_ORIGIN", "https://example.com");
    generateAuthenticationOptions.mockResolvedValue({
      challenge: "server-generated-challenge",
      rpId: "example.com",
      timeout: 60_000,
      userVerification: "required",
      allowCredentials: [
        { id: "credential-1", type: "public-key", transports: ["internal"] },
      ],
    });
  });

  it("returns no options for an unknown account", async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);
    const { POST } = await import("@/app/api/auth/login-options/route");

    const response = await POST(
      new Request("https://example.com/api/auth/login-options", {
        method: "POST",
        body: JSON.stringify({ email: "missing@example.com" }),
        headers: { "content-type": "application/json", origin: "https://example.com" },
      }),
    );

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ error: "Unable to create authentication options" });
    expect(generateAuthenticationOptions).not.toHaveBeenCalled();
  });

  it("excludes legacy unverified passkeys and binds the generated challenge", async () => {
    mockPrisma.user.findUnique.mockResolvedValue({
      id: "user-1",
      email: "user@example.com",
      passkeys: [
        { credentialId: "legacy", verifiedAt: null, transports: '["usb"]' },
        { credentialId: "credential-1", verifiedAt: new Date(), transports: '["internal","hybrid"]' },
      ],
    });

    const { POST } = await import("@/app/api/auth/login-options/route");
    const response = await POST(
      new Request("https://example.com/api/auth/login-options", {
        method: "POST",
        body: JSON.stringify({ email: "USER@example.com" }),
        headers: { "content-type": "application/json", origin: "https://example.com" },
      }),
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      challenge: "server-generated-challenge",
      rpId: "example.com",
      timeout: 60_000,
      userVerification: "required",
      allowCredentials: [
        { id: "credential-1", type: "public-key", transports: ["internal"] },
      ],
    });
    expect(generateAuthenticationOptions).toHaveBeenCalledWith({
      rpID: "example.com",
      timeout: 60_000,
      userVerification: "required",
      allowCredentials: [
        { id: "credential-1", transports: ["internal", "hybrid"] },
      ],
    });
    expect(mockPrisma.webAuthnChallenge.create).toHaveBeenCalledWith({
      data: {
        userId: "user-1",
        challenge: "server-generated-challenge",
        type: "authentication",
        expiresAt: expect.any(Date),
      },
    });
  });

  it("does not expose user identity or credential data outside options", async () => {
    mockPrisma.user.findUnique.mockResolvedValue({
      id: "user-1",
      email: "user@example.com",
      passkeys: [{ credentialId: "credential-1", verifiedAt: new Date(), transports: null }],
    });
    const { POST } = await import("@/app/api/auth/login-options/route");

    const response = await POST(
      new Request("https://example.com/api/auth/login-options", {
        method: "POST",
        body: JSON.stringify({ email: "user@example.com" }),
        headers: { "content-type": "application/json", origin: "https://example.com" },
      }),
    );
    const body = await response.json() as Record<string, unknown>;

    expect(body).not.toHaveProperty("userId");
    expect(body).not.toHaveProperty("credentialIds");
    expect(body).not.toHaveProperty("options");
    expect(body).toHaveProperty("challenge", "server-generated-challenge");
  });
});
