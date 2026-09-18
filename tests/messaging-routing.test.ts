import { describe, expect, it } from "vitest";

import {
  CHANNEL_PROVIDER,
  MessagingRoutingError,
  assertRoute,
  providerFor,
} from "@/lib/messaging";

describe("Model A messaging routing", () => {
  it("routes WhatsApp to Meta only", () => {
    expect(providerFor("WHATSAPP")).toBe("META");
    expect(assertRoute("WHATSAPP")).toEqual({ channel: "WHATSAPP", provider: "META" });
    expect(CHANNEL_PROVIDER.WHATSAPP).toBe("META");
  });

  it("routes SMS and Voice to Twilio", () => {
    expect(assertRoute("SMS")).toEqual({ channel: "SMS", provider: "TWILIO" });
    expect(assertRoute("VOICE")).toEqual({ channel: "VOICE", provider: "TWILIO" });
  });

  it("rejects Twilio WhatsApp and every other pairing", () => {
    expect(() => assertRoute("WHATSAPP", "TWILIO")).toThrow(MessagingRoutingError);
    expect(() => assertRoute("SMS", "META")).toThrow(MessagingRoutingError);
    expect(() => assertRoute("VOICE", "META")).toThrow(MessagingRoutingError);
    expect(() => assertRoute("EMAIL")).toThrow(MessagingRoutingError);
  });
});
