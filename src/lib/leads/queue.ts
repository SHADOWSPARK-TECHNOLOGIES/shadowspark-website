import { Queue } from "bullmq";
import { redis } from "../redis";

export const LEAD_SYNC_QUEUE = "lead-sync-queue";

export const leadSyncQueue = new Queue(LEAD_SYNC_QUEUE, {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
    removeOnComplete: true,
  },
});

export async function addLeadToSyncQueue(data: any) {
  return await leadSyncQueue.add("sync-lead", data);
}
