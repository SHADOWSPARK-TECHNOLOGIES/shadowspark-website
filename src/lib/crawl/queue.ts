import { Queue } from "bullmq";

import { redis } from "@/lib/redis";

export const CRAWL_QUEUE = "crawl-queue";

export type CrawlJobData = {
  rootUrl: string;
  limit?: number;
};

export const crawlQueue = new Queue<CrawlJobData>(CRAWL_QUEUE, {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 2000 },
    removeOnComplete: true,
  },
});

export async function enqueueCrawl(data: CrawlJobData) {
  return await crawlQueue.add("crawl-and-embed", data);
}

