export type SecurityLogCategory =
  | "webauthn_registration_options"
  | "webauthn_registration_verification"
  | "webauthn_authentication_options"
  | "webauthn_authentication_verification";

/** Emits only safe diagnostic metadata; request bodies and error messages stay private. */
export function logSecurityEvent(
  category: SecurityLogCategory,
  requestId: string,
  error?: unknown,
): void {
  const errorName = error instanceof Error ? error.name : undefined;
  console.error("[security]", {
    category,
    requestId,
    ...(errorName ? { errorName } : {}),
  });
}
