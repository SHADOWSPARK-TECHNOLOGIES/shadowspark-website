import { beforeEach, describe, expect, it, vi } from "vitest";

import { MessagingConsentError } from "@/lib/messaging";
import {
  processMetaWhatsAppWebhook,
  sendWhatsAppViaMeta,
} from "@/lib/messaging/meta-whatsapp";

const mocks = vi.hoisted(() => ({
  sendText: vi.fn(),
}));

vi.mock("@/lib/whatsapp/send-payment-link", () => ({
  sendTextWhatsApp: mocks.sendText,
}));

describe("Meta WhatsApp adapter", () => {
  const messaging = {
    receive: vi.fn(),
    ingestProviderEvent: vi.fn(),
    applyDeliveryState: vi.fn(),
    send: vi.fn(),
    recordOutboundAttempt: vi.fn(),
  };
  const prisma = {
    message: { findFirst: vi.fn() },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mocks.sendText.mockResolvedValue({ success: true, messageId: "wamid.out" });
    messaging.receive.mockResolvedValue({ id: "in-1" });
    messaging.ingestProviderEvent.mockResolvedValue({});
    messaging.applyDeliveryState.mockResolvedValue({ id: "out-1", state: "DELIVERED" });
    messaging.send.mockResolvedValue({ id: "out-1" });
    messaging.recordOutboundAttempt.mockResolvedValue({});
    prisma.message.findFirst.mockResolvedValue({ id: "out-1" });
  });

  it("persists inbound messages idempotently by Meta message id", async () => {
    const payload = {
      entry: [
        {
          changes: [
            {
              value: {
                messages: [
                  {
                    id: "wamid.in",
                    from: "2348012345678",
                    type: "text",
                    text: { body: "hi" },
                  },
                ],
              },
            },
          ],
        },
      ],
    };

    await processMetaWhatsAppWebhook(payload, messaging as never, prisma as never);
    await processMetaWhatsAppWebhook(payload, messaging as never, prisma as never);

    expect(messaging.receive).toHaveBeenCalledTimes(2);
    expect(messaging.receive).toHaveBeenCalledWith(
      expect.objectContaining({
        channel: "WHATSAPP",
        address: "+2348012345678",
        providerEventId: "wamid.in",
        providerMessageId: "wamid.in",
      }),
    );
  });

  it("maps delivery and read statuses onto the persisted outbound message", async () => {
    await processMetaWhatsAppWebhook(
      {
        entry: [
          {
            changes: [
              {
                value: {
                  statuses: [{ id: "wamid.out", status: "delivered", recipient_id: "2348012345678" }],
                },
              },
            ],
          },
        ],
      },
      messaging as never,
      prisma as never,
    );

    expect(messaging.ingestProviderEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        provider: "META",
        providerEventId: "status:wamid.out:delivered",
        kind: "status",
      }),
    );
    expect(messaging.applyDeliveryState).toHaveBeenCalledWith("out-1", "DELIVERED");
  });

  it("does not re-send to Meta when the idempotent message is already accepted", async () => {
    messaging.send.mockResolvedValue({
      id: "out-1",
      state: "SENT",
      providerMessageId: "wamid.out",
    });

    const result = await sendWhatsAppViaMeta(messaging as never, {
      address: "+2348012345678",
      body: "hello",
      idempotencyKey: "wa-1",
    });

    expect(mocks.sendText).not.toHaveBeenCalled();
    expect(messaging.recordOutboundAttempt).not.toHaveBeenCalled();
    expect(result.result).toEqual({ success: true, messageId: "wamid.out" });
  });

  it("requires WhatsApp consent before an outbound Meta send", async () => {
    messaging.send.mockRejectedValue(new MessagingConsentError("Consent required"));

    await expect(
      sendWhatsAppViaMeta(messaging as never, {
        address: "+2348012345678",
        body: "hello",
        idempotencyKey: "wa-1",
      }),
    ).rejects.toBeInstanceOf(MessagingConsentError);
    expect(mocks.sendText).not.toHaveBeenCalled();
  });

  it("records a failed provider result without creating a second local message", async () => {
    mocks.sendText.mockResolvedValue({ success: false, error: "graph down" });

    await sendWhatsAppViaMeta(messaging as never, {
      address: "+2348012345678",
      body: "hello",
      idempotencyKey: "wa-1",
    });
    await sendWhatsAppViaMeta(messaging as never, {
      address: "+2348012345678",
      body: "hello",
      idempotencyKey: "wa-1",
    });

    expect(messaging.send).toHaveBeenCalledTimes(2);
    expect(messaging.send).toHaveBeenCalledWith(
      expect.objectContaining({
        channel: "WHATSAPP",
        provider: "META",
        idempotencyKey: "wa-1",
      }),
    );
    expect(messaging.recordOutboundAttempt).toHaveBeenCalledTimes(2);
    expect(messaging.recordOutboundAttempt).toHaveBeenCalledWith(
      expect.objectContaining({
        messageId: "out-1",
        status: "FAILED",
        error: "graph down",
      }),
    );
  });
});
