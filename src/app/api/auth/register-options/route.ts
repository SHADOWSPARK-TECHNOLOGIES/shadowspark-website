import { generateRegistrationOptions } from "@simplewebauthn/server";
import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { logSecurityEvent } from "@/lib/auth/security-log";
import { getWebAuthnConfig } from "@/lib/auth/webauthn-config";

const registerOptionsSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  name: z.string().trim().min(1).max(256).optional(),
}).strict();

function requestId(request: Request): string {
  return request.headers.get("x-request-id") ?? crypto.randomUUID();
}

export async function POST(request: Request) {
  const id = requestId(request);
  try {
    const { success: allowed, headers } = await rateLimit(
      request,
      "auth:register-options",
      5,
      "10 s",
    );
    if (!allowed) return NextResponse.json({ error: "Registration not allowed" }, { status: 429, headers });

    const config = getWebAuthnConfig();
    const origin = request.headers.get("origin");
    if (origin && origin !== config.origin) {
      return NextResponse.json({ error: "Registration not allowed" }, { status: 403 });
    }

    const parsed = registerOptionsSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid registration request" }, { status: 400 });
    }

    const { email, name } = parsed.data;
    const existingUser = await prisma.user.findUnique({
      where: { email },
      include: { passkeys: true },
    });
    const session = await auth();
    let user = existingUser;

    if (existingUser && session?.user?.id !== existingUser.id) {
      return NextResponse.json({ error: "Registration not allowed" }, { status: 403 });
    }

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: name ?? email.split("@")[0],
          password: "",
          role: "user",
        },
        include: { passkeys: true },
      });
    }

    const options = await generateRegistrationOptions({
      rpName: config.rpName,
      rpID: config.rpID,
      userName: user.email,
      userDisplayName: user.name ?? user.email,
      userID: new TextEncoder().encode(user.id),
      timeout: config.ceremonyTimeoutMs,
      attestationType: "none",
      authenticatorSelection: { residentKey: "required", userVerification: "required" },
      excludeCredentials: user.passkeys
        .filter((passkey) => passkey.verifiedAt !== null)
        .map((passkey) => ({ id: passkey.credentialId })),
    });

    await prisma.webAuthnChallenge.create({
      data: {
        userId: user.id,
        challenge: options.challenge,
        type: "registration",
        expiresAt: new Date(Date.now() + config.ceremonyTimeoutMs),
      },
    });

    return NextResponse.json(options);
  } catch (error) {
    logSecurityEvent("webauthn_registration_options", id, error);
    return NextResponse.json({ error: "Unable to create registration options" }, { status: 500 });
  }
}
