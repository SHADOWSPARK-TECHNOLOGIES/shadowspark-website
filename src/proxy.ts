import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { canAccessPath } from "@/lib/auth/authorization";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  if (!canAccessPath(req.nextUrl.pathname, req.auth?.user)) {
    const destination = req.auth?.user ? "/" : "/login";
    return Response.redirect(new URL(destination, req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
