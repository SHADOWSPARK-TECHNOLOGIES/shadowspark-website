import { NextResponse } from "next/server";

import { MessagingService } from "@/lib/messaging";
import { processTwilioVoiceWebhook } from "@/lib/messaging/twilio-adapter";
import {
  getTwilioAuthToken,
  getTwilioPublicUrl,
  parseTwilioFormBody,
  verifyTwilioSignature,
} from "@/lib/messaging/twilio-signature";
import { prisma } from "@/lib/prisma";

const VOICE_PATH = "/api/webhooks/twilio/voice";

export async function POST(request: Request) {
  const twilioToken = getTwilioAuthToken();
  const publicUrl = getTwilioPublicUrl(VOICE_PATH);
  if (!twilioToken || !publicUrl) {
    console.error("[twilio:voice] TWILIO_AUTH_TOKEN or TWILIO_PUBLIC_BASE_URL is not configured");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rawBody = await request.text();
  const params = parseTwilioFormBody(rawBody);
  const signature = request.headers.get("x-twilio-signature");
  if (!verifyTwilioSignature({ authToken: twilioToken, signature, publicUrl, params })) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const messaging = new MessagingService(prisma);
    await processTwilioVoiceWebhook(params, messaging, prisma);
    return new NextResponse("<Response></Response>", {
      status: 200,
      headers: { "Content-Type": "text/xml" },
    });
  } catch (error) {
    console.error("[twilio:voice] webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
