import { describe, expect, it } from "vitest";

import { miniAuditFallback } from "@/app/actions/generate-audit";

describe("miniAuditFallback", () => {
  it("does not present fixed copy as a personalized audit", () => {
    const result = miniAuditFallback();
    expect(result.usedFallback).toBe(true);
    expect(result.headline.toLowerCase()).toContain("example");
    expect(result.headline.toLowerCase()).toContain("unavailable");
    expect(result.headline).not.toMatch(/Precision Architecture for /);
  });
});
