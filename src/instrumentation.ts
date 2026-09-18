export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { validateEnv } = await import("./lib/config/validateEnv");
    validateEnv();
    const redisUrl = process.env.REDIS_URL?.trim();
    if (!redisUrl) {
      console.warn("[boot] workers skipped: REDIS_URL is not configured");
      return;
    }
    console.log("Registered instrumentation, loading workers...");
    const { crawlWorker } = await import("./workers/crawl-worker");
    const { leadWorker } = await import("./workers/lead-worker");
    const { nudgeWorker } = await import("./workers/nudge-worker");

    crawlWorker.on("error", (err) => console.error("crawlWorker Error:", err));
    leadWorker.on("error", (err) => console.error("leadWorker Error:", err));
    nudgeWorker.on("error", (err) => console.error("nudgeWorker Error:", err));
  }
}
