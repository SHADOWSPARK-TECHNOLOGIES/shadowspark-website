import { NextResponse } from "next/server";

import { enqueueCrawl } from "@/lib/crawl/queue";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const authHeader = (req.headers.get("authorization") || "").trim();
  const secret = (process.env.CRON_SECRET || "").trim();
  if (!secret || authHeader !== "Bearer " + secret) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const rootUrl = (process.env.RAG_CRAWL_ROOT_URL || "https://shadowspark-tech.org/blog").trim();
  const limit = Number(process.env.RAG_CRAWL_LIMIT || "25");

  const job = await enqueueCrawl({ rootUrl, limit: Number.isFinite(limit) ? limit : 25 });
  return NextResponse.json({ success: true, jobId: job.id, rootUrl });
}

