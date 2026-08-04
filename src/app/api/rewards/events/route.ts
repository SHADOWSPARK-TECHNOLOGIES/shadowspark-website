import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  computeImpactScore,
  resolveBadges,
  type RewardContributionPayload,
} from "@/data/rewards";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const contributionEventSchema = z.object({
  eventKey: z.string().min(6, "eventKey must be at least 6 characters"),
  type: z.enum([
    "contribution.merged",
    "contribution.shipped",
    "incident.fixed",
    "security.hardened",
    "pilot.closed",
  ]),
  source: z.enum(["github", "vercel", "internal"]),
  actor: z.object({
    id: z.string().optional(),
    email: z.email().optional(),
    name: z.string().optional(),
  }),
  impact: z.object({
    severity: z.enum(["low", "medium", "high", "critical"]),
    usersAffected: z.number().int().nonnegative().optional(),
    production: z.boolean().optional(),
  }),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export async function POST(request: Request) {
  try {
    const { success: allowed, headers: rateLimitHeaders } = await rateLimit(
      request,
      "rewards:events",
      30,
      "60 s",
    );

    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429, headers: rateLimitHeaders },
      );
    }

    const body = await request.json();
    const parsed = contributionEventSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid request payload" },
        { status: 400 },
      );
    }

    const payload: RewardContributionPayload = parsed.data;
    const digest = `reward:event:${payload.source}:${payload.eventKey}`;

    const existing = await prisma.systemEvent.findFirst({
      where: { type: "reward_contribution_event", digest },
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
        eventId: existing.id,
        ...existingMetadata,
      });
    }

    const impactScore = computeImpactScore(payload);
    const suggestedBadges = resolveBadges(impactScore);

    const created = await prisma.systemEvent.create({
      data: {
        type: "reward_contribution_event",
        digest,
        message: `Contribution recorded: ${payload.type}`,
        metadata: {
          payload,
          impactScore,
          suggestedBadges,
        },
      },
      select: { id: true },
    });

    return NextResponse.json({
      ok: true,
      idempotent: false,
      eventId: created.id,
      impactScore,
      suggestedBadges,
    });
  } catch (error) {
    console.error("[api][rewards][events] failed:", error);
    return NextResponse.json(
      { error: "Failed to record contribution event" },
      { status: 500 },
    );
  }
}
