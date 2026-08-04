# Copilot @Profiler Runbook — ShadowSpark Hot Paths

Use this runbook inside VS Code with Copilot `@Profiler` to benchmark the most expensive paths before enterprise scale.

## Paths to profile

### 1. Reward worker batch loop
- **File:** `src/app/api/queue/reward-worker/route.ts`
- **Why:** Processes queued contributions, computes impact scores, resolves badges, writes Prisma transactions.
- **Command for @Profiler:**
  ```text
  @Profiler analyze src/app/api/queue/reward-worker/route.ts for CPU hot paths and Prisma query N+1 issues. Suggest batched inserts and index hints.
  ```
- **Baseline:** see `scripts/benchmark-reward-score.mjs`.

### 2. Marketing static generation
- **Files:** `src/app/(marketing)/**/page.tsx`
- **Why:** 4 marketing routes generate static pages; heavy metadata or data imports slow the build.
- **Command for @Profiler:**
  ```text
  @Profiler analyze the Next.js marketing build in apps/shadowspark-site and identify slow static routes or large client bundles.
  ```
- **Baseline:** time `pnpm build` and `node scripts/marketing-assertions.mjs`.

### 3. AI service chat completion
- **File:** `ai-service/app/services/moonshot.py`
- **Why:** LLM calls are network-bound, but serialization and retry logic can waste CPU.
- **Command for @Profiler:**
  ```text
  @Profiler write a Python benchmark for ai-service/app/services/moonshot.py complete() and identify serialization or timeout bottlenecks.
  ```
- **Baseline:** see `ai-service/scripts/benchmark_chat.py`.

### 4. Webhook HMAC verification
- **Files:** `src/lib/webhook-verify.ts`, `ai-service/app/lib/webhook_verify.py`
- **Why:** Runs on every inbound webhook; must be constant-time and avoid unnecessary buffer copies.
- **Command for @Profiler:**
  ```text
  @Profiler compare the TypeScript and Python HMAC verification implementations for constant-time safety and memory allocations.
  ```

## Benchmarks

Run the baseline scripts before each optimization pass:

```bash
# TypeScript reward scoring
node scripts/benchmark-reward-score.mjs

# Marketing compliance assertions
node scripts/marketing-assertions.mjs

# Python AI chat (requires MOONSHOT_API_KEY)
cd ai-service && source .venv/bin/activate && python scripts/benchmark_chat.py
```

## Current baselines
- Reward scoring: **0.070 µs** per payload (`scripts/benchmark-reward-score.mjs`, 1M iterations).
- Marketing assertions: **58 ms** total (`scripts/marketing-assertions.mjs`).
- AI chat serialization: **2.588 µs** per request (`ai-service/scripts/benchmark_chat.py`, 10k iterations).
- Next.js production build: measure with `pnpm build`.

## Target metrics
- Reward scoring: < 1 µs per payload.
- Marketing assertions: < 5 s total.
- Next.js production build: < 120 s.
- AI chat p95 latency: < 5 s including network.
