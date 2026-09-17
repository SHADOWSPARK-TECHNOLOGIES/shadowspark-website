import type { MessagingDb } from "./service";

import { sendTextWhatsApp } from "@/lib/whatsapp/send-payment-link";

import { MessagingConsentError, MessagingStateError, type MessagingService, type MessageState } from "./service";

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
        messages?: MetaMessage[];
        statuses?: MetaStatus[];
      };
    }>;
  }>;
};

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

export async function processMetaWhatsAppWebhook(
  payload: MetaWebhookPayload,
  messaging: MessagingService,
  prisma: MessagingDb,
): Promise<{ inbound: number; statuses: number }> {
  let inbound = 0;
  let statuses = 0;

  for (const entry of payload.entry ?? []) {
    for (const change of entry.changes ?? []) {
      const value = change.value;
      if (!value) continue;

      for (const message of value.messages ?? []) {
        if (await persistInbound(message, messaging)) inbound += 1;
      }
      for (const status of value.statuses ?? []) {
        if (await persistStatus(status, messaging, prisma)) statuses += 1;
      }
    }
  }

  return { inbound, statuses };
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

  const result = await sendTextWhatsApp(input.address, input.body);
  await messaging.recordOutboundAttempt({
    messageId: message.id,
    status: result.success ? "ACCEPTED" : "FAILED",
    providerMessageId: result.messageId,
    error: result.error,
  });

  return { message, result };
}

async function persistInbound(message: MetaMessage, messaging: MessagingService): Promise<boolean> {
  if (!message.id) return false;
  const address = toWhatsAppAddress(message.from);
  if (!address) {
    console.warn("[whatsapp:meta] inbound skipped: invalid sender listing=%s", message.id);
    return false;
  }

  await messaging.receive({
    channel: "WHATSAPP",
    address,
    body: message.text?.body,
    providerEventId: message.id,
    providerMessageId: message.id,
    payload: { type: message.type ?? "unknown" },
  });
  return true;
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
  input: { from: string; inboundId: string; text: string; reply: string },
): Promise<boolean> {
  const address = toWhatsAppAddress(input.from);
  if (!address) return false;

  try {
    await sendWhatsAppViaMeta(messaging, {
      address,
      body: input.reply,
      idempotencyKey: `wa-reply:${input.inboundId}`,
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
