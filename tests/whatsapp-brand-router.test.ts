import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { generateTextMock } = vi.hoisted(() => ({ generateTextMock: vi.fn() }));
vi.mock("ai", () => ({ generateText: generateTextMock }));
vi.mock("@ai-sdk/google", () => ({ createGoogleGenerativeAI: vi.fn(() => vi.fn()) }));

import { getWhatsAppReply, violatesWhatsAppReplyPolicy } from "@/lib/ai/whatsapp-bot";
import {
  buildLodgistReply,
  CLARIFY_QUESTION,
  LODGIST_PAYMENTS_WA_LINK,
  routeWhatsAppMessage,
} from "@/lib/whatsapp/brand-router";
import { loadConversationBrand, readBrand, saveConversationBrand } from "@/lib/whatsapp/conversation-brand";

describe("routeWhatsAppMessage (deterministic)", () => {
  it.each([
    ["I need a 2 bedroom flat in Lekki", "search"],
    ["looking for self contain to rent", "search"],
    ["Is this listing legit? agent wants money", "listing_check"],
    ["I want to pay for the house", "payment"],
    ["I have transferred the caution fee", "payment"],
    ["lodgist", "menu"],
  ])("routes %j to Lodgist %s with no brand yet", (text, intent) => {
    const d = routeWhatsAppMessage(text, null);
    expect(d.kind).toBe("lodgist");
    expect(d.kind === "lodgist" && d.intent).toBe(intent);
  });

  it.each([
    "Can you build a website for my business?",
    "I want a demo of your loan automation",
    "Tell me about ShadowSpark",
    "we need payment-recovery automation",
  ])("routes %j to ShadowSpark", (text) => {
    expect(routeWhatsAppMessage(text, null).kind).toBe("shadowspark");
  });

  it("asks one clarifying question when unclear", () => {
    expect(routeWhatsAppMessage("good afternoon, quick question", null).kind).toBe("clarify");
    expect(CLARIFY_QUESTION.split("\n")).toHaveLength(1);
  });

  it("remembers Lodgist: menu numbers mean Lodgist options", () => {
    expect(routeWhatsAppMessage("1", "lodgist")).toMatchObject({ kind: "lodgist", intent: "search" });
    expect(routeWhatsAppMessage("2", "lodgist")).toMatchObject({ kind: "lodgist", intent: "listing_check" });
    expect(routeWhatsAppMessage("3", "lodgist")).toMatchObject({ kind: "lodgist", intent: "payment" });
    expect(routeWhatsAppMessage("menu", "lodgist")).toMatchObject({ kind: "lodgist", intent: "menu" });
    expect(routeWhatsAppMessage("what about tomorrow?", "lodgist").kind).toBe("lodgist_freetext");
  });

  it("remembers ShadowSpark and ignores bare payment words there", () => {
    expect(routeWhatsAppMessage("1", "shadowspark").kind).toBe("shadowspark");
    expect(routeWhatsAppMessage("how do I pay you?", "shadowspark").kind).toBe("shadowspark");
    expect(routeWhatsAppMessage("I need an apartment in Abuja", "shadowspark")).toMatchObject({
      kind: "lodgist",
      intent: "search",
      city: "Abuja",
    });
  });

  it("supports explicit switches", () => {
    expect(routeWhatsAppMessage("shadowspark", "lodgist").kind).toBe("shadowspark");
    expect(routeWhatsAppMessage("switch", "lodgist").kind).toBe("clarify");
    expect(routeWhatsAppMessage("4", "shadowspark").kind).toBe("lodgist");
  });
});

describe("Lodgist replies", () => {
  it("payment handoff never confirms payment or gives bank details", () => {
    const text = buildLodgistReply("payment");
    expect(text).toContain(LODGIST_PAYMENTS_WA_LINK);
    expect(text).toContain("Reference: WHATSAPP");
    expect(text).toMatch(/cannot take, check, or confirm payments/);
    expect(text).not.toMatch(/account number|sort code|iban|\bpaid\b|payment (received|confirmed)/i);
    expect(text).not.toContain("8038878918");
  });

  it("search links to lodgist.online with the city", () => {
    expect(buildLodgistReply("search", "Port Harcourt")).toContain(
      "https://lodgist.online/listings?search=Port%20Harcourt",
    );
  });

  it("model policy rejects payment confirmations", () => {
    expect(violatesWhatsAppReplyPolicy("Your payment has been confirmed.")).toBe(true);
    expect(violatesWhatsAppReplyPolicy("We have marked it as paid")).toBe(true);
    expect(violatesWhatsAppReplyPolicy("We have received your payment")).toBe(true);
  });
});

describe("getWhatsAppReply with a conversation context", () => {
  beforeEach(() => {
    delete process.env.GEMINI_API_KEY;
    delete process.env.XAI_API_KEY;
    generateTextMock.mockReset();
  });
  afterEach(() => {
    delete process.env.GEMINI_API_KEY;
  });

  it("payment never reaches a model even when a key is set", async () => {
    process.env.GEMINI_API_KEY = "present";
    const r = await getWhatsAppReply("I want to pay rent for the apartment", { brand: null });
    expect(generateTextMock).not.toHaveBeenCalled();
    expect(r).toMatchObject({ brand: "lodgist", route: "lodgist:payment", handoff: true });
  });

  it("works with AI down: Lodgist free text falls back to the Lodgist menu", async () => {
    process.env.GEMINI_API_KEY = "present";
    generateTextMock.mockRejectedValue(Object.assign(new Error("503"), { statusCode: 503 }));
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    const r = await getWhatsAppReply("what about tomorrow?", { brand: "lodgist" });
    expect(r).toMatchObject({ brand: "lodgist", route: "lodgist:menu_fallback", usedFallback: true });
    expect(r.text).toContain("https://lodgist.online");
  });

  it("unclear first message gets the clarifying question and keeps brand unset", async () => {
    const r = await getWhatsAppReply("good afternoon, quick question", { brand: null });
    expect(r).toMatchObject({ text: CLARIFY_QUESTION, brand: null, route: "clarify" });
  });

  it("greeting with no brand shows the overview listing both products", async () => {
    const r = await getWhatsAppReply("hi", { brand: null });
    expect(r.brand).toBeNull();
    expect(r.text).toContain("4 Lodgist");
  });
});

describe("conversation brand storage", () => {
  it("reads and writes metadata.whatsappBrand without clobbering other keys", async () => {
    const update = vi.fn();
    const db = {
      lead: {
        findUnique: vi.fn().mockResolvedValue({ metadata: { source: "x", whatsappBrand: "shadowspark" } }),
        update,
      },
    };
    expect(await loadConversationBrand(db, "lead1")).toBe("shadowspark");
    await saveConversationBrand(db, "lead1", "shadowspark", "lodgist");
    expect(update).toHaveBeenCalledWith({
      where: { id: "lead1" },
      data: { metadata: { source: "x", whatsappBrand: "lodgist" } },
    });
    update.mockClear();
    await saveConversationBrand(db, "lead1", "lodgist", "lodgist");
    expect(update).not.toHaveBeenCalled();
    expect(readBrand({ whatsappBrand: "evil" })).toBeNull();
  });

  it("never throws when storage fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    const db = { lead: { findUnique: vi.fn().mockRejectedValue(new Error("db")), update: vi.fn() } };
    await expect(loadConversationBrand(db, "l")).resolves.toBeNull();
    await expect(saveConversationBrand(db, "l", null, "lodgist")).resolves.toBeUndefined();
  });
});
