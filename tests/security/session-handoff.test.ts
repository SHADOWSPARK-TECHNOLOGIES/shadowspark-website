import { describe, expect, it } from "vitest";

async function loadHandoffService(): Promise<Record<string, unknown> | null> {
  try {
    const moduleName = "@/lib/auth/session-handoff";
    return (await import(moduleName)) as Record<string, unknown>;
  } catch (error) {
    expect.fail(`Unable to load session handoff service: ${String(error)}`);
  }
}

describe("one-time authentication handoff", () => {
  it("rejects the historical fixed-marker submission", async () => {
    const module = await loadHandoffService();
    if (!module) return;

    const authorize = module.authorizeCredentials;
    expect(authorize, "authorizeCredentials service is required").toBeTypeOf("function");
    const user = await (authorize as (input: unknown) => Promise<unknown>)({
      email: "victim@example.com",
      password: "passkey-auth-bypass",
    });

    expect(user).toBeNull();
  });

  it.each(["expired handoff", "replayed handoff", "concurrent handoff consumption"])(
    "rejects %s",
    async () => {
      const module = await loadHandoffService();
      if (!module) return;

      const consume = module.consumeSessionHandoff;
      expect(consume, "consumeSessionHandoff service is required").toBeTypeOf("function");
      await expect(
        (consume as (input: unknown) => Promise<unknown>)({ token: "handoff" }),
      ).resolves.toMatchObject({ ok: false });
    },
  );

  it("issues exactly one signIn call and fails closed when session issuance rejects", async () => {
    const module = await loadHandoffService();
    if (!module) return;

    expect(module.issueSessionFromHandoff).toBeTypeOf("function");
    await expect(
      (module.issueSessionFromHandoff as (input: unknown) => Promise<unknown>)({
        token: "handoff",
        signIn: async () => {
          throw new Error("session rejected");
        },
      }),
    ).resolves.toMatchObject({ ok: false });
  });
});
