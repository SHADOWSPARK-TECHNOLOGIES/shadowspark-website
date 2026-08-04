/**
 * Lightweight serverless queue for Copilot Rewards processing.
 *
 * Built on Upstash Redis so Vercel cron jobs never do heavy work themselves.
 * Pattern: cron enqueues a scan job → /api/queue/reward-worker pops bounded
 * batches and writes real Prisma records. If a job fails it lands in a dead-
 * letter list instead of being silently lost.
 */

import { Redis } from "@upstash/redis";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

const JOBS_KEY = "reward:jobs";
const DEAD_LETTER_KEY = "reward:jobs:dead-letter";

export type RewardJobKind =
  | "reward-digest"
  | "badge-promotions"
  | "process-contribution";

export type RewardJob = {
  id: string;
  kind: RewardJobKind;
  tenant: string;
  payload?: Record<string, unknown>;
  enqueuedAt: string;
};

export type JobResult = { jobId: string; ok: boolean; error?: string };

function randomId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export interface RewardJobQueue {
  enqueue(job: Omit<RewardJob, "id" | "enqueuedAt">): Promise<string>;
  pop(): Promise<RewardJob | null>;
  ack(job: RewardJob): Promise<void>;
  deadLetter(job: RewardJob, error: string): Promise<void>;
  drain(
    handler: (job: RewardJob) => Promise<unknown>,
    options?: { batchSize?: number; maxFailures?: number },
  ): Promise<JobResult[]>;
}

export const rewardJobQueue: RewardJobQueue = {
  async enqueue(job) {
    const id = randomId();
    const full: RewardJob = { ...job, id, enqueuedAt: new Date().toISOString() };

    if (!redis) {
      // Dev fallback: return id but do not throw so local builds stay green.
      console.warn("[rewards-queue] Upstash Redis not configured; job dropped.", full.kind);
      return id;
    }

    await redis.lpush(JOBS_KEY, JSON.stringify(full));
    return id;
  },

  async pop() {
    if (!redis) return null;
    // RPOP is enough for a best-effort serverless queue. Jobs that fail are
    // written to the dead-letter list; successful jobs are simply consumed.
    const raw = await redis.rpop(JOBS_KEY);
    if (!raw) return null;
    return JSON.parse(raw as string) as RewardJob;
  },

  async ack() {
    // No-op for the RPOP model; the job was already removed from the queue.
    return;
  },

  async deadLetter(job, error) {
    if (!redis) return;
    const item = JSON.stringify({ ...job, failedAt: new Date().toISOString(), error });
    await redis.lpush(DEAD_LETTER_KEY, item);
  },

  async drain(handler, options = {}) {
    const { batchSize = 10, maxFailures = 3 } = options;
    const results: JobResult[] = [];
    let failures = 0;

    for (let i = 0; i < batchSize; i++) {
      const job = await this.pop();
      if (!job) break;

      try {
        await handler(job);
        await this.ack(job);
        results.push({ jobId: job.id, ok: true });
      } catch (err) {
        failures++;
        const message = err instanceof Error ? err.message : String(err);
        await this.deadLetter(job, message);
        results.push({ jobId: job.id, ok: false, error: message });
        if (failures >= maxFailures) break;
      }
    }

    return results;
  },
};
