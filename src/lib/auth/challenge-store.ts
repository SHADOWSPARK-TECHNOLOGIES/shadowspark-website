import type { Prisma } from "@/generated/prisma/client";

export type CeremonyType = "registration" | "authentication";

export class InvalidAuthenticationProof extends Error {
  override readonly name = "InvalidAuthenticationProof";
}

export interface ConsumeChallengeInput {
  id: string;
  userId: string;
  type: CeremonyType;
  now: Date;
}

export interface ChallengeTransaction {
  webAuthnChallenge: {
    updateMany(
      args: Prisma.WebAuthnChallengeUpdateManyArgs,
    ): Promise<{ count: number }>;
  };
}

/**
 * Marks a ceremony challenge as used only when every server-side invariant
 * still holds. A conditional update prevents a replay from winning a race.
 */
export async function consumeChallenge(
  tx: ChallengeTransaction,
  input: ConsumeChallengeInput,
): Promise<void> {
  const result = await tx.webAuthnChallenge.updateMany({
    where: {
      id: input.id,
      userId: input.userId,
      type: input.type,
      usedAt: null,
      expiresAt: { gt: input.now },
    },
    data: { usedAt: input.now },
  });

  if (result.count !== 1) {
    throw new InvalidAuthenticationProof();
  }
}
