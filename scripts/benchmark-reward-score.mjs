import { computeImpactScore, resolveBadges } from "../src/data/rewards.ts";

const payload = {
  eventKey: "bench-1",
  type: "contribution.merged",
  source: "github",
  actor: { id: "u1", email: "a@b.com", name: "Bench" },
  impact: { severity: "high", usersAffected: 5000, production: true },
};

const iterations = 1_000_000;
const start = performance.now();
for (let i = 0; i < iterations; i++) {
  const score = computeImpactScore(payload);
  resolveBadges(score);
}
const elapsed = performance.now() - start;
console.log(`Iterations: ${iterations.toLocaleString()}`);
console.log(`Total: ${elapsed.toFixed(2)} ms`);
console.log(`Per iteration: ${(elapsed / iterations * 1000).toFixed(3)} µs`);
