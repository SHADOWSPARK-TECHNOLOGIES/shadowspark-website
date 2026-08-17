import { createHash } from "node:crypto";

import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  consumeSessionHandoff,
  createSessionHandoff,
  type SessionHandoffTransaction,
} from "@/lib/auth/session-handoff";

const prismaMock = vi.hoisted(() => ({
  webAuthnChallenge: {
    updateMany: vi.fn(),
  },
}));

vi.mock("@/lib/prisma", () => ({ prisma: prismaMock }));

function createTransaction(): {
  transaction: SessionHandoffTransaction;
  create: ReturnType<typeof vi.fn>;
  updateMany: ReturnType<typeof vi.fn>;
} {
  const create = vi.fn();
  const updateMany = vi.fn();
  const transaction = {
    webAuthnChallenge: {
      create,
      updateMany,
    },
  };

  return { transaction, create, updateMany };
}

describe("session handoff persistence", () => {
  const now = new Date("2026-08-17T09:00:00.000Z");

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("persists only a SHA-256 digest for a 30-second handoff", async () => {
    const { transaction, create } = createTransaction();
    create.mockResolvedValue({ id: "handoff-1" });

    const token = await createSessionHandoff(transaction, "user-1", now);

    expect(create).toHaveBeenCalledWith({
      data: {
        userId: "user-1",
        challenge: createHash("sha256").update(token).digest("base64url"),
        type: "session-handoff",
        expiresAt: new Date("2026-08-17T09:00:30.000Z"),
      },
    });
    expect(create.mock.calls[0]?.[0].data.challenge).not.toBe(token);
  });

  it("consumes one matching unexpired handoff exactly once", async () => {
    const updateMany = prismaMock.webAuthnChallenge.updateMany;
    updateMany.mockResolvedValue({ count: 1 });

    const consumed = await consumeSessionHandoff("user-1", "raw-token", now);

    expect(consumed).toBe(true);
    expect(updateMany).toHaveBeenCalledWith({
      where: {
        userId: "user-1",
        challenge: createHash("sha256").update("raw-token").digest("base64url"),
        type: "session-handoff",
        usedAt: null,
        expiresAt: { gt: now },
      },
      data: { usedAt: now },
    });
  });

  it.each(["expired", "replayed"])("returns false for an %s handoff", async () => {
    const updateMany = prismaMock.webAuthnChallenge.updateMany;
    updateMany.mockResolvedValue({ count: 0 });

    await expect(
      consumeSessionHandoff("user-1", "raw-token", now),
    ).resolves.toBe(false);
  });

  it("allows only one concurrent atomic consumption", async () => {
    const updateMany = prismaMock.webAuthnChallenge.updateMany;
    updateMany.mockResolvedValueOnce({ count: 1 }).mockResolvedValueOnce({ count: 0 });

    const results = await Promise.all([
      consumeSessionHandoff("user-1", "raw-token", now),
      consumeSessionHandoff("user-1", "raw-token", now),
    ]);

    expect(results).toEqual([true, false]);
    expect(updateMany).toHaveBeenCalledTimes(2);
  });
});
