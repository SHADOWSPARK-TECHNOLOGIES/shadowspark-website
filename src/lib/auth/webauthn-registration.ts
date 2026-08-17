import { verifyRegistrationResponse } from "@simplewebauthn/server";
import type { RegistrationResponseJSON } from "@simplewebauthn/server";

import { prisma } from "@/lib/prisma";
import {
  consumeChallenge,
  InvalidAuthenticationProof,
} from "@/lib/auth/challenge-store";
import { getWebAuthnConfig } from "@/lib/auth/webauthn-config";

export interface VerifyRegistrationInput {
  challenge: string;
  response: RegistrationResponseJSON;
  requestId: string;
}

export type VerifyRegistrationResult =
  | { ok: true; credentialId: string }
  | { ok: false };

class DuplicateCredential extends Error {}

/** Verifies a registration response and atomically records only verifier output. */
export async function verifyRegistration(
  input: VerifyRegistrationInput,
): Promise<VerifyRegistrationResult> {
  try {
    const config = getWebAuthnConfig();
    const storedChallenge = await prisma.webAuthnChallenge.findUnique({
      where: { challenge: input.challenge },
    });
    const now = new Date();

    if (
      !storedChallenge ||
      storedChallenge.type !== "registration" ||
      storedChallenge.usedAt !== null ||
      storedChallenge.expiresAt <= now
    ) {
      return { ok: false };
    }

    let verification;
    try {
      verification = await verifyRegistrationResponse({
        response: input.response,
        expectedChallenge: storedChallenge.challenge,
        expectedOrigin: config.origin,
        expectedRPID: config.rpID,
        requireUserVerification: true,
      });
    } catch {
      return { ok: false };
    }

    if (!verification.verified || !verification.registrationInfo) {
      return { ok: false };
    }

    const credential = verification.registrationInfo.credential;
    return await prisma.$transaction(async (tx) => {
      await consumeChallenge(tx as unknown as Parameters<typeof consumeChallenge>[0], {
        id: storedChallenge.id,
        userId: storedChallenge.userId,
        type: "registration",
        now,
      });

      const existing = await tx.passkey.findUnique({
        where: { credentialId: credential.id },
      });
      if (existing) throw new DuplicateCredential();

      await tx.passkey.create({
        data: {
          userId: storedChallenge.userId,
          credentialId: credential.id,
          publicKey: Buffer.from(credential.publicKey).toString("base64url"),
          counter: BigInt(credential.counter),
          deviceType: verification.registrationInfo.credentialDeviceType,
          transports: credential.transports
            ? JSON.stringify(credential.transports)
            : null,
          backedUp: verification.registrationInfo.credentialBackedUp,
          verifiedAt: now,
        },
      });

      return { ok: true, credentialId: credential.id };
    });
  } catch (error) {
    if (error instanceof InvalidAuthenticationProof || error instanceof DuplicateCredential) {
      return { ok: false };
    }
    throw error;
  }
}
