# Production Runtime Blueprint

## Request path

```mermaid
flowchart LR
  U[Client] --> V[Vercel Edge Middleware]
  V -->|scraper automation| G[/api/ghost-data]
  V -->|sensitive API path| R[Upstash rate limiter]
  V --> A[Next.js App Router]
  A -->|application queries| P[Neon pooled DATABASE_URL]
  M[Prisma CLI] -->|migrations only| D[Neon direct DIRECT_URL]
```

## Operational invariants

* The Vercel-managed Neon integration supplies connection variables in Development, Preview, and Production.
* `DATABASE_URL` uses Neon pooling, requires TLS, and has `connection_limit=50`.
* `DIRECT_URL` uses the Neon direct endpoint for schema migration operations.
* The `vector` extension and `KnowledgeEmbedding`/`Embedding` context tables are created by Prisma migrations.
* The Vercel-managed Upstash integration supplies Redis credentials to the edge rate limiter.
* Security headers are defined in `next.config.ts`; protected route logic and bot controls are in `middleware.ts`.

## External operational ownership

* Neon backup retention and snapshots are managed in the Neon dashboard.
* Vercel custom-domain DNS and certificates are managed in the Vercel dashboard.
* n8n workflow exports must be retrieved from the active n8n workspace before they can be versioned.
