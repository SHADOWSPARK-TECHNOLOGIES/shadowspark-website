import { createHmac } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  processWebhook: vi.fn(),
  maybeReply: vi.fn(),
  getBotReply: vi.fn(),
}));

vi.mock("@/lib/prisma", () => ({ prisma: {} }));
vi.mock("@/lib/ai/whatsapp-bot", () => ({ getBotReply: mocks.getBotReply }));
vi.mock("@/lib/messaging/meta-whatsapp", async () => {
  const actual = await vi.importActual<typeof import("@/lib/messaging/meta-whatsapp")>(
    "@/lib/messaging/meta-whatsapp",
  );
  return {
    ...actual,
    processMetaWhatsAppWebhook: mocks.processWebhook,
    maybeReplyToInbound: mocks.maybeReply,
  };
});

import { GET, POST } from "@/app/api/webhooks/whatsapp/meta/route";

const secret = "meta-app-secret";
const verifyToken = "configured-verify-token";

function sign(body: string): string {
  return `sha256=${createHmac("sha256", secret).update(body, "utf8").digest("hex")}`;
}

function postRequest(body: string, signature?: string): Request {
  const headers = new Headers({ "content-type": "application/json" });
  if (signature) headers.set("x-hub-signature-256", signature);
  return new Request("http://localhost/api/webhooks/whatsapp/meta", {
    method: "POST",
    headers,
    body,
  });
}

describe("WhatsApp Meta webhook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.META_APP_SECRET = secret;
    process.env.WHATSAPP_VERIFY_TOKEN = verifyToken;
    mocks.processWebhook.mockResolvedValue({ inbound: 0, statuses: 0 });
    mocks.maybeReply.mockResolvedValue(false);
    mocks.getBotReply.mockResolvedValue("ack");
  });

  afterEach(() => {
    delete process.env.META_APP_SECRET;
    delete process.env.WHATSAPP_VERIFY_TOKEN;
  });

  it("preserves GET verification when the configured token matches", async () => {
    const response = await GET(
      new Request(
        `http://localhost/api/webhooks/whatsapp/meta?hub.mode=subscribe&hub.verify_token=${verifyToken}&hub.challenge=challenge-token`,
      ),
    );
    expect(response.status).toBe(200);
    expect(await response.text()).toBe("challenge-token");
  });

  it("rejects GET verification when WHATSAPP_VERIFY_TOKEN is missing", async () => {
    delete process.env.WHATSAPP_VERIFY_TOKEN;
    const response = await GET(
      new Request(
        "http://localhost/api/webhooks/whatsapp/meta?hub.mode=subscribe&hub.verify_token=shadowspark-clawbot-v1&hub.challenge=challenge-token",
      ),
    );
    expect(response.status).toBe(403);
  });

  it("rejects the historical built-in fallback token unless it is configured", async () => {
    const response = await GET(
      new Request(
        "http://localhost/api/webhooks/whatsapp/meta?hub.mode=subscribe&hub.verify_token=shadowspark-clawbot-v1&hub.challenge=challenge-token",
      ),
    );
    expect(response.status).toBe(403);
  });

  it("rejects POST without a signature before parsing", async () => {
    const response = await POST(postRequest('{"entry":[]}'));
    expect(response.status).toBe(401);
    expect(mocks.processWebhook).not.toHaveBeenCalled();
  });

  it("rejects POST with an invalid signature before persistence", async () => {
    const response = await POST(postRequest('{"entry":[]}', sign('{"other":true}')));
    expect(response.status).toBe(401);
    expect(mocks.processWebhook).not.toHaveBeenCalled();
  });

  it("accepts POST with a valid signature over the exact raw body", async () => {
    const body = JSON.stringify({
      entry: [
        {
          changes: [
            {
              value: {
                messages: [
                  {
                    id: "wamid.1",
                    from: "2348012345678",
                    type: "text",
                    text: { body: "hello" },
                  },
                ],
              },
            },
          ],
        },
      ],
    });
    mocks.processWebhook.mockResolvedValue({ inbound: 1, statuses: 0 });

    const response = await POST(postRequest(body, sign(body)));

    expect(response.status).toBe(200);
    expect(mocks.processWebhook).toHaveBeenCalledTimes(1);
    expect(await response.json()).toMatchObject({ status: "ok", inbound: 1 });
  });

  it("fails closed when META_APP_SECRET is missing", async () => {
    delete process.env.META_APP_SECRET;
    const body = '{"entry":[]}';
    const response = await POST(postRequest(body, sign(body)));
    expect(response.status).toBe(401);
    expect(mocks.processWebhook).not.toHaveBeenCalled();
  });
});
