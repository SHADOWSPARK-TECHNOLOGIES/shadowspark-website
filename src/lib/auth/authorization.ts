export type AppRole = "user" | "admin";

export function isAppRole(value: unknown): value is AppRole {
  return value === "user" || value === "admin";
}

export function hasConcreteIdentity(
  user: { id?: unknown } | null | undefined,
): user is { id: string } {
  return typeof user?.id === "string" && user.id.length > 0;
}

export function hasAdminIdentity(
  user: { id?: unknown; role?: unknown } | null | undefined,
): user is { id: string; role: "admin" } {
  return (
    typeof user?.id === "string" &&
    user.id.length > 0 &&
    user.role === "admin"
  );
}

export function canAccessPath(
  pathname: string,
  user: { id?: unknown; role?: unknown } | null | undefined,
): boolean {
  if (pathname.startsWith("/admin") || pathname.startsWith("/operator")) {
    return hasAdminIdentity(user);
  }
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/finance") ||
    pathname.startsWith("/support")
  ) {
    return hasConcreteIdentity(user);
  }
  return true;
}

/** Compatibility name used by security regression tests and route guards. */
export function canAccessPrivilegedRoute(
  user: { id?: unknown; role?: unknown } | null | undefined,
): boolean {
  return hasAdminIdentity(user);
}
