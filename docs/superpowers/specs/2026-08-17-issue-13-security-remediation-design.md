# Issue #13 Security Remediation Design

**Status:** Approved design

**Date:** 2026-08-17

**Repository:** `SHADOWSPARK-TECHNOLOGIES/shadowspark-website`

**Working branch:** `fix/security-baseline`

**Working directory:** `/home/shadowweaver/code/SHADOWSPARK-TECHNOLOGIES/worktrees/shadowspark-website-security`

## Goal

Close issue #13 by removing exploitable passkey and authorization paths, upgrading vulnerable production dependencies with minimal churn, and producing reviewable evidence that the application fails closed.

## Current Evidence

- The previous authentication implementation was created in `/tmp/shadowspark-security-gates`, was not committed, and is no longer recoverable through its branch reflog or unreachable Git objects.
- The existing `fix/security-baseline` worktree contains uncommitted changes to `package.json`, `pnpm-lock.yaml`, and `pnpm-workspace.yaml`.
- The dependency changes are backed up at `/home/shadowweaver/code/SHADOWSPARK-TECHNOLOGIES/recovery-backups/issue-13-security-baseline.patch`.
- Backup SHA-256: `e0948617f7bfb79d58b303c8a34f87687c87750b34afb0729ac636d2ad3bcdfb`.
- The remote `main` branch remains the vulnerable baseline until a reviewed pull request is merged.

## Branch and Change Structure

All remediation work will remain on the single `fix/security-baseline` branch.

1. Inspect and verify the existing dependency delta.
2. Commit verified dependency remediation as an isolated commit.
3. Add failing authentication regression tests.
4. Rebuild registration, authentication, session handoff, and route authorization in separate reviewable commits on the same branch.
5. Run the complete release gate.
6. Push one branch and open one draft pull request referencing issue #13.

No step authorizes an automatic merge or production deployment.

## Authentication Architecture

### WebAuthn verification

A maintained SimpleWebAuthn server implementation will verify registration responses and authentication assertions. Client-supplied fields will never be treated as proof of identity by themselves.

Every ceremony must be bound to:

- the server-generated challenge;
- the intended user;
- the ceremony type;
- the configured relying-party ID;
- the exact allowed origin;
- an expiry time;
- an unused state.

Invalid signatures, missing fields, incorrect origins, incorrect RP IDs, user mismatches, ceremony mismatches, expired challenges, used challenges, and authenticator counter regressions must fail closed.

Successful registration persists only credential identifiers, public keys, transports, and counters returned by successful server verification. An existing account must have a matching authenticated session before adding a passkey.

### Session handoff

The fixed `passkey-auth-bypass` marker will be removed. Successful assertion verification will mint a cryptographically random, server-only handoff with a 30-second lifetime. Only a digest will be stored, it will be bound to the verified user, and it may be consumed atomically exactly once by the Auth.js credentials path.

The browser must not receive a reusable bypass credential. A response may report success only after Auth.js confirms session issuance. Session issuance failure returns a non-success response.

### Route authorization

Protected routes require a concrete authenticated user identifier. Admin and operator routes require an explicitly typed authorized role. Boolean coercion of an ambiguous session object and new `any` role escapes are prohibited.

## Data and State Handling

The existing challenge storage will be reused only if it can represent user binding, ceremony type, expiry, single-use state, and the one-time handoff safely. A database migration will be introduced only when schema inspection proves the existing model cannot enforce those invariants.

Challenge and handoff consumption must be atomic so concurrent requests cannot reuse the same proof. Authenticator counters must be updated only after successful verification.

## Error and Logging Policy

- Authentication failures return generic client-safe responses.
- Server logs may record an error category and request correlation identifier.
- Logs must not contain challenges, credential payloads, public-key material, handoff tokens, cookies, authorization headers, session tokens, or environment-secret values.
- Database or session issuance failures return non-success responses and must never be represented as verified authentication.

## Dependency Remediation

The existing manifest and override changes will be inspected before acceptance. Upgrades will be limited to packages required to resolve production advisories, including compatible patched releases of Next.js, Auth.js, and Undici where the dependency graph requires them.

The remediation must not:

- suppress audit findings;
- weaken audit policy;
- use a blanket forced upgrade;
- introduce unrelated dependency churn.

`pnpm audit --prod` must report zero critical and zero high findings. Any remaining moderate or low advisory must be documented with its dependency path, exposure assessment, and upstream limitation.

## Test Design

Regression tests will be written before each authentication fix and must cover:

- direct submission of the removed fixed bypass marker;
- invalid and missing registration attestation data;
- invalid and missing assertion signatures;
- wrong origin and wrong RP ID;
- wrong user and wrong ceremony type;
- expired and previously used challenges;
- authenticator counter regression;
- unauthenticated passkey enrollment for an existing account;
- one-time handoff replay and concurrent consumption;
- session issuance failure;
- protected routes without a concrete user ID;
- privileged routes without the required typed role;
- successful registration persistence;
- successful authentication counter update and exactly one session.

## Release Gate

The branch is eligible for a draft pull request only after all applicable checks pass under the repository Node 24 target:

1. Clean dependency installation using the committed lockfile.
2. `pnpm audit --prod`: zero critical and zero high findings.
3. Focused authentication and authorization regression tests.
4. Type-checking.
5. Linting of every changed source and test file.
6. Full test suite.
7. Production build.
8. Diff inspection for scope control.
9. Secret-pattern scan covering the changed commit range.

Preview verification must exercise successful and rejected ceremonies without production credentials or production writes. Merge and production deployment require explicit approval after review and preview evidence.

## Acceptance Mapping

- Fixed-marker impersonation is prevented by removal and regression coverage.
- Ceremony tampering and replay fail closed through server verification, binding, expiry, atomic single-use state, and counter enforcement.
- Only server-verified credential material is persisted.
- Authentication creates exactly one session and updates the verified counter.
- Session failure produces a non-success response.
- Protected and privileged routes enforce concrete identity and typed role checks.
- Production audit reaches zero critical and zero high findings without suppression.
- Focused tests, type-check, scoped lint, full tests, build, diff review, and secret scan provide release evidence.

## Explicit Non-Goals

- Redesigning unrelated authentication user interfaces.
- Broad dependency modernization unrelated to published production advisories.
- Refactoring unrelated application modules.
- Merging the pull request or deploying to production as part of implementation.
