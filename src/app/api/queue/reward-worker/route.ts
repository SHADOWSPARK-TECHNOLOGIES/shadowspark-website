import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rewardJobQueue, type RewardJob } from "@/lib/rewards-queue";
import {
  computeImpactScore,
  resolveBadges,
} from "@/data/rewards";

export const runtime = "nodejs";

const BATCH_SIZE = 25;

async function getOrCreateContributor(
  actorEmail?: string,
  actorProviderId?: string,
) {
  if (!actorEmail && !actorProviderId) return null;

  const existing = await prisma.contributorProfile.findFirst({
    where: {
      OR: [
        ...(actorEmail ? [{ user: { email: actorEmail } }] : []),
        ...(actorProviderId ? [{ githubHandle: actorProviderId }] : []),
      ],
    },
  });

  if (existing) return existing;

  return prisma.contributorProfile.create({
    data: {
      githubHandle: actorProviderId,
      dataResidency: "NG",
      status: "active",
    },
  });
}

async function handleBadgePromotions(tenant: string) {
  const pending = await prisma.contribution.findMany({
    where: { status: "pending" },
    orderBy: { createdAt: "asc" },
    take: BATCH_SIZE,
  });

  const issued: Array<{ contributionId: string; badgeId: string }> = [];

  for (const contribution of pending) {
    try {
      const contributor = await getOrCreateContributor(
        contribution.actorEmail ?? undefined,
        contribution.actorProviderId ?? undefined,
      );

      const impactScore = computeImpactScore({
        eventKey: contribution.externalEventKey,
        type: contribution.type as Parameters<typeof computeImpactScore>[0]["type"],
        source: contribution.source as "github" | "vercel" | "internal",
        actor: {
          id: contribution.actorProviderId ?? undefined,
          email: contribution.actorEmail ?? undefined,
          name: contribution.actorName ?? undefined,
        },
        impact: {
          severity: contribution.severity as "low" | "medium" | "high" | "critical",
          usersAffected: contribution.usersAffected,
          production: contribution.production,
        },
        metadata: (contribution.metadata as Record<string, unknown>) ?? undefined,
      });

      const badges = resolveBadges(impactScore);

      await prisma.$transaction(async (tx) => {
        for (const badge of badges) {
          const idempotencyKey = `badge:${contribution.id}:${badge.id}`;
          const existing = await tx.reward.findUnique({
            where: { idempotencyKey },
          });
          if (existing || !contributor) continue;

          await tx.reward.create({
            data: {
              badgeId: badge.id,
              badgeName: badge.name,
              tier: badge.tier,
              points: badge.minScore,
              reason: `Auto-issued for ${contribution.type}`,
              grantedBy: "reward-worker",
              idempotencyKey,
              recipientId: contributor.id,
              contributionId: contribution.id,
              status: "issued",
            },
          });
          issued.push({ contributionId: contribution.id, badgeId: badge.id });
        }

        await tx.contribution.update({
          where: { id: contribution.id },
          data: {
            status: "processed",
            processedAt: new Date(),
            impactScore,
            contributorId: contributor?.id ?? contribution.contributorId,
          },
        });
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      await prisma.contribution.update({
        where: { id: contribution.id },
        data: { status: "failed", failureReason: message },
      });
      throw err;
    }
  }

  return { processed: pending.length, issued: issued.length, tenant };
}

async function handleRewardDigest(tenant: string) {
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const [contributions, rewards] = await Promise.all([
    prisma.contribution.count({ where: { createdAt: { gte: since } } }),
    prisma.reward.count({ where: { createdAt: { gte: since } } }),
  ]);

  return { contributions, rewards, since: since.toISOString(), tenant };
}

async function handleProcessContribution(job: RewardJob) {
  const payload = job.payload;
  if (!payload || typeof payload.contributionId !== "string") {
    throw new Error("Missing contributionId in process-contribution job");
  }

  const contribution = await prisma.contribution.findUnique({
    where: { id: payload.contributionId as string },
  });
  if (!contribution) throw new Error("Contribution not found");

  return handleBadgePromotions(job.tenant);
}

async function processJob(job: RewardJob) {
  switch (job.kind) {
    case "badge-promotions":
      return handleBadgePromotions(job.tenant);
    case "reward-digest":
      return handleRewardDigest(job.tenant);
    case "process-contribution":
      return handleProcessContribution(job);
    default:
      throw new Error(`Unknown job kind: ${(job as RewardJob).kind}`);
  }
}

export async function GET(request: Request) {
  const auth = request.headers.get("authorization") ?? "";
  const expected = "Bearer " + (process.env.CRON_SECRET ?? "");
  if (auth !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = await rewardJobQueue.drain(processJob, {
    batchSize: BATCH_SIZE,
    maxFailures: 3,
  });

  const okCount = results.filter((r) => r.ok).length;
  const failed = results.filter((r) => !r.ok);

  return NextResponse.json({
    ok: true,
    processed: okCount,
    failed: failed.length,
    failures: failed,
  });
}
