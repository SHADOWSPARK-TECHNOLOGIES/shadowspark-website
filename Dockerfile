FROM node:24-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@11.20.0 --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY prisma ./prisma
COPY prisma.config.ts ./prisma.config.ts
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@11.20.0 --activate
COPY --from=deps /app/node_modules ./node_modules
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY . .
RUN pnpm exec prisma generate
ARG NEXT_PUBLIC_GA_ID
ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID
RUN pnpm build

FROM alpine:3.24 AS runner
WORKDIR /app
ENV NODE_ENV=production

# alpine:3.24 and alpine:3.24.2 were last published 2026-09-18, before
# Alpine rebuilt zlib. No newer base tag exists, so the runner upgrades
# the package from the 3.24 repo: zlib 1.3.2-r1 fixes CVE-2026-85091
# (the image otherwise ships 1.3.2-r0). OpenSSL stays floored at 3.5.8
# (CVE-2026-63073, CVE-2026-75803).
RUN apk add --no-cache \
    libstdc++ \
    "libcrypto3>=3.5.8-r0" \
    "libssl3>=3.5.8-r0" \
    "zlib>=1.3.2-r1"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=base /usr/local/bin/node /usr/local/bin/node
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
