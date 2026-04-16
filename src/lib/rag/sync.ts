import fs from "node:fs/promises";
import path from "node:path";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { Storage } from "@google-cloud/storage";
import { embedMany } from "ai";

import { requireEnv } from "@/lib/env";
import { getFirecrawlClient } from "@/lib/firecrawl";
import type { RagEmbeddingChunk, RagEmbeddingIndex } from "@/lib/rag/types";

const storage = new Storage();

function chunkMarkdown(markdown: string, maxChars: number): string[] {
  const normalized = markdown.replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];

  const paras = normalized
    .split(/\n{2,}/g)
    .map((p) => p.trim())
    .filter(Boolean);

  const chunks: string[] = [];
  let current = "";

  for (const p of paras) {
    if (!current) {
      current = p;
      continue;
    }

    if (current.length + 2 + p.length <= maxChars) {
      current += "\n\n" + p;
      continue;
    }

    chunks.push(current);
    current = p;
  }

  if (current) chunks.push(current);
  return chunks;
}

function stableChunkId(input: string): string {
  // Not cryptographic; good enough for deterministic chunk IDs in a committed JSON file.
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return `c_${(hash >>> 0).toString(16)}`;
}

function slugifySegment(input: string) {
  return input
    .toLowerCase()
    .replace(/https?:\/\//g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function buildVaultRunId() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

async function uploadVaultArtifacts(args: {
  bucketName: string;
  runId: string;
  rootUrl: string;
  docs: Array<{ url?: string; title?: string; markdown: string }>;
  index: RagEmbeddingIndex;
}) {
  const bucket = storage.bucket(args.bucketName);

  await Promise.all(
    args.docs.map(async (doc, index) => {
      const baseName = slugifySegment(doc.url || doc.title || `document-${index + 1}`) || `document-${index + 1}`;
      const objectName = `raw/${args.runId}/${String(index + 1).padStart(3, "0")}-${baseName}.md`;
      await bucket.file(objectName).save(doc.markdown, {
        contentType: "text/markdown; charset=utf-8",
        resumable: false,
        metadata: {
          metadata: {
            rootUrl: args.rootUrl,
            sourceUrl: doc.url || "",
            title: doc.title || "",
          },
        },
      });
    })
  );

  const indexPayload = JSON.stringify(args.index, null, 2) + "\n";
  await bucket.file(`indexes/${args.runId}/index.json`).save(indexPayload, {
    contentType: "application/json; charset=utf-8",
    resumable: false,
    metadata: {
      metadata: {
        rootUrl: args.rootUrl,
      },
    },
  });

  await bucket.file("indexes/latest.json").save(indexPayload, {
    contentType: "application/json; charset=utf-8",
    resumable: false,
    metadata: {
      metadata: {
        rootUrl: args.rootUrl,
        runId: args.runId,
      },
    },
  });
}

export async function runRagSync(args: {
  rootUrl: string;
  limit: number;
  maxChunkChars: number;
}): Promise<{ outPath: string; chunks: number; documents: number; bucketName?: string; runId: string }> {
  const firecrawl = getFirecrawlClient();
  const runId = buildVaultRunId();

  const crawlJob = await firecrawl.crawl(args.rootUrl, {
    limit: args.limit,
    scrapeOptions: {
      formats: ["markdown"],
      onlyMainContent: true,
    },
    pollInterval: 2,
    timeout: 10 * 60,
  });

  if (crawlJob.status !== "completed") {
    throw new Error(`[rag:sync] crawl failed: status=${crawlJob.status}`);
  }

  const docs = crawlJob.data
    .map((d) => ({
      url: d.metadata?.url ?? d.metadata?.ogUrl ?? undefined,
      title: d.metadata?.title ?? d.metadata?.ogTitle ?? undefined,
      markdown: d.markdown ?? "",
    }))
    .filter((d) => d.markdown.trim().length > 0);

  const chunkInputs: Array<{ url?: string; title?: string; text: string }> = [];
  for (const doc of docs) {
    for (const text of chunkMarkdown(doc.markdown, args.maxChunkChars)) {
      chunkInputs.push({ url: doc.url, title: doc.title, text });
    }
  }

  const google = createGoogleGenerativeAI({ apiKey: requireEnv("GEMINI_API_KEY") });
  const embeddingModel = "text-embedding-004";
  const model = google.textEmbeddingModel(embeddingModel);

  const { embeddings } = await embedMany({
    model,
    values: chunkInputs.map((c) => c.text),
  });

  const chunks: RagEmbeddingChunk[] = chunkInputs.map((c, i) => {
    const key = `${c.url ?? "unknown"}\n${c.title ?? ""}\n${c.text}`;
    return {
      id: stableChunkId(key),
      url: c.url,
      title: c.title,
      text: c.text,
      embedding: embeddings[i],
    };
  });

  const index: RagEmbeddingIndex = {
    version: 1,
    createdAt: new Date().toISOString(),
    embeddingModel,
    source: { rootUrl: args.rootUrl },
    chunks,
  };

  const outDir = path.join(process.cwd(), "data", "rag");
  await fs.mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, "index.json");
  await fs.writeFile(outPath, JSON.stringify(index, null, 2) + "\n", "utf8");

  const bucketName = process.env.VAULT_BUCKET?.trim();
  if (bucketName) {
    await uploadVaultArtifacts({
      bucketName,
      runId,
      rootUrl: args.rootUrl,
      docs,
      index,
    });
  }

  return { outPath, chunks: chunks.length, documents: docs.length, bucketName: bucketName || undefined, runId };
}
