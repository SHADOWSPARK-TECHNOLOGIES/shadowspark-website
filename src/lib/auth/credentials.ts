import bcrypt from "bcryptjs";

import { consumeSessionHandoff } from "@/lib/auth/session-handoff";
import { prisma } from "@/lib/prisma";

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: string | null;
}

type CredentialInput = Partial<Record<"email" | "password" | "handoff", unknown>>;

function normalizeEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}

/** Authorizes password credentials or a single-use server-side passkey handoff. */
export async function authorizeCredentials(
  credentials: CredentialInput,
): Promise<AuthenticatedUser | null> {
  const email = normalizeEmail(credentials.email);
  const password = typeof credentials.password === "string" ? credentials.password : null;
  const handoff = typeof credentials.handoff === "string" ? credentials.handoff : null;

  if (!email || (password === null && handoff === null) || (password !== null && handoff !== null)) {
    return null;
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  if (handoff !== null) {
    return (await consumeSessionHandoff(user.id, handoff))
      ? { id: user.id, email: user.email, role: user.role }
      : null;
  }

  if (!user.password || !(await bcrypt.compare(password, user.password))) return null;
  return { id: user.id, email: user.email, role: user.role };
}
