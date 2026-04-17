import { Queue } from "bullmq";
import { redis } from "../redis";

export const SNIPER_QUEUE = "sniper_queue";

export interface SniperJobData {
  targetId: string;
  domain: string;
}

export const sniperQueue = new Queue<SniperJobData>(SNIPER_QUEUE, {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 5000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
});
