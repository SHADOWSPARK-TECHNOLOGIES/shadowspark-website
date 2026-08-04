import { NextResponse } from "next/server";
import { rewardJobQueue } from "@/lib/rewards-queue";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const auth = request.headers.get("authorization") ?? "";
  const expected = "Bearer " + (process.env.CRON_SECRET ?? "");
  if (auth !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Queue a promotion scan instead of running it inline. The worker evaluates
  // pending contributions and issues qualifying badges in bounded batches.
  const jobId = await rewardJobQueue.enqueue({ kind: "badge-promotions", tenant: "default" });

  return NextResponse.json({
    ok: true,
    queued: true,
    jobId,
    message: "Badge promotion scan queued for worker processing.",
  });
}
