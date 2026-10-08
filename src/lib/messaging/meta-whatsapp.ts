import type { MessagingDb } from "./service";

import { optionalEnv } from "@/lib/env";
import { sendTextWhatsApp } from "@/lib/whatsapp/send-payment-link";

import {
  MessagingConsentError,
  MessagingStateError,
  isOutboundAlreadyAccepted,
  type MessagingService,
  type MessageState,
} from "./service";

type MetaMessage = {
  id?: string;
  from?: string;
  type?: string;
  text?: { body?: string };
};

type MetaStatus = {
  id?: string;
  status?: string;
  recipient_id?: string;
};

export type MetaWebhookPayload = {
  entry?: Array<{
    changes?: Array<{
      value?: {
        metadata?: {
          phone_number_id?: string;
          display_phone_number?: string;
        };
        messages?: MetaMessage[];
        statuses?: MetaStatus[];
      };
    }>;
  }>;
};

/**
 * Phone number id this app sends from. WHATSAPP_PHONE_NUMBER_ID wins, then
 * META_PHONE_NUMBER_ID, matching requireWhatsAppGraphCredentials.
 */
export function configuredWhatsAppPhoneNumberId(): string | undefined {
  return optionalEnv("WHATSAPP_PHONE_NUMBER_ID") ?? optionalEnv("META_PHONE_NUMBER_ID");
}

function countWebhookChanges(payload: MetaWebhookPayload): number {
  return (payload.entry ?? []).reduce(
    (total, entry) => total + (entry.changes?.length ?? 0),
    0,
  );
}

function safePhoneNumberId(value: string | undefined): string {
  if (!value) return "(missing)";
  return /^[0-9]{1,32}$/.test(value) ? value : "(unrecognized)";
}

/**
 * Drops changes addressed to a different WhatsApp business number.
 * Signature checks and inbound dedupe stay with the caller and the persist path.
 * When neither phone-number env var is set, the payload is unchanged and a warning is logged.
 */
export function filterMetaWebhookForPhoneNumber(
  payload: MetaWebhookPayload,
  phoneNumberId: string | undefined,
): { payload: MetaWebhookPayload; ignoredChanges: number } {
  if (!phoneNumberId) {
    if (countWebhookChanges(payload) > 0) {
      console.warn(
        "[whatsapp:meta] WHATSAPP_PHONE_NUMBER_ID and META_PHONE_NUMBER_ID are unset; processing every webhook change",
      );
    }
    return { payload, ignoredChanges: 0 };
  }

  const ignoredIds = new Set<string>();
  let ignoredChanges = 0;
  const entry = (payload.entry ?? []).map((item) => ({
    ...item,
    changes: (item.changes ?? []).filter((change) => {
      const incoming = change.value?.metadata?.phone_number_id?.trim();
      if (incoming === phoneNumberId) return true;
      ignoredChanges += 1;
      ignoredIds.add(safePhoneNumberId(incoming));
      return false;
    }),
  }));

  if (ignoredChanges > 0) {
    console.warn(
      "[whatsapp:meta] ignored %d change(s) for other phone_number_id: %s",
      ignoredChanges,
      [...ignoredIds].join(","),
    );
  }

  return { payload: { ...payload, entry }, ignoredChanges };
}

const STATUS_MAP: Record<string, MessageState> = {
  sent: "SENT",
  delivered: "DELIVERED",
  read: "READ",
  failed: "FAILED",
  undelivered: "FAILED",
};

export function toWhatsAppAddress(phone: string | undefined): string | null {
  if (!phone) return null;
  const trimmed = phone.trim();
  const normalized = trimmed.startsWith("+") ? trimmed : `+${trimmed}`;
  return /^\+[1-9]\d{7,14}$/.test(normalized) ? normalized : null;
}

export type NewInboundWhatsApp = {
  id: string;
  from: string;
  text: string;
  leadId: string;
};

export async function processMetaWhatsAppWebhook(
  payload: MetaWebhookPayload,
  messaging: MessagingService,
  prisma: MessagingDb,
): Promise<{ inbound: number; statuses: number; newInbound: NewInboundWhatsApp[] }> {
  let inbound = 0;
  let statuses = 0;
  const newInbound: NewInboundWhatsApp[] = [];

  for (const entry of payload.entry ?? []) {
    for (const change of entry.changes ?? []) {
      const value = change.value;
      if (!value) continue;

      for (const message of value.messages ?? []) {
        const persisted = await persistInbound(message, messaging, prisma);
        if (!persisted) continue;
        inbound += 1;
        if (persisted.created && persisted.replyable) {
          newInbound.push({
            id: persisted.id,
            from: persisted.from,
            text: persisted.text,
            leadId: persisted.leadId,
          });
        }
      }
      for (const status of value.statuses ?? []) {
        if (await persistStatus(status, messaging, prisma)) statuses += 1;
      }
    }
  }

  return { inbound, statuses, newInbound };
}

export async function sendWhatsAppViaMeta(
  messaging: MessagingService,
  input: { address: string; body: string; idempotencyKey: string; leadId?: string },
) {
  const message = await messaging.send({
    channel: "WHATSAPP",
    address: input.address,
    body: input.body,
    idempotencyKey: input.idempotencyKey,
    leadId: input.leadId,
    provider: "META",
  });

  if (message.state === "SENDING" || isOutboundAlreadyAccepted(message.state)) {
    return {
      message,
      result: { success: true, messageId: message.providerMessageId ?? undefined },
    };
  }

  const claimed = await messaging.claimOutboundSend(message.id);
  if (!claimed) {
    return {
      message,
      result: { success: true, messageId: message.providerMessageId ?? undefined },
    };
  }

  const result = await sendTextWhatsApp(input.address, input.body);
  await messaging.recordOutboundAttempt({
    messageId: message.id,
    status: result.success ? "ACCEPTED" : "FAILED",
    providerMessageId: result.messageId,
    error: result.error,
  });

  return { message, result };
}

async function persistInbound(
  message: MetaMessage,
  messaging: MessagingService,
  prisma: MessagingDb,
): Promise<
  | {
      created: boolean;
      replyable: boolean;
      id: string;
      from: string;
      text: string;
      leadId: string;
    }
  | null
> {
  if (!message.id) return null;
  const address = toWhatsAppAddress(message.from);
  if (!address) {
    await messaging.ingestProviderEvent({
      provider: "META",
      providerEventId: message.id,
      kind: "inbound-skipped",
      payload: { type: message.type ?? "unknown", reason: "invalid-sender" },
    });
    console.warn("[whatsapp:meta] inbound skipped: invalid sender listing=%s", message.id);
    return null;
  }

  const text = message.text?.body ?? "";
  const leadId = await upsertWhatsAppLead(prisma, address, text);

  const receipt = await messaging.receive({
    channel: "WHATSAPP",
    address,
    body: message.text?.body,
    providerEventId: message.id,
    providerMessageId: message.id,
    leadId,
    payload: { type: message.type ?? "unknown" },
  });
  const created = receipt.created;

  if (created) {
    await messaging.grantConsent({
      channel: "WHATSAPP",
      address,
      source: "whatsapp-inbound",
      purpose: "customer-care-reply",
    });
  }

  return {
    created,
    replyable: (message.type ?? "text") === "text" && Boolean(text.trim()) && Boolean(message.from),
    id: message.id,
    from: message.from ?? "",
    text,
    leadId,
  };
}

async function upsertWhatsAppLead(
  prisma: MessagingDb,
  phoneNumber: string,
  text: string,
): Promise<string> {
  const lastMessage = text.trim().slice(0, 500);
  const lead = await prisma.lead.upsert({
    where: { phoneNumber },
    create: {
      phoneNumber,
      status: "NEW",
      intent: "whatsapp",
      lastMessage: lastMessage || null,
    },
    update: {
      lastMessage: lastMessage || null,
    },
    select: { id: true },
  });
  return lead.id;
}

async function persistStatus(
  status: MetaStatus,
  messaging: MessagingService,
  prisma: MessagingDb,
): Promise<boolean> {
  if (!status.id || !status.status) return false;

  await messaging.ingestProviderEvent({
    provider: "META",
    providerEventId: `status:${status.id}:${status.status}`,
    kind: "status",
    payload: { status: status.status },
  });

  const nextState = STATUS_MAP[status.status];
  if (!nextState) return true;

  const message = await prisma.message.findFirst({
    where: { provider: "META", providerMessageId: status.id },
  });
  if (!message) return true;

  try {
    await messaging.applyDeliveryState(message.id, nextState);
  } catch (error) {
    if (error instanceof MessagingStateError) {
      console.warn("[whatsapp:meta] ignored invalid status transition message=%s", message.id);
      return true;
    }
    throw error;
  }
  return true;
}

export async function maybeReplyToInbound(
  messaging: MessagingService,
  input: { from: string; inboundId: string; text: string; reply: string; leadId?: string },
): Promise<boolean> {
  const address = toWhatsAppAddress(input.from);
  if (!address) return false;

  try {
    await sendWhatsAppViaMeta(messaging, {
      address,
      body: input.reply,
      idempotencyKey: `wa-reply:${input.inboundId}`,
      leadId: input.leadId,
    });
    return true;
  } catch (error) {
    if (error instanceof MessagingConsentError) {
      console.warn("[whatsapp:meta] outbound reply skipped: no WhatsApp consent");
      return false;
    }
    throw error;
  }
}
