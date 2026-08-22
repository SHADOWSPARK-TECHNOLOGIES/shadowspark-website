-- Restore the vector extension/index before the sovereign migration drops it.
-- The legacy add_vector_extension directory sorts after 20260802102119 and
-- therefore cannot satisfy that migration's precondition on a fresh deploy.
CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE "Lead"
  ADD COLUMN IF NOT EXISTS "embedding" vector(768);

CREATE INDEX IF NOT EXISTS lead_embedding_idx
  ON "Lead" USING ivfflat ("embedding" vector_cosine_ops)
  WITH (lists = 100);
