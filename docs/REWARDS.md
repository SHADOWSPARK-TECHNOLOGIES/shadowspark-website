# ShadowSpark Rewards MVP

This document defines the Sprint 1 rewards layer for Copilot collaboration.

## Goal
Recognize high-impact contributions and create a consistent path from delivery to reward grants.

## Data Model
Source of truth: `src/data/rewards.ts`

- `rewardBadges`: badge catalog (bronze/silver/gold).
- `computeImpactScore(payload)`: deterministic scoring.
- `resolveBadges(totalScore)`: threshold-based badge resolution.

## API Endpoints

### `POST /api/rewards/events`
Records contribution activity and computes score.

Required fields:
- `eventKey`
- `type` (`contribution.merged`, `contribution.shipped`, `incident.fixed`, `security.hardened`, `pilot.closed`)
- `source` (`github`, `vercel`, `internal`)
- `actor`
- `impact.severity` (`low`, `medium`, `high`, `critical`)

Behavior:
- Input validation via Zod.
- Rate-limited with shared Upstash limiter.
- Idempotent via `digest = reward:event:{source}:{eventKey}`.
- Persists to `SystemEvent` (`type = reward_contribution_event`).

### `POST /api/rewards/issue`
Issues a specific badge to a recipient.

Required fields:
- `idempotencyKey`
- `badgeId`
- `reason`
- `grantedBy`
- `recipient` (`id` or `email` or `name`)

Behavior:
- Validates badge existence from `rewardBadges`.
- Idempotent via digest composition with `idempotencyKey`, `badgeId`, and recipient key.
- Persists to `SystemEvent` (`type = reward_badge_issued`).

### `GET /api/rewards/catalog`
Returns the current badge catalog.

## Event Storage
The MVP stores reward activity in `SystemEvent` to avoid schema migrations while preserving auditable history.

## Security Notes
- Rate limiting is active on write endpoints.
- Validation errors return `400` with clear field-level messages.
- Unexpected failures are logged and return `500` with stable error responses.
