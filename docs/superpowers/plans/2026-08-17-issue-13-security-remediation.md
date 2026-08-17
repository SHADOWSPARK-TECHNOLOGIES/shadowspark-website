# Issue #13 Security Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close issue #13 by replacing exploitable passkey/session paths with cryptographically verified, atomic, fail-closed flows; enforcing concrete identity and typed authorization; clearing all critical/high production advisories; and making the release gates enforceable before review.

**Architecture:** Keep the existing JWT-based Auth.js architecture and the single `fix/security-baseline` branch. SimpleWebAuthn owns WebAuthn option generation and response verification; Prisma persists only verifier-produced credential material and atomically consumes ceremony/handoff records. A random 30-second server-only handoff connects a verified assertion to the existing credentials provider without exposing a reusable browser credential. Shared edge-safe identity/role guards protect routes, while Node-only helpers own database and cryptographic operations.

**Tech Stack:** Node.js 24.x, pnpm 11.20.0, Next.js 16.3.1 App Router/Proxy, TypeScript strict mode, Auth.js (`next-auth` 5.0.0-beta.32), Prisma 7.7+, PostgreSQL, Vitest 3, Zod 4, `@simplewebauthn/server` 13.3.2, and `@simplewebauthn/browser` 13.3.0.

## Global Constraints

- Work only on `fix/security-baseline`; preserve unrelated work and do not rewrite the already-pushed dependency commit.
- Execute one numbered task at a time. Do not begin the next task until the current task's tests and review gate pass.
- Use Node 24.x and pnpm 11.20.0 for installation, audit, tests, type-checking, linting, and builds.
- Keep Next.js at 16.3.1, Auth.js at 5.0.0-beta.32, and Undici at 8.10.0 unless a newly published critical/high advisory requires a later compatible patch.
- Do not suppress advisories, weaken audit policy, use blanket forced upgrades, or introduce unrelated dependency churn.
- `pnpm audit --prod` must report exactly zero critical and zero high vulnerabilities before authentication implementation proceeds.
- Bind every WebAuthn ceremony to the server challenge, intended user, ceremony type, configured RP ID, one exact configured origin, expiry, and unused state.
- Require user verification in both registration and authentication verification.
- Treat all legacy passkeys lacking server-verification provenance as unverified and ineligible for authentication.
- The session handoff lifetime is exactly 30 seconds; store only its SHA-256 digest and consume it atomically once.
- Never return the raw handoff to the browser or log challenges, credential payloads, public keys, handoffs, cookies, authorization headers, session tokens, or environment-secret values.
- No new `any` casts or `unknown as Record<string, unknown>` role escapes are permitted.
- Do not use production credentials or execute production writes during tests or preview verification.
- Do not merge or deploy automatically. A draft PR, preview, credential rotation, merge, and production deployment remain explicit gates.

## Repository-Verified Starting Point

Observed on 2026-08-17 before this plan was written:

| Area | Verified state |
|---|---|
| Branch | `fix/security-baseline` at `60494c5cc0a94c4e5a6dd8e8fae94fc8b3d96a23`, exactly one commit ahead of `origin/main` |
| Committed delta | Only `package.json`, `pnpm-lock.yaml`, and `pnpm-workspace.yaml` |
| Uncommitted baseline | Only the approved design under `docs/superpowers/specs/` |
| Pull request | None open from `fix/security-baseline` |
| Backup | Present; SHA-256 matches the approved design |
| Node/pnpm | Frozen install passes under Node 24.19.0 and pnpm 11.20.0 |
| Production audit | 0 critical, **15 high**, 27 moderate, 4 low; dependency gate is failing |
| Auth implementation | Fixed `passkey-auth-bypass`, handwritten parsing, trusted client counter/key data, non-atomic challenge use, and success after session failure are all still present |
| Registration contract | Server returns top-level `userId`; client submits `options.userId`, which is undefined |
| Authorization | `src/proxy.ts` uses `!!req.auth` and `any`; two admin pages repeat the role cast; queue-stat telemetry is unauthenticated |
| Tests | Existing WebAuthn tests duplicate logic against mocks and do not call routes/providers; one test explicitly permits the fixed bypass |
| Schema history | Declarative Prisma schema contains passkey/challenge models, but checked-in migrations do not create them; deployed database state is therefore an external preflight requirement |
| CI/Docker | CI uses Node 20/pnpm 8 and fresh jobs without installs; Docker uses Node 20 plus `npm ci` without a package lock and expects standalone output that is not configured |
| Credential record | `HANDOVER.md` contains a tracked credential-like value in current and historical content; repository sanitization is possible, but rotation/revocation is human-only |

## File and Responsibility Map

- `src/lib/auth/webauthn-config.ts`: single RP name, RP ID, exact origin, ceremony lifetime, and fail-closed environment validation.
- `src/lib/auth/webauthn-schemas.ts`: strict Zod schemas for registration/authentication JSON inputs.
- `src/lib/auth/challenge-store.ts`: conditional atomic consumption of user/type/expiry-bound ceremony records.
- `src/lib/auth/session-handoff.ts`: random handoff generation, digest-only persistence, 30-second expiry, and atomic one-time consumption.
- `src/lib/auth/credentials.ts`: independently testable password-or-handoff credentials authorization.
- `src/lib/auth/authorization.ts`: edge-safe `AppRole`, concrete-identity guards, and admin authorization.
- `src/lib/auth/security-log.ts`: category/request-ID-only authentication logging.
- `src/lib/auth/webauthn-registration.ts`: server verification and verifier-output persistence.
- `src/lib/auth/webauthn-authentication.ts`: assertion verification and verified counter transition.
- `src/lib/auth/passkey-client-contract.ts`: browser-safe construction of the two verification request bodies.
- Auth API route files: validate transport input, call the focused service, and return generic client-safe responses.
- `src/components/auth/PasskeyClient.tsx`: use SimpleWebAuthn browser JSON contracts; never compute proof or counters.
- `prisma/schema.prisma` plus one additive migration: record `Passkey.verifiedAt`; legacy null rows fail closed.
- `tests/security/*.test.ts`: actual service/route/provider/authorization regressions; keep unrelated rPPG tests separate.
- `scripts/ci/lint-changed.mjs` and `scripts/ci/scan-added-secrets.mjs`: deterministic changed-file lint and changed-range secret gates.
- `.github/workflows/sandbox-validated-ci.yml`: one correctly provisioned Node 24/pnpm 11 quality gate.
- `Dockerfile`, `.dockerignore`, `next.config.ts`, `.github/workflows/docker-publish.yml`: reproducible pnpm build, standalone output, pre-push image scan, and safe build context.

---

### Task 1: Commit the Approved Governance Artifacts

**Files:**
- Add: `docs/superpowers/specs/2026-08-17-issue-13-security-remediation-design.md`
- Add: `docs/superpowers/plans/2026-08-17-issue-13-security-remediation.md`

**Interfaces:**
- Consumes: approved design and this repository-verified plan.
- Produces: immutable review context for every later commit and the draft PR.

- [ ] **Step 1: Reconfirm the branch and pre-existing delta**

Run:

```bash
git branch --show-current
git status --short
git diff --name-only origin/main...HEAD
```

Expected: branch `fix/security-baseline`; only `docs/superpowers/` is untracked; committed branch delta contains only the three dependency files.

- [ ] **Step 2: Review both documents without editing the approved design**

Run:

```bash
sed -n '1,220p' docs/superpowers/specs/2026-08-17-issue-13-security-remediation-design.md
sed -n '1,1200p' docs/superpowers/plans/2026-08-17-issue-13-security-remediation.md
```

Expected: design status is `Approved design`; plan contains no implementation result claims.

- [ ] **Step 3: Commit only the two Markdown files**

```bash
git add docs/superpowers/specs/2026-08-17-issue-13-security-remediation-design.md docs/superpowers/plans/2026-08-17-issue-13-security-remediation.md
git diff --cached --check
git commit -m "docs(security): add issue 13 design and implementation plan"
```

- [ ] **Step 4: Verify the commit scope**

Run: `git show --stat --oneline HEAD`

Expected: exactly the two governance Markdown files.

---

### Task 2: Clear the Dependency and Toolchain Gate

**Files:**
- Modify: `package.json`
- Modify: `pnpm-workspace.yaml`
- Modify: `pnpm-lock.yaml`

**Interfaces:**
- Consumes: pushed dependency baseline `60494c5` and the current pnpm audit advisory paths.
- Produces: Node 24/pnpm 11 reproducibility, SimpleWebAuthn packages, and zero critical/high production advisories.

- [ ] **Step 1: Record the red audit baseline under the repository target runtime**

Run:

```bash
nvm use 24
node --version
pnpm --version
pnpm install --frozen-lockfile
pnpm audit --prod --json
```

Expected at planning baseline: Node 24.x, pnpm 11.20.0, frozen install PASS, audit 0 critical / 15 high. If advisory data has changed, use the live audit report as the authority and preserve the zero-critical/zero-high gate.

- [ ] **Step 2: Pin the package manager and add maintained WebAuthn libraries**

Add to `package.json`:

```json
{
  "packageManager": "pnpm@11.20.0",
  "dependencies": {
    "@simplewebauthn/browser": "13.3.0",
    "@simplewebauthn/server": "13.3.2"
  }
}
```

Preserve every existing dependency; insert these keys in sorted position.

- [ ] **Step 3: Replace the invalid build-policy value and add only audit-required overrides**

Set the relevant `pnpm-workspace.yaml` entries to:

```yaml
allowBuilds:
  '@prisma/engines': true
  esbuild: true
  msgpackr-extract: false
  prisma: true
  protobufjs: false
  sharp: true
  unrs-resolver: false
ignoredBuiltDependencies:
  - esbuild
  - msgpackr-extract
  - unrs-resolver
overrides:
  'brace-expansion@>=2.0.0 <2.1.4': 2.1.4
  'fast-uri@>=3.0.0 <3.1.5': 3.1.5
  'fast-xml-builder@<=1.1.6': 1.1.7
  'form-data@<2.5.6': 2.5.6
  'form-data@>=4.0.0 <4.0.6': 4.0.6
  'hono@<4.12.34': 4.12.34
  'langsmith@<0.6.0': 0.6.0
  'protobufjs@<=7.6.0': 7.6.1
  'ws@>=8.0.0 <8.21.0': 8.21.0
```

These selectors correspond to the observed high-advisory paths. Do not add overrides for unaffected packages.

- [ ] **Step 4: Regenerate and inspect the lockfile**

Run:

```bash
pnpm install
git diff -- package.json pnpm-workspace.yaml pnpm-lock.yaml
pnpm install --frozen-lockfile
```

Expected: no dependency changes outside the explicit direct additions and advisory paths; frozen install PASS.

- [ ] **Step 5: Prove the audit gate**

Run:

```bash
pnpm audit --prod
pnpm audit --prod --json | jq '.metadata.vulnerabilities'
```

Expected: `critical: 0`, `high: 0`. Moderate/low findings may remain only when their dependency paths and upstream limits are copied into the issue/PR without secret values. Do not proceed if critical or high is nonzero.

- [ ] **Step 6: Prove dependency compatibility**

Run:

```bash
pnpm typecheck
pnpm test
pnpm build
```

Expected: all PASS under Node 24.

- [ ] **Step 7: Commit the bounded follow-up**

```bash
git add package.json pnpm-workspace.yaml pnpm-lock.yaml
git commit -m "fix(deps): clear residual issue 13 advisories"
```

---

### Task 3: Replace False-Positive Security Tests with a Red Regression Harness

**Files:**
- Rename: `tests/security/webauthn-hardening.test.ts` → `tests/security/rppg-liveness.test.ts`
- Create: `tests/fixtures/webauthn.ts`
- Create: `tests/helpers/auth-prisma-mock.ts`
- Create: `tests/security/webauthn-registration.test.ts`
- Create: `tests/security/webauthn-authentication.test.ts`
- Create: `tests/security/session-handoff.test.ts`
- Create: `tests/security/authorization.test.ts`

**Interfaces:**
- Consumes: current route/provider contracts and SimpleWebAuthn JSON types.
- Produces: executable regressions for every issue #13 authentication criterion; unrelated rPPG coverage remains intact.

- [ ] **Step 1: Preserve only the unrelated rPPG tests**

Run `git mv tests/security/webauthn-hardening.test.ts tests/security/rppg-liveness.test.ts`, then remove the mock-only WebAuthn sections (`Challenge Replay`, `Counter Replay`, `Invalid Origin`, `Passkey Bypass`, `Ceremony Binding`, `Expired Challenge`, and `External Authenticator`) from the renamed file. Keep both rPPG describe blocks unchanged.

- [ ] **Step 2: Create typed fixtures and one shared Prisma mock**

`tests/fixtures/webauthn.ts` must export:

```ts
import type {
  AuthenticationResponseJSON,
  RegistrationResponseJSON,
} from "@simplewebauthn/server";

export const registrationResponse: RegistrationResponseJSON = {
  id: "credential-id",
  rawId: "credential-id",
  type: "public-key",
  clientExtensionResults: {},
  authenticatorAttachment: "platform",
  response: {
    clientDataJSON: "client-data",
    attestationObject: "attestation",
    transports: ["internal"],
  },
};

export const authenticationResponse: AuthenticationResponseJSON = {
  id: "credential-id",
  rawId: "credential-id",
  type: "public-key",
  clientExtensionResults: {},
  authenticatorAttachment: "platform",
  response: {
    clientDataJSON: "client-data",
    authenticatorData: "authenticator-data",
    signature: "signature",
    userHandle: "user-1",
  },
};
```

The shared mock must expose `user`, `passkey`, `webAuthnChallenge`, and `$transaction` methods used by the real modules. `$transaction(callback)` must invoke `callback(mockPrisma)` so transaction paths are exercised.

- [ ] **Step 3: Write registration failures against the actual route/service boundary**

Include named tests for missing attestation, verifier rejection, wrong origin, wrong RP ID, wrong ceremony, wrong user binding, expired challenge, used challenge, unauthenticated enrollment for an existing account, duplicate credential, and verifier-output-only persistence.

Representative assertion:

```ts
it("does not persist a credential when server verification fails", async () => {
  verifyRegistrationResponseMock.mockRejectedValue(new Error("invalid attestation"));

  const response = await verifyRegistration({
    challenge: "challenge-1",
    response: registrationResponse,
    requestId: "request-1",
  });

  expect(response.ok).toBe(false);
  expect(mockPrisma.passkey.create).not.toHaveBeenCalled();
});
```

- [ ] **Step 4: Write authentication and handoff failures**

Include named tests for missing/invalid signature, wrong origin/RP ID, wrong user/ceremony, expired/used challenge, unknown or unverified legacy credential, counter regression, concurrent challenge consumption, fixed-marker submission, expired handoff, replayed handoff, concurrent handoff consumption, exactly one `signIn` call, and session issuance rejection.

Fixed-marker assertion:

```ts
it("rejects the historical fixed bypass marker", async () => {
  const user = await authorizeCredentials({
    email: "victim@example.com",
    password: "passkey-auth-bypass",
  });

  expect(user).toBeNull();
  expect(mockPrisma.webAuthnChallenge.updateMany).not.toHaveBeenCalled();
});
```

- [ ] **Step 5: Write authorization failures**

```ts
it.each([
  null,
  {},
  { role: "admin" },
  { id: "", role: "admin" },
])("rejects protected identity %j", (user) => {
  expect(hasConcreteIdentity(user)).toBe(false);
});

it("rejects a concrete non-admin from operator routes", () => {
  expect(canAccessPrivilegedRoute({ id: "user-1", role: "user" })).toBe(false);
});
```

- [ ] **Step 6: Run the focused suite and record the expected red state**

Run:

```bash
pnpm exec vitest run tests/security/rppg-liveness.test.ts tests/security/webauthn-registration.test.ts tests/security/webauthn-authentication.test.ts tests/security/session-handoff.test.ts tests/security/authorization.test.ts
```

Expected: rPPG tests PASS; new security tests FAIL because the production interfaces/fixes do not yet exist. Preserve the exact failure list in the issue comment.

- [ ] **Step 7: Commit the red regression specification**

```bash
git add tests/security tests/fixtures tests/helpers
git commit -m "test(auth): capture issue 13 security regressions"
```

---

### Task 4: Reconcile Auth Persistence and Add Atomic Proof Primitives

**Files:**
- Modify: `prisma/schema.prisma`
- Create: `prisma/migrations/20260817090000_reconcile_verified_passkeys/migration.sql`
- Create: `src/lib/auth/challenge-store.ts`
- Create: `src/lib/auth/session-handoff.ts`
- Modify: `tests/security/session-handoff.test.ts`
- Create: `tests/security/challenge-store.test.ts`

**Interfaces:**
- Produces: `consumeChallenge(tx, input): Promise<void>`, `createSessionHandoff(tx, userId, now?): Promise<string>`, and `consumeSessionHandoff(userId, token, now?): Promise<boolean>`.
- Invariant: only `Passkey.verifiedAt != null` is trusted; legacy null rows are never authenticated.

- [ ] **Step 1: Inspect migration state against an isolated test database**

Run only with an explicitly non-production `TEST_DATABASE_URL`:

```bash
test -n "$TEST_DATABASE_URL"
DATABASE_URL="$TEST_DATABASE_URL" pnpm prisma migrate status
DATABASE_URL="$TEST_DATABASE_URL" pnpm prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --script
```

Expected: confirm the observed migration gap for `passkeys` and `webauthn_challenges`. Do not point these commands at production.

- [ ] **Step 2: Add server-verification provenance**

Add to `Passkey` in `prisma/schema.prisma`:

```prisma
verifiedAt DateTime?
```

Do not backfill this column: pre-remediation rows were not cryptographically verified.

- [ ] **Step 3: Create one idempotent reconciliation migration**

The migration must:

1. Create `passkeys` and `webauthn_challenges` only when absent, matching the declarative schema.
2. Add `passkeys.verifiedAt TIMESTAMP(3)` only when absent.
3. Create the credential/challenge unique indexes and challenge lookup indexes only when absent.
4. Add the `passkeys.userId → User.id` foreign key only when the constraint is absent.
5. Leave every existing passkey `verifiedAt = NULL`.

Use this complete migration body:

```sql
CREATE TABLE IF NOT EXISTS "passkeys" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "credentialId" TEXT NOT NULL,
  "publicKey" TEXT NOT NULL,
  "counter" BIGINT NOT NULL DEFAULT 0,
  "deviceType" TEXT,
  "transports" TEXT,
  "backedUp" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "lastUsedAt" TIMESTAMP(3),
  "verifiedAt" TIMESTAMP(3),
  CONSTRAINT "passkeys_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "webauthn_challenges" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "challenge" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "usedAt" TIMESTAMP(3),
  CONSTRAINT "webauthn_challenges_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "passkeys"
  ADD COLUMN IF NOT EXISTS "verifiedAt" TIMESTAMP(3);

CREATE UNIQUE INDEX IF NOT EXISTS "passkeys_credentialId_key"
  ON "passkeys"("credentialId");
CREATE UNIQUE INDEX IF NOT EXISTS "webauthn_challenges_challenge_key"
  ON "webauthn_challenges"("challenge");
CREATE INDEX IF NOT EXISTS "webauthn_challenges_userId_challenge_idx"
  ON "webauthn_challenges"("userId", "challenge");
CREATE INDEX IF NOT EXISTS "webauthn_challenges_expiresAt_idx"
  ON "webauthn_challenges"("expiresAt");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'passkeys_userId_fkey'
  ) THEN
    ALTER TABLE "passkeys"
      ADD CONSTRAINT "passkeys_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User"("id")
      ON DELETE RESTRICT ON UPDATE CASCADE;
  END IF;
END $$;
```

Do not infer or backfill credential trust.

- [ ] **Step 4: Implement conditional ceremony consumption**

`consumeChallenge` must issue one `updateMany` constrained by all invariants:

```ts
export type CeremonyType = "registration" | "authentication";

export class InvalidAuthenticationProof extends Error {
  override readonly name = "InvalidAuthenticationProof";
}

export interface ConsumeChallengeInput {
  id: string;
  userId: string;
  type: CeremonyType;
  now: Date;
}

export async function consumeChallenge(
  tx: Prisma.TransactionClient,
  input: ConsumeChallengeInput,
): Promise<void> {
  const result = await tx.webAuthnChallenge.updateMany({
    where: {
      id: input.id,
      userId: input.userId,
      type: input.type,
      usedAt: null,
      expiresAt: { gt: input.now },
    },
    data: { usedAt: input.now },
  });
  if (result.count !== 1) throw new InvalidAuthenticationProof();
}
```

- [ ] **Step 5: Implement digest-only handoff creation and consumption**

```ts
const HANDOFF_TYPE = "session-handoff";
const HANDOFF_TTL_MS = 30_000;

export async function createSessionHandoff(
  tx: Prisma.TransactionClient,
  userId: string,
  now = new Date(),
): Promise<string> {
  const token = randomBytes(32).toString("base64url");
  await tx.webAuthnChallenge.create({
    data: {
      userId,
      challenge: createHash("sha256").update(token).digest("base64url"),
      type: HANDOFF_TYPE,
      expiresAt: new Date(now.getTime() + HANDOFF_TTL_MS),
    },
  });
  return token;
}
```

`consumeSessionHandoff` must hash the supplied token, then conditionally `updateMany` on digest, user ID, `session-handoff`, `usedAt: null`, and `expiresAt > now`; return true only when `count === 1`.

- [ ] **Step 6: Run unit and isolated migration tests**

```bash
pnpm exec vitest run tests/security/challenge-store.test.ts tests/security/session-handoff.test.ts
pnpm prisma validate
pnpm prisma generate
DATABASE_URL="$TEST_DATABASE_URL" pnpm prisma migrate deploy
```

Expected: atomic replay/concurrency tests PASS; migration deploys only to the isolated database. No production migration is executed.

- [ ] **Step 7: Commit**

```bash
git add prisma/schema.prisma prisma/migrations/20260817090000_reconcile_verified_passkeys/migration.sql src/lib/auth/challenge-store.ts src/lib/auth/session-handoff.ts tests/security/challenge-store.test.ts tests/security/session-handoff.test.ts
git commit -m "fix(auth): add atomic verified proof storage"
```

---

### Task 5: Centralize Fail-Closed WebAuthn Configuration and Registration Options

**Files:**
- Create: `src/lib/auth/webauthn-config.ts`
- Create: `src/lib/auth/webauthn-schemas.ts`
- Create: `src/lib/auth/security-log.ts`
- Modify: `src/app/api/auth/register-options/route.ts`
- Modify: `tests/security/webauthn-registration.test.ts`
- Modify: `src/lib/config/validateEnv.ts`

**Interfaces:**
- Produces: `getWebAuthnConfig(): { rpID: string; rpName: string; origin: string; ceremonyTimeoutMs: 60000 }`.
- Registration-options response is `PublicKeyCredentialCreationOptionsJSON` only; its `challenge` and `user.id` are inside the options object.

- [ ] **Step 1: Add exact configuration tests**

Test production rejection for missing `WEBAUTHN_RP_ID`/`WEBAUTHN_ORIGIN`, origin paths/trailing slash, insecure non-local HTTP, and RP IDs containing scheme/port. Test exact local defaults only when `NODE_ENV !== "production"`.

- [ ] **Step 2: Implement the edge-free configuration module**

```ts
export interface WebAuthnConfig {
  rpID: string;
  rpName: string;
  origin: string;
  ceremonyTimeoutMs: 60_000;
}
```

Production must require explicit environment values; development may default to `localhost` and `http://localhost:3000`. Normalize with `new URL(origin).origin` and reject if normalization changes the configured string.

- [ ] **Step 3: Add strict transport schemas**

Export `registrationResponseSchema` and `authenticationResponseSchema` with non-empty base64url strings, literal `type: "public-key"`, and required attestation/assertion fields. Do not use `z.any()`.

- [ ] **Step 4: Require ownership before enrolling an existing account**

In `register-options`, load `auth()` and the user by normalized email. If the user already exists, require `session.user.id === user.id`; otherwise return generic 403. New-user creation may retain the current pre-creation approach for this issue, but the resulting challenge must be bound to the created user ID.

- [ ] **Step 5: Generate options with SimpleWebAuthn**

```ts
const options = await generateRegistrationOptions({
  rpName: config.rpName,
  rpID: config.rpID,
  userName: user.email,
  userDisplayName: user.name ?? user.email,
  userID: new TextEncoder().encode(user.id),
  timeout: config.ceremonyTimeoutMs,
  attestationType: "none",
  authenticatorSelection: {
    residentKey: "required",
    userVerification: "required",
  },
  excludeCredentials: user.passkeys
    .filter((passkey) => passkey.verifiedAt !== null)
    .map((passkey) => ({ id: passkey.credentialId })),
});
```

Persist `options.challenge` with user ID, type `registration`, 60-second expiry, and unused state; return `options` directly.

- [ ] **Step 6: Use category/request-ID-only errors**

`security-log.ts` may log `{ category, requestId }` and `error.name`; it must not serialize request bodies or error messages. Client responses use only `Invalid registration request`, `Registration not allowed`, or `Unable to create registration options`.

- [ ] **Step 7: Run and commit**

```bash
pnpm exec vitest run tests/security/webauthn-registration.test.ts -t "options|existing account|configuration"
pnpm typecheck
pnpm exec eslint src/lib/auth/webauthn-config.ts src/lib/auth/webauthn-schemas.ts src/lib/auth/security-log.ts src/app/api/auth/register-options/route.ts tests/security/webauthn-registration.test.ts
git add src/lib/auth src/lib/config/validateEnv.ts src/app/api/auth/register-options/route.ts tests/security/webauthn-registration.test.ts
git commit -m "fix(auth): bind passkey registration options"
```

---

### Task 6: Verify Registration Attestation and Persist Only Verified Material

**Files:**
- Create: `src/lib/auth/webauthn-registration.ts`
- Modify: `src/app/api/auth/verify-registration/route.ts`
- Modify: `tests/security/webauthn-registration.test.ts`

**Interfaces:**
- Produces: `verifyRegistration(input): Promise<{ ok: true; credentialId: string } | { ok: false }>`.
- Consumes: `{ challenge: string; response: RegistrationResponseJSON; requestId: string }`.

- [ ] **Step 1: Finish red route/service tests**

Make wrong origin, RP ID, missing attestation, verifier rejection, wrong ceremony/user, expired/used challenge, duplicate credential, and client-supplied key/counter tests fail against current code.

- [ ] **Step 2: Verify with SimpleWebAuthn**

Load the challenge by the submitted challenge string, derive the user solely from `storedChallenge.userId`, and call:

```ts
const verification = await verifyRegistrationResponse({
  response,
  expectedChallenge: storedChallenge.challenge,
  expectedOrigin: config.origin,
  expectedRPID: config.rpID,
  requireUserVerification: true,
});
```

Require `verification.verified` and `verification.registrationInfo`; never parse `clientDataJSON` or attestation manually.

- [ ] **Step 3: Atomically consume and persist verifier output**

Inside one Prisma transaction:

1. `consumeChallenge(tx, { id, userId, type: "registration", now })`.
2. Reject an existing credential ID.
3. Create the passkey from `registrationInfo.credential.id`, `credential.publicKey`, `credential.counter`, `credential.transports`, `credentialDeviceType`, and `credentialBackedUp`.
4. Set `verifiedAt: now`.

Encode the verifier's public-key bytes as base64url for `Passkey.publicKey`; never persist any client-provided `publicKey`, counter, device type, or backup flag.

- [ ] **Step 4: Replace the route contract**

The route accepts only `{ challenge, response }`, validated by Zod. Return 200 `{ verified: true, credentialId }` only after the transaction commits. All verification failures return a generic 400; storage failures return generic 500.

- [ ] **Step 5: Run and commit**

```bash
pnpm exec vitest run tests/security/webauthn-registration.test.ts
pnpm typecheck
pnpm exec eslint src/lib/auth/webauthn-registration.ts src/app/api/auth/verify-registration/route.ts tests/security/webauthn-registration.test.ts
git add src/lib/auth/webauthn-registration.ts src/app/api/auth/verify-registration/route.ts tests/security/webauthn-registration.test.ts
git commit -m "fix(auth): verify passkey registration attestation"
```

---

### Task 7: Generate Bound Authentication Options

**Files:**
- Modify: `src/app/api/auth/login-options/route.ts`
- Modify: `tests/security/webauthn-authentication.test.ts`

**Interfaces:**
- Consumes: `{ email: string }`.
- Produces: `PublicKeyCredentialRequestOptionsJSON` directly; only verified passkeys appear in `allowCredentials`.

- [ ] **Step 1: Write red option tests**

Cover unknown account, account with only legacy `verifiedAt: null` passkeys, exact RP ID, user-verification requirement, transports parsed from storage, and challenge row user/type/expiry binding.

- [ ] **Step 2: Generate options through SimpleWebAuthn**

```ts
const options = await generateAuthenticationOptions({
  rpID: config.rpID,
  timeout: config.ceremonyTimeoutMs,
  userVerification: "required",
  allowCredentials: verifiedPasskeys.map((passkey) => ({
    id: passkey.credentialId,
    transports: parseTransports(passkey.transports),
  })),
});
```

Store `options.challenge` as type `authentication` with the matched user ID and 60-second expiry. Return `options` only; do not return user ID or credential lists separately.

- [ ] **Step 3: Run and commit**

```bash
pnpm exec vitest run tests/security/webauthn-authentication.test.ts -t "options"
pnpm typecheck
pnpm exec eslint src/app/api/auth/login-options/route.ts tests/security/webauthn-authentication.test.ts
git add src/app/api/auth/login-options/route.ts tests/security/webauthn-authentication.test.ts
git commit -m "fix(auth): bind passkey authentication options"
```

---

### Task 8: Verify Authentication Signatures and Counters

**Files:**
- Create: `src/lib/auth/webauthn-authentication.ts`
- Modify: `tests/security/webauthn-authentication.test.ts`

**Interfaces:**
- Produces: `verifyAuthenticationCeremony(input): Promise<{ userId: string; email: string; newCounter: bigint }>`; it does not issue or report browser success yet.
- Consumes: `{ challenge: string; response: AuthenticationResponseJSON; requestId: string }`.

- [ ] **Step 1: Finish red assertion tests**

Cover missing/invalid signatures, wrong origin/RP ID, wrong ceremony/user, expired/used challenge, unknown credential, legacy unverified credential, verifier false/throw, and counter regression.

- [ ] **Step 2: Verify the stored credential through SimpleWebAuthn**

Load the user from `storedChallenge.userId` and the passkey by `response.id` plus `verifiedAt != null`. Call:

```ts
const verification = await verifyAuthenticationResponse({
  response,
  expectedChallenge: storedChallenge.challenge,
  expectedOrigin: config.origin,
  expectedRPID: config.rpID,
  credential: {
    id: passkey.credentialId,
    publicKey: Uint8Array.from(Buffer.from(passkey.publicKey, "base64url")),
    counter: Number(passkey.counter),
    transports: parseTransports(passkey.transports),
  },
  requireUserVerification: true,
});
```

Require verified output and use only `verification.authenticationInfo.newCounter`. Reject a stored counter outside the WebAuthn unsigned 32-bit range before converting it to `number`.

- [ ] **Step 3: Atomically consume challenge and update the counter**

In one transaction, consume the authentication challenge and `updateMany` the passkey constrained by its ID, prior counter, and non-null `verifiedAt`. Require exactly one updated row. Set `lastUsedAt` from the same `now` value.

- [ ] **Step 4: Run and commit the service without wiring browser success**

```bash
pnpm exec vitest run tests/security/webauthn-authentication.test.ts
pnpm typecheck
pnpm exec eslint src/lib/auth/webauthn-authentication.ts tests/security/webauthn-authentication.test.ts
git add src/lib/auth/webauthn-authentication.ts tests/security/webauthn-authentication.test.ts
git commit -m "fix(auth): verify passkey authentication assertions"
```

---

### Task 9: Replace the Fixed Bypass with a One-Time Auth.js Handoff

**Files:**
- Create: `src/lib/auth/credentials.ts`
- Modify: `src/auth.ts`
- Modify: `src/app/api/auth/verify-login/route.ts`
- Modify: `src/lib/auth/webauthn-authentication.ts`
- Modify: `tests/security/session-handoff.test.ts`
- Modify: `tests/security/webauthn-authentication.test.ts`

**Interfaces:**
- Credentials input: password flow `{ email, password }` or passkey flow `{ email, handoff }`; never both.
- Verify-login response: 200 `{ verified: true }` only after one successful `signIn`; otherwise generic non-2xx `{ verified: false, error: string }`.

- [ ] **Step 1: Make fixed-marker, replay, concurrency, and session-failure tests red**

Require direct marker submission to return null, handoff update count 0 to return null, two concurrent consumes to yield exactly one user, successful login to call `signIn` exactly once, and mocked `signIn` rejection to return non-success.

- [ ] **Step 2: Extract credentials authorization**

```ts
export async function authorizeCredentials(
  credentials: Partial<Record<"email" | "password" | "handoff", unknown>>,
): Promise<AuthenticatedUser | null>;
```

Normalize/validate email. For `handoff`, find the user and call `consumeSessionHandoff(user.id, handoff)`; return the typed user only on true. For `password`, preserve bcrypt verification. Delete all fixed-marker handling and do not query “has any passkey” as authorization.

- [ ] **Step 3: Wire the provider to the extracted function**

Declare `handoff` in the credentials provider and set `authorize: authorizeCredentials`. Ensure OAuth behavior remains unchanged.

- [ ] **Step 4: Mint the handoff in the assertion transaction**

After verified assertion output, create the digest-only handoff in the same transaction that consumes the challenge and updates the counter. Return the raw token only to the server caller of `verifyAuthenticationCeremony`; never serialize it.

- [ ] **Step 5: Issue exactly one session and fail closed**

```ts
const verified = await verifyAuthenticationCeremony(input);
try {
  await signIn("credentials", {
    email: verified.email,
    handoff: verified.handoff,
    redirect: false,
    redirectTo: "/dashboard",
  });
} catch (error) {
  logAuthFailure("session_issuance_failed", requestId, error);
  return NextResponse.json(
    { verified: false, error: "Authentication failed" },
    { status: 401 },
  );
}
return NextResponse.json({ verified: true });
```

Do not catch an Auth.js failure and convert it to success. The raw handoff is already consumed by `authorizeCredentials`; a failed session cannot be replayed.

- [ ] **Step 6: Prove the complete server flow**

```bash
rg -n "passkey-auth-bypass" src tests
pnpm exec vitest run tests/security/session-handoff.test.ts tests/security/webauthn-authentication.test.ts
pnpm typecheck
pnpm exec eslint src/auth.ts src/lib/auth/credentials.ts src/lib/auth/session-handoff.ts src/lib/auth/webauthn-authentication.ts src/app/api/auth/verify-login/route.ts tests/security/session-handoff.test.ts tests/security/webauthn-authentication.test.ts
```

Expected: ripgrep returns no source/test matches; all focused tests PASS.

- [ ] **Step 7: Commit**

```bash
git add src/auth.ts src/lib/auth/credentials.ts src/lib/auth/session-handoff.ts src/lib/auth/webauthn-authentication.ts src/app/api/auth/verify-login/route.ts tests/security/session-handoff.test.ts tests/security/webauthn-authentication.test.ts
git commit -m "fix(auth): issue sessions through one-time handoffs"
```

---

### Task 10: Align the Browser with Verified SimpleWebAuthn Contracts

**Files:**
- Modify: `src/components/auth/PasskeyClient.tsx`
- Create: `src/lib/auth/passkey-client-contract.ts`
- Create: `tests/security/passkey-client-contract.test.ts`

**Interfaces:**
- Consumes registration/authentication options JSON returned directly by the option routes.
- Sends `{ challenge: options.challenge, response }` where `response` is returned by the SimpleWebAuthn browser package.

- [ ] **Step 1: Write red client-contract tests**

Test the following browser-safe helpers, then require the component to use them:

```ts
import type {
  AuthenticationResponseJSON,
  PublicKeyCredentialCreationOptionsJSON,
  PublicKeyCredentialRequestOptionsJSON,
  RegistrationResponseJSON,
} from "@simplewebauthn/server";

export function registrationVerificationPayload(
  options: PublicKeyCredentialCreationOptionsJSON,
  response: RegistrationResponseJSON,
) {
  return { challenge: options.challenge, response };
}

export function authenticationVerificationPayload(
  options: PublicKeyCredentialRequestOptionsJSON,
  response: AuthenticationResponseJSON,
) {
  return { challenge: options.challenge, response };
}
```

Assert the payloads contain no user ID, signature counter, handoff, or extracted public key. Redirects happen only after `verifyRes.ok` plus `{ verified: true }`.

- [ ] **Step 2: Replace manual conversions and serialization**

```ts
import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";

const registrationOptions = await optionsRes.json();
const response = await startRegistration({ optionsJSON: registrationOptions });
const verifyRes = await fetch("/api/auth/verify-registration", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    challenge: registrationOptions.challenge,
    response,
  }),
});
```

Use the equivalent `startAuthentication({ optionsJSON })` flow. Delete `bufferToBase64*`, `atob` conversions, client public-key extraction, and client counter calculation.

- [ ] **Step 3: Require explicit verified success**

Parse the verification JSON and throw unless `verifyRes.ok && body.verified === true`. Keep existing UI structure and copy; do not redesign auth pages.

- [ ] **Step 4: Run and commit**

```bash
pnpm exec vitest run tests/security/passkey-client-contract.test.ts
pnpm typecheck
pnpm exec eslint src/components/auth/PasskeyClient.tsx src/lib/auth/passkey-client-contract.ts tests/security/passkey-client-contract.test.ts
git add src/components/auth/PasskeyClient.tsx src/lib/auth/passkey-client-contract.ts tests/security/passkey-client-contract.test.ts
git commit -m "fix(auth): use verified passkey browser contracts"
```

---

### Task 11: Enforce Concrete Identity and Typed Admin Authorization

**Files:**
- Create: `src/lib/auth/authorization.ts`
- Modify: `src/next-auth.d.ts`
- Modify: `src/auth.config.ts`
- Modify: `src/auth.ts`
- Modify: `src/proxy.ts`
- Modify: `middleware.ts`
- Modify: `src/app/admin/health/page.tsx`
- Modify: `src/app/admin/leads/page.tsx`
- Modify: `src/app/operator/page.tsx`
- Modify: `src/app/api/admin/listings/route.ts`
- Modify: `src/app/api/admin/listings/[id]/verify/route.ts`
- Modify: `src/app/api/admin/listings/[id]/flag/route.ts`
- Modify: `src/app/api/admin/flags/route.ts`
- Modify: `src/app/api/admin/flags/[id]/resolve/route.ts`
- Modify: `src/app/api/admin/kyc/route.ts`
- Modify: `src/app/api/admin/kyc/[id]/route.ts`
- Modify: `src/app/api/admin/kyc/[id]/approve/route.ts`
- Modify: `src/app/api/admin/kyc/[id]/reject/route.ts`
- Modify: `src/app/api/operator/approve/route.ts`
- Modify: `src/app/api/operator/reject/route.ts`
- Modify: `src/app/api/operator/leads/route.ts`
- Modify: `src/app/api/operator/metrics/route.ts`
- Modify: `src/app/api/operator/queue-stats/route.ts`
- Modify: `src/app/api/operator/force-approve-payment/[leadId]/route.ts`
- Modify: `src/app/api/lead/delete/[leadId]/route.ts`
- Modify: `src/app/api/lead/export/[leadId]/route.ts`
- Modify: `src/app/api/demo/approve/route.ts`
- Modify: `src/app/api/cron/rag-sync/route.ts`
- Modify: `src/app/api/listings/[id]/renew/route.ts`
- Modify: `tests/security/authorization.test.ts`

**Interfaces:**
- Produces: `AppRole = "user" | "admin"`, `isAppRole`, `hasConcreteIdentity`, `hasAdminIdentity`, and `canAccessPath`.

- [ ] **Step 1: Implement edge-safe runtime guards**

```ts
export type AppRole = "user" | "admin";

export function isAppRole(value: unknown): value is AppRole {
  return value === "user" || value === "admin";
}

export function hasConcreteIdentity(
  user: { id?: unknown } | null | undefined,
): user is { id: string } {
  return typeof user?.id === "string" && user.id.length > 0;
}

export function hasAdminIdentity(
  user: { id?: unknown; role?: unknown } | null | undefined,
): user is { id: string; role: "admin" } {
  return hasConcreteIdentity(user) && user.role === "admin";
}
```

`canAccessPath` must require concrete identity for `/dashboard`, `/finance`, and `/support`, and admin identity for `/admin` and `/operator`.

- [ ] **Step 2: Correct Auth.js type augmentation and callbacks**

Remove the nonexistent generated Prisma `Role` import. Augment both `next-auth` and `next-auth/jwt` with `AppRole` and concrete `id`. In JWT/session callbacks, accept only `isAppRole(value)` and default unknown database role strings to `user`; assign fields directly without `any` or record casts.

- [ ] **Step 3: Harden both edge entry points**

Replace `!!req.auth` and `Boolean(auth?.user)` with `canAccessPath(pathname, auth?.user)`. Preserve Node/Prisma exclusion from edge files. Add `/operator/:path*` to the root middleware matcher.

- [ ] **Step 4: Apply the typed guard to privileged pages and APIs**

Replace each ad hoc role cast/check with `hasAdminIdentity(session?.user)`. The unauthenticated queue-stats route must call `auth()` and return 401/403 before reading queue state. Preserve each route's existing success payload.

- [ ] **Step 5: Prove the protected surface**

```bash
rg -n "req\.auth|session\?\.user|as any|unknown as Record" src/proxy.ts middleware.ts src/auth.config.ts src/auth.ts src/app/admin src/app/operator src/app/api/admin src/app/api/operator src/app/api/lead src/app/api/demo src/app/api/cron/rag-sync
pnpm exec vitest run tests/security/authorization.test.ts
pnpm typecheck
```

Expected: no ambiguous session truthiness or role type escape remains in the scoped files; every protected/privileged regression PASS.

- [ ] **Step 6: Scoped lint and commit**

Run ESLint over every file listed by `git diff --name-only HEAD^` that ends in `.ts` or `.tsx`, then:

```bash
git add src/lib/auth/authorization.ts src/next-auth.d.ts src/auth.config.ts src/auth.ts src/proxy.ts middleware.ts src/app/admin src/app/operator src/app/api/admin src/app/api/operator src/app/api/lead src/app/api/demo/approve/route.ts src/app/api/cron/rag-sync/route.ts tests/security/authorization.test.ts
git commit -m "fix(authz): require concrete typed identities"
```

---

### Task 12: Pass the Complete Local Release Gate

**Files:**
- Modify only files required to fix failures caused by Tasks 2–11; unrelated baseline failures remain separately tracked by issue #8.

**Interfaces:**
- Produces: one reproducible verification record for issue #13.

- [ ] **Step 1: Clean-install under Node 24**

```bash
nvm use 24
pnpm install --frozen-lockfile
```

- [ ] **Step 2: Run the audit and focused security suite**

```bash
pnpm audit --prod
pnpm exec vitest run tests/security/rppg-liveness.test.ts tests/security/webauthn-registration.test.ts tests/security/webauthn-authentication.test.ts tests/security/session-handoff.test.ts tests/security/challenge-store.test.ts tests/security/passkey-client-contract.test.ts tests/security/authorization.test.ts
```

Expected: audit 0 critical/high; all focused tests PASS.

- [ ] **Step 3: Run static and full verification**

```bash
pnpm typecheck
git diff --name-only -z origin/main...HEAD -- '*.ts' '*.tsx' | xargs -0 pnpm exec eslint
pnpm test
pnpm build
git diff --check origin/main...HEAD
```

Expected: all PASS. Full repository lint is not substituted for issue #8; lint every source/test file changed by issue #13.

- [ ] **Step 4: Inspect scope and secret patterns**

```bash
git diff --stat origin/main...HEAD
git diff --name-status origin/main...HEAD
git diff --unified=0 --no-ext-diff origin/main...HEAD
```

Inspect added lines for credentials, tokens, private keys, authorization headers, cookies, handoffs, or environment-secret values. Do not paste candidate values into logs or issue comments.

- [ ] **Step 5: Run a security review and address every finding**

Invoke the repository `security-review` and `comprehensive-review` workflows. Re-run Steps 1–4 after every fix; unaddressed findings must be zero.

- [ ] **Step 6: Post the verification record to issue #13**

Record command names, Node/pnpm versions, pass/fail counts, audit severity counts, changed-file lint scope, build result, migration-test environment name, and limitations. Do not record secret values.

---

### Task 13: Repair CI and Docker Gates Before Publication

**Files:**
- Create: `scripts/ci/lint-changed.mjs`
- Create: `scripts/ci/scan-added-secrets.mjs`
- Create: `tests/ci/security-gates.test.ts`
- Modify: `.github/workflows/sandbox-validated-ci.yml`
- Modify: `.github/workflows/docker-publish.yml`
- Modify: `Dockerfile`
- Create: `.dockerignore`
- Modify: `next.config.ts`
- Modify: `.github/workflows/README.md`

**Interfaces:**
- `node scripts/ci/lint-changed.mjs origin/main`: lint all added/copied/modified/renamed JS/TS source/test files.
- `node scripts/ci/scan-added-secrets.mjs origin/main`: exit nonzero when added diff lines contain credential material; print file/line/category only, never the candidate value.

- [ ] **Step 1: Test the CI helper behavior**

Use temporary Git fixtures to prove changed-file filtering, filenames with spaces, no-change success, secret-category detection, redacted output, and nonzero exit status.

- [ ] **Step 2: Replace disconnected CI jobs with one provisioned quality job**

The PR workflow must use checkout with full history, `pnpm/action-setup@v4` at 11.20.0, `actions/setup-node@v4` at Node 24 with pnpm cache, then run in order:

```yaml
- run: pnpm install --frozen-lockfile
- run: pnpm audit --prod --audit-level high
- run: pnpm exec vitest run tests/security
- run: pnpm typecheck
- run: node scripts/ci/lint-changed.mjs origin/main
- run: pnpm test
- run: pnpm build
- run: node scripts/ci/scan-added-secrets.mjs origin/main
```

Remove every `|| true`, best-effort fallback, Node 20, pnpm 8, and job that assumes another runner's installation.

- [ ] **Step 3: Make Docker builds match the repository**

Use Node 24 Alpine, Corepack/pnpm 11.20.0, copy `package.json`/`pnpm-lock.yaml`/`pnpm-workspace.yaml`, install with `pnpm install --frozen-lockfile`, build with `pnpm build`, and run as the existing non-root user. Add `output: "standalone"` to `next.config.ts`.

`.dockerignore` must include at least:

```text
.git
.github
.next
node_modules
.env
.env.*
HANDOVER.md
docs/superpowers
coverage
```

- [ ] **Step 4: Scan the exact image before push**

Trigger Docker build/scan for pull requests and default-branch pushes. Build a local image tagged with `${{ github.sha }}`, run Docker Scout against that exact immutable SHA tag with critical/high exit gate, and only then log in/push on default-branch events. Never scan `latest` as the release decision target.

- [ ] **Step 5: Run local verification**

```bash
pnpm exec vitest run tests/ci/security-gates.test.ts
node scripts/ci/lint-changed.mjs origin/main
node scripts/ci/scan-added-secrets.mjs origin/main
pnpm typecheck
pnpm test
pnpm build
docker build --tag shadowspark-issue-13:local .
```

Expected: all PASS; Docker uses Node 24, pnpm lockfile, standalone output, and excludes credential-bearing documents from context.

- [ ] **Step 6: Commit**

```bash
git add scripts/ci tests/ci .github/workflows Dockerfile .dockerignore next.config.ts
git commit -m "ci(security): enforce issue 13 release gates"
```

---

### Task 14: Sanitize the Tracked Credential Record and Complete the Human Rotation Gate

**Files:**
- Modify: `HANDOVER.md`
- Modify: issue #13 operational record (external, no secret values)

**Interfaces:**
- Produces: a repository containing secret names/boundaries only and a human-attested rotation/revocation record.

- [ ] **Step 1: Remove literal credential-like values from the current document**

Replace value-bearing statements with secret-manager references such as:

```markdown
- `WHATSAPP_VERIFY_TOKEN`: stored and rotated in the approved secret manager; no value is recorded in this repository.
```

Do not reproduce the old value in the commit message, diff discussion, issue, or PR.

- [ ] **Step 2: Verify current-tree sanitization and historical exposure**

Run secret scanning with redacted output against the current tree and `origin/main...HEAD`. Use `git log -S` only with the secret variable name—not its value—to confirm the historical introduction commit. Do not rewrite history without separate explicit approval.

- [ ] **Step 3: Commit repository sanitization**

```bash
git add HANDOVER.md
git commit -m "docs(security): remove tracked credential material"
```

- [ ] **Step 4: Stop for human rotation/revocation**

A repository owner must rotate/revoke the exposed value in the external provider and update the approved secret manager. The issue comment records only secret name, provider, secret-manager resource/version identifier, rotation timestamp, and verifier—never the old or new value.

**Hard gate:** Do not open the draft PR until the human confirms rotation/revocation. Repository work cannot claim this step passed.

- [ ] **Step 5: Re-run changed-range and current-tree secret scans**

Expected: PASS with no candidate value printed.

---

### Task 15: Open One Draft Pull Request

**Files:**
- No repository file changes unless review finds an issue.

**Interfaces:**
- Produces: one draft PR from `fix/security-baseline` to `main`, linked to issue #13.

- [ ] **Step 1: Run the full Task 12 gate again after CI/Docker/document changes**

Expected: audit, focused tests, type-check, changed-scope lint, full tests, build, diff check, and secret scan all PASS under Node 24.

- [ ] **Step 2: Push the single branch**

```bash
git status --short
git push origin fix/security-baseline
```

Expected: no uncommitted changes; push succeeds.

- [ ] **Step 3: Create the draft PR**

The PR body must include `Closes #13`, the design/plan paths, per-commit summary, acceptance mapping, Node/pnpm versions, audit counts, focused/full test counts, build result, CI/Docker changes, migration rollout notes, legacy-passkey fail-closed behavior, human rotation confirmation metadata, and explicit “no merge/deploy authorized” language.

- [ ] **Step 4: Move project status to In Review and monitor every CI check**

Do not mark verification Passing until the remote checks pass at the pushed SHA.

---

### Task 16: Run Node 24 Preview and Physical Passkey/Session Verification

**Files:**
- Add only an approved verification record under `docs/deployments/` if the repository's deployment evidence policy requires it.

**Interfaces:**
- Consumes: approved non-production preview at the exact PR commit and scoped test credentials.
- Produces: evidence for successful and rejected ceremonies without production writes.

- [ ] **Step 1: Record immutable preview identity**

Record preview URL, Vercel project/environment, deployment ID, commit SHA, Node runtime, date, and verifier. Record secret names only.

- [ ] **Step 2: Exercise successful physical passkey flows**

On supported physical authenticators/browsers, register a test passkey, authenticate once, verify exactly one session cookie/session, verify protected-route access, and verify the stored counter/last-used transition in the test environment.

- [ ] **Step 3: Exercise rejected flows**

Using test-only requests, verify fixed-marker submission, tampered signature, wrong origin/RP ID, wrong ceremony/user, expired/used challenge, handoff replay/concurrency, missing concrete user ID, and non-admin privileged access all fail without a session.

- [ ] **Step 4: Verify logs and data hygiene**

Inspect preview logs for category/request ID only. Confirm no challenge, credential body, public key, handoff, cookie, authorization header, session token, or environment-secret value appears.

- [ ] **Step 5: Attach evidence to the draft PR and issue #13**

Record pass/fail outcomes and redacted screenshots/response metadata. Do not use or expose production credentials.

---

### Task 17: Review, Authorize, Merge, and Close Issue #13

**Files:**
- No planned repository changes.

**Interfaces:**
- Produces: an explicitly approved merge and accurate issue/project state.

- [ ] **Step 1: Complete review gates**

Require code review, security review, all findings addressed, remote CI Passing at the head SHA, preview evidence accepted, and zero critical/high production advisories.

- [ ] **Step 2: Obtain explicit merge authorization**

Do not infer authorization from CI success or draft-PR approval. Production deployment is a separate authorization.

- [ ] **Step 3: Merge through the approved repository method**

Verify the merge commit contains only reviewed issue #13 scope.

- [ ] **Step 4: Close and synchronize**

Confirm issue #13 is closed, project status is Done, Verification is Passing, Criteria Met is 9, Criteria Total is 9, and Last Verified is the actual verification date. Keep issues #11, #10, #9, and #8 in their existing backlog/order; do not fold them into issue #13.

## Plan Self-Review

- **Spec coverage:** Every approved design section maps to Tasks 2–17; all nine issue acceptance criteria have an implementation and verification step.
- **Repository mismatches incorporated:** committed dependency delta, failing current audit, client/server `userId` mismatch, missing cryptographic verification, absent migration history, legacy passkey trust, unauthenticated queue stats, CI runner isolation, Docker incompatibility, and credential-history exposure are explicit.
- **Type consistency:** `AppRole`, SimpleWebAuthn JSON types, challenge kinds, handoff interfaces, and service result types have one owner and consistent consumers.
- **No automatic external actions:** production migration, secret rotation, PR merge, and deployment require explicit authorization.
- **No unresolved drafting tokens:** commands, file paths, task gates, error behavior, and interfaces are concrete; external environment identifiers are recorded only when the authorized preview/rotation occurs.
