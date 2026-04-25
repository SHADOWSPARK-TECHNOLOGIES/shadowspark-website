# ---------- Base ----------
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat openssl
RUN npm install -g pnpm
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# ---------- Dependencies ----------
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Copy prisma schema so postinstall generate works (or skip it)
COPY prisma ./prisma
ENV SKIP_PRISMA=false
RUN pnpm install --frozen-lockfile

# ---------- Builder ----------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Build the Next.js application
RUN pnpm build

# ---------- Runner ----------
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# We copy the entire app for simplicity since we are using tsx/next directly
COPY --from=builder /app ./

EXPOSE 8080
ENV PORT 8080

# Default command is to start the web server
CMD ["sh", "-c", "pnpm worker:crawl & pnpm worker:lead & pnpm start"]
