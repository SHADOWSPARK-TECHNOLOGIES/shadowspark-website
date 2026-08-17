import { beforeEach, describe, expect, it, vi } from "vitest";

import { mockPrisma, resetAuthPrismaMock } from "@/../tests/helpers/auth-prisma-mock";

const { compare } = vi.hoisted(() => ({ compare: vi.fn() }));
vi.mock("bcryptjs", () => ({ default: { compare } }));
vi.mock("@/lib/prisma", () => ({ prisma: mockPrisma }));
vi.mock("@/lib/auth/session-handoff", () => ({
  consumeSessionHandoff: vi.fn(),
}));

const { consumeSessionHandoff } = await import("@/lib/auth/session-handoff");
const { authorizeCredentials } = await import("@/lib/auth/credentials");

describe("credentials authorization", () => {
  beforeEach(() => {
    resetAuthPrismaMock();
    compare.mockReset();
    vi.mocked(consumeSessionHandoff).mockReset();
  });

  it("rejects the removed fixed passkey marker", async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ id: "u1", email: "user@example.com", role: "user", password: "" });
    await expect(authorizeCredentials({ email: "user@example.com", password: "passkey-auth-bypass" })).resolves.toBeNull();
    expect(vi.mocked(consumeSessionHandoff)).not.toHaveBeenCalled();
  });

  it("authorizes a password without querying passkeys", async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ id: "u1", email: "user@example.com", role: "user", password: "hash" });
    compare.mockResolvedValue(true);
    await expect(authorizeCredentials({ email: " USER@example.com ", password: "secret" })).resolves.toEqual({ id: "u1", email: "user@example.com", role: "user" });
    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({ where: { email: "user@example.com" } });
  });

  it("consumes a handoff and rejects mixed credentials", async () => {
    mockPrisma.user.findUnique.mockResolvedValue({ id: "u1", email: "user@example.com", role: "user", password: "" });
    vi.mocked(consumeSessionHandoff).mockResolvedValue(true);
    await expect(authorizeCredentials({ email: "user@example.com", handoff: "raw" })).resolves.toEqual({ id: "u1", email: "user@example.com", role: "user" });
    await expect(authorizeCredentials({ email: "user@example.com", password: "secret", handoff: "raw" })).resolves.toBeNull();
  });
});
