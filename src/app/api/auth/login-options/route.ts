/** POST /api/auth/login-options — generate a server-bound passkey assertion challenge. */

import {
  generateAuthenticationOptions,
  type AuthenticatorTransport,
} from "@simplewebauthn/server";
import { NextResponse } from "next/server";
import { z } from "zod";

import { getWebAuthnConfig } from "@/lib/auth/webauthn-config";
import { logSecurityEvent } from "@/lib/auth/security-log";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";

const loginOptionsSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
}).strict();

const transportValues: readonly AuthenticatorTransport[] = [
  "ble",
  "hybrid",
  "internal",
  "nfc",
  "usb",
];

function parseTransports(serialized: string | null): AuthenticatorTransport[] | undefined {
  if (!serialized) return undefined;

  try {
    const parsed: unknown = JSON.parse(serialized);
    if (!Array.isArray(parsed)) return undefined;

    const transports = parsed.filter(
      (value): value is AuthenticatorTransport =>
        typeof value === "string" && transportValues.includes(value as AuthenticatorTransport),
    );
    return transports.length > 0 ? transports : undefined;
  } catch {
    return undefined;
  }
}

function requestId(request: Request): string {
  return request.headers.get("x-request-id") ?? crypto.randomUUID();
}

export async function POST(request: Request) {
  const id = requestId(request);

  try {
    const { success: allowed, headers } = await rateLimit(
      request,
      "auth:login-options",
      5,
      "10 s",
    );
    if (!allowed) {
      return NextResponse.json({ error: "Authentication not allowed" }, { status: 429, headers });
    }

    const config = getWebAuthnConfig();
    const origin = request.headers.get("origin");
    if (origin && origin !== config.origin) {
      return NextResponse.json({ error: "Authentication not allowed" }, { status: 403 });
    }

    const parsed = loginOptionsSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid authentication request" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email },
      include: { passkeys: true },
    });
    const verifiedPasskeys = user?.passkeys.filter((passkey) => passkey.verifiedAt !== null) ?? [];
    if (!user || verifiedPasskeys.length === 0) {
      return NextResponse.json(
        { error: "Unable to create authentication options" },
        { status: 404 },
      );
    }

    const options = await generateAuthenticationOptions({
      rpID: config.rpID,
      timeout: config.ceremonyTimeoutMs,
      userVerification: "required",
      allowCredentials: verifiedPasskeys.map((passkey) => ({
        id: passkey.credentialId,
        transports: parseTransports(passkey.transports),
      })),
    });

    await prisma.webAuthnChallenge.create({
      data: {
        userId: user.id,
        challenge: options.challenge,
        type: "authentication",
        expiresAt: new Date(Date.now() + config.ceremonyTimeoutMs),
      },
    });

    return NextResponse.json(options);
  } catch (error) {
    logSecurityEvent("webauthn_authentication_options", id, error);
    return NextResponse.json(
      { error: "Unable to create authentication options" },
      { status: 500 },
    );
  }
}
