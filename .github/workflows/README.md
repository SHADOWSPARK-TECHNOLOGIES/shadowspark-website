Sandbox-validated CI workflows

What this does
- Runs CI for PRs targeting main using pnpm workspaces.
- Ensures tests run with SANDBOX=true so code paths that would write to production are disabled.
- Produces a preview artifact but does NOT deploy automatically. Preview publishing is gated and requires manual approval.

Workflow jobs
- setup: install pnpm, restore pnpm cache
- lint: run linters
- test: run workspace tests with SANDBOX=true
- sandbox-validate: run smoke/integration tests that assert read-only behavior
- preview-deploy-check: build artifacts and upload a preview artifact (no automatic deploy)

How to approve a preview
1. Verify CI passed and inspect the uploaded artifact in the workflow run.
2. A repo maintainer or code owner must manually create a preview environment (for example, through your hosting provider) using the artifact and scoped test credentials.
3. Do NOT use production credentials to run preview builds.

Notes
- CI intentionally avoids exposing production secrets. Configure TEST_DATABASE_URL and other test-scope secrets in repository settings.
- The workflow expects any project-specific sandbox checks to be defined (npm scripts: sandbox:smoke or test:sandbox). If not present, it will fall back to a lightweight grep-based smoke test.
