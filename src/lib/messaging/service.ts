import { Prisma, type PrismaClient } from "@/generated/prisma/client";

import {
  assertRoute,
  type MessagingChannel,
  type MessagingProvider,
} from "./routing";

export type MessageDirection = "OUTBOUND" | "INBOUND";
export type MessageState = "QUEUED" | "SENT" | "DELIVERED" | "READ" | "FAILED";
export type ConsentAction = "GRANT" | "REVOKE";
export type DeliveryAttemptStatus = "ACCEPTED" | "FAILED";

export class MessagingConsentError extends Error {
  readonly code = "MESSAGING_CONSENT" as const;

  constructor(message: string) {
    super(message);
    this.name = "MessagingConsentError";
  }
}

export class MessagingStateError extends Error {
  readonly code = "MESSAGING_STATE" as const;

  constructor(message: string) {
    super(message);
    this.name = "MessagingStateError";
  }
}

const ALLOWED_TRANSITIONS: Record<MessageState, readonly MessageState[]> = {
  QUEUED: ["SENT", "FAILED"],
  SENT: ["DELIVERED", "FAILED"],
  DELIVERED: ["READ", "FAILED"],
  READ: [],
  FAILED: [],
};

export type SendMessageInput = {
  channel: MessagingChannel;
  address: string;
  body?: string;
  templateName?: string;
  idempotencyKey: string;
  leadId?: string;
  provider?: MessagingProvider;
};

export type ReceiveMessageInput = {
  channel: MessagingChannel;
  address: string;
  body?: string;
  providerEventId: string;
  providerMessageId?: string;
  leadId?: string;
  provider?: MessagingProvider;
  payload?: Prisma.InputJsonValue;
};

export type ConsentInput = {
  channel: MessagingChannel;
  address: string;
  source: string;
  purpose?: string;
  leadId?: string;
};

type DbClient = PrismaClient | Prisma.TransactionClient;

export class MessagingService {
  constructor(private readonly db: PrismaClient) {}

  async hasConsent(channel: MessagingChannel, address: string): Promise<boolean> {
    return hasConsentOn(this.db, channel, address);
  }

  async grantConsent(input: ConsentInput) {
    return this.db.$transaction((tx) => recordConsentOn(tx, input, "GRANT"));
  }

  async revokeConsent(input: ConsentInput) {
    return this.db.$transaction((tx) => recordConsentOn(tx, input, "REVOKE"));
  }

  async send(input: SendMessageInput) {
    const { channel, provider } = assertRoute(input.channel, input.provider);
    const address = requireAddress(input.address);
    if (!input.idempotencyKey.trim()) {
      throw new MessagingStateError("Outbound send requires an idempotency key");
    }

    if (!(await this.hasConsent(channel, address))) {
      throw new MessagingConsentError(
        `Consent required for ${channel} before outbound send`,
      );
    }

    try {
      return await this.db.message.create({
        data: {
          channel,
          provider,
          direction: "OUTBOUND",
          state: "QUEUED",
          address,
          body: input.body,
          templateName: input.templateName,
          idempotencyKey: input.idempotencyKey,
          leadId: input.leadId,
        },
      });
    } catch (error) {
      if (isUniqueViolation(error)) {
        const existing = await this.db.message.findUnique({
          where: { idempotencyKey: input.idempotencyKey },
        });
        if (existing) return existing;
      }
      throw error;
    }
  }

  async receive(input: ReceiveMessageInput) {
    const { channel, provider } = assertRoute(input.channel, input.provider);
    const address = requireAddress(input.address);
    const providerMessageId = input.providerMessageId ?? input.providerEventId;

    const existingEvent = await this.db.providerEvent.findUnique({
      where: {
        provider_providerEventId: {
          provider,
          providerEventId: input.providerEventId,
        },
      },
    });
    if (existingEvent?.messageId) {
      return this.db.message.findUniqueOrThrow({
        where: { id: existingEvent.messageId },
      });
    }

    try {
      return await this.db.$transaction(async (tx) => {
        const event = existingEvent
          ? existingEvent
          : await tx.providerEvent.create({
              data: {
                provider,
                providerEventId: input.providerEventId,
                kind: "inbound",
                payload: input.payload ?? {},
              },
            });

        if (event.messageId) {
          return tx.message.findUniqueOrThrow({ where: { id: event.messageId } });
        }

        const message = await tx.message.create({
          data: {
            channel,
            provider,
            direction: "INBOUND",
            state: "DELIVERED",
            address,
            body: input.body,
            leadId: input.leadId,
            providerMessageId,
          },
        });

        await tx.providerEvent.update({
          where: { id: event.id },
          data: { messageId: message.id, processedAt: new Date() },
        });

        return message;
      });
    } catch (error) {
      if (isUniqueViolation(error)) {
        const replayed = await this.db.providerEvent.findUnique({
          where: {
            provider_providerEventId: {
              provider,
              providerEventId: input.providerEventId,
            },
          },
        });
        if (replayed?.messageId) {
          return this.db.message.findUniqueOrThrow({
            where: { id: replayed.messageId },
          });
        }
      }
      throw error;
    }
  }

  async getDeliveryStatus(messageId: string) {
    const message = await this.db.message.findUnique({
      where: { id: messageId },
      include: { attempts: { orderBy: { attemptNumber: "asc" } } },
    });
    if (!message) return null;
    return {
      id: message.id,
      state: message.state as MessageState,
      provider: message.provider as MessagingProvider,
      providerMessageId: message.providerMessageId,
      error: message.error,
      attempts: message.attempts,
    };
  }

  async recordOutboundAttempt(input: {
    messageId: string;
    status: DeliveryAttemptStatus;
    providerMessageId?: string;
    error?: string;
  }) {
    return this.db.$transaction(async (tx) => {
      const message = await tx.message.findUnique({
        where: { id: input.messageId },
      });
      if (!message) {
        throw new MessagingStateError(`Unknown message ${input.messageId}`);
      }
      if (message.direction !== "OUTBOUND") {
        throw new MessagingStateError("Delivery attempts apply only to outbound messages");
      }

      const aggregate = await tx.outboundDeliveryAttempt.aggregate({
        where: { messageId: message.id },
        _max: { attemptNumber: true },
      });
      const attemptNumber = (aggregate._max.attemptNumber ?? 0) + 1;

      const attempt = await tx.outboundDeliveryAttempt.create({
        data: {
          messageId: message.id,
          provider: message.provider,
          attemptNumber,
          providerMessageId: input.providerMessageId,
          status: input.status,
          error: input.error,
        },
      });

      const nextState: MessageState = input.status === "ACCEPTED" ? "SENT" : "FAILED";
      const updated = await transitionOn(
        tx,
        message.id,
        message.state as MessageState,
        nextState,
        {
          providerMessageId: input.providerMessageId ?? message.providerMessageId,
          error: input.status === "FAILED" ? input.error ?? null : null,
        },
      );

      return { attempt, message: updated };
    });
  }

  async applyDeliveryState(
    messageId: string,
    nextState: MessageState,
    extras?: { providerMessageId?: string; error?: string },
  ) {
    const message = await this.db.message.findUnique({ where: { id: messageId } });
    if (!message) {
      throw new MessagingStateError(`Unknown message ${messageId}`);
    }
    return transitionOn(this.db, message.id, message.state as MessageState, nextState, extras);
  }

  async ingestProviderEvent(input: {
    provider: MessagingProvider;
    providerEventId: string;
    kind: string;
    payload: Prisma.InputJsonValue;
    messageId?: string;
  }) {
    return ingestProviderEventOn(this.db, input);
  }
}

async function hasConsentOn(
  db: DbClient,
  channel: MessagingChannel,
  address: string,
): Promise<boolean> {
  const row = await db.channelConsent.findUnique({
    where: { channel_address: { channel, address } },
    select: { granted: true },
  });
  return row?.granted === true;
}

async function recordConsentOn(
  db: DbClient,
  input: ConsentInput,
  action: ConsentAction,
) {
  const { channel } = assertRoute(input.channel);
  const address = requireAddress(input.address);
  const granted = action === "GRANT";

  const event = await db.consentEvent.create({
    data: {
      channel,
      address,
      action,
      source: input.source,
      purpose: input.purpose,
    },
  });

  const consent = await db.channelConsent.upsert({
    where: { channel_address: { channel, address } },
    create: {
      channel,
      address,
      leadId: input.leadId,
      granted,
      purpose: input.purpose,
    },
    update: {
      granted,
      purpose: input.purpose,
      leadId: input.leadId,
      updatedAt: new Date(),
    },
  });

  return { event, consent };
}

async function ingestProviderEventOn(
  db: PrismaClient,
  input: {
    provider: MessagingProvider;
    providerEventId: string;
    kind: string;
    payload: Prisma.InputJsonValue;
    messageId?: string;
  },
) {
  const existing = await db.providerEvent.findUnique({
    where: {
      provider_providerEventId: {
        provider: input.provider,
        providerEventId: input.providerEventId,
      },
    },
  });
  if (existing) return { event: existing, existing };

  try {
    const event = await db.providerEvent.create({
      data: {
        provider: input.provider,
        providerEventId: input.providerEventId,
        kind: input.kind,
        payload: input.payload,
        messageId: input.messageId,
      },
    });
    return { event, existing: null as typeof event | null };
  } catch (error) {
    if (isUniqueViolation(error)) {
      const raced = await db.providerEvent.findUnique({
        where: {
          provider_providerEventId: {
            provider: input.provider,
            providerEventId: input.providerEventId,
          },
        },
      });
      if (raced) return { event: raced, existing: raced };
    }
    throw error;
  }
}

async function transitionOn(
  db: DbClient,
  messageId: string,
  current: MessageState,
  next: MessageState,
  extras?: { providerMessageId?: string | null; error?: string | null },
) {
  if (current === next) {
    return db.message.findUniqueOrThrow({ where: { id: messageId } });
  }
  if (!ALLOWED_TRANSITIONS[current].includes(next)) {
    throw new MessagingStateError(`Invalid delivery transition ${current} -> ${next}`);
  }

  return db.message.update({
    where: { id: messageId },
    data: {
      state: next,
      providerMessageId: extras?.providerMessageId ?? undefined,
      error: extras?.error === undefined ? undefined : extras.error,
    },
  });
}

function requireAddress(address: string): string {
  const normalized = address.trim();
  if (!/^\+[1-9]\d{7,14}$/.test(normalized)) {
    throw new MessagingStateError("Messaging address must be E.164");
  }
  return normalized;
}

function isUniqueViolation(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}
