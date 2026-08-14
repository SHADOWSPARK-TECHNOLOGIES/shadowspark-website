# Shadowspark Architecture Blueprint

> **STATUS: HISTORICAL / STALE — NOT CURRENT OR DEPLOYMENT EVIDENCE**
>
> This outline records an earlier proposal. Its Vercel plan, database pooling, and
> security-topology statements have not been verified for the current deployment.
> Use `docs/ARCHITECTURE.md` for source inventory and `docs/deployments/*` for
> named-environment evidence.

- Primary Repo: github.com/shadow7user
- Production Hosting: Vercel Pro (Edge Functions)
- Database Connection Pooling: Neon PgBouncer (`?pgbouncer=true&connection_limit=50`)
- Security Logic: Ghost DB Interception for Headless Scrapers
