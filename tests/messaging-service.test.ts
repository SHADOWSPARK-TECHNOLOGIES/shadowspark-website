import { beforeEach, describe, expect, it, vi } from "vitest";

import { Prisma } from "@/generated/prisma/client";
import {
  MessagingConsentError,
  MessagingService,
  MessagingStateError,
} from "@/lib/messaging";

const mocks = vi.hoisted(() => ({
  messageCreate: vi.fn(),
  messageFindUnique: vi.fn(),
  messageFindUniqueOrThrow: vi.fn(),
  messageFindFirstOrThrow: vi.fn(),
  messageUpdate: vi.fn(),
  consentFindUnique: vi.fn(),
  consentUpsert: vi.fn(),
  consentEventCreate: vi.fn(),
  providerEventCreate: vi.fn(),
  providerEventFindUnique: vi.fn(),
  providerEventUpdate: vi.fn(),
  attemptCreate: vi.fn(),
  attemptAggregate: vi.fn(),
  transaction: vi.fn(),
}));

const db = {
  message: {
    create: mocks.messageCreate,
    findUnique: mocks.messageFindUnique,
    findUniqueOrThrow: mocks.messageFindUniqueOrThrow,
    findFirstOrThrow: mocks.messageFindFirstOrThrow,
    update: mocks.messageUpdate,
  },
  channelConsent: { findUnique: mocks.consentFindUnique, upsert: mocks.consentUpsert },
  consentEvent: { create: mocks.consentEventCreate },
  providerEvent: {
    create: mocks.providerEventCreate,
    findUnique: mocks.providerEventFindUnique,
    update: mocks.providerEventUpdate,
  },
  outboundDeliveryAttempt: {
    create: mocks.attemptCreate,
    aggregate: mocks.attemptAggregate,
  },
  $transaction: mocks.transaction,
};

const service = new MessagingService(db as never);

const address = "+2348012345678";

describe("MessagingService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.transaction.mockImplementation(async (callback: (tx: typeof db) => unknown) =>
      callback(db),
    );
  });

  it("refuses outbound send without channel consent", async () => {
    mocks.consentFindUnique.mockResolvedValue(null);

    await expect(
      service.send({
        channel: "WHATSAPP",
        address,
        idempotencyKey: "msg-1",
        body: "hello",
      }),
    ).rejects.toBeInstanceOf(MessagingConsentError);
    expect(mocks.messageCreate).not.toHaveBeenCalled();
  });

  it("persists an outbound message on the Meta WhatsApp route", async () => {
    mocks.consentFindUnique.mockResolvedValue({ granted: true });
    mocks.messageCreate.mockResolvedValue({
      id: "m1",
      channel: "WHATSAPP",
      provider: "META",
      idempotencyKey: "msg-1",
    });

    const message = await service.send({
      channel: "WHATSAPP",
      address,
      idempotencyKey: "msg-1",
      body: "hello",
    });

    expect(mocks.messageCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({
        channel: "WHATSAPP",
        provider: "META",
        direction: "OUTBOUND",
        state: "QUEUED",
        address,
        idempotencyKey: "msg-1",
      }),
    });
    expect(message.id).toBe("m1");
  });

  it("reuses one logical message when the idempotency key collides", async () => {
    mocks.consentFindUnique.mockResolvedValue({ granted: true });
    const existing = { id: "m1", idempotencyKey: "msg-1", channel: "SMS", provider: "TWILIO" };
    mocks.messageCreate.mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError("unique", {
        code: "P2002",
        clientVersion: "test",
      }),
    );
    mocks.messageFindUnique.mockResolvedValue(existing);

    await expect(
      service.send({
        channel: "SMS",
        address,
        idempotencyKey: "msg-1",
      }),
    ).resolves.toEqual(existing);
  });

  it("records a new attempt on the same message identity", async () => {
    mocks.messageFindUnique.mockResolvedValue({
      id: "m1",
      direction: "OUTBOUND",
      provider: "META",
      state: "QUEUED",
      providerMessageId: null,
    });
    mocks.attemptAggregate.mockResolvedValue({ _max: { attemptNumber: 1 } });
    mocks.attemptCreate.mockResolvedValue({ id: "a2", attemptNumber: 2 });
    mocks.messageUpdate.mockResolvedValue({ id: "m1", state: "SENT" });

    const result = await service.recordOutboundAttempt({
      messageId: "m1",
      status: "ACCEPTED",
      providerMessageId: "wamid.1",
    });

    expect(mocks.attemptCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({
        messageId: "m1",
        attemptNumber: 2,
        providerMessageId: "wamid.1",
        status: "ACCEPTED",
      }),
    });
    expect(result.message.state).toBe("SENT");
  });

  it("rejects an invalid delivery transition", async () => {
    mocks.messageFindUnique.mockResolvedValue({
      id: "m1",
      state: "FAILED",
    });

    await expect(service.applyDeliveryState("m1", "READ")).rejects.toBeInstanceOf(
      MessagingStateError,
    );
  });

  it("replays a provider event without inserting a second inbox row", async () => {
    const existing = { id: "e1", providerEventId: "evt-1", messageId: null };
    mocks.providerEventFindUnique.mockResolvedValue(existing);

    await expect(
      service.ingestProviderEvent({
        provider: "META",
        providerEventId: "evt-1",
        kind: "status",
        payload: { status: "delivered" },
      }),
    ).resolves.toEqual({ event: existing, existing });
    expect(mocks.providerEventCreate).not.toHaveBeenCalled();
  });
});
