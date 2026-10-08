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
    delete process.env.XAI_API_KEY;
    generateTextMock.mockReset();
    googleModelMock.mockClear();
    createGoogleMock.mockClear();
  });

  afterEach(() => {
    delete process.env.ANTHROPIC_API_KEY;
    delete process.env.GEMINI_API_KEY;
    delete process.env.XAI_API_KEY;
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
    expect(googleModelMock).toHaveBeenCalledWith("gemini-flash-latest");
    expect(generateTextMock).toHaveBeenCalledTimes(1);
    const geminiCall = generateTextMock.mock.calls[0]?.[0] as {
      system: string;
      prompt: string;
      maxOutputTokens: number;
      abortSignal: AbortSignal;
      providerOptions: { google: { thinkingConfig: { thinkingLevel: string; thinkingBudget?: number } } };
    };
    expect(geminiCall).toEqual(
      expect.objectContaining({
        system: WHATSAPP_MODEL_INSTRUCTIONS,
        prompt: "What can you build for a lender?",
        maxOutputTokens: 1024,
      }),
    );
    expect(geminiCall.abortSignal).toBeInstanceOf(AbortSignal);
    expect(geminiCall.providerOptions).toEqual({
      google: { thinkingConfig: { thinkingLevel: "low" } },
    });
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
    const customerText = "Need a workflow for collections follow-up";
    const apiError = new Error(`synthetic-key models/gemini-2.5-flash is no longer available ${customerText}`);
    apiError.name = "AI_APICallError";
    generateTextMock.mockRejectedValueOnce(apiError);

    const failed = await getWhatsAppReply(customerText);
    expect(failed.usedFallback).toBe(true);
    expect(failed.text).toBe(WHATSAPP_FALLBACK_REPLY);
    expect(errorSpy).toHaveBeenCalledWith("[whatsapp] Gemini reply failed", {
      name: "AI_APICallError",
    });
    const logged = JSON.stringify(errorSpy.mock.calls);
    expect(logged).not.toContain("synthetic-key");
    expect(logged).not.toContain(customerText);
    expect(logged).not.toContain("gemini-2.5-flash");

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

  it("logs Gemini status, code, and reason without the key or the user message", async () => {
    process.env.GEMINI_API_KEY = "synthetic-key";
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const customerText = "Need a workflow for collections follow-up";
    const apiError = Object.assign(new Error(`retry exhausted synthetic-key ${customerText}`), {
      name: "AI_RetryError",
      reason: "maxRetriesExceeded",
      lastError: {
        name: "AI_APICallError",
        statusCode: 503,
        message: `models/gemini-flash-latest ${customerText} synthetic-key`,
        requestBodyValues: { prompt: customerText },
        responseBody: JSON.stringify({
          error: {
            code: 503,
            message: `${customerText} synthetic-key`,
            status: "UNAVAILABLE",
            details: [
              {
                reason: "MODEL_OVERLOADED",
                metadata: { prompt: customerText },
              },
            ],
          },
        }),
      },
    });
    generateTextMock.mockRejectedValueOnce(apiError);

    const failed = await getWhatsAppReply(customerText);

    expect(failed.usedFallback).toBe(true);
    expect(failed.text).toBe(WHATSAPP_FALLBACK_REPLY);
    expect(errorSpy).toHaveBeenCalledWith("[whatsapp] Gemini reply failed", {
      name: "AI_RetryError",
      httpStatus: 503,
      status: "UNAVAILABLE",
      code: 503,
      reason: "MODEL_OVERLOADED",
      retry: "maxRetriesExceeded",
    });
    const logged = JSON.stringify(errorSpy.mock.calls);
    expect(logged).not.toContain("synthetic-key");
    expect(logged).not.toContain(customerText);
    expect(logged).not.toContain("gemini-flash-latest");
  });

  it("uses xAI when Gemini fails and XAI_API_KEY is set", async () => {
    process.env.GEMINI_API_KEY = "synthetic-key";
    process.env.XAI_API_KEY = "xai-synthetic-key";
    const customerText = "What can you build for a lender?";
    const apiError = Object.assign(new Error(`synthetic-key ${customerText}`), {
      name: "AI_APICallError",
      statusCode: 429,
      responseBody: JSON.stringify({
        error: { code: 429, message: customerText, status: "RESOURCE_EXHAUSTED" },
      }),
    });
    generateTextMock.mockRejectedValueOnce(apiError);
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                content:
                  " ShadowSpark builds loan-intake workflows for fintech teams. CAC registration is pending. ",
              },
            },
          ],
        }),
        { status: 200 },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    const result = await getWhatsAppReply(customerText);

    expect(result.usedFallback).toBe(false);
    expect(result.text).toBe(
      "ShadowSpark builds loan-intake workflows for fintech teams. CAC registration is pending.",
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.x.ai/v1/chat/completions");
    expect(init.method).toBe("POST");
    expect(init.headers).toMatchObject({ Authorization: "Bearer xai-synthetic-key" });
    const body = JSON.parse(String(init.body)) as {
      model: string;
      messages: Array<{ role: string; content: string }>;
    };
    expect(body.model).toBe("grok-4.20-0309-non-reasoning");
    expect(body.messages[1]).toEqual({ role: "user", content: customerText });
    expect(JSON.stringify(body)).not.toContain("synthetic-key");
    expect(JSON.stringify(body)).not.toContain("xai-synthetic-key");
  });

  it("keeps MENU, 1, 2, and 3 on the fixed menu when both model keys are set", async () => {
    process.env.GEMINI_API_KEY = "synthetic-key";
    process.env.XAI_API_KEY = "xai-synthetic-key";
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const menu = await getWhatsAppReply("MENU");
    const services = await getWhatsAppReply("1");
    const demo = await getWhatsAppReply("2");
    const human = await getWhatsAppReply("3");

    expect(generateTextMock).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(menu.usedFallback).toBe(true);
    expect(services.text).toContain("pilot workflows");
    expect(demo.text).toContain(PUBLIC_DEMO_URL);
    expect(human.handoff).toBe(true);
  });

  it("does not call xAI when Gemini returns a usable reply", async () => {
    process.env.GEMINI_API_KEY = "synthetic-key";
    process.env.XAI_API_KEY = "xai-synthetic-key";
    generateTextMock.mockResolvedValue({
      text: "ShadowSpark builds loan-intake workflows. CAC registration is pending.",
    });
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const result = await getWhatsAppReply("What can you build for a lender?");

    expect(result.usedFallback).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("falls back to the menu when xAI fails or violates reply policy", async () => {
    process.env.GEMINI_API_KEY = "synthetic-key";
    process.env.XAI_API_KEY = "xai-synthetic-key";
    const customerText = "How much does a pilot cost?";
    generateTextMock.mockRejectedValue(new Error(`synthetic-key ${customerText}`));
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(`upstream said ${customerText} xai-synthetic-key`, { status: 502 }),
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            choices: [{ message: { content: "The build is ₦500000. Send the account number." } }],
          }),
          { status: 200 },
        ),
      );
    vi.stubGlobal("fetch", fetchMock);

    const httpFailed = await getWhatsAppReply(customerText);
    const unsafe = await getWhatsAppReply(customerText);

    expect(httpFailed.usedFallback).toBe(true);
    expect(httpFailed.text).toBe(WHATSAPP_FALLBACK_REPLY);
    expect(unsafe.usedFallback).toBe(true);
    expect(unsafe.text).toBe(WHATSAPP_FALLBACK_REPLY);
    expect(errorSpy).toHaveBeenCalledWith("[whatsapp] xAI reply failed", { httpStatus: 502 });
    expect(errorSpy).toHaveBeenCalledWith("[whatsapp] xAI reply discarded");
    const logged = JSON.stringify(errorSpy.mock.calls);
    expect(logged).not.toContain("synthetic-key");
    expect(logged).not.toContain("xai-synthetic-key");
    expect(logged).not.toContain(customerText);
    expect(logged).not.toContain("upstream said");
  });

  it("uses xAI when Gemini is unset and XAI_API_KEY is present", async () => {
    process.env.XAI_API_KEY = "xai-synthetic-key";
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          choices: [{ message: { content: "ShadowSpark can scope a pilot on a call." } }],
        }),
        { status: 200 },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);

    const result = await getWhatsAppReply("Can you scope a pilot?");

    expect(generateTextMock).not.toHaveBeenCalled();
    expect(result.usedFallback).toBe(false);
    expect(result.text).toBe("ShadowSpark can scope a pilot on a call.");
  });
});
