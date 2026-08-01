import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { type NextRequest, NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

// User-agents that are definitively non-human: no legit browser sends these alone
const BOT_UA_PATTERNS = [
  /python-requests/i,
  /go-http-client/i,
  /curl\//i,
  /wget\//i,
  /scrapy/i,
  /java\/\d/i,
  /^$/,                            // empty UA
];

// Routes targeted by scrapers in this codebase
const PROTECTED_DATA_ROUTES = [/^\/api\/listings/, /^\/api\/leads/, /^\/api\/qualify/];

function isSuspiciousBot(ua: string): boolean {
  return BOT_UA_PATTERNS.some((pattern) => pattern.test(ua));
}

async function fireTelemetry(payload: {
  ip: string;
  userAgent: string;
  route: string;
}): Promise<void> {
  const webhookUrl = process.env.N8N_TELEMETRY_WEBHOOK_URL;
  if (!webhookUrl) return;

  fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch((err) => console.error("[TELEMETRY_FAIL]", err));
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const ua = req.headers.get("user-agent") ?? "";
  const isDataRoute = PROTECTED_DATA_ROUTES.some((r) => r.test(url.pathname));

  if (isDataRoute && isSuspiciousBot(ua)) {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

    fireTelemetry({ ip, userAgent: ua, route: url.pathname });

    console.warn(`[DEFENSE] Bot intercepted. IP: ${ip} UA: ${ua}`);
    url.pathname = "/api/ghost-data";
    return NextResponse.rewrite(url);
  }

  // Hand off to NextAuth for protected dashboard routes
  return auth(req as Parameters<typeof auth>[0]);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/finance/:path*",
    "/support/:path*",
    "/api/listings/:path*",
    "/api/leads/:path*",
    "/api/qualify/:path*",
  ],
};
