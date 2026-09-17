import { describe, expect, it, vi } from "vitest";

import { requireEmbeddingProvider } from "@/lib/ai/embedding-preflight";

describe("requireEmbeddingProvider", () => {
  it("throws before callers delete vectors when the provider returns nothing", async () => {
    const embed = vi.fn().mockResolvedValue([]);
    await expect(requireEmbeddingProvider(embed)).rejects.toThrow(/preflight failed/);
    expect(embed).toHaveBeenCalledWith("availability-probe");
  });

  it("returns the probe vector when the provider is available", async () => {
    const embed = vi.fn().mockResolvedValue([0.1, 0.2]);
    await expect(requireEmbeddingProvider(embed)).resolves.toEqual([0.1, 0.2]);
  });
});
