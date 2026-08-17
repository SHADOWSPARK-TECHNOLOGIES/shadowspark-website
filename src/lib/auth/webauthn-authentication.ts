import {
  verifyAuthenticationResponse,
  type AuthenticationResponseJSON,
  type AuthenticatorTransport,
} from "@simplewebauthn/server";

import { prisma } from "@/lib/prisma";
import {
  consumeChallenge,
  InvalidAuthenticationProof,
} from "@/lib/auth/challenge-store";
import { getWebAuthnConfig } from "@/lib/auth/webauthn-config";

export interface VerifyAuthenticationInput {
  challenge: string;
  response: AuthenticationResponseJSON;
  requestId: string;
}

export type VerifyAuthenticationResult =
  | { ok: true; userId: string; email: string; newCounter: bigint }
  | { ok: false };

const transports: readonly AuthenticatorTransport[] = ["ble", "hybrid", "internal", "nfc", "usb"];

function parseTransports(value: string | null): AuthenticatorTransport[] | undefined {
  if (!value) return undefined;
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return undefined;
    const valid = parsed.filter(
      (item): item is AuthenticatorTransport =>
        typeof item === "string" && transports.includes(item as AuthenticatorTransport),
    );
    return valid.length ? valid : undefined;
  } catch {
    return undefined;
  }
}

export async function verifyAuthenticationCeremony(
  input: VerifyAuthenticationInput,
): Promise<VerifyAuthenticationResult> {
  void input.requestId;
  const config = getWebAuthnConfig();
  const now = new Date();
  const challenge = await prisma.webAuthnChallenge.findUnique({ where: { challenge: input.challenge } });
  if (!challenge || challenge.type !== "authentication" || challenge.usedAt !== null || challenge.expiresAt <= now) {
    return { ok: false };
  }

  const user = await prisma.user.findUnique({ where: { id: challenge.userId } });
  if (!user) return { ok: false };
  const passkey = await prisma.passkey.findUnique({ where: { credentialId: input.response.id } });
  if (!passkey || passkey.userId !== user.id || passkey.verifiedAt === null) return { ok: false };
  if (passkey.counter < BigInt(0) || passkey.counter > BigInt(4_294_967_295)) return { ok: false };

  let verification: Awaited<ReturnType<typeof verifyAuthenticationResponse>>;
  try {
    verification = await verifyAuthenticationResponse({
      response: input.response,
      expectedChallenge: challenge.challenge,
      expectedOrigin: config.origin,
      expectedRPID: config.rpID,
      credential: {
        id: passkey.credentialId,
        publicKey: Uint8Array.from(Buffer.from(passkey.publicKey, "base64url")),
        counter: Number(passkey.counter),
        transports: parseTransports(passkey.transports),
      },
      requireUserVerification: true,
    });
  } catch {
    return { ok: false };
  }
  if (!verification.verified || !verification.authenticationInfo) return { ok: false };
  const newCounter = BigInt(verification.authenticationInfo.newCounter);
  if (
    newCounter < BigInt(0) ||
    newCounter > BigInt(4_294_967_295) ||
    (newCounter !== BigInt(0) && newCounter <= passkey.counter)
  ) {
    return { ok: false };
  }

  try {
    return await prisma.$transaction(async (tx) => {
      await consumeChallenge(tx as unknown as Parameters<typeof consumeChallenge>[0], { id: challenge.id, userId: challenge.userId, type: "authentication", now });
      const updated = await tx.passkey.updateMany({
        where: { id: passkey.id, userId: user.id, verifiedAt: { not: null }, counter: passkey.counter },
        data: { counter: newCounter, lastUsedAt: now },
      });
      if (updated.count !== 1) throw new InvalidAuthenticationProof();
      return { ok: true as const, userId: user.id, email: user.email, newCounter };
    });
  } catch (error) {
    if (
      error instanceof InvalidAuthenticationProof ||
      (error instanceof Error && error.name === "InvalidAuthenticationProof")
    ) {
      return { ok: false };
    }
    throw error;
  }
}
