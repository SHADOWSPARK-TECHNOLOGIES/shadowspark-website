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
    grantConsent: vi.fn(),
    ingestProviderEvent: vi.fn(),
    applyDeliveryState: vi.fn(),
    send: vi.fn(),
    claimOutboundSend: vi.fn(),
    recordOutboundAttempt: vi.fn(),
  };
  const prisma = {
    message: { findFirst: vi.fn() },
    providerEvent: { findUnique: vi.fn() },
    lead: { upsert: vi.fn() },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mocks.sendText.mockResolvedValue({ success: true, messageId: "wamid.out" });
    messaging.receive.mockResolvedValue({ message: { id: "in-1" }, created: true });
    messaging.grantConsent.mockResolvedValue({});
    messaging.ingestProviderEvent.mockResolvedValue({});
    messaging.applyDeliveryState.mockResolvedValue({ id: "out-1", state: "DELIVERED" });
    messaging.send.mockResolvedValue({ id: "out-1", state: "QUEUED" });
    messaging.claimOutboundSend.mockResolvedValue(true);
    messaging.recordOutboundAttempt.mockResolvedValue({});
    prisma.message.findFirst.mockResolvedValue({ id: "out-1" });
    prisma.providerEvent.findUnique.mockResolvedValue(null);
    prisma.lead.upsert.mockResolvedValue({ id: "lead-1" });
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
    messaging.receive.mockResolvedValue({ message: { id: "in-1" }, created: false });
    await processMetaWhatsAppWebhook(payload, messaging as never, prisma as never);

    expect(messaging.receive).toHaveBeenCalledTimes(2);
    expect(messaging.receive).toHaveBeenCalledWith(
      expect.objectContaining({
        channel: "WHATSAPP",
        address: "+2348012345678",
        providerEventId: "wamid.in",
        providerMessageId: "wamid.in",
        leadId: "lead-1",
      }),
    );
    expect(prisma.lead.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { phoneNumber: "+2348012345678" },
        create: expect.objectContaining({
          phoneNumber: "+2348012345678",
          status: "NEW",
          intent: "whatsapp",
          lastMessage: "hi",
        }),
        update: { lastMessage: "hi" },
      }),
    );
    expect(messaging.grantConsent).toHaveBeenCalledTimes(1);
    expect(messaging.grantConsent).toHaveBeenCalledWith(
      expect.objectContaining({
        channel: "WHATSAPP",
        address: "+2348012345678",
        source: "whatsapp-inbound",
        purpose: "customer-care-reply",
      }),
    );
  });

  it("returns new inbound only on first persist so replies are not replayed", async () => {
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

    const first = await processMetaWhatsAppWebhook(
      payload,
      messaging as never,
      prisma as never,
    );
    expect(first.newInbound).toEqual([
      { id: "wamid.in", from: "2348012345678", text: "hi", leadId: "lead-1" },
    ]);

    messaging.receive.mockResolvedValue({ message: { id: "in-1" }, created: false });
    const replay = await processMetaWhatsAppWebhook(
      payload,
      messaging as never,
      prisma as never,
    );
    expect(replay.inbound).toBe(1);
    expect(replay.newInbound).toEqual([]);
  });

  it("maps delivery and read statuses onto the persisted outbound message", async () => {
    const statusOnly = await processMetaWhatsAppWebhook(
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
    expect(statusOnly.newInbound).toEqual([]);
    expect(statusOnly.statuses).toBe(1);
    expect(messaging.receive).not.toHaveBeenCalled();
    expect(messaging.send).not.toHaveBeenCalled();

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
    expect(messaging.claimOutboundSend).not.toHaveBeenCalled();
    expect(messaging.recordOutboundAttempt).not.toHaveBeenCalled();
    expect(result.result).toEqual({ success: true, messageId: "wamid.out" });
  });

  it("stores an invalid sender and does not treat it as a new reply", async () => {
    const result = await processMetaWhatsAppWebhook(
      {
        entry: [
          {
            changes: [
              {
                value: {
                  messages: [
                    {
                      id: "wamid.bad",
                      from: "not-a-phone",
                      type: "text",
                      text: { body: "hi" },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
      messaging as never,
      prisma as never,
    );

    expect(result.inbound).toBe(0);
    expect(result.newInbound).toEqual([]);
    expect(messaging.receive).not.toHaveBeenCalled();
    expect(messaging.ingestProviderEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        provider: "META",
        providerEventId: "wamid.bad",
        kind: "inbound-skipped",
      }),
    );
  });

  it("sends once when two replies claim the same queued message", async () => {
    messaging.send.mockResolvedValue({ id: "out-1", state: "QUEUED" });
    messaging.claimOutboundSend.mockResolvedValueOnce(true).mockResolvedValueOnce(false);

    await Promise.all([
      sendWhatsAppViaMeta(messaging as never, {
        address: "+2348012345678",
        body: "menu",
        idempotencyKey: "wa-reply:wamid.in",
      }),
      sendWhatsAppViaMeta(messaging as never, {
        address: "+2348012345678",
        body: "menu",
        idempotencyKey: "wa-reply:wamid.in",
      }),
    ]);

    expect(mocks.sendText).toHaveBeenCalledTimes(1);
    expect(messaging.recordOutboundAttempt).toHaveBeenCalledTimes(1);
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

  it("forwards the persisted lead id on the mocked outbound reply", async () => {
    await sendWhatsAppViaMeta(messaging as never, {
      address: "+2348012345678",
      body: "menu reply",
      idempotencyKey: "wa-reply:wamid.in",
      leadId: "lead-1",
    });
    expect(messaging.send).toHaveBeenCalledWith(
      expect.objectContaining({
        channel: "WHATSAPP",
        provider: "META",
        leadId: "lead-1",
        body: "menu reply",
        idempotencyKey: "wa-reply:wamid.in",
      }),
    );
    expect(mocks.sendText).toHaveBeenCalledWith("+2348012345678", "menu reply");
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
