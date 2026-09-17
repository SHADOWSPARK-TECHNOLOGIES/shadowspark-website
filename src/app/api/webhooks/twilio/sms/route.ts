import { NextResponse } from "next/server";

import { MessagingService } from "@/lib/messaging";
import { processTwilioSmsWebhook } from "@/lib/messaging/twilio-adapter";
import {
  getTwilioAuthToken,
  getTwilioPublicUrl,
  parseTwilioFormBody,
  verifyTwilioSignature,
} from "@/lib/messaging/twilio-signature";
import { prisma } from "@/lib/prisma";

const SMS_PATH = "/api/webhooks/twilio/sms";

export async function POST(request: Request) {
  const authToken = getTwilioAuthToken();
  const publicUrl = getTwilioPublicUrl(SMS_PATH);
  if (!authToken || !publicUrl) {
    console.error("[twilio:sms] TWILIO_AUTH_TOKEN or TWILIO_PUBLIC_BASE_URL is not configured");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rawBody = await request.text();
  const params = parseTwilioFormBody(rawBody);
  const signature = request.headers.get("x-twilio-signature");
  if (!verifyTwilioSignature({ authToken, signature, publicUrl, params })) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const messaging = new MessagingService(prisma);
    const result = await processTwilioSmsWebhook(params, messaging, prisma);
    return new NextResponse("<Response></Response>", {
      status: 200,
      headers: {
        "Content-Type": "text/xml",
        "X-ShadowSpark-Inbound": String(result.inbound),
        "X-ShadowSpark-OptedOut": result.optedOut ? "1" : "0",
      },
    });
  } catch (error) {
    console.error("[twilio:sms] webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
