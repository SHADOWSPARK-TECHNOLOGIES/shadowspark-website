# ---------- Base ----------
FROM node:20-alpine AS base

# Install necessary system libraries
RUN apk add --no-cache libc6-compat openssl

# Install pnpm globally in base so it is available in all stages
RUN npm install -g pnpm

WORKDIR /app

# Disable Prisma generation globally in the build process
ENV SKIP_PRISMA=true
# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# ---------- Dependencies ----------
FROM base AS deps

# Copy dependency manifests
COPY package.json pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

# Install ALL dependencies (including devDeps like tsx)
RUN pnpm install --frozen-lockfile

# ---------- Runner ----------
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV SKIP_PRISMA=true

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source and configuration
# We copy src, tsconfig.json, and package.json to run via tsx
COPY src ./src
COPY tsconfig.json ./
COPY package.json ./

# Create data directory for RAG artifacts (matches runRagSync output path)
RUN mkdir -p data/rag

# The entry point for the Cloud Run job (one-off execution)
# Using tsx to run the source directly to keep the image simple and avoid a complex build step
CMD ["npx", "tsx", "src/cli/rag-sync.ts"]
