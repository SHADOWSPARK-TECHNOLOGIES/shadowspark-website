import { PrismaClient, AccountType } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const pool = new pg.Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  console.log("🏦 INITIATING SOVEREIGN CHART OF ACCOUNTS...");

  const SYSTEM_ACCOUNTS = [
    {
      id: "11111111-1111-4111-8111-111111111111",
      name: "Corporate Settlement Account (NGN)",
      type: AccountType.ASSET,
      metadata: { provider: "GTBank / Paystack", description: "Main operational liquidity" }
    },
    {
      id: "22222222-2222-4222-8222-222222222222",
      name: "Operating Expenses",
      type: AccountType.EXPENSE,
      metadata: { category: "Internal Operations & Cloud Infrastructure" }
    },
    {
      id: "33333333-3333-4333-8333-333333333333",
      name: "Platform Revenue",
      type: AccountType.REVENUE,
      metadata: { category: "SaaS Subscriptions & Licensing" }
    },
    {
      id: "44444444-4444-4444-8444-444444444444",
      name: "Retained Earnings & Equity",
      type: AccountType.EQUITY,
      metadata: { category: "Capital" }
    }
  ];

  for (const account of SYSTEM_ACCOUNTS) {
    await prisma.account.upsert({
      where: { id: account.id },
      update: {},
      create: {
        id: account.id,
        name: account.name,
        type: account.type,
        metadata: account.metadata as any
      }
    });
    console.log(`✅ VERIFIED [${account.type}]: ${account.name}`);
  }

  const email = "admin@shadowspark.com";
  const password = await bcrypt.hash("password", 10);
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password,
      role: "admin",
    },
  });
  console.log(`✅ Seeded admin user: ${email}`);
  
  console.log("\n🔒 CHART OF ACCOUNTS SECURED.");

  await prisma.$disconnect();
  await pool.end();
}

main()
  .catch((e) => {
    console.error("❌ SEED FAILURE:", e);
    process.exit(1);
  });
