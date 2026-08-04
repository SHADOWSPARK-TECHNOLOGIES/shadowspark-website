# Reward Workflows

This document describes the automated and manual workflows that power Copilot Rewards.

## Scheduled Jobs

| Path | Schedule | Purpose |
|------|----------|---------|
| `/api/cron/reward-digest` | Daily at 10:00 UTC | Process queued contribution events and compute impact scores. |
| `/api/cron/badge-promotions` | Mondays at 11:00 UTC | Scan contributors for badge eligibility and queue promotions. |

Both endpoints require a `CRON_SECRET` environment variable in production.

## Manual Workflows

1. **Reward issuance** — operators call `/api/rewards/issue` with an idempotency key.
2. **Event ingestion** — integrations (GitHub, Vercel, Slack) POST to `/api/rewards/events`.
3. **Pilot application review** — team reviews `/dashboard/pilots` and updates status in the datastore.

## Future Enhancements

- Persist events and scores in the database.
- Add durable workflow steps with retries and human-in-the-loop approval.
- Email and Slack notifications for badge grants and pilot status changes.
