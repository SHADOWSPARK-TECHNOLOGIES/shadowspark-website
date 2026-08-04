import { NextResponse } from "next/server";
import { rewardJobQueue } from "@/lib/rewards-queue";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const auth = request.headers.get("authorization") ?? "";
  const expected = "Bearer " + (process.env.CRON_SECRET ?? "");
  if (auth !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Push a scan job into the serverless queue. The worker route pops and
  // processes it, so this cron never blocks on heavy aggregation.
  const jobId = await rewardJobQueue.enqueue({ kind: "reward-digest", tenant: "default" });

  return NextResponse.json({
    ok: true,
    queued: true,
    jobId,
    message: "Reward digest scan queued for worker processing.",
  });
}
