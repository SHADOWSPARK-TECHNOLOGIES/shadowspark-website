# Hello World — Copilot Integration with ShadowSpark Rewards

This guide shows a contributor how to send contribution events and issue badges against the ShadowSpark Rewards API.

## Prerequisites
- A ShadowSpark environment running locally or on Vercel.
- `curl` or any HTTP client.
- A stable `eventKey` per contribution (e.g., `pr-142-a1b2c3`).

## 1. Inspect the badge catalog

```bash
curl https://shadowspark-tech.org/api/rewards/catalog
```

Example response:

```json
{
  "ok": true,
  "badges": [
    {
      "id": "builder-bronze",
      "name": "Builder Bronze",
      "description": "Consistent delivery on meaningful product milestones.",
      "tier": "bronze",
      "minScore": 30,
      "grant": "recognition"
    }
  ]
}
```

## 2. Record a contribution event

```bash
curl -X POST https://shadowspark-tech.org/api/rewards/events \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

Example response:

```json
{
  "ok": true,
  "idempotent": false,
  "eventId": "cm...",
  "impactScore": 48,
  "suggestedBadges": [
    {
      "id": "builder-bronze",
      "name": "Builder Bronze",
      "tier": "bronze",
      "minScore": 30,
      "grant": "recognition"
    }
  ]
}
```

## 3. Issue a badge

Use the response score to decide whether to issue a badge, or call `/api/rewards/issue` directly for manual grants.

```bash
curl -X POST https://shadowspark-tech.org/api/rewards/issue \
  -H "Content-Type: application/json" \
  -d '{
    "idempotencyKey": "pr-142-a1b2c3-builder-bronze",
    "badgeId": "builder-bronze",
    "reason": "Shipped high-impact feature affecting 1,200 users.",
    "grantedBy": "ops@shadowspark-tech.org",
    "recipient": {
      "email": "engineer@shadowspark-tech.org",
      "name": "Shadow Engineer"
    }
  }'
```

Example response:

```json
{
  "ok": true,
  "idempotent": false,
  "issueId": "cm...",
  "badge": {
    "id": "builder-bronze",
    "name": "Builder Bronze",
    "tier": "bronze"
  },
  "recipient": {
    "email": "engineer@shadowspark-tech.org",
    "name": "Shadow Engineer"
  }
}
```

## Idempotency notes

- `/api/rewards/events` uses `reward:event:{source}:{eventKey}`.
- `/api/rewards/issue` uses `reward:issue:{idempotencyKey}:{badgeId}:{recipientKey}`.
- Resending the same payload returns the previously stored result.

## Next steps

- Build a small client wrapper around these endpoints.
- Add webhook ingestion from GitHub, Vercel, or Linear.
- Render earned badges on a contributor profile page.
