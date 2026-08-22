/** POST /api/auth/verify-login — verify an assertion and issue one session. */

import { NextResponse } from "next/server";
import { signIn } from "@/auth";
import { z } from "zod";

import { logSecurityEvent } from "@/lib/auth/security-log";
import { authenticationResponseSchema } from "@/lib/auth/webauthn-schemas";
import { verifyAuthenticationCeremony } from "@/lib/auth/webauthn-authentication";
import { rateLimit } from "@/lib/rate-limit";

function requestId(request: Request): string {
  return request.headers.get("x-request-id") ?? crypto.randomUUID();
}

function sessionWasIssued(result: unknown): boolean {
  if (result instanceof URL) {
    return !result.searchParams.has("error");
  }

  if (typeof result !== "string" || result.length === 0) {
    return false;
  }

  try {
    return !new URL(result).searchParams.has("error");
  } catch {
    return false;
  }
}

const verifyLoginSchema = z.object({
  challenge: z.string().min(1),
  response: authenticationResponseSchema,
}).strict();

export async function POST(request: Request) {
  const id = requestId(request);
  try {
    const { success: allowed, headers } = await rateLimit(request, "auth:verify-login", 5, "10 s");
    if (!allowed) return NextResponse.json({ verified: false, error: "Authentication failed" }, { status: 429, headers });

    const parsed = verifyLoginSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ verified: false, error: "Authentication failed" }, { status: 400 });

    const verified = await verifyAuthenticationCeremony({
      challenge: parsed.data.challenge,
      response: parsed.data.response,
      requestId: id,
    });
    if (!verified.ok) return NextResponse.json({ verified: false, error: "Authentication failed" }, { status: 401 });

    try {
      const signInResult = await signIn("credentials", {
        email: verified.email,
        handoff: verified.handoff,
        redirect: false,
        redirectTo: "/dashboard",
      });

      if (!sessionWasIssued(signInResult)) {
        return NextResponse.json(
          { verified: false, error: "Authentication failed" },
          { status: 401 },
        );
      }
    } catch (error) {
      logSecurityEvent("webauthn_authentication_verification", id, error);
      return NextResponse.json({ verified: false, error: "Authentication failed" }, { status: 401 });
    }

    return NextResponse.json({ verified: true });
  } catch (error) {
    logSecurityEvent("webauthn_authentication_verification", id, error);
    return NextResponse.json({ verified: false, error: "Authentication failed" }, { status: 500 });
  }
}
