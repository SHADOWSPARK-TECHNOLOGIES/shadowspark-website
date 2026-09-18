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
RUN pnpm build

FROM alpine:3.24 AS runner
WORKDIR /app
ENV NODE_ENV=production

# Floor pins Alpine OpenSSL 3.5.8 so Scout cannot ship 3.5.7-r0
# (CVE-2026-63073, CVE-2026-75803 and related high findings).
RUN apk add --no-cache \
    libstdc++ \
    "libcrypto3>=3.5.8-r0" \
    "libssl3>=3.5.8-r0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=base /usr/local/bin/node /usr/local/bin/node
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
