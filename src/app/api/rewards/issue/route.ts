import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { findBadgeById } from "@/data/rewards";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const issueRewardSchema = z.object({
  idempotencyKey: z
    .string()
    .min(8, "idempotencyKey must be at least 8 characters"),
  badgeId: z.string().min(1, "badgeId is required"),
  reason: z.string().min(8, "reason must be at least 8 characters"),
  grantedBy: z.string().min(2, "grantedBy is required"),
  recipient: z.object({
    id: z.string().optional(),
    email: z.string().email().optional(),
    name: z.string().optional(),
  }),
});

function resolveRecipientKey(recipient: {
  id?: string;
  email?: string;
  name?: string;
}): string {
  const rawKey = recipient.id ?? recipient.email ?? recipient.name;
  if (!rawKey) {
    throw new Error("Missing recipient identifier");
  }
  return rawKey.trim().toLowerCase();
}

export async function POST(request: Request) {
  try {
    const { success: allowed, headers: rateLimitHeaders } = await rateLimit(
      request,
      "rewards:issue",
      20,
      "60 s",
    );

    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429, headers: rateLimitHeaders },
      );
    }

    const body = await request.json();
    const parsed = issueRewardSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid request payload" },
        { status: 400 },
      );
    }

    const { idempotencyKey, badgeId, reason, grantedBy, recipient } = parsed.data;
    const badge = findBadgeById(badgeId);
    if (!badge) {
      return NextResponse.json({ error: "Unknown badgeId" }, { status: 404 });
    }

    let recipientKey = "";
    try {
      recipientKey = resolveRecipientKey(recipient);
    } catch {
      return NextResponse.json(
        { error: "recipient requires id, email, or name" },
        { status: 400 },
      );
    }

    const digest = `reward:issue:${idempotencyKey}:${badge.id}:${recipientKey}`;

    const existing = await prisma.systemEvent.findFirst({
      where: { type: "reward_badge_issued", digest },
      select: { id: true, metadata: true },
    });

    if (existing) {
      const existingMetadata =
        typeof existing.metadata === "object" && existing.metadata
          ? existing.metadata
          : {};
      return NextResponse.json({
        ok: true,
        idempotent: true,
        issueId: existing.id,
        ...existingMetadata,
      });
    }

    const created = await prisma.systemEvent.create({
      data: {
        type: "reward_badge_issued",
        digest,
        message: `Badge issued: ${badge.name}`,
        metadata: {
          badge,
          reason,
          grantedBy,
          recipient,
          issuedAt: new Date().toISOString(),
        },
      },
      select: { id: true },
    });

    return NextResponse.json({
      ok: true,
      idempotent: false,
      issueId: created.id,
      badge,
      reason,
      grantedBy,
      recipient,
    });
  } catch (error) {
    console.error("[api][rewards][issue] failed:", error);
    return NextResponse.json(
      { error: "Failed to issue reward badge" },
      { status: 500 },
    );
  }
}
