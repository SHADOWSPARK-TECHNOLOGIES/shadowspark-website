import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  leadFindUnique: vi.fn(),
  listingFindMany: vi.fn(),
  listingUpdate: vi.fn(),
  listingUpdateMany: vi.fn(),
  sendReminder: vi.fn(),
  userFindUnique: vi.fn(),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    lead: { findUnique: mocks.leadFindUnique },
    listing: {
      findMany: mocks.listingFindMany,
      update: mocks.listingUpdate,
      updateMany: mocks.listingUpdateMany,
    },
    user: { findUnique: mocks.userFindUnique },
  },
}));

vi.mock("@/lib/whatsapp/messaging", () => ({
  sendListingExpiryReminder: mocks.sendReminder,
}));

import * as expiryRoute from "@/app/api/cron/listings/expiry/route";

type CronHandler = (request: Request) => Promise<Response>;

const now = new Date("2026-08-29T08:00:00.000Z");
const expiringListing = {
  id: "listing-1",
  title: "Verified Lagos office",
  expiresAt: new Date("2026-09-02T08:00:00.000Z"),
  ownerId: "owner-1",
};

function getHandler(): CronHandler | undefined {
  return (expiryRoute as { GET?: CronHandler }).GET;
}

function cronRequest(authorization?: string): Request {
  const headers = authorization ? { authorization } : undefined;
  return new Request("http://localhost/api/cron/listings/expiry", {
    method: "GET",
    headers,
  });
}

async function invokeCron(authorization?: string): Promise<Response | undefined> {
  const handler = getHandler();
  expect(handler).toBeTypeOf("function");
  return handler?.(cronRequest(authorization));
}

describe("GET /api/cron/listings/expiry", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(now);
    vi.clearAllMocks();
    process.env.CRON_SECRET = "test-cron-secret";
    mocks.listingFindMany.mockResolvedValue([]);
    mocks.listingUpdate.mockResolvedValue({});
    mocks.listingUpdateMany.mockResolvedValue({ count: 0 });
    mocks.userFindUnique.mockResolvedValue(null);
    mocks.leadFindUnique.mockResolvedValue(null);
    mocks.sendReminder.mockResolvedValue({ success: false });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    delete process.env.CRON_SECRET;
  });

  it("fails closed when CRON_SECRET is missing", async () => {
    delete process.env.CRON_SECRET;

    const response = await invokeCron("Bearer undefined");

    expect(response?.status).toBe(401);
    expect(mocks.listingFindMany).not.toHaveBeenCalled();
    expect(mocks.listingUpdateMany).not.toHaveBeenCalled();
  });

  it("rejects an invalid bearer secret without database work", async () => {
    const response = await invokeCron("Bearer wrong-secret");

    expect(response?.status).toBe(401);
    expect(mocks.listingFindMany).not.toHaveBeenCalled();
    expect(mocks.listingUpdateMany).not.toHaveBeenCalled();
  });

  it("executes authorized expiry mutation through GET", async () => {
    mocks.listingUpdateMany.mockResolvedValueOnce({ count: 2 });

    const response = await invokeCron("Bearer test-cron-secret");

    expect(response?.status).toBe(200);
    expect(mocks.listingUpdateMany).toHaveBeenCalledWith({
      where: { active: true, expiresAt: { lt: now } },
      data: { active: false },
    });
    expect(await response?.json()).toEqual({
      ok: true,
      reminders: 0,
      reminderFailures: 0,
      deactivated: 2,
    });
  });

  it("awaits provider success before recording a reminder", async () => {
    mocks.listingFindMany.mockResolvedValueOnce([expiringListing]);
    mocks.userFindUnique.mockResolvedValueOnce({ email: "owner@example.test" });
    mocks.leadFindUnique.mockResolvedValueOnce({ phoneNumber: "+2348012345678" });

    let resolveDelivery: ((value: { success: boolean; messageId: string }) => void) | undefined;
    mocks.sendReminder.mockReturnValueOnce(
      new Promise((resolve) => {
        resolveDelivery = resolve;
      }),
    );

    const handler = getHandler();
    expect(handler).toBeTypeOf("function");
    if (!handler) return;

    const responsePromise = handler(cronRequest("Bearer test-cron-secret"));
    await vi.waitFor(() => expect(mocks.sendReminder).toHaveBeenCalledTimes(1));
    expect(mocks.listingUpdate).not.toHaveBeenCalled();

    resolveDelivery?.({ success: true, messageId: "provider-message-id" });
    const response = await responsePromise;

    expect(mocks.userFindUnique).toHaveBeenCalledWith({
      where: { id: "owner-1" },
      select: { email: true },
    });
    expect(mocks.leadFindUnique).toHaveBeenCalledWith({
      where: { email: "owner@example.test" },
      select: { phoneNumber: true },
    });
    expect(mocks.sendReminder).toHaveBeenCalledWith(
      "+2348012345678",
      expiringListing.title,
      4,
    );
    expect(mocks.listingUpdate).toHaveBeenCalledWith({
      where: { id: expiringListing.id },
      data: { reminderSent: true },
    });
    expect(await response.json()).toMatchObject({ reminders: 1, reminderFailures: 0 });
  });

  it("keeps failed delivery retriable and emits failure evidence", async () => {
    mocks.listingFindMany.mockResolvedValueOnce([expiringListing]);
    mocks.userFindUnique.mockResolvedValueOnce({ email: "owner@example.test" });
    mocks.leadFindUnique.mockResolvedValueOnce({ phoneNumber: "2348012345678" });
    mocks.sendReminder.mockResolvedValueOnce({ success: false });
    const error = vi.spyOn(console, "error").mockImplementation(() => undefined);

    const response = await invokeCron("Bearer test-cron-secret");

    expect(mocks.sendReminder).toHaveBeenCalledWith(
      "+2348012345678",
      expiringListing.title,
      4,
    );
    expect(mocks.listingUpdate).not.toHaveBeenCalled();
    expect(error).toHaveBeenCalledWith(
      "[cron:listings:expiry] reminder delivery failed listing=%s",
      expiringListing.id,
    );
    expect(await response?.json()).toMatchObject({ reminders: 0, reminderFailures: 1 });
  });

  it("keeps processing when the provider rejects unexpectedly", async () => {
    mocks.listingFindMany.mockResolvedValueOnce([expiringListing]);
    mocks.userFindUnique.mockResolvedValueOnce({ email: "owner@example.test" });
    mocks.leadFindUnique.mockResolvedValueOnce({ phoneNumber: "+2348012345678" });
    mocks.sendReminder.mockRejectedValueOnce(new Error("provider unavailable"));
    const error = vi.spyOn(console, "error").mockImplementation(() => undefined);
    mocks.listingUpdateMany.mockResolvedValueOnce({ count: 1 });

    const response = await invokeCron("Bearer test-cron-secret");

    expect(mocks.listingUpdate).not.toHaveBeenCalled();
    expect(mocks.listingUpdateMany).toHaveBeenCalledWith({
      where: { active: true, expiresAt: { lt: now } },
      data: { active: false },
    });
    expect(error).toHaveBeenCalledWith(
      "[cron:listings:expiry] reminder delivery threw listing=%s error=%o",
      expiringListing.id,
      expect.any(Error),
    );
    expect(await response?.json()).toMatchObject({ reminders: 0, reminderFailures: 1, deactivated: 1 });
  });

  it("rejects an invalid recipient without invoking the provider", async () => {
    mocks.listingFindMany.mockResolvedValueOnce([expiringListing]);
    mocks.userFindUnique.mockResolvedValueOnce({ email: "owner@example.test" });
    mocks.leadFindUnique.mockResolvedValueOnce({
      phoneNumber: "+2348012345678<script>",
    });
    const warning = vi.spyOn(console, "warn").mockImplementation(() => undefined);

    const response = await invokeCron("Bearer test-cron-secret");

    expect(mocks.sendReminder).not.toHaveBeenCalled();
    expect(mocks.listingUpdate).not.toHaveBeenCalled();
    expect(warning).toHaveBeenCalledWith(
      "[cron:listings:expiry] reminder skipped: no valid recipient listing=%s",
      expiringListing.id,
    );
    expect(await response?.json()).toMatchObject({ reminders: 0, reminderFailures: 1 });
  });

  it("does not redeliver a reminder on repeated invocation", async () => {
    let reminderSent = false;
    mocks.listingFindMany.mockImplementation(async () =>
      reminderSent ? [] : [expiringListing],
    );
    mocks.userFindUnique.mockResolvedValue({ email: "owner@example.test" });
    mocks.leadFindUnique.mockResolvedValue({ phoneNumber: "+2348012345678" });
    mocks.sendReminder.mockResolvedValue({ success: true, messageId: "provider-message-id" });
    mocks.listingUpdate.mockImplementation(async () => {
      reminderSent = true;
      return {};
    });

    const firstResponse = await invokeCron("Bearer test-cron-secret");
    const secondResponse = await invokeCron("Bearer test-cron-secret");

    expect(mocks.sendReminder).toHaveBeenCalledTimes(1);
    expect(mocks.listingUpdate).toHaveBeenCalledTimes(1);
    expect(await firstResponse?.json()).toMatchObject({ reminders: 1 });
    expect(await secondResponse?.json()).toMatchObject({ reminders: 0 });
  });
});

describe("sendListingExpiryReminder", () => {
  it("reports disabled WhatsApp as unavailable instead of delivered", async () => {
    delete process.env.WHATSAPP_ENABLED;
    const actualMessaging = await vi.importActual<
      typeof import("@/lib/whatsapp/messaging")
    >("@/lib/whatsapp/messaging");
    vi.spyOn(console, "warn").mockImplementation(() => undefined);

    const result = await actualMessaging.sendListingExpiryReminder(
      "+2348012345678",
      "Verified Lagos office",
      4,
    );

    expect(result).toEqual({ success: false });
  });
});
