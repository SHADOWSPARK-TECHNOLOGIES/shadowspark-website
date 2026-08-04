import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Stub: validate GitHub webhook signature, parse event, record contribution.
  const signature = request.headers.get("x-hub-signature-256");
  const eventType = request.headers.get("x-github-event");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 401 });
  }

  return NextResponse.json({
    ok: true,
    event: eventType,
    message: "GitHub event acknowledged. Processing is stubbed in this release.",
  });
}
