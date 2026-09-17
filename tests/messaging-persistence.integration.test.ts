import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import pg from "pg";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

import {
  MessagingConsentError,
  MessagingRoutingError,
  MessagingService,
  MessagingStateError,
  assertRoute,
  type MessagingDb,
} from "@/lib/messaging";

const databaseUrl = process.env.TEST_DATABASE_URL ?? process.env.DATABASE_URL;
const describeDb = databaseUrl ? describe : describe.skip;

describeDb("Model A messaging PostgreSQL persistence", () => {
  let pool: pg.Pool;
  let prisma: PrismaClient;
  let messaging: MessagingService;
  const address = "+2348099988877";

  beforeAll(() => {
    if (!databaseUrl) return;
    pool = new pg.Pool({ connectionString: databaseUrl });
    prisma = new PrismaClient({ adapter: new PrismaPg(pool) });
    messaging = new MessagingService(prisma as unknown as MessagingDb);
  });

  afterAll(async () => {
    await prisma?.$disconnect();
    await pool?.end();
  });

  beforeEach(async () => {
    await prisma.outboundDeliveryAttempt.deleteMany({ where: { id: { not: "" } } });
    await prisma.providerEvent.deleteMany({ where: { id: { not: "" } } });
    await prisma.message.deleteMany({ where: { id: { not: "" } } });
    await prisma.consentEvent.deleteMany({ where: { id: { not: "" } } });
    await prisma.channelConsent.deleteMany({ where: { id: { not: "" } } });
  });

  it("enforces WhatsApp→Meta and SMS/Voice→Twilio at the database", async () => {
    await expect(
      prisma.$executeRaw`
        INSERT INTO "messages" (
          "id", "channel", "provider", "direction", "state", "address", "updatedAt"
        ) VALUES (
          'bad-route', 'WHATSAPP', 'TWILIO', 'OUTBOUND', 'QUEUED', ${address}, NOW()
        )
      `,
    ).rejects.toThrow();
  });

  it("persists consent as a current row plus an immutable event", async () => {
    const granted = await messaging.grantConsent({
      channel: "WHATSAPP",
      address,
      source: "test",
      purpose: "alerts",
    });
    expect(granted.consent.granted).toBe(true);

    const events = await prisma.consentEvent.findMany({
      where: { channel: "WHATSAPP", address },
    });
    expect(events.some((event) => event.action === "GRANT")).toBe(true);

    await messaging.revokeConsent({
      channel: "WHATSAPP",
      address,
      source: "test",
    });
    const current = await prisma.channelConsent.findUnique({
      where: { channel_address: { channel: "WHATSAPP", address } },
    });
    expect(current?.granted).toBe(false);
    expect(await prisma.consentEvent.count({ where: { channel: "WHATSAPP", address } })).toBeGreaterThanOrEqual(2);
  });

  it("requires consent, then reuses one message identity across retries", async () => {
    const sms = "+2348011100011";
    await expect(
      messaging.send({
        channel: "SMS",
        address: sms,
        idempotencyKey: "sms-retry-1",
      }),
    ).rejects.toBeInstanceOf(MessagingConsentError);

    await messaging.grantConsent({ channel: "SMS", address: sms, source: "test" });

    const first = await messaging.send({
      channel: "SMS",
      address: sms,
      idempotencyKey: "sms-retry-1",
      body: "first",
    });
    const second = await messaging.send({
      channel: "SMS",
      address: sms,
      idempotencyKey: "sms-retry-1",
      body: "retry",
    });
    expect(second.id).toBe(first.id);

    const accepted = await messaging.recordOutboundAttempt({
      messageId: first.id,
      status: "ACCEPTED",
      providerMessageId: "SM111",
    });
    const failedRetry = await messaging.recordOutboundAttempt({
      messageId: first.id,
      status: "FAILED",
      error: "provider timeout",
    });
    expect(accepted.attempt.attemptNumber).toBe(1);
    expect(failedRetry.attempt.attemptNumber).toBe(2);
    expect(failedRetry.attempt.messageId).toBe(first.id);
    expect(await prisma.message.count({ where: { idempotencyKey: "sms-retry-1" } })).toBe(1);
  });

  it("recovers a failed outbound attempt onto the same message identity", async () => {
    const sms = "+2348011100099";
    await messaging.grantConsent({ channel: "SMS", address: sms, source: "test" });
    const message = await messaging.send({
      channel: "SMS",
      address: sms,
      idempotencyKey: "sms-fail-retry",
    });
    const failed = await messaging.recordOutboundAttempt({
      messageId: message.id,
      status: "FAILED",
      error: "timeout",
    });
    expect(failed.message.state).toBe("FAILED");

    const recovered = await messaging.recordOutboundAttempt({
      messageId: message.id,
      status: "ACCEPTED",
      providerMessageId: "SM-retry",
    });
    expect(recovered.message.state).toBe("SENT");
    expect(recovered.attempt.attemptNumber).toBe(2);
    expect(await prisma.message.count({ where: { idempotencyKey: "sms-fail-retry" } })).toBe(1);
  });

  it("replays provider events by provider event id", async () => {
    const wa = "+2348022200022";
    await messaging.grantConsent({ channel: "WHATSAPP", address: wa, source: "test" });

    const first = await messaging.receive({
      channel: "WHATSAPP",
      address: wa,
      providerEventId: "wamid.replay-1",
      body: "inbound",
    });
    const second = await messaging.receive({
      channel: "WHATSAPP",
      address: wa,
      providerEventId: "wamid.replay-1",
      body: "inbound-again",
    });
    expect(second.id).toBe(first.id);
    expect(
      await prisma.providerEvent.count({
        where: { provider: "META", providerEventId: "wamid.replay-1" },
      }),
    ).toBe(1);
  });

  it("rejects invalid delivery transitions", async () => {
    const voice = "+2348033300033";
    await messaging.grantConsent({ channel: "VOICE", address: voice, source: "test" });
    const message = await messaging.send({
      channel: "VOICE",
      address: voice,
      idempotencyKey: "voice-state-1",
    });
    await expect(messaging.applyDeliveryState(message.id, "READ")).rejects.toBeInstanceOf(
      MessagingStateError,
    );
    await messaging.recordOutboundAttempt({
      messageId: message.id,
      status: "ACCEPTED",
      providerMessageId: "CA111",
    });
    const delivered = await messaging.applyDeliveryState(message.id, "DELIVERED");
    expect(delivered.state).toBe("DELIVERED");
    const read = await messaging.applyDeliveryState(message.id, "READ");
    expect(read.state).toBe("READ");
  });

  it("keeps WhatsApp and SMS consent independent", async () => {
    const phone = "+2348044400044";
    await messaging.grantConsent({
      channel: "WHATSAPP",
      address: phone,
      source: "test",
    });

    await expect(
      messaging.send({
        channel: "SMS",
        address: phone,
        idempotencyKey: "sms-no-consent",
      }),
    ).rejects.toBeInstanceOf(MessagingConsentError);

    const whatsapp = await messaging.send({
      channel: "WHATSAPP",
      address: phone,
      idempotencyKey: "wa-ok",
    });
    expect(whatsapp.provider).toBe("META");
  });

  it("keeps application routing identical to the database check", () => {
    expect(assertRoute("WHATSAPP").provider).toBe("META");
    expect(() => assertRoute("WHATSAPP", "TWILIO")).toThrow(MessagingRoutingError);
  });
});
