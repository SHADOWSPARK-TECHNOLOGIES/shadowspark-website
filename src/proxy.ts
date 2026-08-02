import NextAuth from "next-auth";
import { NextResponse, type NextRequest } from "next/server";
import { authConfig } from "@/auth.config";
import { rateLimit } from "@/lib/rate-limit";

const { auth } = NextAuth(authConfig);
const scraperUserAgent =
  /\b(?:headlesschrome|puppeteer|playwright|phantomjs|selenium|webdriver)\b/i;

async function applyRequestGuards(request: NextRequest): Promise<NextResponse | null> {
  const { pathname } = request.nextUrl;

  if (pathname !== "/api/ghost-data" && scraperUserAgent.test(request.headers.get("user-agent") ?? "")) {
    return NextResponse.redirect(new URL("/api/ghost-data", request.url), 307);
  }

  if (pathname.startsWith("/api/auth/") || pathname.startsWith("/api/domains/")) {
    const { success, headers } = await rateLimit(request, `edge:${pathname}`, 10, "1 m");

    if (!success) {
      return NextResponse.json(
        { error: "Too many requests" },
        {
          status: 429,
          headers,
        },
      );
    }
  }

  return null;
}

export default auth(async (req) => {
  const guardResponse = await applyRequestGuards(req);
  if (guardResponse) {
    return guardResponse;
  }

  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  const isOnOperator = req.nextUrl.pathname.startsWith("/operator");
  const isOnAdmin = req.nextUrl.pathname.startsWith("/admin");

  if (isOnDashboard || isOnOperator || isOnAdmin) {
    if (isLoggedIn) {
      // Role-based protection for admin surfaces
      const userRole = (req.auth?.user as any)?.role?.toLowerCase();
      if ((isOnOperator || isOnAdmin) && userRole !== "admin") {
        return NextResponse.redirect(new URL("/", req.nextUrl));
      }
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
