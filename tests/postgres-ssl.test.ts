import { describe, expect, it } from "vitest";

import { pinPostgresTls } from "@/lib/postgres-ssl";

const base = "postgresql://shadowspark:secret-value@db.example.test:5432/app";

describe("PostgreSQL TLS pinning", () => {
  it("rewrites pg 8 alias modes to explicit verify-full", () => {
    expect(pinPostgresTls(`${base}?sslmode=require`)).toContain("sslmode=verify-full");
    expect(pinPostgresTls(`${base}?sslmode=prefer`)).toContain("sslmode=verify-full");
    expect(pinPostgresTls(`${base}?sslmode=verify-ca`)).toContain("sslmode=verify-full");
  });

  it("preserves verify-full and disable", () => {
    expect(pinPostgresTls(`${base}?sslmode=verify-full`)).toContain("sslmode=verify-full");
    expect(pinPostgresTls(`${base}?sslmode=disable`)).toContain("sslmode=disable");
  });

  it("does not invent sslmode for local strings that omit it", () => {
    expect(pinPostgresTls(base)).not.toContain("sslmode=");
  });

  it("does not weaken certificate verification", () => {
    const pinned = pinPostgresTls(`${base}?sslmode=require`);
    expect(pinned).not.toMatch(/sslmode=require(?:&|$)/);
    expect(pinned).not.toContain("rejectUnauthorized=false");
  });
});
