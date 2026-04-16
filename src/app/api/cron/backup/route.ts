import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Storage } from "@google-cloud/storage";

export const runtime = "nodejs";

const BUCKET_NAME = "shadowspark-genesis-backups-2026";

async function sendSlackStatus(success: boolean, message: string) {
  const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK_URL;
  if (SLACK_WEBHOOK) {
    try {
      await fetch(SLACK_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `\${success ? "✅" : "❌"} *Database Backup:* \${message}`
        })
      });
    } catch (e: any) {
      console.error("Failed to send Slack status:", e.message);
    }
  }
}

export async function GET(req: Request) {
  const authHeader = (req.headers.get("authorization") || "").trim();
  const secret = (process.env.CRON_SECRET || "").trim();
  if (!secret || authHeader !== ("Bearer " + secret)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const dbUrl = (process.env.DATABASE_URL || "").trim();
  let backupDbUrl = dbUrl;
  if (dbUrl) {
    process.env.DATABASE_URL = dbUrl;
    try {
      const parsedUrl = new URL(dbUrl);
      parsedUrl.searchParams.set("connection_limit", "5");
      parsedUrl.searchParams.set("connect_timeout", "30");
      parsedUrl.searchParams.set("pool_timeout", "30");
      backupDbUrl = parsedUrl.toString();
    } catch (e) {
      console.warn("Could not parse DATABASE_URL to append pool limits");
    }
  }

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: backupDbUrl,
      },
    },
  });

  try {
    console.log("Starting backup database query...");
    const storage = new Storage();
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

    // Fetch critical data
    const leads = await prisma.lead.findMany();
    const users = await prisma.user.findMany();
    const payments = await prisma.payment.findMany();

    const backupData = JSON.stringify({ leads, users, payments }, null, 2);
    const fileName = `backups/db-backup-\${timestamp}.json`;

    await storage.bucket(BUCKET_NAME).file(fileName).save(backupData);

    await sendSlackStatus(true, `Successfully backed up \${leads.length} leads, \${users.length} users, and \${payments.length} payments to GCS.`);

    return NextResponse.json({ 
      success: true, 
      file: fileName,
      stats: { leads: leads.length, users: users.length, payments: payments.length }
    });
  } catch (error: any) {
    console.error("Backup error detail:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
      env_db_url: process.env.DATABASE_URL ? "EXISTS" : "MISSING"
    });
    await sendSlackStatus(false, `Backup failed: \${error.message}`);
    return NextResponse.json({ error: "Backup failed", details: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
