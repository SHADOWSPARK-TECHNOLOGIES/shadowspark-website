# Shadowspark Context Ledger

This directory contains persistent architectural context for AI agents and development environments.

## Structure

| File | Purpose |
|------|---------|
| `architecture.md` | Sovereign stack decisions, connection strategy, middleware composition |
| `threat-model.md` | Active defense grid rules, bot heuristics, ghost routing logic |
| `deployment.md` | Vercel edge config, n8n pipeline topology, environment variable map |

## Automated Sync

This directory is automatically archived by `.github/workflows/context-sync.yml`:
- **On push:** any change to `docs/context/**` triggers an archive upload to GitHub Artifacts
- **Daily cron:** midnight UTC backup regardless of push activity
- **Retention:** 90 days

## Semantic Memory

High-value context entries are also vectorized and stored in Neon PostgreSQL (`system_context` table)
via the `pgvector` extension. Query with cosine similarity for token-efficient agent prompts.
