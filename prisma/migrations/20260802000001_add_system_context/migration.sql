-- The SystemContext model was introduced with db push and never received a
-- migration. Keep fresh deployments aligned with the current Prisma schema.
CREATE TABLE IF NOT EXISTS "system_context" (
  "id" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "embedding" vector(1536),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "system_context_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "system_context_category_idx"
  ON "system_context"("category");
