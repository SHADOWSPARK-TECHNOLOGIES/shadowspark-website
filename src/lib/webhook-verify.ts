/**
 * Strict HMAC signature verification for inbound webhooks.
 *
 * This kills the gamification attack vector: spoofed GitHub/Meta/Vercel events
 * cannot produce a valid signature without the shared secret.
 *
 * All comparisons are timing-safe.
 */

import crypto from "node:crypto";

export interface WebhookVerifyOptions {
  secret: string;
  signatureHeader: string;
  algorithm?: "sha256" | "sha1";
  signaturePrefix?: string; // e.g. "sha256="
}

/**
 * Generic HMAC verifier. Use for any provider that signs payloads with a shared
 * secret delivered in an HTTP header.
 */
export function verifyHmacSignature(
  payload: string | Buffer,
  options: WebhookVerifyOptions,
): boolean {
  const { secret, signatureHeader, algorithm = "sha256", signaturePrefix } = options;

  let signature = signatureHeader;
  if (signaturePrefix && signature.startsWith(signaturePrefix)) {
    signature = signature.slice(signaturePrefix.length);
  }

  const expected = crypto
    .createHmac(algorithm, secret)
    .update(payload)
    .digest("hex");

  const sigBuf = Buffer.from(signature, "hex");
  const expectedBuf = Buffer.from(expected, "hex");

  if (sigBuf.length !== expectedBuf.length) {
    return false;
  }
  return crypto.timingSafeEqual(sigBuf, expectedBuf);
}

/**
 * GitHub-specific webhook verifier.
 *
 * GitHub sends: X-Hub-Signature-256: sha256=<hex>
 * The secret is configured in the GitHub App / webhook settings.
 */
export async function verifyGitHubWebhookSignature(
  request: Request,
  secret: string,
): Promise<{ ok: true; body: string } | { ok: false; error: string }> {
  const signature = request.headers.get("x-hub-signature-256") ?? "";
  if (!signature) {
    return { ok: false, error: "Missing X-Hub-Signature-256 header" };
  }

  const body = await request.text();
  const valid = verifyHmacSignature(body, {
    secret,
    signatureHeader: signature,
    algorithm: "sha256",
    signaturePrefix: "sha256=",
  });

  if (!valid) {
    return { ok: false, error: "Invalid GitHub webhook signature" };
  }

  return { ok: true, body };
}

/**
 * Vercel-specific webhook verifier (HMAC-SHA1).
 */
export async function verifyVercelWebhookSignature(
  request: Request,
  secret: string,
): Promise<{ ok: true; body: string } | { ok: false; error: string }> {
  const signature = request.headers.get("x-vercel-signature") ?? "";
  if (!signature) {
    return { ok: false, error: "Missing X-Vercel-Signature header" };
  }

  const body = await request.text();
  const valid = verifyHmacSignature(body, {
    secret,
    signatureHeader: signature,
    algorithm: "sha1",
  });

  if (!valid) {
    return { ok: false, error: "Invalid Vercel webhook signature" };
  }

  return { ok: true, body };
}

/**
 * Meta Graph webhook verifier uses a sha1 signature similar to Vercel.
 */
export async function verifyMetaWebhookSignature(
  request: Request,
  secret: string,
): Promise<{ ok: true; body: string } | { ok: false; error: string }> {
  const signature = request.headers.get("x-hub-signature-1") ?? "";
  if (!signature) {
    return { ok: false, error: "Missing X-Hub-Signature-1 header" };
  }

  const body = await request.text();
  const valid = verifyHmacSignature(body, {
    secret,
    signatureHeader: signature,
    algorithm: "sha1",
    signaturePrefix: "sha1=",
  });

  if (!valid) {
    return { ok: false, error: "Invalid Meta webhook signature" };
  }

  return { ok: true, body };
}
