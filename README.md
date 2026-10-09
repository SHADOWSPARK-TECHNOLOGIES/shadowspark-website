ShadowSpark production app (Next.js App Router + Prisma + BullMQ + Firecrawl RAG).

Architecture: see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Railway

Production is hosted on Railway and built from the repository `Dockerfile`.

- `next.config.ts` always sets `output: "standalone"`.
- The image copies `.next/standalone` and `.next/static`, then starts with `node server.js` on port 3000.
- `pnpm build` runs `prisma generate` and `next build`. `pnpm start` (`next start`) is the local production server. The container does not use `pnpm start`.

Do not add a second host config. Railway is the only deploy target.
