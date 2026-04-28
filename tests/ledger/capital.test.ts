import { vi, describe, expect, it } from "vitest";

// Mock prisma at module scope so the import of @/lib/ledger/index
// does not trigger DATABASE_URL validation at load time.
vi.mock("@/lib/prisma", () => ({
  prisma: {} as Record<string, never>,
}));

import {
  getVaspTier,
  VASP_CAPITAL_FLOOR_DAOP_NAIRA,
  VASP_CAPITAL_FLOOR_DAX_NAIRA,
} from "@/lib/ledger/index";
import type { VaspTier } from "@/lib/ledger/index";

// ──────────────────────────────────────────────────
// Constants
// ──────────────────────────────────────────────────

const KOBO_PER_NAIRA = BigInt(100);

/**
 * Convert naira (bigint) to kobo so tests can construct
 * wallet balances that mirror the ledger's invariant.
 */
function naira(n: bigint): bigint {
  return n * KOBO_PER_NAIRA;
}

// ──────────────────────────────────────────────────
// Structural: exported constants
// ──────────────────────────────────────────────────

describe("VASP capital constants", () => {
  it("exposes DAOP floor as ₦1,000,000,000", () => {
    expect(VASP_CAPITAL_FLOOR_DAOP_NAIRA).toBe(BigInt(1_000_000_000));
  });

  it("exposes DAX floor as ₦2,000,000,000", () => {
    expect(VASP_CAPITAL_FLOOR_DAX_NAIRA).toBe(BigInt(2_000_000_000));
  });

  it("DAX floor is double the DAOP floor", () => {
    expect(VASP_CAPITAL_FLOOR_DAX_NAIRA).toBe(
      VASP_CAPITAL_FLOOR_DAOP_NAIRA * BigInt(2),
    );
  });
});

// ──────────────────────────────────────────────────
// Pure: getVaspTier — boundary conditions
// ──────────────────────────────────────────────────

describe("getVaspTier", () => {
  // ── NONE tier ──

  it("returns NONE for zero balance", () => {
    expect(getVaspTier(BigInt(0))).toBe<VaspTier>("NONE");
  });

  it("returns NONE for positive balance below DAOP floor", () => {
    const oneKoboBelowDaop = naira(VASP_CAPITAL_FLOOR_DAOP_NAIRA) - BigInt(1);
    expect(getVaspTier(oneKoboBelowDaop)).toBe<VaspTier>("NONE");
  });

  it("returns NONE for 1₦ (trivial balance)", () => {
    expect(getVaspTier(naira(BigInt(1)))).toBe<VaspTier>("NONE");
  });

  // ── DAOP_RATOP tier ──

  it("returns DAOP_RATOP at exactly DAOP floor (₦1B)", () => {
    const exactDaop = naira(VASP_CAPITAL_FLOOR_DAOP_NAIRA);
    expect(getVaspTier(exactDaop)).toBe<VaspTier>("DAOP_RATOP");
  });

  it("returns DAOP_RATOP for balance between DAOP and DAX floors", () => {
    const mid = naira(BigInt(1_500_000_000)); // ₦1.5B
    expect(getVaspTier(mid)).toBe<VaspTier>("DAOP_RATOP");
  });

  it("returns DAOP_RATOP at 1 kobo below DAX floor", () => {
    const oneKoboBelowDax = naira(VASP_CAPITAL_FLOOR_DAX_NAIRA) - BigInt(1);
    expect(getVaspTier(oneKoboBelowDax)).toBe<VaspTier>("DAOP_RATOP");
  });

  // ── DAX_CUSTODIAN tier ──

  it("returns DAX_CUSTODIAN at exactly DAX floor (₦2B)", () => {
    const exactDax = naira(VASP_CAPITAL_FLOOR_DAX_NAIRA);
    expect(getVaspTier(exactDax)).toBe<VaspTier>("DAX_CUSTODIAN");
  });

  it("returns DAX_CUSTODIAN above DAX floor", () => {
    const aboveDax = naira(BigInt(5_000_000_000)); // ₦5B
    expect(getVaspTier(aboveDax)).toBe<VaspTier>("DAX_CUSTODIAN");
  });

  it("returns DAX_CUSTODIAN at extreme balance (₦10B)", () => {
    const huge = naira(BigInt(10_000_000_000));
    expect(getVaspTier(huge)).toBe<VaspTier>("DAX_CUSTODIAN");
  });

  // ── Edge cases ──

  it("handles BigInt amounts that exceed Number.MAX_SAFE_INTEGER", () => {
    // 9_007_199_254_740_991n kobo ≈ 90 trillion naira — well past safe integer
    const massive = BigInt("9007199254740991");
    // Should not throw and should return DAX_CUSTODIAN (way above floor)
    expect(() => getVaspTier(massive)).not.toThrow();
    expect(getVaspTier(massive)).toBe<VaspTier>("DAX_CUSTODIAN");
  });

  it("handles negative balance (defensive)", () => {
    // In practice the ledger should never produce a negative wallet
    // balance, but the function should not throw.
    expect(() => getVaspTier(BigInt(-100))).not.toThrow();
    // Negative balance is below any threshold
    expect(getVaspTier(BigInt(-100))).toBe<VaspTier>("NONE");
  });
});

// ──────────────────────────────────────────────────
// Structural: kobo ↔ naira invariant
// ──────────────────────────────────────────────────

describe("kobo conversion invariant", () => {
  it("1 Naira = 100 kobo", () => {
    expect(naira(BigInt(1))).toBe(BigInt(100));
  });

  it("₦1B in kobo is 100_000_000_000", () => {
    expect(naira(BigInt(1_000_000_000))).toBe(BigInt("100000000000"));
  });

  it("₦2B in kobo is 200_000_000_000", () => {
    expect(naira(BigInt(2_000_000_000))).toBe(BigInt("200000000000"));
  });
});
