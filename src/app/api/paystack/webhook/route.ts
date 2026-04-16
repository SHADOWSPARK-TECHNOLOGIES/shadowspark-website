import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { enqueueCrawl } from "@/lib/crawl/queue";

async function notifySlack(message: string) {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url || url.includes("T00000000")) return;

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: message }),
    });
  } catch (error) {
    console.error("Slack notification failed:", error);
  }
}

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("x-paystack-signature");

  if (!signature) return new Response("No signature", { status: 400 });

  const secret = process.env.PAYSTACK_SECRET_KEY || process.env.PAYSTACK_WEBHOOK_SECRET || "";
  const hash = crypto.createHmac("sha512", secret).update(body).digest("hex");

  if (hash !== signature) {
    return new Response("Invalid signature", { status: 400 });
  }

  const event = JSON.parse(body);

  if (event.event === "charge.success") {
    const { reference, metadata } = event.data;
    
    // Extract leadId whether it's root level or nested in custom_fields
    let leadId = metadata?.leadId;
    if (!leadId && metadata?.custom_fields) {
      const field = metadata.custom_fields.find((f: any) => f.variable_name === "leadId");
      if (field) leadId = field.value;
    }

    if (!leadId) {
      console.error("[Paystack Webhook] Missing leadId in metadata for reference:", reference);
      return NextResponse.json({ error: "Missing leadId" }, { status: 400 });
    }

    try {
      // Idempotency check: if payment is already successful, ignore retry to prevent duplicate Slack pings
      const existingPayment = await prisma.payment.findUnique({
        where: { reference },
      });
      if (existingPayment?.status === "success") {
        console.log(`[Paystack Webhook] Duplicate success event ignored for ${reference}`);
        return NextResponse.json({ status: "ok", note: "already processed" });
      }

      const [payment, lead, demo] = await prisma.$transaction([
        prisma.payment.upsert({
          where: { reference },
          update: {
            status: "success",
          },
          create: {
            amount: event.data.amount / 100,
            status: "success",
            reference,
            leadId,
          },
        }),

        prisma.lead.update({
          where: { id: leadId },
          data: { demoApproved: true, status: "PAID" },
        }),
        prisma.demo.upsert({
          where: { leadId },
          update: { approved: true },
          create: {
            leadId,
            slug: `demo-${leadId}`,
            approved: true,
          },
        }),
      ]);

      // Fire-and-forget crawl trigger
      try {
        const audit = (lead.miniAuditData as any) || {};
        const rootUrl = audit.rootUrl || audit.website || audit.url;
        
        if (rootUrl) {
          await enqueueCrawl({
            rootUrl,
            slug: demo.slug,
            limit: 20, // Conservative limit for instant audit
          });
          console.log(`[Paystack Webhook] Automated crawl enqueued for ${rootUrl} (slug: ${demo.slug})`);
        } else {
          console.warn(`[Paystack Webhook] No rootUrl found for lead ${leadId}, skipping automated crawl.`);
        }
      } catch (crawlErr) {
        console.error("[Paystack Webhook] Failed to enqueue automated crawl:", crawlErr);
      }

      // Fire-and-forget notification
      const audit = (lead.miniAuditData as any) || {};
      notifySlack(
        `🚀 *New ShadowSpark Sale!*\n*Lead:* ${lead.phoneNumber}\n*Business:* ${audit.companyName || 'Unknown'}\n*Amount:* $10 (Demo Fee)\n*Approve now:* ${process.env.NEXTAUTH_URL || 'https://shadowspark-tech.org'}/operator`
      );

    } catch (error) {
      console.error("[Paystack Webhook] Transaction failed:", error);
      return NextResponse.json({ error: "Processing failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ status: "ok" });
}


