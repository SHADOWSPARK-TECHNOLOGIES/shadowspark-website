# Issue #17 Listings Expiry Cron Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the scheduled listings-expiry route reachable and fail-closed while ensuring reminder state records only confirmed delivery to a valid listing-owner recipient.

**Architecture:** Keep the Vercel schedule unchanged and expose the route as `GET`. At the route boundary, require a configured bearer secret, resolve a listing owner through `User.email` to the existing `Lead.phoneNumber`, validate that recipient as E.164, await the existing WhatsApp template sender, and update `reminderSent` only after a successful provider result; all other outcomes stay retriable and are counted in observable route output.

**Tech Stack:** Next.js App Router route handlers, TypeScript, Prisma, Vitest, Vercel Cron Jobs.

**Spec:** GitHub issue `SHADOWSPARK-TECHNOLOGIES/shadowspark-website#17`.

## Global Constraints

- The Vercel cron and route must use GET.
- Missing or invalid `CRON_SECRET` authorization must return 401 without database or provider work.
- Do not expose secret values or recipient phone numbers in source, tests, responses, or logs.
- Do not add packages, edit `.env*`, or create a Prisma migration.
- Preserve listing expiry semantics and keep unsuccessful or unavailable reminders retriable.
- Do not commit automatically; leave a reviewable working-tree patch.

---

### Task 1: Executable cron and truthful reminder state

**Files:**
- Modify: `src/app/api/cron/listings/expiry/route.ts`
- Modify: `src/lib/whatsapp/messaging.ts`
- Test: `tests/listings-expiry-cron.test.ts`

**Interfaces:**
- Consumes: `prisma.listing`, `prisma.user`, `prisma.lead`, `sendListingExpiryReminder(phone, title, daysLeft)`.
- Produces: `GET(request: Request): Promise<NextResponse>` and an awaitable `sendListingExpiryReminder(...): Promise<{ success: boolean; messageId?: string }>`.

- [x] **Step 1: Write the failing route regression tests**

```ts
it("fails closed when CRON_SECRET is missing", async () => {
  delete process.env.CRON_SECRET;
  const response = await GET(cronRequest("Bearer undefined"));
  expect(response.status).toBe(401);
  expect(listingFindMany).not.toHaveBeenCalled();
});

it("records only an awaited successful reminder", async () => {
  listingFindMany.mockResolvedValueOnce([expiringListing]);
  userFindUnique.mockResolvedValueOnce({ email: "owner@example.test" });
  leadFindUnique.mockResolvedValueOnce({ phoneNumber: "+2348012345678" });
  sendReminder.mockResolvedValueOnce({ success: true, messageId: "provider-id" });
  const response = await GET(cronRequest("Bearer test-secret"));
  expect(response.status).toBe(200);
  expect(listingUpdate).toHaveBeenCalledWith({
    where: { id: expiringListing.id },
    data: { reminderSent: true },
  });
});
```

- [x] **Step 2: Run the focused test and verify RED**

Run: `pnpm exec vitest run tests/listings-expiry-cron.test.ts`

Expected: FAIL because the route does not export `GET`, accepts `Bearer undefined`, invokes the sender with an empty recipient without awaiting it, and updates state unconditionally.

- [x] **Step 3: Implement the minimal shared-boundary correction**

```ts
export async function GET(req: Request) {
  const secret = (process.env.CRON_SECRET ?? "").trim();
  const authHeader = (req.headers.get("authorization") ?? "").trim();
  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // Resolve owner email to the existing lead phone, validate E.164,
  // await provider success, and only then update reminderSent.
}
```

The expiry sender returns the existing `sendTemplateMessage` promise when WhatsApp is enabled and a failed result when the provider is disabled, so console fallback cannot be mistaken for delivery.

- [x] **Step 4: Run the focused test and verify GREEN**

Run: `pnpm exec vitest run tests/listings-expiry-cron.test.ts`

Expected: PASS for unauthorized rejection, authorized expiry mutation, confirmed reminder state, unavailable/failed reminder state, and repeated-invocation idempotency.

### Task 2: Repository verification

**Files:**
- Verify: `src/app/api/cron/listings/expiry/route.ts`
- Verify: `src/lib/whatsapp/messaging.ts`
- Verify: `tests/listings-expiry-cron.test.ts`

**Interfaces:**
- Consumes: the Task 1 patch.
- Produces: fresh focused, lint, typecheck, test, and production-build evidence.

- [x] **Step 1: Inspect the exact diff and run the focused test**

Run: `git diff --check && pnpm exec vitest run tests/listings-expiry-cron.test.ts`

Expected: no whitespace errors and all issue-specific tests pass.

- [ ] **Step 2: Run static verification**

Run: `pnpm lint && pnpm typecheck`

Result: targeted ESLint and `pnpm typecheck` exit 0. The required full `pnpm lint` gate remains blocked by 642 pre-existing errors outside the remediation files.

- [x] **Step 3: Run the complete test suite**

Run: `pnpm test`

Expected: all test files and tests pass with zero failures.

- [x] **Step 4: Run the production build**

Run: `pnpm build`

Expected: Prisma generation and the Next.js production build exit 0.
