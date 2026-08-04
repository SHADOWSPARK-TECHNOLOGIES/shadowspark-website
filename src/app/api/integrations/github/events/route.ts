import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyGitHubWebhookSignature } from "@/lib/webhook-verify";
import { rewardJobQueue } from "@/lib/rewards-queue";

export const runtime = "nodejs";

const GITHUB_WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET;

export async function POST(request: Request) {
  if (!GITHUB_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "GitHub webhook secret not configured" },
      { status: 500 },
    );
  }

  const verified = await verifyGitHubWebhookSignature(request, GITHUB_WEBHOOK_SECRET);
  if (!verified.ok) {
    return NextResponse.json({ error: verified.error }, { status: 401 });
  }

  let event: Record<string, unknown>;
  try {
    event = JSON.parse(verified.body);
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const eventType = request.headers.get("x-github-event");
  const deliveryId = request.headers.get("x-github-delivery") ?? crypto.randomUUID();

  // Only record events that represent real, attributable contributions.
  if (eventType !== "pull_request" || (event.action as string) !== "closed" || !(event.merged as boolean)) {
    return NextResponse.json({ ok: true, recorded: false, event: eventType });
  }

  const pr = event.pull_request as Record<string, unknown> | undefined;
  const user = pr?.user as Record<string, unknown> | undefined;
  const repo = event.repository as Record<string, unknown> | undefined;

  const externalEventKey = `github:pr:${deliveryId}`;
  const actorProviderId = typeof user?.login === "string" ? user.login : undefined;
  const actorEmail = typeof user?.email === "string" ? user.email : undefined;
  const actorName = typeof user?.name === "string" ? user.name : actorProviderId;

  const contribution = await prisma.contribution.upsert({
    where: { source_externalEventKey: { source: "github", externalEventKey } },
    update: {},
    create: {
      source: "github",
      externalEventKey,
      type: "contribution.merged",
      actorEmail,
      actorName,
      actorProviderId,
      severity: "medium",
      production: false,
      metadata: {
        eventType,
        deliveryId,
        prNumber: pr?.number,
        repo: repo?.full_name,
        title: pr?.title,
      },
    },
  });

  // Decouple heavy scoring/badge logic from the webhook response.
  await rewardJobQueue.enqueue({
    kind: "process-contribution",
    tenant: "default",
    payload: { contributionId: contribution.id },
  });

  return NextResponse.json({
    ok: true,
    recorded: true,
    contributionId: contribution.id,
    event: eventType,
  });
}
