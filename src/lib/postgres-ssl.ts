/**
 * Pin node-postgres TLS intent for connection strings.
 *
 * pg 8.x treats sslmode=require|prefer|verify-ca as aliases of verify-full and
 * warns that pg 9 / pg-connection-string 3 will switch those aliases to weaker
 * libpq semantics. When a string already names require/prefer/verify-ca, rewrite
 * it to verify-full so today's verification behavior stays explicit.
 *
 * sslmode=disable and an absent sslmode are left unchanged for local databases.
 * The connection string is never logged.
 */
export function pinPostgresTls(connectionString: string): string {
  let parsed: URL;
  try {
    parsed = new URL(connectionString);
  } catch {
    return connectionString;
  }

  const mode = parsed.searchParams.get("sslmode");
  if (mode === "require" || mode === "prefer" || mode === "verify-ca") {
    parsed.searchParams.set("sslmode", "verify-full");
  }
  return parsed.toString();
}
