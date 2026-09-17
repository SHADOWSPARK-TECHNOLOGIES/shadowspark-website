import twilio from "twilio";

import { optionalEnv } from "@/lib/env";

import { MessagingRoutingError } from "./routing";
import {
  MessagingStateError,
  type MessageState,
  type MessagingDb,
  type MessagingService,
} from "./service";
import { toWhatsAppAddress } from "./meta-whatsapp";

const STOP_KEYWORDS = new Set(["STOP", "STOPALL", "UNSUBSCRIBE", "CANCEL", "END", "QUIT"]);

const SMS_STATUS_MAP: Record<string, MessageState> = {
  sent: "SENT",
  delivered: "DELIVERED",
  undelivered: "FAILED",
  failed: "FAILED",
};

const VOICE_STATUS_MAP: Record<string, MessageState> = {
  initiated: "SENT",
  ringing: "SENT",
  "in-progress": "SENT",
  completed: "DELIVERED",
  busy: "FAILED",
  "no-answer": "FAILED",
  failed: "FAILED",
  canceled: "FAILED",
};

export function isSmsStopCommand(body: string | undefined): boolean {
  if (!body) return false;
  return STOP_KEYWORDS.has(body.trim().toUpperCase());
}

export function rejectTwilioWhatsApp(channel: string, address: string): void {
  if (channel === "WHATSAPP" || address.toLowerCase().startsWith("whatsapp:")) {
    throw new MessagingRoutingError("Twilio must not send or receive WhatsApp messages");
  }
}

function twilioClient() {
  const accountSid = optionalEnv("TWILIO_ACCOUNT_SID");
  const authToken = optionalEnv("TWILIO_AUTH_TOKEN");
  if (!accountSid || !authToken) {
    throw new MessagingStateError("TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN are required");
  }
  return twilio(accountSid, authToken);
}

export async function sendSmsViaTwilio(
  messaging: MessagingService,
  input: { address: string; body: string; idempotencyKey: string; leadId?: string },
) {
  rejectTwilioWhatsApp("SMS", input.address);
  const from = optionalEnv("TWILIO_SMS_FROM");
  if (!from) throw new MessagingStateError("TWILIO_SMS_FROM is not configured");

  const message = await messaging.send({
    channel: "SMS",
    address: input.address,
    body: input.body,
    idempotencyKey: input.idempotencyKey,
    leadId: input.leadId,
    provider: "TWILIO",
  });

  try {
    const sent = await twilioClient().messages.create({
      to: input.address,
      from,
      body: input.body,
    });
    await messaging.recordOutboundAttempt({
      messageId: message.id,
      status: "ACCEPTED",
      providerMessageId: sent.sid,
    });
    return { message, sid: sent.sid };
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    await messaging.recordOutboundAttempt({
      messageId: message.id,
      status: "FAILED",
      error: detail,
    });
    throw error;
  }
}

export async function sendVoiceViaTwilio(
  messaging: MessagingService,
  input: { address: string; body: string; idempotencyKey: string; leadId?: string },
) {
  rejectTwilioWhatsApp("VOICE", input.address);
  const from = optionalEnv("TWILIO_VOICE_FROM");
  if (!from) throw new MessagingStateError("TWILIO_VOICE_FROM is not configured");

  const message = await messaging.send({
    channel: "VOICE",
    address: input.address,
    body: input.body,
    idempotencyKey: input.idempotencyKey,
    leadId: input.leadId,
    provider: "TWILIO",
  });

  try {
    const call = await twilioClient().calls.create({
      to: input.address,
      from,
      twiml: `<Response><Say>${escapeXml(input.body)}</Say></Response>`,
    });
    await messaging.recordOutboundAttempt({
      messageId: message.id,
      status: "ACCEPTED",
      providerMessageId: call.sid,
    });
    return { message, sid: call.sid };
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    await messaging.recordOutboundAttempt({
      messageId: message.id,
      status: "FAILED",
      error: detail,
    });
    throw error;
  }
}

export async function processTwilioSmsWebhook(
  params: Record<string, string>,
  messaging: MessagingService,
  prisma: MessagingDb,
) {
  const sid = params.MessageSid || params.SmsSid;
  const from = toWhatsAppAddress(params.From);
  if (!sid || !from) return { inbound: 0, statuses: 0, optedOut: false };

  rejectTwilioWhatsApp("SMS", params.From ?? from);

  if (params.MessageStatus || params.SmsStatus) {
    return applySidStatus({
      sid,
      status: params.MessageStatus || params.SmsStatus || "",
      map: SMS_STATUS_MAP,
      messaging,
      prisma,
    });
  }

  let optedOut = false;
  if (isSmsStopCommand(params.Body)) {
    await messaging.revokeConsent({
      channel: "SMS",
      address: from,
      source: "STOP",
    });
    optedOut = true;
  }

  await messaging.receive({
    channel: "SMS",
    address: from,
    body: params.Body,
    providerEventId: sid,
    providerMessageId: sid,
    payload: { from: params.From },
  });

  return { inbound: 1, statuses: 0, optedOut };
}

export async function processTwilioVoiceWebhook(
  params: Record<string, string>,
  messaging: MessagingService,
  prisma: MessagingDb,
) {
  const sid = params.CallSid;
  const from = toWhatsAppAddress(params.From);
  if (!sid || !from) return { inbound: 0, statuses: 0 };

  rejectTwilioWhatsApp("VOICE", params.From ?? from);

  if (params.CallStatus) {
    return {
      ...(await applySidStatus({
        sid,
        status: params.CallStatus,
        map: VOICE_STATUS_MAP,
        messaging,
        prisma,
      })),
      inbound: 0,
    };
  }

  await messaging.receive({
    channel: "VOICE",
    address: from,
    providerEventId: sid,
    providerMessageId: sid,
    payload: { from: params.From },
  });
  return { inbound: 1, statuses: 0 };
}

async function applySidStatus(input: {
  sid: string;
  status: string;
  map: Record<string, MessageState>;
  messaging: MessagingService;
  prisma: MessagingDb;
}) {
  await input.messaging.ingestProviderEvent({
    provider: "TWILIO",
    providerEventId: `status:${input.sid}:${input.status}`,
    kind: "status",
    payload: { status: input.status },
  });

  const nextState = input.map[input.status];
  const message = await input.prisma.message.findFirst({
    where: { provider: "TWILIO", providerMessageId: input.sid },
  });
  if (message && nextState) {
    try {
      await input.messaging.applyDeliveryState(message.id, nextState);
    } catch (error) {
      if (!(error instanceof MessagingStateError)) throw error;
    }
  }
  return { inbound: 0, statuses: 1, optedOut: false };
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}


