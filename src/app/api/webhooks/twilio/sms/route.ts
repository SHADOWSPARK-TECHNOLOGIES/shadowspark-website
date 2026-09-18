import { NextResponse } from "next/server";

import { MessagingService } from "@/lib/messaging";
import { processTwilioSmsWebhook } from "@/lib/messaging/twilio-adapter";
import { authorizeTwilioWebhook } from "@/lib/messaging/twilio-signature";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const authorized = await authorizeTwilioWebhook(request, "/api/webhooks/twilio/sms");
  if (!authorized.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const messaging = new MessagingService(prisma);
    const result = await processTwilioSmsWebhook(authorized.params, messaging, prisma);
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
