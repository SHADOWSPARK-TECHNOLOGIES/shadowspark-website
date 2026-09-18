import { createHmac, timingSafeEqual } from "node:crypto";

export function verifyMetaSignature(
  rawBody: string,
  signatureHeader: string | null | undefined,
  appSecret: string,
): boolean {
  if (!appSecret || !signatureHeader) return false;

  const prefix = "sha256=";
  if (!signatureHeader.startsWith(prefix)) return false;
  const providedHex = signatureHeader.slice(prefix.length).trim();
  if (!/^[0-9a-fA-F]+$/.test(providedHex) || providedHex.length !== 64) {
    return false;
  }

  const expected = createHmac("sha256", appSecret).update(rawBody, "utf8").digest();
  const provided = Buffer.from(providedHex, "hex");
  if (provided.length !== expected.length) return false;
  return timingSafeEqual(provided, expected);
}
