import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { generateTextMock, googleModelMock, createGoogleMock } = vi.hoisted(() => {
  const googleModelMock = vi.fn((id: string) => ({ modelId: id }));
  const createGoogleMock = vi.fn(() => googleModelMock);
  return {
    generateTextMock: vi.fn(),
    googleModelMock,
    createGoogleMock,
  };
});

vi.mock("ai", () => ({ generateText: generateTextMock }));
vi.mock("@ai-sdk/google", () => ({
  createGoogleGenerativeAI: createGoogleMock,
}));

import { getWhatsAppReply, WHATSAPP_FALLBACK_REPLY } from "@/lib/ai/whatsapp-bot";
import {
  buildWhatsAppMenu,
  DEMO_BOOKING_URL,
  LODGIST_URL,
  PUBLIC_DEMO_URL,
  PUBLIC_SITE_URL,
  WHATSAPP_MODEL_INSTRUCTIONS,
} from "@/lib/whatsapp/assistant-menu";

describe("getWhatsAppReply", () => {
  beforeEach(() => {
    delete process.env.ANTHROPIC_API_KEY;
    delete process.env.GEMINI_API_KEY;
    generateTextMock.mockReset();
    googleModelMock.mockClear();
    createGoogleMock.mockClear();
  });

  afterEach(() => {
    delete process.env.ANTHROPIC_API_KEY;
    delete process.env.GEMINI_API_KEY;
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("returns the fixed AI-blocked menu when no model credential is set", async () => {
    const result = await getWhatsAppReply("Can someone help with pricing?");
    expect(generateTextMock).not.toHaveBeenCalled();
    expect(result.usedFallback).toBe(true);
    expect(result.handoff).toBe(false);
    expect(result.text).toBe(WHATSAPP_FALLBACK_REPLY);
    expect(result.text).toContain("AI replies are blocked");
    expect(result.text).toContain(PUBLIC_SITE_URL);
    expect(result.text).toContain("not Meta-verified");
    expect(result.text).not.toMatch(/24 hours|₦|CAC-registered|account number/i);
  });

  it("answers services, demo, human, and Lodgist without calling a model", async () => {
    process.env.GEMINI_API_KEY = "present-but-must-not-be-called";

    const services = await getWhatsAppReply("1");
    const demo = await getWhatsAppReply("demo");
    const human = await getWhatsAppReply("human");
    const lodgist = await getWhatsAppReply("lodgist");

    expect(generateTextMock).not.toHaveBeenCalled();
    expect(createGoogleMock).not.toHaveBeenCalled();
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

  it("keeps MENU, 1, 2, 3, and 4 on the fixed menu when Gemini is configured", async () => {
    process.env.GEMINI_API_KEY = "synthetic-key";

    const menu = await getWhatsAppReply("MENU");
    const services = await getWhatsAppReply("1");
    const demo = await getWhatsAppReply("2");
    const human = await getWhatsAppReply("3");
    const lodgist = await getWhatsAppReply("4");

    expect(generateTextMock).not.toHaveBeenCalled();
    expect(menu).toEqual({
      text: buildWhatsAppMenu("overview", { aiBlocked: true }),
      usedFallback: true,
      handoff: false,
    });
    expect(services.text).toBe(buildWhatsAppMenu("services", { aiBlocked: true }));
    expect(demo.text).toBe(buildWhatsAppMenu("demo", { aiBlocked: true }));
    expect(human).toEqual({
      text: buildWhatsAppMenu("human", { aiBlocked: true }),
      usedFallback: true,
      handoff: true,
    });
    expect(lodgist.text).toBe(buildWhatsAppMenu("lodgist", { aiBlocked: true }));
    expect(menu.text).not.toContain("synthetic-key");
  });

  it("answers free text with Gemini when GEMINI_API_KEY is set", async () => {
    process.env.GEMINI_API_KEY = "synthetic-key";
    generateTextMock.mockResolvedValue({
      text: " ShadowSpark builds loan-intake workflows for fintech teams. CAC registration is pending, and this chat is not Meta-verified. ",
    });

    const ai = await getWhatsAppReply("What can you build for a lender?");
    const menu = await getWhatsAppReply("1");

    expect(createGoogleMock).toHaveBeenCalledWith({ apiKey: "synthetic-key" });
    expect(googleModelMock).toHaveBeenCalledWith("gemini-2.5-flash");
    expect(generateTextMock).toHaveBeenCalledTimes(1);
    expect(generateTextMock).toHaveBeenCalledWith(
      expect.objectContaining({
        system: WHATSAPP_MODEL_INSTRUCTIONS,
        prompt: "What can you build for a lender?",
        maxOutputTokens: 256,
      }),
    );
    expect(ai.usedFallback).toBe(false);
    expect(ai.handoff).toBe(false);
    expect(ai.text).toBe(
      "ShadowSpark builds loan-intake workflows for fintech teams. CAC registration is pending, and this chat is not Meta-verified.",
    );
    expect(ai.text).not.toContain("AI replies are blocked");
    expect(ai.text).not.toContain("synthetic-key");
    expect(ai.text).not.toMatch(/24 hours|₦|CAC-registered|account number/i);
    expect(menu.text).toContain("pilot workflows");
    expect(menu.text).not.toContain("I can't answer that in free text");
  });

  it("falls back to the fixed menu when Gemini fails or returns an unusable reply", async () => {
    process.env.GEMINI_API_KEY = "synthetic-key";
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    generateTextMock.mockRejectedValueOnce(new Error("synthetic-key upstream failure"));

    const failed = await getWhatsAppReply("What can you build for a lender?");
    expect(failed.usedFallback).toBe(true);
    expect(failed.text).toBe(WHATSAPP_FALLBACK_REPLY);
    expect(errorSpy.mock.calls.flat().join(" ")).not.toContain("synthetic-key");

    generateTextMock.mockResolvedValueOnce({ text: "   " });
    const empty = await getWhatsAppReply("Tell me about the pilot.");
    expect(empty.text).toBe(WHATSAPP_FALLBACK_REPLY);

    generateTextMock.mockResolvedValueOnce({
      text: "The build is ₦500000 and we are CAC-registered. Send the account number.",
    });
    const unsafe = await getWhatsAppReply("How much does a pilot cost?");
    expect(unsafe.usedFallback).toBe(true);
    expect(unsafe.text).toBe(WHATSAPP_FALLBACK_REPLY);
    expect(unsafe.text).not.toMatch(/₦|CAC-registered|account number/i);
  });
});
