Add a sandbox-validated PR review pipeline for ShadowSpark monorepo

Goals
- Ensure PRs run in a sandboxed CI environment using pnpm workspaces
- Default project state is read-only (no automatic DB or production writes during CI)
- Preview deployments are gated: only created for PRs that pass sandbox validation and approved by code owners

Requirements
1. Use pnpm for installs and caching (pnpm install --frozen-lockfile). Ensure pipeline runs from workspace root and uses pnpm workspace filters where appropriate.
2. CI job(s):
   - setup: install pnpm, restore pnpm cache
   - lint: run existing linters
   - test: run pnpm test across workspace packages
   - sandbox-validate: run smoke tests that confirm no external writes (network/database) and run integration tests inside a hermetic sandbox (e.g., using ephemeral Neon test DB or mocked services)
   - preview-deploy-check: after sandbox-validate passes, create a gated preview deployment artifact but do NOT deploy automatically. Mark preview as gated and require explicit approval to publish preview.
3. Secrets and env: CI must not expose production secrets in sandbox runs. Use read-only or scoped test credentials.
4. Pull Request behavior: if CI passes, open a draft PR from implementing branch to main (automation will be triggered by Copilot per issue comment). The PR should be draft and not merged by automation.
5. Documentation: add a short README in .github/workflows/ explaining how the pipeline works and how to approve gated previews.

Deliverables
- Add GitHub Actions workflow(s) under .github/workflows/ implementing above jobs and gating logic
- Add minimal README describing how to run and approve
- Create a draft PR against main with the changes (opened by Copilot per issue comment)

Notes for implementer (Copilot)
- Implement exactly as specified. Do not merge the PR. Do not deploy automatically.
- Prefer minimal, surgical changes. Validate that pnpm commands run successfully in CI.
- If additional choices are needed, ask before implementing.
