import crypto from "crypto";

import { NextResponse } from "next/server";
import type { Prisma } from "@/generated/prisma/client";

import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type PaystackCustomField = {
  variable_name?: string;
  value?: string;
};

type PaystackWebhookPayload = {
  event?: string;
  data?: {
    amount?: number;
    reference?: string;
    metadata?: {
      leadId?: string;
      custom_fields?: PaystackCustomField[];
    };
  };
};

function verifyPaystackSignature(
  payload: string,
  signature: string | null,
  secret: string
): boolean {
  if (!signature || !secret) {
    return false;
  }

  const expectedDigest = crypto
    .createHmac("sha512", secret)
    .update(payload)
    .digest();
  const providedDigest = Buffer.from(signature, "hex");

  if (providedDigest.length !== expectedDigest.length) {
    return false;
  }

  return crypto.timingSafeEqual(providedDigest, expectedDigest);
}

function extractLeadId(payload: PaystackWebhookPayload): string | null {
  if (payload.data?.metadata?.leadId) {
    return payload.data.metadata.leadId;
  }

  const customField = payload.data?.metadata?.custom_fields?.find(
    (field) => field.variable_name === "leadId" && typeof field.value === "string"
  );

  return customField?.value ?? null;
}

export async function POST(req: Request) {
  try {
    const payload = await req.text();
    const signature = req.headers.get("x-paystack-signature");
    const secret = process.env.PAYSTACK_SECRET_KEY || "";

    if (!verifyPaystackSignature(payload, signature, secret)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(payload) as PaystackWebhookPayload;
    const reference = event.data?.reference;

    if (!reference) {
      return NextResponse.json({ error: "Missing reference" }, { status: 400 });
    }

    const existingEvent = await prisma.systemEvent.findFirst({
      where: {
        metadata: {
          path: ["reference"],
          equals: reference,
        },
      },
    });

    if (existingEvent) {
      return NextResponse.json({ received: true, idempotent: true }, { status: 200 });
    }

    if (event.event !== "charge.success") {
      return NextResponse.json({ received: true, ignored: true }, { status: 200 });
    }

    const payment = await prisma.payment.findUnique({
      where: { reference },
      select: { leadId: true },
    });

    const leadId = extractLeadId(event) ?? payment?.leadId ?? null;
    if (!leadId) {
      return NextResponse.json({ error: "Missing leadId" }, { status: 400 });
    }

    const amount = typeof event.data?.amount === "number" ? event.data.amount : 0;
    const systemEventMetadata: Prisma.InputJsonObject = {
      leadId,
      reference,
      amount,
      event: event.event ?? "charge.success",
    };

    await prisma.$transaction([
      prisma.payment.upsert({
        where: { reference },
        update: {
          amount,
          status: "success",
        },
        create: {
          leadId,
          reference,
          amount,
          status: "success",
        },
      }),
      prisma.lead.update({
        where: { id: leadId },
        data: {
          tier: "SEMANTIC_GROWTH",
        },
      }),
      prisma.systemEvent.create({
        data: {
          type: "payment_received",
          message: `Payment received for ${reference}`,
          metadata: systemEventMetadata,
        },
      }),
    ]);

    return NextResponse.json({ received: true, success: true }, { status: 200 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Webhook processing failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
