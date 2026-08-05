# ShadowSpark Production — Execution Plan

> Core ethos: "AI Built for Nigeria. Shipped, Not Pitched."

## Completed

### Marketing foundation
- Verify & fix pass: typecheck, lint, production build, mandated security claims across routes.
- Data-driven Products showcase (`src/data/products.ts`, `src/app/(marketing)/products/page.tsx`).
- SiteNav/Footer link coverage for `/`, `/chatbot-products`, `/infrastructure-trust`, `/public-sector`, `/products`.
- Unique metadata + OpenGraph titles on every marketing route.
- Chatbot copy above the fold; security copy as "silent muscle".
- Accessibility: nav aria-labels, visible focus states, WCAG AA dark-theme contrast.

### Rewards platform (Copilot Rewards MVP)
- Real persistence models in `prisma/schema.prisma` (`User`, `Contribution`, `Reward`, `SystemEvent`, etc.).
- Upstash Redis queue + serverless worker (`src/app/api/queue/reward-worker/route.ts`).
- HMAC webhook verification (`src/lib/webhook-verify.ts`) with TypeScript test coverage (`tests/lib/webhook-verify.test.ts`).
- Resilient fetch wrapper (`src/lib/fetch-with-retry.ts`).
- Reward catalog, contribution ingestion, badge issuance, governance docs.

### Developer experience & GTM
- `packages/shadowspark-sdk/` alpha with tests.
- Contributor UI, `/contributors`, `/pilot-apply`, `/api/pilot/request`.
- Pilot dashboard, metrics dashboard, marketplace stubs, cron stubs.

### AI backend blueprint
- `ai-service/` FastAPI scaffold with health, chat, Moonshot AI client.
- Python HMAC webhook verifier with tests (`ai-service/tests/test_webhook_verify.py`).
- Modal deployment wrapper (`ai-service/modal_app.py`).
- Profiler runbook + baselines (`scripts/profiler-runbook.md`).
- MCP configuration (`.vscode/mcp.json`).

### Security hardening
- Pilot-apply form honeypot anti-spam (`src/components/marketing/PilotApplyForm.tsx`, `/api/pilot/request`).
- Dashboard routes protected by NextAuth middleware (`middleware.ts`).

## Validation
- `pnpm typecheck` passes.
- `pnpm build` passes (87 static pages).
- `pnpm test` passes (63 tests).
- Marketing assertions pass.

## Next steps
1. **Deploy `ai-service/`** to Modal (requires Modal credentials) or migrate to Vercel-native Python Functions.
2. **Expand `ai-service/`** with RAG/docs endpoints, multi-provider fallbacks, or agent performance optimization.
3. **Run Copilot `@Profiler`** inside VS Code on reward worker and marketing routes.
4. **Add CAPTCHA** to `/pilot-apply` if stronger anti-abuse than honeypot is required.
5. **Role-based authorization** on `/admin/*` and `/dashboard/*` (admin vs operator vs viewer).
