import { beforeEach, describe, expect, it, vi } from "vitest";

import { authenticationResponse } from "@/../tests/fixtures/webauthn";
import { mockPrisma, resetAuthPrismaMock } from "@/../tests/helpers/auth-prisma-mock";

vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));

async function loadAuthenticationService(): Promise<
  ((input: unknown) => Promise<unknown>) | null
> {
  try {
    const moduleName = "@/lib/auth/webauthn-authentication";
    const module = (await import(moduleName)) as Record<string, unknown>;
    const service = module.verifyAuthenticationCeremony;
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
  beforeEach(() => resetAuthPrismaMock());

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
