import { createHash, randomBytes } from "node:crypto";

import type { Prisma, WebAuthnChallenge } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

const HANDOFF_TYPE = "session-handoff";
const HANDOFF_TTL_MS = 30_000;

export interface SessionHandoffTransaction {
  webAuthnChallenge: {
    create(
      args: Prisma.WebAuthnChallengeCreateArgs,
    ): Promise<WebAuthnChallenge>;
    updateMany(
      args: Prisma.WebAuthnChallengeUpdateManyArgs,
    ): Promise<{ count: number }>;
  };
}

function handoffDigest(token: string): string {
  return createHash("sha256").update(token).digest("base64url");
}

/**
 * Creates a short-lived server-only credential. The database receives only a
 * digest, so a database read cannot be used to issue a session.
 */
export async function createSessionHandoff(
  tx: SessionHandoffTransaction,
  userId: string,
  now = new Date(),
): Promise<string> {
  const token = randomBytes(32).toString("base64url");

  await tx.webAuthnChallenge.create({
    data: {
      userId,
      challenge: handoffDigest(token),
      type: HANDOFF_TYPE,
      expiresAt: new Date(now.getTime() + HANDOFF_TTL_MS),
    },
  });

  return token;
}

/**
 * Atomically consumes a handoff. It is valid for one user, one use, and no
 * more than 30 seconds from creation.
 */
export async function consumeSessionHandoff(
  userId: string,
  token: string,
  now = new Date(),
): Promise<boolean> {
  const result = await prisma.webAuthnChallenge.updateMany({
    where: {
      userId,
      challenge: handoffDigest(token),
      type: HANDOFF_TYPE,
      usedAt: null,
      expiresAt: { gt: now },
    },
    data: { usedAt: now },
  });

  return result.count === 1;
}
