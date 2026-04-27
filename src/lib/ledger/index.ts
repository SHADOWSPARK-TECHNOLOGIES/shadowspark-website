import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";
import { randomUUID } from "crypto";

// ──────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────

export type LedgerEntryInput = {
  accountId: string;
  /** Amount in kobo/subunits. Must be ≥0. One of debit or credit must be 0. */
  debit?: bigint;
  /** Amount in kobo/subunits. Must be ≥0. One of debit or credit must be 0. */
  credit?: bigint;
  currency?: string;
  description?: string;
};

export type TransactionState = "PENDING" | "POSTED" | "REVERSED";

// ──────────────────────────────────────────────────
// Transaction client type
// ──────────────────────────────────────────────────

/**
 * The Prisma interactive transaction client type, inferred from the
 * extended `prisma` instance.  Used to pass a transaction context
 * into `LedgerService` methods from a caller's `$transaction` block.
 */
export type PrismaTransaction = Parameters<
  Parameters<typeof prisma.$transaction>[0]
>[0];

// ──────────────────────────────────────────────────
// Internal helpers
// ──────────────────────────────────────────────────

function normalizeEntries(entries: LedgerEntryInput[]) {
  return entries.map((e) => ({
    accountId: e.accountId,
    debit: e.debit ?? BigInt(0),
    credit: e.credit ?? BigInt(0),
    currency: e.currency ?? "NGN",
    description: e.description ?? null,
  }));
}

function validateEntry(entry: {
  debit: bigint;
  credit: bigint;
}): void {
  if (entry.debit < BigInt(0) || entry.credit < BigInt(0)) {
    throw new Error("debit and credit must be non-negative");
  }
  if (entry.debit > BigInt(0) && entry.credit > BigInt(0)) {
    throw new Error("entry cannot have both debit and credit > 0");
  }
  if (entry.debit === BigInt(0) && entry.credit === BigInt(0)) {
    throw new Error("entry must have either debit or credit > 0");
  }
}

function validateBalanced(entries: { debit: bigint; credit: bigint }[]): void {
  const totalDebit = entries.reduce((s, e) => s + e.debit, BigInt(0));
  const totalCredit = entries.reduce((s, e) => s + e.credit, BigInt(0));
  if (totalDebit !== totalCredit) {
    throw new Error(
      `Transaction not balanced: total debit ${totalDebit} ≠ total credit ${totalCredit}`
    );
  }
}

// ──────────────────────────────────────────────────
// LedgerService — Public API
// ──────────────────────────────────────────────────

export class LedgerService {
  /**
   * Post a double-entry transaction atomically.
   *
   * 1. Validates each entry (non-negative, exclusive debit/credit).
   * 2. Validates that total debits = total credits.
   * 3. Creates the LedgerTransaction (PENDING) + Entries.
   * 4. Posts it (POSTED).
   *
   * If `tx` is provided the entire operation runs inside that
   * parent transaction (for composition with other writes).
   */
  static async postTransaction(
    params: {
      userId: string;
      reference: string;
      idempotencyKey: string;
      description?: string;
      entries: LedgerEntryInput[];
    },
    tx?: PrismaTransaction
  ): Promise<{
    transactionId: string;
    state: TransactionState;
  }> {
    const client = tx ?? prisma;
    const normalized = normalizeEntries(params.entries);

    // Validate entry-level rules
    normalized.forEach(validateEntry);
    // Validate double-entry balance
    validateBalanced(normalized);

    const run = async (c: typeof client) => {
      // Create the transaction in PENDING state with entries
      const transaction = await c.ledgerTransaction.create({
        data: {
          userId: params.userId,
          reference: params.reference,
          description: params.description ?? null,
          idempotencyKey: params.idempotencyKey,
          state: "PENDING",
          postedAt: null,
          entries: {
            create: normalized.map((e) => ({
              accountId: e.accountId,
              debit: e.debit,
              credit: e.credit,
              currency: e.currency,
              description: e.description,
            })),
          },
        },
        select: { id: true },
      });

      // Also record idempotency key in the dedicated table
      await c.ledgerIdempotency.create({
        data: {
          idempotencyKey: params.idempotencyKey,
          transactionId: transaction.id,
        },
      });

      // Post it
      await c.ledgerTransaction.update({
        where: { id: transaction.id },
        data: {
          state: "POSTED",
          postedAt: new Date(),
        },
      });

      return { transactionId: transaction.id, state: "POSTED" as TransactionState };
    };

    if (tx) return run(tx);
    return prisma.$transaction((c) => run(c as unknown as PrismaTransaction));
  }

  /**
   * Reverse a transaction.
   *
   * State machine:
   *   PENDING → REVERSED (never posted, just discard)
   *   POSTED  → REVERSED (create mirror entries to unwind)
   *
   * Returns the reversal transaction ID (new if POSTED → REVERSED).
   */
  static async reverseTransaction(
    transactionId: string,
    reason?: string,
    tx?: PrismaTransaction
  ): Promise<{
    reversalId: string;
    originalState: TransactionState;
  }> {
    const client = tx ?? prisma;

    const run = async (c: typeof client) => {
      // Fetch the current transaction with entries
      const original = await c.ledgerTransaction.findUnique({
        where: { id: transactionId },
        include: { entries: true },
      });

      if (!original) {
        throw new Error(`Transaction not found: ${transactionId}`);
      }
      if (original.state === "REVERSED") {
        throw new Error(`Transaction ${transactionId} is already reversed`);
      }

      const prevState = original.state as TransactionState;

      if (original.state === "PENDING") {
        // Simply mark as reversed — no entries were ever posted
        await c.ledgerTransaction.update({
          where: { id: transactionId },
          data: {
            state: "REVERSED",
            postedAt: null,
          },
        });
        return { reversalId: transactionId, originalState: "PENDING" as TransactionState };
      }

      // POSTED → REVERSED: create mirror reversal entries
      // Mirror = swap debit ↔ credit for each original entry
      const reversalEntries = original.entries.map((e) => ({
        accountId: e.accountId,
        debit: e.credit, // original credit becomes reversal debit
        credit: e.debit, // original debit becomes reversal credit
        currency: e.currency,
        description: `[REVERSAL] ${reason ?? "No reason provided"}`,
      }));

      const reversalRef = `REV-${original.reference}`;
      const reversalKey = `rev-${original.idempotencyKey}`;

      const reversal = await c.ledgerTransaction.create({
        data: {
          userId: original.userId,
          reference: reversalRef,
          description: `Reversal of ${original.reference}: ${reason ?? "No reason"}`,
          idempotencyKey: reversalKey,
          state: "POSTED",
          postedAt: new Date(),
          entries: {
            create: reversalEntries,
          },
        },
        select: { id: true },
      });

      // Mark original as reversed
      await c.ledgerTransaction.update({
        where: { id: transactionId },
        data: { state: "REVERSED" },
      });

      return { reversalId: reversal.id, originalState: "POSTED" as TransactionState };
    };

    if (tx) return run(tx);
    return prisma.$transaction((c) => run(c as unknown as PrismaTransaction));
  }

  /**
   * Get the current (or as-of) balance of an account.
   *
   * Balance = sum(debits) - sum(credits) for POSTED entries.
   *
   * A positive result means the account has a net debit balance
   * (normal for asset/expense accounts).
   * A negative result means net credit balance
   * (normal for liability/revenue/equity accounts).
   */
  static async getAccountBalance(
    accountId: string,
    asOfDate?: Date,
    tx?: PrismaTransaction
  ): Promise<{
    accountId: string;
    netDebit: bigint;
    netCredit: bigint;
    /** netDebit - netCredit */
    balance: bigint;
    asOf: Date | null;
  }> {
    const client = tx ?? prisma;

    const whereBase: Prisma.EntryWhereInput = {
      accountId,
      transaction: {
        state: "POSTED",
      },
    };

    if (asOfDate) {
      whereBase.createdAt = { lte: asOfDate };
    }

    const result = await client.entry.aggregate({
      where: whereBase,
      _sum: {
        debit: true,
        credit: true,
      },
    });

    const netDebit = result._sum.debit ?? BigInt(0);
    const netCredit = result._sum.credit ?? BigInt(0);
    const balance = netDebit - netCredit;

    return {
      accountId,
      netDebit,
      netCredit,
      balance,
      asOf: asOfDate ?? null,
    };
  }

  /**
   * Ensure an account exists, creating it if necessary.
   *
   * The `code` is used as the account `id` (UUID format expected for
   * consistency with existing seed accounts like 1111...).
   * If an account with this ID already exists, it is returned as-is.
   */
  static async ensureAccount(
    params: {
      id: string;
      userId: string;
      type: string;
      currency?: string;
    },
    tx?: PrismaTransaction
  ) {
    const client = tx ?? prisma;
    return client.account.upsert({
      where: { id: params.id },
      update: {},
      create: {
        id: params.id,
        userId: params.userId,
        type: params.type,
        currency: params.currency ?? "NGN",
      },
    });
  }

  /**
   * Auto-provision an Escrow: Capital Reserve LIABILITY account for a VASP
   * institutional lead.  The account is created/retrieved via ensureAccount()
   * and stored under the code `ESCROW-<first 8 chars of leadId>`.
   *
   * @param leadId              The lead's UUID
   * @param leadName            Human-readable name for the escrow account
   * @param estimatedLiquidity  Self-reported liquidity in kobo (₦0.01 units)
   * @returns                   The created or existing Account record
   */
  static async provisionVaspEscrowAccount(
    leadId: string,
    leadName: string,
    estimatedLiquidity: bigint
  ) {
    const escrowCode = `ESCROW-${leadId.slice(0, 8)}`;
    const description = `Escrow: Capital Reserve - ${leadName}`;

    return LedgerService.ensureAccount({
      id: escrowCode,
      userId: leadId, // use leadId as the owning userId for traceability
      type: 'liability',
      currency: 'NGN',
    });
  }
}

// ──────────────────────────────────────────────────
// Backward-compatible alias
// ──────────────────────────────────────────────────

/**
 * Legacy functions that mirror the old `src/lib/ledger.ts` API
 * using the new debit/credit schema.
 */

/** Helper: convert a signed amount (positive=credit, negative=debit)
 *  to the new { debit, credit } format for a single entry. */
export function signedToDual(
  signed: bigint
): { debit: bigint; credit: bigint } {
  if (signed >= BigInt(0)) {
    return { debit: BigInt(0), credit: signed };
  }
  return { debit: -signed, credit: BigInt(0) };
}

/** Helper: convert { debit, credit } back to signed amount. */
export function dualToSigned(debit: bigint, credit: bigint): bigint {
  // net = credit - debit (positive = credit balance)
  return credit - debit;
}
