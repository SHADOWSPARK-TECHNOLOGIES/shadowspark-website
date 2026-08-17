import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  consumeChallenge,
  InvalidAuthenticationProof,
  type ChallengeTransaction,
} from "@/lib/auth/challenge-store";

function createTransaction(): {
  transaction: ChallengeTransaction;
  updateMany: ReturnType<typeof vi.fn>;
} {
  const updateMany = vi.fn();
  const transaction = {
    webAuthnChallenge: { updateMany },
  };

  return { transaction, updateMany };
}

describe("challenge-store", () => {
  const now = new Date("2026-08-17T09:00:00.000Z");
  const input = {
    id: "challenge-1",
    userId: "user-1",
    type: "authentication" as const,
    now,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("atomically consumes only the intended unused and unexpired ceremony", async () => {
    const { transaction, updateMany } = createTransaction();
    updateMany.mockResolvedValue({ count: 1 });

    await expect(consumeChallenge(transaction, input)).resolves.toBeUndefined();

    expect(updateMany).toHaveBeenCalledWith({
      where: {
        id: "challenge-1",
        userId: "user-1",
        type: "authentication",
        usedAt: null,
        expiresAt: { gt: now },
      },
      data: { usedAt: now },
    });
  });

  it.each([
    "wrong user",
    "wrong ceremony",
    "expired challenge",
    "replayed challenge",
  ])("rejects a %s", async () => {
    const { transaction, updateMany } = createTransaction();
    updateMany.mockResolvedValue({ count: 0 });

    await expect(consumeChallenge(transaction, input)).rejects.toBeInstanceOf(
      InvalidAuthenticationProof,
    );
  });

  it("allows only one concurrent atomic consumption", async () => {
    const { transaction, updateMany } = createTransaction();
    updateMany.mockResolvedValueOnce({ count: 1 }).mockResolvedValueOnce({ count: 0 });

    const results = await Promise.allSettled([
      consumeChallenge(transaction, input),
      consumeChallenge(transaction, input),
    ]);

    expect(results.map((result) => result.status)).toEqual(["fulfilled", "rejected"]);
  });
});
