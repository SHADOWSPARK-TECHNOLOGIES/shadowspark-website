import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { enqueueCrawl } from "@/lib/crawl/queue";
import { hasAdminIdentity } from "@/lib/auth/authorization";

export const runtime = "nodejs";

type CrawlRequestBody = {
  rootUrl?: string;
  slug?: string;
  limit?: number | string;
};

export async function GET(req: Request) {
  return handleRequest(req);
}

export async function POST(req: Request) {
  return handleRequest(req);
}

async function handleRequest(req: Request) {
  const authHeader = (req.headers.get("authorization") || "").trim();
  const secret = (process.env.CRON_SECRET || "").trim();
  const session = await auth();
  const isAdmin = hasAdminIdentity(session?.user);
  const hasCronSecret = Boolean(secret) && authHeader === `Bearer ${secret}`;

  if (!hasCronSecret && !isAdmin) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const url = new URL(req.url);
  const searchParams = url.searchParams;
  
  let body: CrawlRequestBody = {};
  if (req.method === "POST") {
    try {
      const parsed: unknown = await req.json();
      if (typeof parsed === "object" && parsed !== null) {
        const candidate = parsed as Record<string, unknown>;
        body = {
          rootUrl: typeof candidate.rootUrl === "string" ? candidate.rootUrl : undefined,
          slug: typeof candidate.slug === "string" ? candidate.slug : undefined,
          limit:
            typeof candidate.limit === "string" || typeof candidate.limit === "number"
              ? candidate.limit
              : undefined,
        };
      }
    } catch {
      // Ignore invalid JSON
    }
  }

  const rootUrl = (body.rootUrl || searchParams.get("rootUrl") || process.env.RAG_CRAWL_ROOT_URL || "https://shadowspark-tech.org/blog").trim();
  const slug = (body.slug || searchParams.get("slug") || "").trim() || undefined;
  const limit = Number(body.limit || searchParams.get("limit") || process.env.RAG_CRAWL_LIMIT || "25");

  const job = await enqueueCrawl({ 
    rootUrl, 
    slug,
    limit: Number.isFinite(limit) ? limit : 25 
  });
  
  return NextResponse.json({ success: true, jobId: job.id, rootUrl, slug });
}
