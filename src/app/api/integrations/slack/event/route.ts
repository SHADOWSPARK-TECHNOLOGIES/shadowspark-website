import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as { type?: string; challenge?: string };

  // Slack URL verification handshake.
  if (body.type === "url_verification" && body.challenge) {
    return NextResponse.json({ challenge: body.challenge });
  }

  return NextResponse.json({
    ok: true,
    message: "Slack event acknowledged. Processing is stubbed in this release.",
  });
}
