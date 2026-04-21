# SYSTEM MEMORY – SHADOWSPARK

## SYSTEM SNAPSHOT
- Stack: Next.js 14 App Router + Prisma (PostgreSQL) + NextAuth v4
- Auth: JWT + RBAC (USER/ADMIN)
- DB Models: User, Session, Account, Profile, Lead (email, metadata, status)
- Active Routes: `/api/lead` (public POST), `/admin/leads` (live)
- Intelligence Layer: `/prompt/*` directives (agent rules, memory constraints)
- Knowledge Store: Firecrawl + JSON fallback, pgvector-ready schema planned

## RECENT CHANGES
**2026-04-20 – Lead Capture Pipeline**
- Added `Lead` model to Prisma schema with upsert logic
- Created `/api/lead` endpoint (validates email, stores metadata)
- Migration `add_lead_model` applied

**2026-04-20 – Admin Dashboard & Demo Automation**
- Built `/admin/leads` dashboard with `isAdmin` RBAC
- Intercepted `demo_scheduled` status to auto-generate Demo calendar placeholders in DB

**2026-04-20 – Firecrawl Knowledge Integration**
- Script `/scripts/crawl-knowledge.ts` ready: maps + scrapes target URLs, chunks text, stores in `/data/knowledge.json`
- Helper `/src/lib/knowledge-store.ts` for chatbot retrieval
- Environment requirement: `FIRECRAWL_API_KEY`
- Cron schedule: daily at 03:00 UTC (Vercel cron compatible)

## KNOWN GAPS
- Chatbot not yet grounding on Firecrawl knowledge base
- Outcome-based pricing tracking not implemented
- Payment flow (Stripe) missing entirely
- `/prompt/*` directives not fully injected into runtime context

## NEXT TARGET
Wire the Lead (`createLead`) and Demo (`updateLeadStatus` -> `scheduleDemoForLead`) services into the Vercel AI SDK tools so the Chatbot can automatically capture leads and book demos mid-conversation.
