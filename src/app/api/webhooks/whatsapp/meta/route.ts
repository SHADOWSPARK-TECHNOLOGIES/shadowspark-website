import { NextResponse } from "next/server";

import { getWhatsAppReply } from "@/lib/ai/whatsapp-bot";
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
      "[whatsapp:meta] processed inbound=%d statuses=%d new=%d",
      result.inbound,
      result.statuses,
      result.newInbound.length,
    );

    for (const inbound of result.newInbound) {
      console.log(
        `WhatsApp message from ${redactPhone(inbound.from)}: [text] ${redactText(inbound.text)}`,
      );
      try {
        const { text: reply, usedFallback } = await getWhatsAppReply(inbound.text.trim());
        await maybeReplyToInbound(messaging, {
          from: inbound.from,
          inboundId: inbound.id,
          text: inbound.text,
          reply,
        });
        if (usedFallback) {
          await prisma.systemEvent.create({
            data: {
              type: "whatsapp_human_handoff",
              message: "Deterministic WhatsApp fallback sent; human follow-up required",
              metadata: {
                inboundId: inbound.id,
                address: redactPhone(inbound.from),
                reason: "ai_unavailable_or_empty",
              },
            },
          });
        }
      } catch (error) {
        console.error(
          `[WhatsApp Handler] Error processing message from ${redactPhone(inbound.from)}:`,
          error,
        );
      }
    }

    return NextResponse.json({
      status: "ok",
      inbound: result.inbound,
      statuses: result.statuses,
    });
  } catch (error) {
    console.error("WhatsApp webhook error:", error);
    return NextResponse.json({ status: "error", message: "Internal server error" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
