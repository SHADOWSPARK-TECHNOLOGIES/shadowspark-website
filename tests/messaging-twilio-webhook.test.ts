import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import twilio from "twilio";

const mocks = vi.hoisted(() => ({
  processSms: vi.fn(),
}));

vi.mock("@/lib/prisma", () => ({ prisma: {} }));
vi.mock("@/lib/messaging/twilio-adapter", async () => {
  const actual = await vi.importActual<typeof import("@/lib/messaging/twilio-adapter")>(
    "@/lib/messaging/twilio-adapter",
  );
  return { ...actual, processTwilioSmsWebhook: mocks.processSms };
});

import { POST } from "@/app/api/webhooks/twilio/sms/route";

const authToken = "test-twilio-auth-token";
const publicUrl = "https://shadowspark.example/api/webhooks/twilio/sms";

describe("POST /api/webhooks/twilio/sms", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.TWILIO_AUTH_TOKEN = authToken;
    process.env.TWILIO_PUBLIC_BASE_URL = "https://shadowspark.example";
    mocks.processSms.mockResolvedValue({ inbound: 1, statuses: 0, optedOut: false });
  });

  afterEach(() => {
    delete process.env.TWILIO_AUTH_TOKEN;
    delete process.env.TWILIO_PUBLIC_BASE_URL;
  });

  it("rejects a missing signature", async () => {
    const response = await POST(
      new Request("http://localhost/api/webhooks/twilio/sms", {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: "MessageSid=SM111&Body=hello",
      }),
    );
    expect(response.status).toBe(401);
    expect(mocks.processSms).not.toHaveBeenCalled();
  });

  it("accepts a valid Twilio signature over the configured public URL", async () => {
    const params = { MessageSid: "SM111", From: "+2348012345678", Body: "hello" };
    const body = new URLSearchParams(params).toString();
    const signature = twilio.getExpectedTwilioSignature(authToken, publicUrl, params);

    const response = await POST(
      new Request("http://localhost/api/webhooks/twilio/sms", {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "x-twilio-signature": signature,
        },
        body,
      }),
    );

    expect(response.status).toBe(200);
    expect(mocks.processSms).toHaveBeenCalledTimes(1);
  });

  it("fails closed when Twilio credentials are missing", async () => {
    delete process.env.TWILIO_AUTH_TOKEN;
    const response = await POST(
      new Request("http://localhost/api/webhooks/twilio/sms", {
        method: "POST",
        body: "MessageSid=SM111",
      }),
    );
    expect(response.status).toBe(401);
    expect(mocks.processSms).not.toHaveBeenCalled();
  });
});
