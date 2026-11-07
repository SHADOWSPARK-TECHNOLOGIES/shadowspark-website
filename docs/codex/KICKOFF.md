# Codex kickoff: ShadowSpark website
Owner-approved scope: source-preserving diagnosis, test fixes and draft PRs only. No production changes.
Repository: SHADOWSPARK-TECHNOLOGIES/shadowspark-website
Read `AGENTS.md`, `docs/codex/EXECUTION_CONTRACT_2026-11-07.md` and `.agents/skills/codex-evidence-loop/SKILL.md` from branch `agent/codex-evidence-loop-20261107`.
Start **Loop 0** read-only. Verify Railway production website commit, its .com domain, older Vercel .org canonical record and Vercel 403 connector access; identify which runtime currently serves the intended customer domain before proposing DNS or auth edits. Review existing issues #11 and #20.
Use Node 24.x + pnpm 11.20.0 per repo, not pnpm versions from other projects. Map auth, demo/API, Meta webhooks, queues/workers, and provider costs before any code.
Fix one measurable blocker in clean branch with tests and reviewer; record all unknown deployment and billing boundaries. No merges/deploys/IAM/dns/payment writes.
