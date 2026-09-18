import { NextResponse } from "next/server";

import { MessagingService } from "@/lib/messaging";
import { processTwilioVoiceWebhook } from "@/lib/messaging/twilio-adapter";
import { authorizeTwilioWebhook } from "@/lib/messaging/twilio-signature";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const authorized = await authorizeTwilioWebhook(request, "/api/webhooks/twilio/voice");
  if (!authorized.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const messaging = new MessagingService(prisma);
    await processTwilioVoiceWebhook(authorized.params, messaging, prisma);
    return new NextResponse("<Response></Response>", {
      status: 200,
      headers: { "Content-Type": "text/xml" },
    });
  } catch (error) {
    console.error("[twilio:voice] webhook error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
