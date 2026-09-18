import { afterEach, describe, expect, it } from "vitest";

import { getWhatsAppReply, WHATSAPP_FALLBACK_REPLY } from "@/lib/ai/whatsapp-bot";

describe("getWhatsAppReply", () => {
  afterEach(() => {
    delete process.env.ANTHROPIC_API_KEY;
  });

  it("returns the deterministic receipt when Anthropic is not configured", async () => {
    delete process.env.ANTHROPIC_API_KEY;
    const result = await getWhatsAppReply("Can someone help with pricing?");
    expect(result.usedFallback).toBe(true);
    expect(result.text).toBe(WHATSAPP_FALLBACK_REPLY);
  });
});
