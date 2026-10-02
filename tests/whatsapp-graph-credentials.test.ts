import { readFileSync } from "node:fs";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { requireWhatsAppGraphCredentials, sendTextWhatsApp, WHATSAPP_TEXT_GRAPH_VERSION } from "@/lib/whatsapp/send-payment-link";

const TOKEN_KEYS = [
  "WHATSAPP_API_TOKEN",
  "META_ACCESS_TOKEN",
  "WHATSAPP_PHONE_NUMBER_ID",
  "META_PHONE_NUMBER_ID",
  "WHATSAPP_ENABLED",
] as const;

const saved: Partial<Record<(typeof TOKEN_KEYS)[number], string | undefined>> = {};

function snapshotEnv() {
  for (const key of TOKEN_KEYS) {
    saved[key] = process.env[key];
    delete process.env[key];
  }
}

function restoreEnv() {
  for (const key of TOKEN_KEYS) {
    const value = saved[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
}

describe("WhatsApp Graph credential resolution", () => {
  beforeEach(() => {
    snapshotEnv();
  });

  afterEach(() => {
    restoreEnv();
  });

  it("prefers WhatsApp-named secrets over Meta aliases", () => {
    process.env.WHATSAPP_API_TOKEN = " wa-token ";
    process.env.META_ACCESS_TOKEN = "meta-token";
    process.env.WHATSAPP_PHONE_NUMBER_ID = " wa-phone ";
    process.env.META_PHONE_NUMBER_ID = "meta-phone";

    expect(requireWhatsAppGraphCredentials()).toEqual({
      token: "wa-token",
      phoneNumberId: "wa-phone",
    });
  });

  it("falls back to Meta-named aliases when WhatsApp names are absent", () => {
    process.env.META_ACCESS_TOKEN = "meta-token";
    process.env.META_PHONE_NUMBER_ID = "meta-phone";

    expect(requireWhatsAppGraphCredentials()).toEqual({
      token: "meta-token",
      phoneNumberId: "meta-phone",
    });
  });

  it("sends session text on the documented Cloud API version", () => {
    expect(WHATSAPP_TEXT_GRAPH_VERSION).toBe("v25.0");
  });

  it("fails closed when no Graph token is present", () => {
    process.env.WHATSAPP_PHONE_NUMBER_ID = "wa-phone";
    expect(() => requireWhatsAppGraphCredentials()).toThrow(
      /WHATSAPP_API_TOKEN or META_ACCESS_TOKEN/,
    );
  });

  it("posts the session reply to Cloud API with a mocked fetch", async () => {
    process.env.WHATSAPP_API_TOKEN = "synthetic-token";
    process.env.WHATSAPP_PHONE_NUMBER_ID = "1001";
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ messages: [{ id: "wamid.out" }] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const result = await sendTextWhatsApp("+2348012345678", "menu reply");

    expect(result).toEqual({ success: true, messageId: "wamid.out" });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://graph.facebook.com/v25.0/1001/messages");
    expect((init.headers as Record<string, string>).Authorization).toBe("Bearer synthetic-token");
    expect(JSON.parse(String(init.body))).toMatchObject({
      messaging_product: "whatsapp",
      to: "+2348012345678",
      type: "text",
      text: { body: "menu reply" },
    });
    vi.unstubAllGlobals();
  });

});

describe("dashboard messaging webhook placeholders", () => {
  it("does not advertise a Twilio WhatsApp webhook path", () => {
    const source = readFileSync(
      join(process.cwd(), "src/app/dashboard/settings/page.tsx"),
      "utf8",
    );
    expect(source).not.toContain("/api/webhooks/whatsapp/twilio");
    expect(source).toContain("/api/webhooks/whatsapp/meta");
    expect(source).toContain("/api/webhooks/twilio/sms");
    expect(source).toContain("/api/webhooks/twilio/voice");
    expect(source).toContain("/api/webhooks/paystack");
    expect(source).not.toContain("/api/webhooks/paystack/route.ts");
  });
});
