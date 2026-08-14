# ShadowSpark Internal Architecture Inventory

**Authority:** INTERNAL CURRENT-STATE INVENTORY

**Snapshot:** Repository state at `1156fafed9f5290a0e6831b1bc934501c604f2b9`, reviewed 2026-08-14

**Public-claims owner:** `docs/architecture/SHADOWSPARK_APPLIED_AI.md`

**Deployment evidence owner:** `docs/deployments/*`

This document records source-code reality. It does not establish which paths are
configured, deployed, secure, reliable, or used by customers. Refresh it whenever
material dependencies, models, data paths, workers, or integration boundaries change.

## Application

- Next.js 16.2.4 App Router under `src/app`.
- TypeScript source with strict compiler checks enabled by the project configuration.
- React server components by default; client components are used for interaction.
- Tailwind CSS utilities plus tokens in `src/app/globals.css`.
- Root metadata and Organization structured data are built through `src/lib/seo.ts`.

## Responsibility inventory

| Area | Current repository evidence |
| --- | --- |
| Experience and interfaces | Marketing, auth, dashboard, operator, admin, checkout, demo, and API routes under `src/app` |
| Application and workflow | Route handlers, `src/lib` services, BullMQ queue modules, and workers under `src/workers` |
| Applied AI and context | Google AI and Anthropic clients, RAG sync/retrieval, embeddings, file/GCS retrieval, and knowledge-store modules |
| Platform integrations | Paystack, Firecrawl, WhatsApp/Meta, Calendly, Vercel Analytics, and provider-specific clients |
| Data and infrastructure | Prisma 7.7, PostgreSQL adapter/schema, pgvector migrations/fields, Redis/BullMQ, local files, and cloud-storage paths |
| Trust and operations | Selected auth/role checks, payment approval, webhook verification, system events, health routes, telemetry, and error code |

The presence of a responsibility here does not establish complete coverage.

## Prisma schema

`prisma/schema.prisma` currently defines 25 models:

`Lead`, `User`, `Passkey`, `WebAuthnChallenge`, `TokenizedAsset`,
`TokenHolder`, `Payment`, `Demo`, `SystemEvent`, `SniperTarget`, `EmailEvent`,
`KnowledgeEmbedding`, `Embedding`, `Account`, `LedgerTransaction`, `Listing`,
`TrustComponent`, `Entry`, `LedgerIdempotency`, `VerificationRequest`,
`AdminAction`, `FraudFlag`, `Referral`, `OAuthAccount`, and `SystemContext`.

Vector-related evidence includes:

- an `add_vector_extension` migration;
- vector columns in migration history;
- `KnowledgeEmbedding` and `SystemContext` vector-oriented fields;
- database retrieval code in `src/lib/knowledge/rag-store.ts`.

Database-provider topology and production extension state require deployment evidence.

## Retrieval and embedding paths

The repository contains more than one retrieval path:

- `src/lib/rag/*` for Firecrawl-to-file synchronization and retrieval;
- `src/lib/knowledge/rag-store.ts` for PostgreSQL/pgvector-oriented retrieval;
- file-backed knowledge modules under `src/lib/knowledge*`;
- GCS-related retrieval and audit code under `src/lib/gcs`.

Primary RAG synchronization, retrieval, and audit paths use
`gemini-embedding-001`. The legacy semantic-only knowledge store and the
purge-and-re-embed maintenance script still reference `text-embedding-004`.
`data/rag` contains only `.gitkeep` in this snapshot, so a generated local index is
not repository evidence of a current deployed knowledge base.

## Queues and workers

BullMQ source includes lead, crawl, sniper, and WhatsApp/nudge queue paths. Worker
modules include crawl, lead, sniper, and nudge behavior. Redis connection and worker
deployment state require environment-specific verification.

## External boundaries

Repository code includes clients or handlers for Paystack, Firecrawl, Google AI,
Anthropic, messaging/Meta, Calendly, Vercel Analytics, and cloud storage. Source
presence does not prove credentials, provider availability, production traffic, or SLA.

## Verification gates

- `pnpm typecheck` runs TypeScript checking.
- `pnpm test` runs Vitest.
- `pnpm build` runs the Next.js production build.
- Scoped lint can verify changed files; the repository-wide lint baseline must be
  reported separately when red.
- `src/instrumentation.ts` validates required runtime configuration and loads workers
  in the Node.js runtime, so a successful build is not a complete startup check.

## Known documentation boundary

- `docs/architecture/SHADOWSPARK_APPLIED_AI.md` controls public claims.
- `docs/deployments/*` must hold named-environment evidence.
- `docs/architecture/SOVEREIGN_STACK.md` is historical/stale and non-authoritative.
- Session exports and old design documents are historical unless explicitly promoted
  through a reviewed current-state update.
