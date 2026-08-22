/**
 * Edge-compatible NextAuth configuration.
 *
 * This file contains ONLY the parts of the auth config that are safe to run
 * in Vercel's Edge Runtime (middleware). It deliberately excludes:
 *   - PrismaAdapter (uses node:fs, node:net)
 *   - bcryptjs (uses node:crypto internals)
 *   - Any direct database imports
 *
 * The full config (with Prisma + bcrypt) lives in src/auth.ts and is used
 * by server components and API routes that run in the Node.js runtime.
 */

import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { canAccessPath, isAppRole } from "@/lib/auth/authorization";

export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  providers: [
    // The Credentials provider is declared here so NextAuth recognises the
    // provider in the middleware JWT-verification path.  The actual
    // `authorize` function (which needs Prisma + bcrypt) is overridden in
    // src/auth.ts — it will never be called from middleware.
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        handoff: { label: "Passkey handoff", type: "text" },
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      return canAccessPath(nextUrl.pathname, auth?.user);
    },
    async jwt({ token, user }) {
      if (user && typeof user.id === "string" && user.id.length > 0) {
        token.sub = user.id;
        token.role = isAppRole(user.role) ? user.role : "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = isAppRole(token.role) ? token.role : "user";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
