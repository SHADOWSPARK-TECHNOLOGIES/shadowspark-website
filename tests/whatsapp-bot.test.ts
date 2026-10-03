import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getWhatsAppReply, WHATSAPP_FALLBACK_REPLY } from "@/lib/ai/whatsapp-bot";
import {
  DEMO_BOOKING_URL,
  LODGIST_URL,
  PUBLIC_DEMO_URL,
  PUBLIC_SITE_URL,
} from "@/lib/whatsapp/assistant-menu";

describe("getWhatsAppReply", () => {
  beforeEach(() => {
    delete process.env.ANTHROPIC_API_KEY;
    delete process.env.GEMINI_API_KEY;
  });

  afterEach(() => {
    delete process.env.ANTHROPIC_API_KEY;
    delete process.env.GEMINI_API_KEY;
    vi.unstubAllGlobals();
  });

  it("returns the fixed AI-blocked menu when no model credential is set", async () => {
    const result = await getWhatsAppReply("Can someone help with pricing?");
    expect(result.usedFallback).toBe(true);
    expect(result.handoff).toBe(false);
    expect(result.text).toBe(WHATSAPP_FALLBACK_REPLY);
    expect(result.text).toContain("AI replies are blocked");
    expect(result.text).toContain(PUBLIC_SITE_URL);
    expect(result.text).toContain("not Meta-verified");
    expect(result.text).not.toMatch(/24 hours|₦|CAC-registered|account number/i);
  });

  it("answers services, demo, human, and Lodgist without calling a model", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    process.env.GEMINI_API_KEY = "present-but-must-not-be-called";

    const services = await getWhatsAppReply("1");
    const demo = await getWhatsAppReply("demo");
    const human = await getWhatsAppReply("human");
    const lodgist = await getWhatsAppReply("lodgist");

    expect(fetchMock).not.toHaveBeenCalled();
    expect(services.text).toContain("pilot workflows");
    expect(services.text).toContain("CAC registration is pending");
    expect(services.text).toContain("AI replies are blocked");
    expect(services.usedFallback).toBe(true);
    expect(demo.text).toContain(PUBLIC_DEMO_URL);
    expect(demo.text).toContain(DEMO_BOOKING_URL);
    expect(demo.text).toContain("utm_campaign=enterprise");
    expect(human.handoff).toBe(true);
    expect(human.text).toContain("does not promise a response time");
    expect(human.text).toContain(DEMO_BOOKING_URL);
    expect(lodgist.text).toContain(LODGIST_URL);
    expect(lodgist.text).toContain("separate");
  });

  it("keeps free text on the blocked menu even when a Gemini key is present", async () => {
    process.env.GEMINI_API_KEY = "synthetic-key";
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const ai = await getWhatsAppReply("What can you build for a lender?");
    const menu = await getWhatsAppReply("1");

    expect(fetchMock).not.toHaveBeenCalled();
    expect(ai.usedFallback).toBe(true);
    expect(ai.handoff).toBe(false);
    expect(ai.text).toContain("AI replies are blocked");
    expect(ai.text).toContain("I can't answer that in free text");
    expect(ai.text).not.toContain("synthetic-key");
    expect(ai.text).not.toMatch(/24 hours|₦|CAC-registered|account number/i);
    expect(menu.text).toContain("pilot workflows");
    expect(menu.text).not.toContain("I can't answer that in free text");
  });
});
