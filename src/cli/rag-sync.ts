/* eslint-disable no-console */
import { runRagSync } from "@/lib/rag/sync";

async function main() {
  const rootUrl = (process.env.RAG_CRAWL_ROOT_URL || "https://shadowspark-tech.org/blog").trim();
  const limit = Number(process.env.RAG_CRAWL_LIMIT || "25");
  const maxChars = Number(process.env.RAG_CHUNK_MAX_CHARS || "1800");

  const res = await runRagSync({
    rootUrl,
    limit: Number.isFinite(limit) ? limit : 25,
    maxChunkChars: Number.isFinite(maxChars) ? maxChars : 1800,
  });

  console.log(`[rag:sync] crawled ${res.documents} documents`);
  console.log(`[rag:sync] embedded ${res.chunks} chunks`);
  console.log(`[rag:sync] wrote ${res.outPath}`);
  if (res.bucketName) {
    console.log(`[rag:sync] uploaded vault artifacts to gs://${res.bucketName}/raw/${res.runId}/`);
    console.log(`[rag:sync] updated gs://${res.bucketName}/indexes/latest.json`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
