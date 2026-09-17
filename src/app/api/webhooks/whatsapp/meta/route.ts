import { NextResponse } from "next/server";

import { getBotReply } from "@/lib/ai/whatsapp-bot";
import {
  getMetaAppSecret,
  getWhatsAppVerifyToken,
  verifyMetaSignature,
} from "@/lib/messaging/meta-signature";
import {
  maybeReplyToInbound,
  processMetaWhatsAppWebhook,
  type MetaWebhookPayload,
} from "@/lib/messaging/meta-whatsapp";
import { MessagingService } from "@/lib/messaging";
import { prisma } from "@/lib/prisma";

function redactPhone(phone: string): string {
  if (phone.length <= 4) return "****";
  return "****" + phone.slice(-4);
}

function redactText(text: string): string {
  if (!text) return "";
  const preview = text.length > 3 ? text.slice(0, 3) : text;
  return `${preview}…[${text.length} chars]`;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");
  const verifyToken = getWhatsAppVerifyToken();

  if (!verifyToken) {
    console.warn("WhatsApp webhook verification failed: WHATSAPP_VERIFY_TOKEN is not configured");
    return new NextResponse("Verification failed", { status: 403 });
  }

  if (mode === "subscribe" && token === verifyToken && challenge) {
    console.log("WhatsApp webhook verified successfully");
    return new NextResponse(challenge, { status: 200 });
  }

  console.warn("WhatsApp webhook verification failed", {
    mode,
    tokenMatch: token === verifyToken,
  });
  return new NextResponse("Verification failed", { status: 403 });
}

export async function POST(request: Request) {
  const appSecret = getMetaAppSecret();
  if (!appSecret) {
    console.error("[whatsapp:meta] META_APP_SECRET is not configured");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-hub-signature-256");
  if (!verifyMetaSignature(rawBody, signature, appSecret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: MetaWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as MetaWebhookPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const messaging = new MessagingService(prisma);
  try {
    const result = await processMetaWhatsAppWebhook(payload, messaging, prisma);
    console.log(
      "[whatsapp:meta] processed inbound=%d statuses=%d",
      result.inbound,
      result.statuses,
    );

    for (const entry of payload.entry ?? []) {
      for (const change of entry.changes ?? []) {
        for (const message of change.value?.messages ?? []) {
          const from = message.from ?? "";
          const text = message.text?.body ?? "";
          const msgType = message.type ?? "";
          if (msgType !== "text" || !text.trim() || !message.id) continue;
          console.log(
            `WhatsApp message from ${redactPhone(from)}: [${msgType}] ${redactText(text)}`,
          );
          try {
            const reply = await getBotReply(text.trim());
            await maybeReplyToInbound(messaging, {
              from,
              inboundId: message.id,
              text,
              reply:
                reply ||
                "Thank you for reaching out to ShadowSpark. A team member will respond shortly.",
            });
          } catch (error) {
            console.error(
              `[WhatsApp Handler] Error processing message from ${redactPhone(from)}:`,
              error,
            );
          }
        }
      }
    }

    return NextResponse.json({ status: "ok", ...result });
  } catch (error) {
    console.error("WhatsApp webhook error:", error);
    return NextResponse.json({ status: "error", message: "Internal server error" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
