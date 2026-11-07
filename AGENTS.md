# Codex repository instructions: ShadowSpark website

This repository `SHADOWSPARK-TECHNOLOGIES/shadowspark-website` is the website source tracked by the inspected Railway production service. It is separate from `shadowspark-production` and the Moronto Mornica Android repo.

Before edits, read `docs/codex/EXECUTION_CONTRACT_2026-11-07.md`, `docs/codex/KICKOFF.md` and `.agents/skills/codex-evidence-loop/SKILL.md`. Check remote, HEAD, git status and worktree list, then verify actual production runtime identities. Historical Vercel .org and currently configured Railway .com sources must not be conflated; Vercel 403 means unknown account state, not proof of downtime.

Use Node **24.x** and pinned **pnpm 11.20.0** from this repository. Before declaring a scoped patch complete, independently run relevant `pnpm test`, `pnpm typecheck`, `pnpm lint`, and `pnpm build` in an isolated clean environment with nonproduction test credentials. Avoid paid provider calls in tests.

Security: strict tenant and customer data isolation; no secrets, signing keys or real customer records in GitHub; preserve authentication, idempotency and payment semantics. Read-only inspect first. Never modify Vercel/Railway DNS, env vars, IAM, worker startup, billing, payments, migrations or production deploy without explicit action-specific approval. No merges, force pushes, stash/reset/clean.

Max 2 nonoverlapping writers, independent verification, max 8 attempts per objective and stop after 2 repeated failures/no progress. Codex is not assigned Moronto Mornica; Hermes owns it.
