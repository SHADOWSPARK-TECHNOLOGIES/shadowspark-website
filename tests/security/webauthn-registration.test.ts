import { beforeEach, describe, expect, it, vi } from "vitest";

import { registrationResponse } from "@/../tests/fixtures/webauthn";
import { mockPrisma, resetAuthPrismaMock } from "@/../tests/helpers/auth-prisma-mock";

const verifyRegistrationResponse = vi.fn();

vi.mock("@simplewebauthn/server", () => ({ verifyRegistrationResponse }));
vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));

const validInput = {
  challenge: "challenge-1",
  response: registrationResponse,
  requestId: "request-1",
};

const verifiedRegistration = {
  verified: true as const,
  registrationInfo: {
    credential: {
      id: "verified-credential",
      publicKey: new Uint8Array([1, 2, 3]),
      counter: 7,
      transports: ["internal" as const],
    },
    credentialDeviceType: "singleDevice" as const,
    credentialBackedUp: false,
  },
};

describe("WebAuthn registration verification", () => {
  beforeEach(() => {
    resetAuthPrismaMock();
    verifyRegistrationResponse.mockReset();
    mockPrisma.webAuthnChallenge.findUnique.mockResolvedValue({
      id: "challenge-row",
      userId: "user-1",
      challenge: "challenge-1",
      type: "registration",
      expiresAt: new Date(Date.now() + 60_000),
      usedAt: null,
    });
    mockPrisma.passkey.findUnique.mockResolvedValue(null);
    mockPrisma.webAuthnChallenge.updateMany.mockResolvedValue({ count: 1 });
    mockPrisma.passkey.create.mockResolvedValue({
      credentialId: "verified-credential",
    });
    mockPrisma.webAuthnChallenge.updateMany.mockResolvedValue({ count: 1 });
  });

  it("requires a server registration verifier", async () => {
    const registrationModule = await import("@/lib/auth/webauthn-registration");
    expect(registrationModule.verifyRegistration).toBeTypeOf("function");
  });

  it("rejects an absent or already-consumed challenge", async () => {
    const { verifyRegistration } = await import("@/lib/auth/webauthn-registration");
    mockPrisma.webAuthnChallenge.findUnique.mockResolvedValueOnce(null);

    await expect(verifyRegistration(validInput)).resolves.toEqual({ ok: false });
    expect(verifyRegistrationResponse).not.toHaveBeenCalled();
  });

  it("rejects verifier failures without persisting client material", async () => {
    const { verifyRegistration } = await import("@/lib/auth/webauthn-registration");
    verifyRegistrationResponse.mockResolvedValue({ verified: false });

    await expect(verifyRegistration(validInput)).resolves.toEqual({ ok: false });
    expect(mockPrisma.passkey.create).not.toHaveBeenCalled();
    expect(mockPrisma.webAuthnChallenge.updateMany).not.toHaveBeenCalled();
  });

  it("persists only the verified credential output and consumes the challenge atomically", async () => {
    const { verifyRegistration } = await import("@/lib/auth/webauthn-registration");
    verifyRegistrationResponse.mockResolvedValue(verifiedRegistration);

    await expect(verifyRegistration(validInput)).resolves.toEqual({
      ok: true,
      credentialId: "verified-credential",
    });

    expect(verifyRegistrationResponse).toHaveBeenCalledWith(
      expect.objectContaining({
        response: registrationResponse,
        expectedChallenge: "challenge-1",
        requireUserVerification: true,
      }),
    );
    expect(mockPrisma.webAuthnChallenge.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          id: "challenge-row",
          userId: "user-1",
          type: "registration",
          usedAt: null,
        }),
      }),
    );
    expect(mockPrisma.passkey.create).toHaveBeenCalledWith({
      data: {
        userId: "user-1",
        credentialId: "verified-credential",
        publicKey: "AQID",
        counter: BigInt(7),
        deviceType: "singleDevice",
        transports: JSON.stringify(["internal"]),
        backedUp: false,
        verifiedAt: expect.any(Date),
      },
    });
  });

  it("rejects duplicate verified credentials", async () => {
    const { verifyRegistration } = await import("@/lib/auth/webauthn-registration");
    verifyRegistrationResponse.mockResolvedValue(verifiedRegistration);
    mockPrisma.passkey.findUnique.mockResolvedValue({ id: "existing" });

    await expect(verifyRegistration(validInput)).resolves.toEqual({ ok: false });
    expect(mockPrisma.passkey.create).not.toHaveBeenCalled();
  });
});
