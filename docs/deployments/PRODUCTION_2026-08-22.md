# Production Deployment Evidence — 2026-08-22

**Authority:** DEPLOYMENT-SPECIFIC EVIDENCE

**Environment:** ShadowSpark public website production

**Governance issue:**
[`#11`](https://github.com/SHADOWSPARK-TECHNOLOGIES/shadowspark-website/issues/11)

**Verified:** 2026-08-22, 16:19–18:00 WAT (UTC+01:00)

**Verifier:** Codex, using the authenticated Vercel account available in the
engineering workspace plus public DNS and HTTP requests

This is a dated operating snapshot, not a claim about every ShadowSpark project.
It covers the public website and records unknowns instead of inferring production
state from source-code presence.

## Evidence vocabulary

- **VERIFIED** — directly observed in Vercel CLI output, public DNS/HTTP responses,
  or source at the deployed commit.
- **INFERRED** — the smallest conclusion supported by multiple verified facts;
  the reasoning is stated.
- **PARTIAL** — one part of the boundary was directly verified while material
  operating details remain unknown.
- **UNKNOWN** — not established by the available evidence or intentionally not
  inspected.

## Domain, project, environment, and revision

| Boundary | Classification | Evidence |
| --- | --- | --- |
| Public endpoint | VERIFIED | `https://www.shadowspark-tech.org` returned HTTP 200 and Vercel listed it as the latest production URL. |
| Canonical host | VERIFIED | `www.shadowspark-tech.org`; the apex redirected there and the rendered architecture page used it in canonical metadata. |
| Vercel owner/scope | VERIFIED | Display owner `SHADOW TEAM`; CLI scope `shadow-team-e059c792`. |
| Vercel project | VERIFIED | Project selector `shadowspark-website-lsny`; project ID `prj_XF0uBgpLOIJAW1WCzIYPfOfS0PAQ`; Next.js; root directory `.`; Node.js 24.x. |
| Environment | VERIFIED | `production`. |
| Deployment | VERIFIED | ID `dpl_F3MFHWQBDDQ4t1mLi7UaaS3TSTdj`; state `Ready`; created 2026-08-22 17:53:28 WAT. |
| Immutable deployment URL | VERIFIED | `https://shadowspark-website-lsny-z8flcy058-shadow-team-e059c792.vercel.app`. |
| Source | VERIFIED | Repository `SHADOWSPARK-TECHNOLOGIES/shadowspark-website`, ref `main`, commit `0b9c78e4f0eeac89e09148436075202c12c6b565`. |
| Deployment-reported name | VERIFIED | `shadowspark-website-lsny`, matching the current project selector. |
| Function topology | VERIFIED | Vercel inspection showed Node functions in region `iad1`; deployment metadata reported five Node.js function bundles. |

The same Vercel team also owns distinct `shadowspark-production` and
`shadowspark-dashboard` projects. They are not the public website project: their
latest URLs and Git repository metadata map to other applications.

The registered domain is held in the personal Vercel scope
`morontomornica7-5177s-projects`, while the website runtime project is held by
`SHADOW TEAM`. Vercel reported the domain registrar and both authoritative
nameservers as Vercel. This is a verified administrative split; it is not evidence
of a documented transfer or incident-response procedure.

## Canonical and redirect verification

| Request or artifact | Result | Classification |
| --- | --- | --- |
| `http://shadowspark-tech.org/` | HTTP 308 to `https://shadowspark-tech.org/` | VERIFIED |
| `https://shadowspark-tech.org/` | HTTP 308 to `https://www.shadowspark-tech.org/` | VERIFIED |
| `https://www.shadowspark-tech.org/` | HTTP 200 | VERIFIED |
| Rendered `/architecture` canonical | `https://www.shadowspark-tech.org/architecture` | VERIFIED |
| Production sitemap | Contains the canonical architecture URL and the audited public marketing URLs | VERIFIED |

DNS returned Vercel edge A records for the apex and `www`. HTTP behavior, Vercel
aliases, repository `SITE_URL`, rendered metadata, and the sitemap agree on `www`
as canonical.

## Promotion incident and recovery

The first automatic production deployment of commit `0b9c78e`,
`dpl_8kkPGqQvKrUosFEbyJB96UdAq122`, reached Vercel `Ready` status but returned HTTP
500 for the homepage, architecture page, and database health endpoint. Runtime logs
showed that the instrumentation hook failed closed because `WEBAUTHN_RP_ID` and
`WEBAUTHN_ORIGIN` were absent from Production.

After explicit approval, those two non-sensitive configuration names were added to
Production and the same source commit was redeployed as
`dpl_F3MFHWQBDDQ4t1mLi7UaaS3TSTdj`. The canonical homepage and architecture page
then returned HTTP 200, apex redirection remained correct, database health returned
HTTP 200, and an HTTP-500 log query against the recovery deployment returned no
entries. No source rollback or credential-value retrieval was performed.

## Routes and feature boundaries

Source at the deployed commit contains 32 page modules and 62 route-handler
modules. That count proves deployed source coverage, not successful execution of
every route.

| Route or feature family | Production classification |
| --- | --- |
| Public marketing, architecture, contact, pricing, legal, and demo pages | VERIFIED source-present; homepage and architecture route were HTTP-verified. |
| Authentication and passkey registration/login | VERIFIED source-present and configured by required name; schema-invalid registration and login-options POSTs failed closed with HTTP 400. A complete account ceremony remains UNKNOWN because no credential operation was performed. |
| Dashboard, operator, and administrator interfaces | VERIFIED source-present; authorization and data behavior UNKNOWN because authenticated stateful routes were not invoked. |
| Contact forwarding | VERIFIED `BACKEND_API_URL` name exists in production; downstream service identity, health, and delivery are UNKNOWN. |
| Database-backed API routes | VERIFIED source-present; the public database health query succeeded. Individual mutation paths were not exercised. |
| Payment and Paystack routes | VERIFIED source-present; INFERRED disabled/unconfigured because the production variable inventory contains neither the enable flag nor the required provider key names. |
| WhatsApp/Meta and email/Resend routes | VERIFIED source-present; INFERRED disabled or unable to send because the production variable inventory lacks the corresponding enable flag and provider key names. |
| Assistant, chat, embedding, and crawl routes | VERIFIED source-present; provider-backed execution is not established. See the provider classification below. |
| Scheduled routes | One Vercel cron is configured for `/api/cron/listings/expiry` at `0 9 * * *`; the other source cron routes are not scheduled by `vercel.json`. |

The configured listings cron has a VERIFIED method mismatch at this revision:
Vercel cron invokes the path with HTTP GET, while the route exports only POST.
The production inventory also lacks `CRON_SECRET`, which the handler requires.
The scheduled invocation therefore cannot reach the mutation logic. Vercel's
[cron documentation](https://vercel.com/docs/cron-jobs) defines the GET invocation
behavior.

## Production environment-name inventory

Only names, target assignments, and Vercel's `Encrypted` marker were inspected.
No value was retrieved.

Production has these application-relevant names:

- core: `AUTH_SECRET`, `BACKEND_API_URL`, `DATABASE_URL`, `DIRECT_URL`, and
  `REDIS_URL`;
- WebAuthn relying-party configuration: `WEBAUTHN_RP_ID` and `WEBAUTHN_ORIGIN`;
- Vercel KV-compatible names: `KV_URL`, `KV_REST_API_URL`,
  `KV_REST_API_TOKEN`, and `KV_REST_API_READ_ONLY_TOKEN`;
- Google Cloud integration names: `GCP_SERVICE_ACCOUNT_BASE64`, `GCP_LOCATION`,
  and `GCP_PROJECT_ID`;
- Neon integration/recovery names under the `NEON_RECOVERY_*` prefix.

Production does not list the names required by source for these boundaries:

- AI and crawling: `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`,
  `GOOGLE_AI_API_KEY`, `FIRECRAWL_API_KEY`, `ANYTHING_LLM_URL`, and
  `LOCAL_LLM_KEY`;
- payment: `PAYMENTS_ENABLED`, `PAYSTACK_SECRET_KEY`, `PAYSTACK_PUBLIC_KEY`,
  `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`, and `PAYSTACK_WEBHOOK_SECRET`;
- messaging: `WHATSAPP_ENABLED`, `WHATSAPP_API_TOKEN`,
  `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_VERIFY_TOKEN`, `RESEND_API_KEY`, and
  `RESEND_WEBHOOK_SECRET`;
- scheduled operations: `CRON_SECRET` and `SLACK_WEBHOOK_URL`;
- source-consumed Google Cloud storage: `GOOGLE_CLOUD_PROJECT`,
  `GOOGLE_PROJECT_ID`, `VAULT_BUCKET`, and `GCS_BUCKET_NAME`.

The configured `GCP_*` and `NEON_RECOVERY_*` names are not referenced by tracked
source at this commit. Their presence proves Vercel configuration, not that the
application consumes those integrations.

## Runtime services and ownership

| Boundary | Classification | Evidence and ownership |
| --- | --- | --- |
| Hosting | VERIFIED | Vercel project owned by `SHADOW TEAM`; Node.js 24.x Next.js functions in `iad1`. No named human on-call owner was found. |
| PostgreSQL data path | VERIFIED connected | `DATABASE_URL` and `DIRECT_URL` names exist; `/api/health` returned HTTP 200 with `database: connected`. The current database vendor and accountable owner are UNKNOWN because values were not inspected. |
| Vector data | VERIFIED empty at check time | `/api/health` returned `vectorCount: 0`; this does not prove schema or extension state. |
| Redis/KV | VERIFIED configured name; UNKNOWN health | `REDIS_URL` and KV-compatible names exist. No authenticated Redis health or queue-stat check was available. Provider and owner are UNKNOWN. |
| Google Cloud storage | UNKNOWN | Vercel has three `GCP_*` names, but source expects different names and no storage read/write was exercised. The Google Cloud inventory could not be refreshed without interactive reauthentication. |
| Contact backend | VERIFIED configured name; UNKNOWN health | `BACKEND_API_URL` exists. No state-changing form submission was made and no downstream owner was established. |
| WebAuthn configuration | VERIFIED configured and startup-safe | The two required Production names exist; canonical pages and Node health recovered after redeployment, and invalid ceremony inputs failed closed. A real account ceremony was not performed. |
| Messaging | INFERRED unable to send; inbound UNKNOWN | Required WhatsApp and Resend names are absent. Source skips email without `RESEND_API_KEY`; the WhatsApp feature flag defaults false. An inbound webhook could still receive requests, so inbound delivery and provider-side state remain UNKNOWN. |
| Payments | INFERRED inactive | Payment enablement and Paystack names are absent; source treats the missing enable flag as false. Provider-side state and owner are UNKNOWN. |
| Model providers | INFERRED unavailable | Required Anthropic, Gemini, Firecrawl, and local-LLM names are absent. No paid or stateful provider request was made. |
| Domain administration | VERIFIED Vercel scope | Registrar ownership is in `morontomornica7-5177s-projects`; a named organizational domain administrator and escalation procedure are UNKNOWN. |
| Source and delivery | VERIFIED organization | GitHub repository owner is `SHADOWSPARK-TECHNOLOGIES`; deployment creator was `morontomornica7-5177`. A named release owner and on-call rotation are UNKNOWN. |

## Worker and queue activation

The deployed source defines four BullMQ queues: `crawl-queue`, `lead-sync-queue`,
`whatsapp-nudges`, and `sniper_queue`.

`src/instrumentation.ts` constructs the crawl, lead, and nudge workers whenever a
Node runtime registers. It does not load the sniper worker. Vercel inspection found
function artifacts only, and the repository contains no separate production worker
deployment manifest. Vercel states that its serverless architecture has
[no server always running in the background](https://vercel.com/docs/frameworks/backend),
and functions have bounded invocation duration.

Classification:

- Redis connection configuration: **VERIFIED PRESENT by name**, health UNKNOWN.
- Continuous crawl, lead, and nudge consumption in this Vercel deployment:
  **INFERRED NOT RELIABLE**. Worker objects may be created during a function
  invocation, but this is not an always-on consumer topology.
- Sniper consumption in this Vercel deployment: **INFERRED INACTIVE**, because
  instrumentation does not import that worker and no separate worker service was
  found in the mapped Vercel project.
- Any external worker service using the same Redis instance: **UNKNOWN**. Google
  Cloud resource inventory was unavailable because the cached CLI account required
  interactive reauthentication.
- Queue depth, oldest-job age, retry state, and last successful consumption:
  **UNKNOWN**; the operator queue-stat route was not invoked without authorization.

Worker and queue activation therefore remains the one unresolved issue #11
acceptance boundary.

## Production AI and provider topology

Source names Anthropic and Google/Gemini models for chat, generation, embeddings,
and WhatsApp drafting, plus Firecrawl and an AnythingLLM-compatible lead-scoring
endpoint. Production has none of the required provider variable names.

The production `/api/ai/health` endpoint returned a status response, but source
shows that endpoint selects a random label and does not contact any provider. It is
**VERIFIED NOT A PROVIDER HEALTH CHECK** and must not be used as readiness evidence.

Production provider classification is therefore:

- configured model-provider credentials: **INFERRED ABSENT by required name**;
- successful Anthropic, Gemini, Firecrawl, or AnythingLLM call: **UNKNOWN / not
  established**;
- deployed vector knowledge content: **VERIFIED zero rows reported by the public
  health endpoint at the verification time**;
- AI route behavior under missing configuration: source-specific error, fail-closed,
  or deterministic fallback behavior as catalogued in the reliability record; it
  was not exercised with user or provider data in production.

## Health, logging, retention, backup, and recovery

| Boundary | Classification | Evidence |
| --- | --- | --- |
| Public website | VERIFIED | Canonical homepage returned HTTP 200. |
| Database | VERIFIED point-in-time | `/api/health` returned HTTP 200 and `database: connected` at 2026-08-22T16:57:29.234Z. |
| Knowledge vectors | VERIFIED point-in-time | The same response reported zero rows. |
| AI health | VERIFIED invalid as readiness evidence | The route is a randomized stub and does not call a provider. |
| Runtime logs | PARTIAL | The failed startup cause and recovery deployment were queried directly. No HTTP 500 entry remained after recovery. A PostgreSQL driver warning about future SSL-mode semantics was observed. Delivery, alerting, and retention settings remain UNKNOWN. |
| Backups | INFERRED inactive in Vercel | A backup route exists, but it is not scheduled in `vercel.json`, `CRON_SECRET` is absent, and no successful backup artifact or timestamp was observed. |
| Restore/recovery | UNKNOWN | `NEON_RECOVERY_*` names exist, but no restoration procedure, recovery owner, recovery point, recovery time, or exercise evidence was found. |
| Deployment retention/rollback | UNKNOWN | No project retention policy or tested rollback record was inspected. |
| Monitoring/alerts | UNKNOWN | No verified alert destination, paging owner, SLO, or incident-response linkage was found. |

## Verification method

Evidence and the approved recovery were performed with:

- Vercel CLI 58.4.4: project/domain lists and inspection, production deployment
  list and inspection, and production environment-name listing;
- public `curl` requests for redirects, canonical HTML, sitemap, and the two health
  endpoints;
- public DNS `dig` queries;
- `git`, `find`, `rg`, and targeted source reads at the exact production commit;
- official Vercel documentation for function and cron execution semantics.

No Vercel environment value was pulled, no credential was printed into this record,
and no stateful production route was invoked. The only environment mutation was the
approved addition of the two non-sensitive WebAuthn names, followed by redeployment
of the already-merged source commit.

## Limitations and required follow-up

1. Reauthenticate an approved Google Cloud operator and inventory only named
   Cloud Run, storage, scheduler, backup, and recovery resources; do not export
   credential values.
2. Establish a persistent worker deployment or explicitly retire BullMQ consumers,
   then record queue health, last-consumed timestamps, retry state, and an owner.
3. Correct the listings cron HTTP method/authentication configuration and capture a
   successful scheduled invocation.
4. Replace the randomized AI-health stub with provider-specific readiness evidence
   that does not leak credentials or perform uncontrolled billable work.
5. Assign named human owners for hosting, domain administration, database, Redis,
   storage, providers, backups, restores, observability, and incident response.
6. Record log and deployment-retention settings plus a tested backup/restore and
   rollback exercise.
7. Refresh this snapshot after any future production promotion; this record describes
   commit `0b9c78e` and recovery deployment `dpl_F3MFHWQBDDQ4t1mLi7UaaS3TSTdj`.

Until those items are evidenced, do not claim continuous worker processing,
provider availability, durable backup/recovery, complete observability, or named
operational ownership for this production environment.
