/**
 * ₦2B VASP Capital Reserve Escrow Simulation
 *
 * Exercises the full hardening pipeline:
 *   1. Create a test lead with a WALLET account
 *   2. Seed ₦2,000,000,000+ into the wallet via double-entry
 *   3. Call checkAndProvisionCapitalReserve() to trigger DAX-tier escrow
 *   4. Verify escrow account creation + seed transaction
 *   5. Audit trail: confirm ∑Debits − ∑Credits = 0
 *
 * Run: npx tsx scripts/simulate-vasp-escrow.ts
 */

import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import "dotenv/config";
import { randomUUID } from "crypto";

// ── Bootstrap Prisma ─────────────────────────────────────────────────────

const connectionString = process.env.DATABASE_URL!;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// ── Constants ─────────────────────────────────────────────────────────────

const VASP_FLOOR_DAX = BigInt(2_000_000_000) * BigInt(100); // ₦2B in kobo
const ESCROW_AMOUNT = VASP_FLOOR_DAX;

// ── Helpers ───────────────────────────────────────────────────────────────

function fmtKobo(kobo: bigint): string {
  const naira = Number(kobo) / 100;
  return `₦${naira.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function divider(label: string) {
  console.log(`\n${"=".repeat(72)}`);
  console.log(`  ${label}`);
  console.log(`${"=".repeat(72)}`);
}

// ── Main Simulation ───────────────────────────────────────────────────────

async function main() {
  divider("🏦 VASP CAPITAL RESERVE ESCROW — INSTITUTIONAL SIMULATION");

  // 1. Create test lead + user
  const leadId = randomUUID();
  const leadName = "SIMULATED-INSTITUTIONAL-INVESTOR-LAGOS";
  const walletId = `SIM-WALLET-${leadId.slice(0, 8)}`;

  console.log(`\n📋 Lead ID:     ${leadId}`);
  console.log(`📋 Lead Name:   ${leadName}`);
  console.log(`📋 Wallet ID:   ${walletId}`);
  console.log(`📋 DAX Floor:   ${fmtKobo(VASP_FLOOR_DAX)}`);

  // 2. Create WALLET account for the lead
  divider("STEP 1: CREATE WALLET ACCOUNT");
  const wallet = await prisma.account.upsert({
    where: { id: walletId },
    update: {},
    create: {
      id: walletId,
      userId: leadId,
      type: "WALLET",
      currency: "NGN",
    },
  });
  console.log(`✅ Wallet created: ${wallet.id} (${wallet.type})`);

  // 3. Seed the wallet with ₦2.5B (above the ₦2B DAX threshold)
  divider("STEP 2: SEED WALLET WITH ₦2,500,000,000 (ABOVE DAX FLOOR)");

  // Use the system cash account as the funding source
  const cashAccountId = "11111111-1111-1111-1111-111111111111";

  const seedTxRef = `SIM-SEED-${leadId.slice(0, 8)}`;
  const seedIdemKey = `sim-seed-${leadId.slice(0, 8)}`;

  // Create the seed transaction manually to keep dependencies minimal
  const seedAmount = BigInt(2_500_000_000) * BigInt(100); // ₦2.5B

  const seededTx = await prisma.ledgerTransaction.create({
    data: {
      userId: leadId,
      reference: seedTxRef,
      description: `Simulation: Seed wallet for ${leadName}`,
      idempotencyKey: seedIdemKey,
      state: "POSTED",
      postedAt: new Date(),
      entries: {
        create: [
          {
            accountId: cashAccountId,
            debit: BigInt(0),
            credit: seedAmount,
            currency: "NGN",
            description: `Funding source → ${walletId}`,
          },
          {
            accountId: walletId,
            debit: seedAmount,
            credit: BigInt(0),
            currency: "NGN",
            description: `Initial wallet funding (simulation)`,
          },
        ],
      },
    },
    include: { entries: true },
  });
  console.log(`✅ Wallet seeded with ${fmtKobo(seedAmount)}`);
  console.log(`   Transaction: ${seededTx.id}`);
  console.log(`   Entries:     ${seededTx.entries.length} (2 = balanced double-entry)`);

  // Verify balance
  const preBalance = await prisma.entry.aggregate({
    where: {
      account: { userId: leadId, type: "WALLET" },
      transaction: { state: "POSTED" },
    },
    _sum: { debit: true, credit: true },
  });
  const preNet = (preBalance._sum.debit ?? BigInt(0)) - (preBalance._sum.credit ?? BigInt(0));
  console.log(`💰 Pre-escrow wallet balance: ${fmtKobo(preNet)}`);

  // 4. Call checkAndProvisionCapitalReserve
  divider("STEP 3: EXECUTE checkAndProvisionCapitalReserve()");
  console.log(`   Triggering DAX-tier escrow provisioning...`);

  // Dynamic import to avoid circular issues
  const { LedgerService } = await import("../src/lib/ledger/index");

  const result = await LedgerService.checkAndProvisionCapitalReserve(leadId, leadName);

  console.log(`\n📊 RESULT:`);
  console.log(`   VASP Tier:        ${result.vaspTier}`);
  console.log(`   Threshold Met:    ${result.thresholdMet}`);
  console.log(`   Wallet Balance:   ${fmtKobo(result.walletBalance)}`);
  console.log(`   Seed Amount:      ${fmtKobo(result.seedAmount)}`);

  if (result.escrowAccount) {
    console.log(`\n✅ ESCROW ACCOUNT PROVISIONED:`);
    console.log(`   Escrow ID:   ${result.escrowAccount.id}`);
    console.log(`   Escrow Type: ${result.escrowAccount.type}`);
  }

  if (result.seedTransactionId) {
    console.log(`\n✅ ESCROW SEED TRANSACTION:`);
    console.log(`   Tx ID:       ${result.seedTransactionId}`);

    // Fetch the seed transaction to verify entries
    const seedTx = await prisma.ledgerTransaction.findUnique({
      where: { id: result.seedTransactionId },
      include: { entries: true },
    });

    if (seedTx) {
      console.log(`   Reference:   ${seedTx.reference}`);
      console.log(`   State:       ${seedTx.state}`);
      console.log(`   Posted At:   ${seedTx.postedAt?.toISOString()}`);
      console.log(`   Entries:     ${seedTx.entries.length}`);

      for (const entry of seedTx.entries) {
        console.log(`      · ${entry.accountId} | debit: ${fmtKobo(entry.debit)} | credit: ${fmtKobo(entry.credit)}`);
      }

      // Verify double-entry balance
      const totalDebit = seedTx.entries.reduce((s, e) => s + e.debit, BigInt(0));
      const totalCredit = seedTx.entries.reduce((s, e) => s + e.credit, BigInt(0));
      const balanced = totalDebit === totalCredit;

      console.log(`\n🔢 DOUBLE-ENTRY VERIFICATION:`);
      console.log(`   ∑Debits  = ${fmtKobo(totalDebit)}`);
      console.log(`   ∑Credits = ${fmtKobo(totalCredit)}`);
      console.log(`   Balanced: ${balanced ? '✅ PASS' : '❌ FAIL'}`);
    }
  }

  // 5. Full audit trail — all transactions for this lead
  divider("STEP 4: FULL AUDIT TRAIL");

  const allTxns = await prisma.ledgerTransaction.findMany({
    where: { userId: leadId },
    include: { entries: true },
    orderBy: { createdAt: "asc" },
  });

  console.log(`\n📜 Transactions found: ${allTxns.length}`);
  for (const tx of allTxns) {
    const entrySummary = tx.entries.map(
      (e) => `${e.accountId.slice(0, 12)}… | D:${fmtKobo(e.debit)} C:${fmtKobo(e.credit)}`
    ).join("\n            ");
    console.log(`\n  [${tx.state}] ${tx.reference}`);
    console.log(`     ID: ${tx.id}`);
    console.log(`     Desc: ${tx.description ?? "(no description)"}`);
    console.log(`     ${entrySummary}`);
  }

  // 6. Final account balances
  divider("STEP 5: FINAL ACCOUNT BALANCES");

  const allAccounts = await prisma.account.findMany({
    where: { userId: leadId },
  });

  for (const acct of allAccounts) {
    const bal = await prisma.entry.aggregate({
      where: {
        accountId: acct.id,
        transaction: { state: "POSTED" },
      },
      _sum: { debit: true, credit: true },
    });
    const net = (bal._sum.debit ?? BigInt(0)) - (bal._sum.credit ?? BigInt(0));
    const sign = net >= BigInt(0) ? "DR" : "CR";
    console.log(`  ${acct.type.padEnd(12)} ${acct.id.slice(0, 12)}…  ${fmtKobo(net < BigInt(0) ? -net : net)} ${sign}`);
  }

  // 7. Global ledger balance check
  divider("STEP 6: GLOBAL LEDGER INVARIANT");

  const globalDebit = await prisma.entry.aggregate({
    where: { transaction: { state: "POSTED" } },
    _sum: { debit: true, credit: true },
  });
  const gDebit = globalDebit._sum.debit ?? BigInt(0);
  const gCredit = globalDebit._sum.credit ?? BigInt(0);

  console.log(`\n  Global ∑Debits:  ${fmtKobo(gDebit)}`);
  console.log(`  Global ∑Credits: ${fmtKobo(gCredit)}`);
  console.log(`  Difference:       ${fmtKobo(gDebit - gCredit)}`);
  console.log(`  Invariant:        ${gDebit === gCredit ? '✅ ∑D - ∑C = 0' : '❌ LEDGER DRIFT DETECTED'}`);

  // ── Summary ───────────────────────────────────────────────────────────
  divider("🏁 SIMULATION COMPLETE");
  console.log(`
  Tier Classification:      ${result.vaspTier}
  Escrow Provisioned:       ${result.escrowAccount ? '✅ YES' : '❌ NO'}
  Escrow ID:                ${result.escrowAccount?.id ?? 'N/A'}
  Seed Transaction:         ${result.seedTransactionId ?? 'N/A'}
  Wallet Balance (post):    ${fmtKobo(result.walletBalance)}
  Escrow Seed Amount:       ${fmtKobo(result.seedAmount)}
  Global Ledger Invariant:  ${gDebit === gCredit ? '✅ PASS' : '❌ FAIL'}
  `);

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error("\n❌ Simulation failed:", err);
  process.exit(1);
});
