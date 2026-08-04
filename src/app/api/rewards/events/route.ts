import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  computeImpactScore,
  resolveBadges,
  type RewardContributionPayload,
} from "@/data/rewards";
import { rateLimit } from "@/lib/rate-limit";
import { requireRewardApiKey } from "@/lib/rewards-auth";
import { rewardJobQueue } from "@/lib/rewards-queue";

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
  const unauthorized = requireRewardApiKey(request);
  if (unauthorized) return unauthorized;

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

    const contribution = await prisma.contribution.upsert({
      where: {
        source_externalEventKey: {
          source: payload.source,
          externalEventKey: payload.eventKey,
        },
      },
      update: {},
      create: {
        source: payload.source,
        externalEventKey: payload.eventKey,
        type: payload.type,
        actorEmail: payload.actor.email,
        actorName: payload.actor.name,
        actorProviderId: payload.actor.id,
        severity: payload.impact.severity,
        usersAffected: payload.impact.usersAffected ?? 0,
        production: payload.impact.production ?? false,
        impactScore: computeImpactScore(payload),
        metadata: {
          ...payload.metadata,
          suggestedBadges: resolveBadges(computeImpactScore(payload)).map((b) => b.id),
        },
        status: "pending",
      },
    });

    await rewardJobQueue.enqueue({
      kind: "process-contribution",
      tenant: "default",
      payload: { contributionId: contribution.id },
    });

    return NextResponse.json({
      ok: true,
      idempotent: false,
      contributionId: contribution.id,
      impactScore: contribution.impactScore,
      suggestedBadges: resolveBadges(contribution.impactScore).map((b) => b.id),
    });
  } catch (error) {
    console.error("[api][rewards][events] failed:", error);
    return NextResponse.json(
      { error: "Failed to record contribution event" },
      { status: 500 },
    );
  }
}
