"use server";

import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { LedgerService } from "@/lib/ledger";

export async function addExpense(userId: string, amountInNaira: number, description: string) {
  const amountInKobo = BigInt(amountInNaira * 100);
  
  // Start a transaction for Dual-Write Engine
  return await prisma.$transaction(async (tx) => {
    // 1. Create the legacy Expense record (using SystemEvent since Expense model doesn't exist)
    const legacyExpense = await tx.systemEvent.create({
      data: {
        type: "EXPENSE",
        message: description,
        metadata: {
          userId,
          amount: Number(amountInKobo),
          currency: "NGN",
        },
      },
    });

    const reference = `EXP-${legacyExpense.id}`;
    const idempotencyKey = crypto.randomUUID();

    // 2. Use LedgerService to create a balanced transaction
    // Debit Operating Expense (positive amount means credit? Wait. 
    // Standard accounting: Assets (Cash) normal balance is Debit.
    // Expenses normal balance is Debit.
    // "Debit the Operating Expense account (2222...) and Credit the Cash account (1111...)"
    // The LedgerService schema: positive = credit, negative = debit.
    // So Operating Expense (2222...) = -amount (Debit)
    // Cash account (1111...) = +amount (Credit)
    // Let's verify: Wait, in the schema it says `// positive = credit, negative = debit, in Kobo`.
    // Debit Operating Expense -> amount is negative.
    // Credit Cash -> amount is positive.
    
    // Create the transaction
    const transaction = await LedgerService.createTransaction({
      userId,
      reference,
      idempotencyKey,
      entries: [
        {
          accountId: "22222222-2222-2222-2222-222222222222", // Operating Expense
          amount: -amountInKobo,
        },
        {
          accountId: "11111111-1111-1111-1111-111111111111", // Cash
          amount: amountInKobo,
        },
      ],
    });

    // Post the transaction
    await LedgerService.postTransaction(transaction.id);

    return { success: true, reference };
  });
}
