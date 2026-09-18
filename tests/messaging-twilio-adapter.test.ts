import { beforeEach, describe, expect, it, vi } from "vitest";
import twilio from "twilio";

import { MessagingRoutingError } from "@/lib/messaging";
import {
  isSmsStopCommand,
  processTwilioSmsWebhook,
  processTwilioVoiceWebhook,
  rejectTwilioWhatsApp,
} from "@/lib/messaging/twilio-adapter";
import { verifyTwilioSignature } from "@/lib/messaging/twilio-signature";

const authToken = "test-twilio-auth-token";
const publicUrl = "https://shadowspark.example/api/webhooks/twilio/sms";

describe("Twilio signature validation", () => {
  it("accepts a signature from the official SDK over the configured URL and all params", () => {
    const params = {
      MessageSid: "SM111",
      From: "+2348012345678",
      To: "+18005551212",
      Body: "hello",
    };
    const signature = twilio.getExpectedTwilioSignature(authToken, publicUrl, params);
    expect(verifyTwilioSignature({ authToken, signature, publicUrl, params })).toBe(true);
  });

  it("rejects a missing or invalid signature", () => {
    const params = { MessageSid: "SM111", Body: "hello" };
    expect(
      verifyTwilioSignature({ authToken, signature: null, publicUrl, params }),
    ).toBe(false);
    expect(
      verifyTwilioSignature({
        authToken,
        signature: "aaaa",
        publicUrl,
        params,
      }),
    ).toBe(false);
  });

  it("rejects a signature computed for a different public URL", () => {
    const params = { MessageSid: "SM111", Body: "hello" };
    const signature = twilio.getExpectedTwilioSignature(
      authToken,
      "https://attacker.example/api/webhooks/twilio/sms",
      params,
    );
    expect(verifyTwilioSignature({ authToken, signature, publicUrl, params })).toBe(false);
  });
});

describe("Twilio SMS and Voice adapters", () => {
  const messaging = {
    receive: vi.fn(),
    ingestProviderEvent: vi.fn(),
    applyDeliveryState: vi.fn(),
    revokeConsent: vi.fn(),
    send: vi.fn(),
    recordOutboundAttempt: vi.fn(),
  };
  const prisma = {
    message: { findFirst: vi.fn() },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    messaging.receive.mockResolvedValue({ id: "in-1" });
    messaging.ingestProviderEvent.mockResolvedValue({});
    messaging.applyDeliveryState.mockResolvedValue({});
    messaging.revokeConsent.mockResolvedValue({});
    prisma.message.findFirst.mockResolvedValue({ id: "out-1" });
  });

  it("rejects WhatsApp routing and whatsapp: addresses", () => {
    expect(() => rejectTwilioWhatsApp("WHATSAPP", "+2348012345678")).toThrow(
      MessagingRoutingError,
    );
    expect(() => rejectTwilioWhatsApp("SMS", "whatsapp:+2348012345678")).toThrow(
      MessagingRoutingError,
    );
  });

  it("records SMS STOP-family input as an SMS opt-out", async () => {
    expect(isSmsStopCommand("stop")).toBe(true);
    expect(isSmsStopCommand("STOPALL")).toBe(true);
    expect(isSmsStopCommand("hello")).toBe(false);

    const result = await processTwilioSmsWebhook(
      {
        MessageSid: "SM-stop",
        From: "2348012345678",
        Body: "STOP",
      },
      messaging as never,
      prisma as never,
    );

    expect(result.optedOut).toBe(true);
    expect(messaging.revokeConsent).toHaveBeenCalledWith({
      channel: "SMS",
      address: "+2348012345678",
      source: "STOP",
    });
    expect(messaging.receive).toHaveBeenCalledWith(
      expect.objectContaining({
        channel: "SMS",
        providerEventId: "SM-stop",
      }),
    );
  });

  it("replays inbound SMS by MessageSid", async () => {
    const params = {
      MessageSid: "SM-replay",
      From: "+2348012345678",
      Body: "hi",
    };
    await processTwilioSmsWebhook(params, messaging as never, prisma as never);
    await processTwilioSmsWebhook(params, messaging as never, prisma as never);
    expect(messaging.receive).toHaveBeenCalledTimes(2);
    expect(messaging.receive).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ providerEventId: "SM-replay" }),
    );
  });

  it("applies SMS delivery and failure transitions by SID", async () => {
    await processTwilioSmsWebhook(
      { MessageSid: "SM-out", MessageStatus: "delivered", From: "+2348012345678" },
      messaging as never,
      prisma as never,
    );
    expect(messaging.applyDeliveryState).toHaveBeenCalledWith("out-1", "DELIVERED");

    await processTwilioSmsWebhook(
      { MessageSid: "SM-out", MessageStatus: "failed", From: "+2348012345678" },
      messaging as never,
      prisma as never,
    );
    expect(messaging.applyDeliveryState).toHaveBeenCalledWith("out-1", "FAILED");
  });

  it("keeps Voice consent path separate from SMS inbound", async () => {
    await processTwilioVoiceWebhook(
      { CallSid: "CA-in", From: "+2348012345678" },
      messaging as never,
      prisma as never,
    );
    expect(messaging.receive).toHaveBeenCalledWith(
      expect.objectContaining({ channel: "VOICE", providerEventId: "CA-in" }),
    );
    expect(messaging.revokeConsent).not.toHaveBeenCalled();
  });
});
