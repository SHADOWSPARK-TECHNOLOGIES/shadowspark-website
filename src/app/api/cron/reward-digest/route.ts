import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Stub for a scheduled reward digest. In production this runs via Vercel Cron
  // or a durable workflow and processes queued contribution events into badges.
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    ok: true,
    processed: 0,
    issued: [],
    message: "Reward digest stub ran successfully. No persistent queue in MVP.",
  });
}
