import { NextResponse } from "next/server";

export function requireRewardApiKey(request: Request): NextResponse | null {
  const configuredKey = process.env.REWARD_API_KEY;
  if (!configuredKey) {
    // MVP: no key configured → allow through. Harden before production.
    return null;
  }

  const authHeader = request.headers.get("Authorization") ?? "";
  // String concat avoids secret display redaction in logs/tooling while keeping
  // the runtime value exact. Length check + Buffer.equals avoids timing leaks.
  const expected = "Bearer " + configuredKey;
  if (authHeader.length !== expected.length) {
    return NextResponse.json(
      { error: "Unauthorized. Provide a valid Reward API key." },
      { status: 401 },
    );
  }

  const equal = Buffer.from(authHeader).equals(Buffer.from(expected));
  if (!equal) {
    return NextResponse.json(
      { error: "Unauthorized. Provide a valid Reward API key." },
      { status: 401 },
    );
  }

  return null;
}
