-- The legacy add_vector_extension directory sorts last and reintroduces a
-- Lead.embedding column that the sovereign schema intentionally removed.
DROP INDEX IF EXISTS lead_embedding_idx;
ALTER TABLE "Lead" DROP COLUMN IF EXISTS "embedding";
