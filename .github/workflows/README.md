Sandbox-validated CI workflows

What this does
- Runs one fully provisioned Node 24/pnpm 11 quality job for PRs targeting main.
- Installs from the frozen lockfile, audits production dependencies, runs security tests, typecheck, changed-file lint, the full test suite, build, and added-diff secret scanning.
- Builds and scans the exact immutable Docker image SHA on pull requests and default-branch pushes. Only a scanned default-branch image is pushed.

Workflow jobs
- `quality`: the complete, self-contained PR verification gate.
- `build-scan-push`: Docker build and critical/high Scout gate; push occurs only after the gate on the repository default branch.

How to approve a preview
1. Verify the quality and Docker Scout gates passed.
2. A repo maintainer or code owner must manually publish a preview using scoped test credentials.
3. Do NOT use production credentials to run preview builds.

Notes
- CI intentionally avoids exposing production secrets. Configure only test-scope secrets in repository settings.
- Docker build context excludes credential-bearing documents, environment files, and internal superpower specifications.
