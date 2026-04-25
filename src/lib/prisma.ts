import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const pool = new pg.Pool({ connectionString });
  const adapter = new PrismaPg(pool);

  const baseClient = new PrismaClient({ adapter });

  return baseClient.$extends({
    query: {
      systemEvent: {
        async create({ args, query }) {
          const result = await query(args);

          if (args.data.type === "intent_signal") {
            const metadata = args.data.metadata as any;
            const leadId = metadata?.leadId;

            if (leadId) {
              // Dynamic import prevents circular dependency issues
              import("./scoring/engine")
                .then(({ evaluateIntentSignal }) => {
                  const delta = evaluateIntentSignal(metadata);

                  if (delta > 0) {
                    // Fire-and-forget the increment update
                    baseClient.lead.update({
                      where: { id: leadId },
                      data: { leadScore: { increment: delta } },
                    }).catch((err) =>
                      console.error("[Scoring Engine] Failed to update lead score:", err)
                    );
                  }
                })
                .catch((err) =>
                  console.error("[Scoring Engine] Failed to load engine:", err)
                );
            }
          }

          return result;
        },
      },
    },
  });
}

type ExtendedPrismaClient = ReturnType<typeof createPrismaClient>;
const globalForPrisma = global as unknown as { prisma?: ExtendedPrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  (() => {
    const client = createPrismaClient();
    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = client;
    }
    return client;
  })();
