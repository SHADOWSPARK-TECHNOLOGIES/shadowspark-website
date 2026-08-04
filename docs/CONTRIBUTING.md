# Contributing to ShadowSpark

ShadowSpark ships production AI with a trust-first posture. Contributions should optimize for reliability, safety, and measurable user impact.

## Contribution Workflow
1. Open a focused branch and keep diffs small.
2. Run `pnpm typecheck`, `pnpm lint`, and `pnpm build` before handoff.
3. Document any behavior changes in docs under `docs/`.

## Rewards Events (MVP)
For qualifying contributions, submit a rewards event to:
- `POST /api/rewards/events`

Use a stable `eventKey` from your delivery source (for example, PR number + commit hash fragment) to ensure idempotency.

Example payload:

```json
{
  "eventKey": "pr-142-a1b2c3",
  "type": "contribution.shipped",
  "source": "github",
  "actor": {
    "email": "engineer@shadowspark-tech.org",
    "name": "Shadow Engineer"
  },
  "impact": {
    "severity": "high",
    "usersAffected": 1200,
    "production": true
  }
}
```

## Security Baseline
- Keep CSRF and CAPTCHA protections intact on risky flows.
- Do not expose admin internals.
- Preserve domain and email trust posture (DMARC/SPF standards).
