function isNetlifyPreviewContext(): boolean {
  const context = process.env.CONTEXT?.trim();
  if (context === "deploy-preview" || context === "branch-deploy") return true;
  if (process.env.NETLIFY !== "true" || context === "production") return false;
  return (process.env.DEPLOY_PRIME_URL ?? "").includes("deploy-preview");
}

export function validateEnv() {
  const preview = isNetlifyPreviewContext();
  const required = preview ? [] : ["DATABASE_URL", "AUTH_SECRET"];

  const conditionalOnPayments = [
    "PAYSTACK_SECRET_KEY",
    "PAYSTACK_PUBLIC_KEY",
  ];

  const conditionalOnOAuth = [
    "GITHUB_CLIENT_ID",
    "GITHUB_CLIENT_SECRET",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
  ];

  const hasWhatsAppToken =
    Boolean(process.env.WHATSAPP_API_TOKEN?.trim()) ||
    Boolean(process.env.META_ACCESS_TOKEN?.trim());
  const hasWhatsAppPhone =
    Boolean(process.env.WHATSAPP_PHONE_NUMBER_ID?.trim()) ||
    Boolean(process.env.META_PHONE_NUMBER_ID?.trim());

  const missing: string[] = [];

  if (process.env.NODE_ENV === "production" && !preview) {
    for (const key of ["WEBAUTHN_RP_ID", "WEBAUTHN_ORIGIN"]) {
      if (!process.env[key]?.trim()) missing.push(key);
    }
  }

  for (const key of required) {
    if (!process.env[key]?.trim()) missing.push(key);
  }

  if (process.env.PAYMENTS_ENABLED === "true") {
    for (const key of conditionalOnPayments) {
      if (!process.env[key]?.trim()) missing.push(key);
    }
    const sk = process.env.PAYSTACK_SECRET_KEY ?? "";
    if (sk && !sk.startsWith("sk_")) {
      throw new Error(`FATAL: PAYSTACK_SECRET_KEY must start with "sk_". Got: ${sk.slice(0, 6)}...`);
    }
  }

  if (process.env.OAUTH_ENABLED === "true") {
    for (const key of conditionalOnOAuth) {
      if (!process.env[key]?.trim()) missing.push(key);
    }
  }

  if (process.env.WHATSAPP_ENABLED === "true") {
    if (!hasWhatsAppToken) missing.push("WHATSAPP_API_TOKEN|META_ACCESS_TOKEN");
    if (!hasWhatsAppPhone) {
      missing.push("WHATSAPP_PHONE_NUMBER_ID|META_PHONE_NUMBER_ID");
    }
  }

  const dbUrl = process.env.DATABASE_URL ?? "";
  if (dbUrl && !dbUrl.startsWith("postgresql://") && !dbUrl.startsWith("postgres://")) {
    throw new Error(`FATAL: DATABASE_URL must start with "postgresql://" or "postgres://". Got: ${dbUrl.slice(0, 20)}...`);
  }

  if (missing.length > 0) {
    throw new Error(
      `FATAL: Missing required environment variables:\n${missing.map((k) => `  - ${k}`).join("\n")}\nServer cannot start.`
    );
  }

  if (preview) {
    console.warn(
      "[boot] Netlify preview: DATABASE_URL/AUTH_SECRET/WebAuthn not required at boot. Credentialed routes stay fail-closed."
    );
  }

  console.log(
    "[boot] Features: payments=%s oauth=%s whatsapp=%s",
    process.env.PAYMENTS_ENABLED ?? "false",
    process.env.OAUTH_ENABLED ?? "false",
    process.env.WHATSAPP_ENABLED ?? "false"
  );
}
