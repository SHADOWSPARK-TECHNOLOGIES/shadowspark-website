import { NextResponse } from "next/server";
import { z } from "zod";

import { registrationResponseSchema } from "@/lib/auth/webauthn-schemas";
import { logSecurityEvent } from "@/lib/auth/security-log";
import { verifyRegistration } from "@/lib/auth/webauthn-registration";
import { rateLimit } from "@/lib/rate-limit";

function requestId(request: Request): string {
  return request.headers.get("x-request-id") ?? crypto.randomUUID();
}

export async function POST(request: Request) {
  const id = requestId(request);
  try {
    const { success: allowed, headers } = await rateLimit(
      request,
      "auth:verify-registration",
      5,
      "10 s",
    );
    if (!allowed) {
      return NextResponse.json(
        { error: "Registration not allowed" },
        { status: 429, headers },
      );
    }

    const body: unknown = await request.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid registration request" }, { status: 400 });
    }

    const parsed = z
      .object({
        challenge: z.string().min(1),
        response: registrationResponseSchema,
      })
      .strict()
      .safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid registration request" }, { status: 400 });
    }

    const { challenge, response } = parsed.data;
    const result = await verifyRegistration({
      challenge,
      response,
      requestId: id,
    });
    if (!result.ok) {
      return NextResponse.json({ error: "Invalid registration request" }, { status: 400 });
    }

    return NextResponse.json({ verified: true, credentialId: result.credentialId });
  } catch (error) {
    logSecurityEvent("webauthn_registration_verification", id, error);
    return NextResponse.json(
      { error: "Unable to verify registration" },
      { status: 500 },
    );
  }
}
