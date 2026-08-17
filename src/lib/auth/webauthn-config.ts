export interface WebAuthnConfig {
  rpID: string;
  rpName: string;
  origin: string;
  ceremonyTimeoutMs: 60_000;
}

const LOCAL_RP_ID = "localhost";
const LOCAL_ORIGIN = "http://localhost:3000";

/** Returns the configured WebAuthn relying-party values, failing closed. */
export function getWebAuthnConfig(): WebAuthnConfig {
  const isProduction = process.env.NODE_ENV === "production";
  const configuredRpID = process.env.WEBAUTHN_RP_ID?.trim();
  const configuredOrigin = process.env.WEBAUTHN_ORIGIN?.trim();

  if (isProduction && (!configuredRpID || !configuredOrigin)) {
    throw new Error("WebAuthn configuration is required in production");
  }

  const rpID = configuredRpID ?? LOCAL_RP_ID;
  const originInput = configuredOrigin ?? LOCAL_ORIGIN;

  if (/[/:]/u.test(rpID) || !rpID || rpID.includes(" ")) {
    throw new Error("WEBAUTHN_RP_ID must be a hostname without scheme or port");
  }

  let origin: string;
  try {
    const parsed = new URL(originInput);
    origin = parsed.origin;
  } catch {
    throw new Error("WEBAUTHN_ORIGIN must be a valid origin");
  }

  if (origin !== originInput) {
    throw new Error("WEBAUTHN_ORIGIN must not contain a path or trailing slash");
  }

  const isLocalOrigin = origin === LOCAL_ORIGIN;
  if (parsedProtocol(origin) !== "https:" && !isLocalOrigin) {
    throw new Error("WEBAUTHN_ORIGIN must use HTTPS outside local development");
  }

  return {
    rpID,
    rpName: "ShadowSpark Technologies",
    origin,
    ceremonyTimeoutMs: 60_000,
  };
}

function parsedProtocol(origin: string): string {
  return new URL(origin).protocol;
}
