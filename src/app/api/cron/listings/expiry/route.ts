import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendListingExpiryReminder } from "@/lib/whatsapp/messaging";

function normalizeWhatsAppRecipient(phoneNumber: string | null | undefined): string | null {
  const candidate = phoneNumber?.trim();
  if (!candidate) return null;

  const normalized = candidate.startsWith("+") ? candidate : `+${candidate}`;
  return /^\+[1-9]\d{7,14}$/.test(normalized) ? normalized : null;
}

async function getListingOwnerPhone(ownerId: string | null): Promise<string | null> {
  if (!ownerId) return null;

  const owner = await prisma.user.findUnique({
    where: { id: ownerId },
    select: { email: true },
  });
  if (!owner?.email) return null;

  const lead = await prisma.lead.findUnique({
    where: { email: owner.email },
    select: { phoneNumber: true },
  });
  return normalizeWhatsAppRecipient(lead?.phoneNumber);
}

export async function GET(req: Request) {
  const authHeader = (req.headers.get("authorization") ?? "").trim();
  const secret = (process.env.CRON_SECRET ?? "").trim();
  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  // Send reminders for listings expiring within 7 days
  const expiringListings = await prisma.listing.findMany({
    where: {
      active: true,
      reminderSent: false,
      expiresAt: { gte: now, lte: sevenDaysFromNow },
    },
    select: { id: true, title: true, expiresAt: true, ownerId: true },
  });

  let reminders = 0;
  let reminderFailures = 0;
  for (const listing of expiringListings) {
    const daysLeft = Math.ceil(
      ((listing.expiresAt?.getTime() ?? 0) - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    const recipient = await getListingOwnerPhone(listing.ownerId);
    if (!recipient) {
      reminderFailures += 1;
      console.warn(
        "[cron:listings:expiry] reminder skipped: no valid recipient listing=%s",
        listing.id
      );
      continue;
    }

    let delivery: { success: boolean; messageId?: string };
    try {
      delivery = await sendListingExpiryReminder(recipient, listing.title, daysLeft);
    } catch (error) {
      reminderFailures += 1;
      console.error(
        "[cron:listings:expiry] reminder delivery threw listing=%s error=%o",
        listing.id,
        error
      );
      continue;
    }

    if (!delivery.success) {
      reminderFailures += 1;
      console.error(
        "[cron:listings:expiry] reminder delivery failed listing=%s",
        listing.id
      );
      continue;
    }

    await prisma.listing.update({
      where: { id: listing.id },
      data: { reminderSent: true },
    });
    reminders += 1;
  }

  // Deactivate expired listings
  const { count: deactivated } = await prisma.listing.updateMany({
    where: { active: true, expiresAt: { lt: now } },
    data: { active: false },
  });

  console.log(
    "[cron:listings:expiry] reminders=%d failures=%d deactivated=%d",
    reminders,
    reminderFailures,
    deactivated
  );

  return NextResponse.json({
    ok: true,
    reminders,
    reminderFailures,
    deactivated,
  });
}
