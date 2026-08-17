import { describe, expect, it } from "vitest";

async function loadAuthorization(): Promise<Record<string, unknown> | null> {
  try {
    const moduleName = "@/lib/auth/authorization";
    return (await import(moduleName)) as Record<string, unknown>;
  } catch (error) {
    expect.fail(`Unable to load authorization service: ${String(error)}`);
  }
}

describe("concrete identity and typed authorization", () => {
  it.each([null, {}, { role: "admin" }, { id: "", role: "admin" }])(
    "rejects protected identity %j",
    async (user) => {
      const authz = await loadAuthorization();
      if (!authz) return;

      const hasConcreteIdentity = authz.hasConcreteIdentity;
      expect(hasConcreteIdentity, "hasConcreteIdentity service is required").toBeTypeOf(
        "function",
      );
      expect(
        (hasConcreteIdentity as (input: unknown) => boolean)(user),
      ).toBe(false);
    },
  );

  it("rejects a concrete non-admin from operator routes", async () => {
    const authz = await loadAuthorization();
    if (!authz) return;

    const canAccessPrivilegedRoute = authz.canAccessPrivilegedRoute;
    expect(
      canAccessPrivilegedRoute,
      "canAccessPrivilegedRoute service is required",
    ).toBeTypeOf("function");
    expect(
      (canAccessPrivilegedRoute as (input: unknown) => boolean)({
        id: "user-1",
        role: "user",
      }),
    ).toBe(false);
  });
});
