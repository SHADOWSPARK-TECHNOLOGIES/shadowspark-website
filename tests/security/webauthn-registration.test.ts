import { beforeEach, describe, expect, it, vi } from "vitest";

import { registrationResponse } from "@/../tests/fixtures/webauthn";
import { mockPrisma, resetAuthPrismaMock } from "@/../tests/helpers/auth-prisma-mock";

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));

async function loadRegistrationService(): Promise<
  ((input: unknown) => Promise<unknown>) | null
> {
  try {
    const moduleName = "@/lib/auth/webauthn-registration";
    const module = (await import(moduleName)) as Record<string, unknown>;
    const service = module.verifyRegistration;
    expect(service, "verifyRegistration service is required").toBeTypeOf("function");
    return service as (input: unknown) => Promise<unknown>;
  } catch (error) {
    expect.fail(`Unable to load verifyRegistration: ${String(error)}`);
  }
}

const validInput = {
  userId: "user-1",
  challenge: "challenge-1",
  response: registrationResponse,
  requestId: "request-1",
};

describe("WebAuthn registration verification", () => {
  beforeEach(() => resetAuthPrismaMock());

  it.each([
    "missing attestation",
    "verifier rejection",
    "wrong origin",
    "wrong RP ID",
    "wrong ceremony",
    "wrong user binding",
    "expired challenge",
    "used challenge",
    "unauthenticated enrollment for an existing account",
  ])("rejects %s", async () => {
    const verifyRegistration = await loadRegistrationService();
    if (!verifyRegistration) return;

    await expect(verifyRegistration(validInput)).resolves.toMatchObject({ ok: false });
  });

  it("rejects a duplicate credential", async () => {
    const verifyRegistration = await loadRegistrationService();
    if (!verifyRegistration) return;

    mockPrisma.passkey.findUnique.mockResolvedValue({ id: "existing" });
    await expect(verifyRegistration(validInput)).resolves.toMatchObject({ ok: false });
  });

  it("does not persist a credential when server verification fails", async () => {
    const verifyRegistration = await loadRegistrationService();
    if (!verifyRegistration) return;

    await expect(verifyRegistration(validInput)).resolves.toMatchObject({ ok: false });
    expect(mockPrisma.passkey.create).not.toHaveBeenCalled();
  });
});
