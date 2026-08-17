import { z } from "zod";

const base64url = z.string().min(1).regex(/^[A-Za-z0-9_-]+$/u);
const extensionResults = z.record(z.string(), z.unknown());
const transports = z.array(z.enum(["ble", "hybrid", "internal", "nfc", "usb"]));

const responseMetadata = {
  id: base64url,
  rawId: base64url,
  type: z.literal("public-key"),
  clientExtensionResults: extensionResults,
};

export const registrationResponseSchema = z
  .object({
    ...responseMetadata,
    authenticatorAttachment: z.enum(["cross-platform", "platform"]).optional(),
    response: z
      .object({
        clientDataJSON: base64url,
        attestationObject: base64url,
        authenticatorData: base64url.optional(),
        transports: transports.optional(),
        publicKeyAlgorithm: z.number().int().optional(),
        publicKey: base64url.optional(),
      })
      .strict(),
  })
  .strict();

export const authenticationResponseSchema = z
  .object({
    ...responseMetadata,
    authenticatorAttachment: z.enum(["cross-platform", "platform"]).optional(),
    response: z
      .object({
        clientDataJSON: base64url,
        authenticatorData: base64url,
        signature: base64url,
        userHandle: base64url.optional(),
      })
      .strict(),
  })
  .strict();
