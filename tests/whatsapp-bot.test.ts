import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getWhatsAppReply, WHATSAPP_FALLBACK_REPLY } from "@/lib/ai/whatsapp-bot";
import { DEMO_BOOKING_URL, LODGIST_URL, PUBLIC_SITE_URL } from "@/lib/whatsapp/assistant-menu";

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
    expect(services.usedFallback).toBe(false);
    expect(demo.text).toContain(DEMO_BOOKING_URL);
    expect(human.handoff).toBe(true);
    expect(human.text).toContain("does not promise a response time");
    expect(human.text).toContain(DEMO_BOOKING_URL);
    expect(lodgist.text).toContain(LODGIST_URL);
    expect(lodgist.text).toContain("separate");
  });

  it("uses a successful Gemini reply for free text and keeps the menu off the model", async () => {
    process.env.GEMINI_API_KEY = "synthetic-key";
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          candidates: [{ content: { parts: [{ text: "Pilots are scoped during discovery." }] } }],
        }),
        { status: 200 },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    const ai = await getWhatsAppReply("What can you build for a lender?");
    const menu = await getWhatsAppReply("1");

    expect(ai.usedFallback).toBe(false);
    expect(ai.handoff).toBe(false);
    expect(ai.text).toBe("Pilots are scoped during discovery.");
    expect(ai.text).not.toContain("synthetic-key");
    expect(menu.usedFallback).toBe(false);
    expect(menu.text).toContain("pilot workflows");
    expect(menu.text).not.toBe(ai.text);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("labels the menu AI-blocked when a configured model call fails", async () => {
    process.env.GEMINI_API_KEY = "synthetic-key";
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("no", { status: 401 })));
    const result = await getWhatsAppReply("What can you build for a lender?");
    expect(result.usedFallback).toBe(true);
    expect(result.text).toContain("AI replies are blocked");
    expect(result.text).not.toContain("synthetic-key");
  });
});
