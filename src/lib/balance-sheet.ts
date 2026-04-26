import { prisma } from "@/lib/prisma";

// ──────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────

export type BalanceSheetAccount = {
  id: string;
  type: string;
  currency: string;
  /** Raw signed balance in Kobo (positive=credit, negative=debit) */
  rawBalance: bigint;
  /** Display value — always positive with direction context */
  displayBalance: number;
  /** Human-readable direction */
  nature: "debit" | "credit";
};

export type BalanceSheetCategory = {
  label: string;
  total: number;
  accounts: BalanceSheetAccount[];
};

export type SovereignBalanceSheet = {
  assets: BalanceSheetCategory;
  liabilities: BalanceSheetCategory;
  equity: BalanceSheetCategory;
  /** Total Assets should equal Total Liabilities + Total Equity */
  isBalanced: boolean;
  /** Total Assets in Naira */
  totalAssets: number;
  /** Total Liabilities + Equity in Naira */
  totalLiabilitiesPlusEquity: number;
  /** When the report was generated */
  timestamp: Date;
};

// ──────────────────────────────────────────────────
// Service
// ──────────────────────────────────────────────────

/**
 * Aggregates all ledger accounts into a real-time
 * Assets / Liabilities / Equity balance sheet report.
 *
 * Accounting convention:
 *   Assets (WALLET)        → Debit-natural  → display as positive
 *   Expenses (EXPENSE)     → Debit-natural  → subtracted from Equity
 *   Revenue (INCOME)       → Credit-natural → added to Equity
 *   Liabilities (CLEARING) → Credit-natural → displayed as positive
 *
 * Formula:  Assets = Liabilities + Equity
 */
export async function getSovereignBalanceSheet(): Promise<SovereignBalanceSheet> {
  // Fetch all accounts with their posted-entry balances
  const accounts = await prisma.account.findMany({
    include: {
      entries: {
        where: {
          transaction: {
            status: "POSTED",
          },
        },
        select: { amount: true },
      },
    },
  });

  const now = new Date();

  // Compute raw balances per account
  const accountBalances: BalanceSheetAccount[] = accounts.map((acct) => {
    const rawBalance = acct.entries.reduce(
      (sum, e) => sum + e.amount,
      BigInt(0)
    );

    // Display logic per account type
    let displayBalance: number;
    let nature: "debit" | "credit";

    switch (acct.type) {
      // ── ASSETS (WALLET) ──
      // Natural balance is DEBIT (negative in system).
      // Display as positive when in a debit position.
      case "WALLET": {
        if (rawBalance < BigInt(0)) {
          // More debits than credits → healthy asset position
          displayBalance = Number(-rawBalance) / 100;
          nature = "debit";
        } else {
          // Overdrawn / negative asset position
          displayBalance = Number(rawBalance) / 100;
          nature = "credit";
        }
        break;
      }

      // ── LIABILITIES (CLEARING) ──
      // Natural balance is CREDIT (positive in system).
      case "CLEARING": {
        if (rawBalance > BigInt(0)) {
          displayBalance = Number(rawBalance) / 100;
          nature = "credit";
        } else {
          displayBalance = Number(-rawBalance) / 100;
          nature = "debit";
        }
        break;
      }

      // ── REVENUE (INCOME) ──
      // Natural balance is CREDIT (positive).
      case "INCOME": {
        if (rawBalance > BigInt(0)) {
          displayBalance = Number(rawBalance) / 100;
          nature = "credit";
        } else {
          displayBalance = Number(-rawBalance) / 100;
          nature = "debit";
        }
        break;
      }

      // ── EXPENSES ──
      // Natural balance is DEBIT (negative in system).
      case "EXPENSE": {
        if (rawBalance < BigInt(0)) {
          displayBalance = Number(-rawBalance) / 100;
          nature = "debit";
        } else {
          displayBalance = Number(rawBalance) / 100;
          nature = "credit";
        }
        break;
      }

      default: {
        displayBalance = Number(rawBalance) / 100;
