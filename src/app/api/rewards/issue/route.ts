import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { findBadgeById } from "@/data/rewards";
import { rateLimit } from "@/lib/rate-limit";
import { requireRewardApiKey } from "@/lib/rewards-auth";

export const runtime = "nodejs";

const issueRewardSchema = z.object({
  idempotencyKey: z
    .string()
    .min(8, "idempotencyKey must be at least 8 characters"),
  badgeId: z.string().min(1, "badgeId is required"),
  reason: z.string().min(8, "reason must be at least 8 characters"),
  grantedBy: z.string().min(2, "grantedBy is required"),
  recipient: z.object({
    contributorId: z.string().optional(),
    email: z.string().email().optional(),
    name: z.string().optional(),
  }),
});

export async function POST(request: Request) {
  const unauthorized = requireRewardApiKey(request);
  if (unauthorized) return unauthorized;

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

    let contributorId = recipient.contributorId;
    if (!contributorId && recipient.email) {
      const profile = await prisma.contributorProfile.findFirst({
        where: { user: { email: recipient.email } },
      });
      contributorId = profile?.id;
    }

    if (!contributorId) {
      return NextResponse.json(
        { error: "recipient contributor not found" },
        { status: 404 },
      );
    }

    const existing = await prisma.reward.findUnique({
      where: { idempotencyKey },
    });
    if (existing) {
      return NextResponse.json({
        ok: true,
        idempotent: true,
        rewardId: existing.id,
      });
    }

    const reward = await prisma.$transaction(async (tx) => {
      const created = await tx.reward.create({
        data: {
          badgeId: badge.id,
          badgeName: badge.name,
          tier: badge.tier,
          points: badge.minScore,
          reason,
          grantedBy,
          idempotencyKey,
          recipientId: contributorId,
          status: "issued",
        },
      });

      await tx.rewardAuditLog.create({
        data: {
          action: "ISSUE",
          actor: grantedBy,
          rewardId: created.id,
          metadata: { badgeId: badge.id, reason },
        },
      });

      return created;
    });

    return NextResponse.json({
      ok: true,
      idempotent: false,
      rewardId: reward.id,
      badgeId: badge.id,
      badgeName: badge.name,
      recipientId: contributorId,
    });
  } catch (error) {
    console.error("[api][rewards][issue] failed:", error);
    return NextResponse.json(
      { error: "Failed to issue reward badge" },
      { status: 500 },
    );
  }
}
