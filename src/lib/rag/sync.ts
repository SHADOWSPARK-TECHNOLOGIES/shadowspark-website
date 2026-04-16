import fs from "node:fs/promises";
import path from "node:path";

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { Storage } from "@google-cloud/storage";
import { embedMany } from "ai";

import { requireEnv } from "@/lib/env";
import { getFirecrawlClient } from "@/lib/firecrawl";
import {
  buildNextBullets,
  deriveSignalConfidence,
  deriveVaultSignalBrief,
  rankSignalChunks,
} from "@/lib/gcs/fetch-audit";
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
  slug?: string;
  docs: Array<{ url?: string; title?: string; markdown: string }>;
  index: RagEmbeddingIndex;
  auditMarkdown: string;
}) {
  const bucket = storage.bucket(args.bucketName);
  const normalizedSlug = args.slug?.trim().toLowerCase();
  const runAuditName = normalizedSlug
    ? `audits/${normalizedSlug}/${args.runId}/audit.md`
    : `raw/${args.runId}/audit.md`;
  const latestAuditName = normalizedSlug ? `audits/${normalizedSlug}/latest.md` : "raw/latest.md";

  await Promise.all([
    bucket.file(runAuditName).save(args.auditMarkdown, {
      contentType: "text/markdown; charset=utf-8",
      resumable: false,
      metadata: {
        metadata: {
          rootUrl: args.rootUrl,
          slug: normalizedSlug || "",
          runId: args.runId,
          artifact: "audit-summary",
        },
      },
    }),
    bucket.file(latestAuditName).save(args.auditMarkdown, {
      contentType: "text/markdown; charset=utf-8",
      resumable: false,
      metadata: {
        metadata: {
          rootUrl: args.rootUrl,
          slug: normalizedSlug || "",
          runId: args.runId,
          artifact: "latest-audit-summary",
        },
      },
    }),
  ]);

  await Promise.all(
    args.docs.map(async (doc, index) => {
      const baseName = slugifySegment(doc.url || doc.title || `document-${index + 1}`) || `document-${index + 1}`;
      
      // If we have a slug, we prefer putting it in a dedicated directory
      const objectName = normalizedSlug 
        ? `audits/${normalizedSlug}/${args.runId}/${baseName}.md`
        : `raw/${args.runId}/${String(index + 1).padStart(3, "0")}-${baseName}.md`;

      await bucket.file(objectName).save(doc.markdown, {
        contentType: "text/markdown; charset=utf-8",
        resumable: false,
        metadata: {
          metadata: {
            rootUrl: args.rootUrl,
            sourceUrl: doc.url || "",
            title: doc.title || "",
            slug: normalizedSlug || "",
          },
        },
      });
    })
  );

  const indexPayload = JSON.stringify(args.index, null, 2) + "\n";
  
  // Index pathing: prefer slug-based indexes
  const runIndexName = normalizedSlug
    ? `indexes/${normalizedSlug}/${args.runId}.json`
    : `indexes/${args.runId}/index.json`;
  
  const latestIndexName = normalizedSlug
    ? `indexes/${normalizedSlug}/latest.json`
    : `indexes/latest.json`;

  await bucket.file(runIndexName).save(indexPayload, {
    contentType: "application/json; charset=utf-8",
    resumable: false,
    metadata: {
      metadata: {
        rootUrl: args.rootUrl,
        slug: normalizedSlug || "",
      },
    },
  });

  await bucket.file(latestIndexName).save(indexPayload, {
    contentType: "application/json; charset=utf-8",
    resumable: false,
    metadata: {
      metadata: {
        rootUrl: args.rootUrl,
        runId: args.runId,
        slug: normalizedSlug || "",
      },
    },
  });
}

function prettifySlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function inferBusinessName(args: {
  slug: string;
  rootUrl: string;
  docs: Array<{ url?: string; title?: string; markdown: string }>;
}) {
  const title = args.docs.find((doc) => doc.title?.trim())?.title?.trim();
  if (title) {
    return title.split("|")[0]?.split("—")[0]?.trim() || title;
  }

  try {
    const hostname = new URL(args.rootUrl).hostname.replace(/^www\./, "");
    const hostLabel = hostname.split(".")[0];
    if (hostLabel) {
      return hostLabel
        .split("-")
        .filter(Boolean)
        .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
        .join(" ");
    }
  } catch {
    // Fall through to slug prettification.
  }

  return prettifySlug(args.slug);
}

function buildAuditMarkdown(args: {
  slug: string;
  runId: string;
  rootUrl: string;
  docs: Array<{ url?: string; title?: string; markdown: string }>;
  chunks: RagEmbeddingChunk[];
}) {
  const businessName = inferBusinessName({
    slug: args.slug,
    rootUrl: args.rootUrl,
    docs: args.docs,
  });
  const insights = rankSignalChunks({
    slug: args.slug,
    businessName,
    chunks: args.chunks.map((chunk) => ({
      id: chunk.id,
      title: chunk.title,
      url: chunk.url,
      text: chunk.text,
      embedding: chunk.embedding,
    })),
    k: 5,
  });
  const confidence = deriveSignalConfidence(insights.length, insights[0]?.score);
  const signalBrief = deriveVaultSignalBrief(insights, businessName, "Autonomous");
  const nextBullets = buildNextBullets({
    insights,
    businessName,
    tierLabel: "Autonomous",
  });

  const sourceSection =
    args.docs.length > 0
      ? args.docs
          .slice(0, 5)
          .map((doc, index) => {
            const label = doc.title?.trim() || doc.url || `Source ${index + 1}`;
            return `- ${label}${doc.url ? ` (${doc.url})` : ""}`;
          })
          .join("\n")
      : "- No markdown-rich source documents were available in this run.";

  const signalSection =
    insights.length > 0
      ? insights.map((insight) => `1. **${insight.title}**: ${insight.excerpt}`).join("\n")
      : "1. Awaiting stronger signal density from the next crawl run.";

  const nextSection =
    nextBullets.length > 0
      ? nextBullets.map((bullet) => `- ${bullet}`).join("\n")
      : "- Book the next review pass once a denser crawl lands.";

  return [
    `# Intelligence Stream: ${businessName}`,
    "",
    `> **Slug:** ${args.slug}`,
    `> **Run ID:** ${args.runId}`,
    `> **Root URL:** ${args.rootUrl}`,
    `> **Confidence:** ${confidence}`,
    "",
    "## Crawl Snapshot",
    `- Documents analyzed: ${args.docs.length}`,
    `- Ranked chunks indexed: ${args.chunks.length}`,
    `- Recommended layout: ${signalBrief.layout}`,
    "",
    "## Operator Readout",
    signalBrief.heroSupportLine ?? `The latest crawl for ${businessName} is available for review.`,
    "",
    "## Proof Line",
    signalBrief.proofLine ?? `Proof density is still forming for ${businessName}.`,
    "",
    "## Objection Line",
    signalBrief.objectionLine ?? "The strongest objection pattern will emerge after a denser crawl.",
    "",
    "## CTA Line",
    signalBrief.ctaLine ?? "Use a conservative walkthrough CTA until stronger signals land.",
    "",
    "## Top Signals",
    signalSection,
    "",
    "## Sources Reviewed",
    sourceSection,
    "",
    "## What To Build Next",
    nextSection,
    "",
  ].join("\n");
}

export async function runRagSync(args: {
  rootUrl: string;
  slug?: string;
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
  const embeddingModel = "gemini-embedding-001";
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
  const normalizedSlug = args.slug?.trim().toLowerCase() || slugifySegment(args.rootUrl) || "audit";
  const auditMarkdown = buildAuditMarkdown({
    slug: normalizedSlug,
    runId,
    rootUrl: args.rootUrl,
    docs,
    chunks,
  });

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
      slug: normalizedSlug,
      docs,
      index,
      auditMarkdown,
    });
  }

  return { outPath, chunks: chunks.length, documents: docs.length, bucketName: bucketName || undefined, runId };
}
