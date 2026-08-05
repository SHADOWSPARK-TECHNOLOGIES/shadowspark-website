import crypto from "node:crypto";
import { describe, it, expect } from "vitest";
import {
  verifyHmacSignature,
  verifyGitHubWebhookSignature,
  verifyVercelWebhookSignature,
  verifyMetaWebhookSignature,
} from "@/lib/webhook-verify";

const secret = "webhook-secret-001";
const payload = '{"action":"opened","number":1}';

function hmac(payload: string | Buffer, algorithm: string, secret: string): string {
  return crypto.createHmac(algorithm, secret).update(payload).digest("hex");
}

describe("verifyHmacSignature", () => {
  it("accepts a valid sha256 signature", () => {
    const signature = hmac(payload, "sha256", secret);
    expect(
      verifyHmacSignature(payload, {
        secret,
        signatureHeader: signature,
        algorithm: "sha256",
      }),
    ).toBe(true);
  });

  it("accepts a valid prefixed sha256 signature", () => {
    const signature = "sha256=" + hmac(payload, "sha256", secret);
    expect(
      verifyHmacSignature(payload, {
        secret,
        signatureHeader: signature,
        algorithm: "sha256",
        signaturePrefix: "sha256=",
      }),
    ).toBe(true);
  });

  it("rejects an invalid signature", () => {
    expect(
      verifyHmacSignature(payload, {
        secret,
        signatureHeader: "deadbeef",
        algorithm: "sha256",
      }),
    ).toBe(false);
  });

  it("rejects a signature with a different length", () => {
    expect(
      verifyHmacSignature(payload, {
        secret,
        signatureHeader: "00",
        algorithm: "sha256",
      }),
    ).toBe(false);
  });

  it("rejects a valid signature for a different secret", () => {
    const signature = hmac(payload, "sha256", "different-secret");
    expect(
      verifyHmacSignature(payload, {
        secret,
        signatureHeader: signature,
        algorithm: "sha256",
      }),
    ).toBe(false);
  });

  it("accepts a valid sha1 signature", () => {
    const signature = hmac(payload, "sha1", secret);
    expect(
      verifyHmacSignature(payload, {
        secret,
        signatureHeader: signature,
        algorithm: "sha1",
      }),
    ).toBe(true);
  });
});

function makeRequest(headers: Record<string, string>, body: string): Request {
  return new Request("https://shadowspark.tech/api/webhooks/test", {
    method: "POST",
    headers,
    body,
  });
}

describe("verifyGitHubWebhookSignature", () => {
  it("returns the body when the sha256= signature is valid", async () => {
    const signature = "sha256=" + hmac(payload, "sha256", secret);
    const request = makeRequest({ "x-hub-signature-256": signature }, payload);
    const result = await verifyGitHubWebhookSignature(request, secret);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.body).toBe(payload);
    }
  });

  it("rejects a missing header", async () => {
    const request = makeRequest({}, payload);
    const result = await verifyGitHubWebhookSignature(request, secret);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toContain("Missing X-Hub-Signature-256 header");
    }
  });

  it("rejects a tampered payload", async () => {
    const signature = "sha256=" + hmac(payload, "sha256", secret);
    const request = makeRequest({ "x-hub-signature-256": signature }, payload + "}");
    const result = await verifyGitHubWebhookSignature(request, secret);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toContain("Invalid GitHub webhook signature");
    }
  });
});

describe("verifyVercelWebhookSignature", () => {
  it("returns the body when the sha1 signature is valid", async () => {
    const signature = hmac(payload, "sha1", secret);
    const request = makeRequest({ "x-vercel-signature": signature }, payload);
    const result = await verifyVercelWebhookSignature(request, secret);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.body).toBe(payload);
    }
  });

  it("rejects a missing header", async () => {
    const request = makeRequest({}, payload);
    const result = await verifyVercelWebhookSignature(request, secret);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toContain("Missing X-Vercel-Signature header");
    }
  });

  it("rejects an invalid signature", async () => {
    const request = makeRequest({ "x-vercel-signature": "bad" }, payload);
    const result = await verifyVercelWebhookSignature(request, secret);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toContain("Invalid Vercel webhook signature");
    }
  });
});

describe("verifyMetaWebhookSignature", () => {
  it("returns the body when the sha1= signature is valid", async () => {
    const signature = "sha1=" + hmac(payload, "sha1", secret);
    const request = makeRequest({ "x-hub-signature-1": signature }, payload);
    const result = await verifyMetaWebhookSignature(request, secret);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.body).toBe(payload);
    }
  });

  it("rejects a missing header", async () => {
    const request = makeRequest({}, payload);
    const result = await verifyMetaWebhookSignature(request, secret);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toContain("Missing X-Hub-Signature-1 header");
    }
  });

  it("rejects a signature with the wrong prefix", async () => {
    const signature = "sha256=" + hmac(payload, "sha1", secret);
    const request = makeRequest({ "x-hub-signature-1": signature }, payload);
    const result = await verifyMetaWebhookSignature(request, secret);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toContain("Invalid Meta webhook signature");
    }
  });
});
