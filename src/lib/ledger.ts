import { prisma } from "@/lib/prisma";

// Infer the Prisma transaction client type from the extended prisma instance
type PrismaTransaction = Parameters<
  Parameters<typeof prisma.$transaction>[0]
>[0];

export class LedgerService {
  /**
   * Creates a balanced transaction in the ledger.
   * Optionally accepts a Prisma transaction client for atomicity.
   * @param params Transaction details
   * @param tx Optional Prisma transaction client
   */
  static async createTransaction(
    params: {
      userId: string;
      reference: string;
      idempotencyKey: string;
      entries: { accountId: string; amount: bigint }[];
    },
    tx?: PrismaTransaction
  ) {
    const totalAmount = params.entries.reduce((sum, entry) => sum + entry.amount, BigInt(0));
    if (totalAmount !== BigInt(0)) {
      throw new Error("Transaction entries are not balanced");
    }

    const client = tx ?? prisma;
    return client.ledgerTransaction.create({
      data: {
        userId: params.userId,
        reference: params.reference,
        idempotencyKey: params.idempotencyKey,
        status: "PENDING",
        entries: {
          create: params.entries.map((entry) => ({
            accountId: entry.accountId,
            amount: entry.amount,
          })),
        },
      },
    });
  }

  /**
   * Posts a transaction, making it final.
   * Optionally accepts a Prisma transaction client for atomicity.
   * @param transactionId The ID of the transaction to post
   * @param tx Optional Prisma transaction client
   */
  static async postTransaction(
    transactionId: string,
    tx?: PrismaTransaction
  ) {
    const client = tx ?? prisma;
    return client.ledgerTransaction.update({
      where: { id: transactionId },
      data: {
        status: "POSTED",
        postedAt: new Date(),
      },
    });
  }

  /**
   * Creates a transaction and immediately posts it in one step.
   * Optionally accepts a Prisma transaction client for atomicity.
   */
  static async createAndPost(
    params: {
      userId: string;
      reference: string;
      idempotencyKey: string;
      entries: { accountId: string; amount: bigint }[];
    },
    tx?: PrismaTransaction
  ) {
    const transaction = await this.createTransaction(params, tx);
    return this.postTransaction(transaction.id, tx);
  }

  /**
   * Calculates the balance of an account based on its posted entries
   * @param accountId The ID of the account
   * @param tx Optional Prisma transaction client
   */
  static async getBalance(
    accountId: string,
    tx?: PrismaTransaction
  ): Promise<bigint> {
    const client = tx ?? prisma;
    const result = await client.entry.aggregate({
      where: {
        accountId,
        transaction: {
          status: "POSTED",
        },
      },
      _sum: {
        amount: true,
      },
    });

    return result._sum.amount || BigInt(0);
  }
}
