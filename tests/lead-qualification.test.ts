import { describe, expect, it, vi } from "vitest";

import {
  NEEDS_REVIEW_STATUS,
  QUALIFIED_STATUS,
  qualifyLead,
  statusFromIntentAnalysis,
} from "@/lib/leads/qualification";
import { analyzeLeadIntent } from "@/lib/scoring/intent-analysis";

describe("qualifyLead", () => {
  it("fails closed when the score is missing", () => {
    expect(qualifyLead({ leadScore: null, intent: "demo" })).toBe(false);
    expect(qualifyLead({ leadScore: undefined, intent: "demo" })).toBe(false);
  });

  it("does not treat a default-looking 50 as a missing score", () => {
    expect(qualifyLead({ leadScore: 50, intent: "demo" })).toBe(true);
  });

  it("rejects junk and unknown intent even with a high score", () => {
    expect(qualifyLead({ leadScore: 90, intent: "junk" })).toBe(false);
    expect(qualifyLead({ leadScore: 90, intent: "unknown" })).toBe(false);
  });
});

describe("statusFromIntentAnalysis", () => {
  it("does not write QUALIFIED when scoring failed", () => {
    expect(statusFromIntentAnalysis({ ok: false, reasoning: "provider down" }, "demo")).toEqual({
      status: NEEDS_REVIEW_STATUS,
      leadScore: null,
    });
  });

  it("qualifies only a successful score that meets the threshold", () => {
    expect(
      statusFromIntentAnalysis({ ok: true, score: 72, reasoning: "high intent" }, "demo"),
    ).toEqual({
      status: QUALIFIED_STATUS,
      leadScore: 72,
    });
    expect(
      statusFromIntentAnalysis({ ok: true, score: 20, reasoning: "low intent" }, "demo"),
    ).toEqual({
      status: NEEDS_REVIEW_STATUS,
      leadScore: 20,
    });
  });
});

describe("analyzeLeadIntent", () => {
  it("fails closed when the provider is unavailable", async () => {
    const fetchImpl = vi.fn().mockRejectedValue(new Error("ECONNREFUSED"));
    const result = await analyzeLeadIntent("We need a WhatsApp onboarding flow", fetchImpl);
    expect(result).toEqual({
      ok: false,
      reasoning: "Scoring failed: ECONNREFUSED",
    });
  });

  it("fails closed when the model returns no numeric score", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ textResponse: "unable to score this lead" }),
    });
    const result = await analyzeLeadIntent("hello", fetchImpl as unknown as typeof fetch);
    expect(result.ok).toBe(false);
  });

  it("parses a successful numeric score", async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ textResponse: "High intent enterprise buyer. 88" }),
    });
    const result = await analyzeLeadIntent("Need onboarding this week", fetchImpl as unknown as typeof fetch);
    expect(result).toEqual({
      ok: true,
      score: 88,
      reasoning: "High intent enterprise buyer. 88",
    });
  });
});
