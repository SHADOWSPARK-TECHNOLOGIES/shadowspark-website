# ShadowSpark Product & Applied-AI Architecture

**Authority:** PUBLIC ARCHITECTURE DOCTRINE
**Audience:** Website authors, product teams, reviewers, and technical readers
**Scope:** Language allowed on the public `/architecture` route
**Deployment status:** Not established by this document

## Purpose

This document is the approval boundary for public architecture claims. It
separates architecture intent, repository implementation, and deployment evidence
so that source code or an illustrative pattern cannot become a production claim.

The route describes company-wide product and applied-AI architecture. It does not
claim that every ShadowSpark product uses every layer, integration, or AI path.

## Document authority

| Document class | Owner | Question answered |
| --- | --- | --- |
| `docs/architecture/SHADOWSPARK_APPLIED_AI.md` | Public architecture doctrine | What architecture language may the website publish? |
| `docs/ARCHITECTURE.md` | Internal current-state inventory | What implementation exists in this repository now? |
| `docs/deployments/*` | Deployment-specific evidence | What is configured and operating in a named environment? |
| Historical exports and old design documents | Historical record | What was previously proposed, explored, or discussed? |

Historical and deployment-specific documents are never promoted to current public
truth automatically. Material source changes must refresh the internal inventory;
material public-language changes must pass this doctrine.

Approval under this doctrine does not establish deployed production reality.

## Evidence vocabulary

| Label | Meaning | Public-language rule |
| --- | --- | --- |
| **Implemented in repository** | Source code for the capability exists here. | Describe the code boundary without claiming it is configured, deployed, or used at scale. |
| **Reference pattern** | A technically credible pattern illustrated by the page. | Use “can,” “pattern,” or “designed to”; never imply a customer outcome. |
| **Deployment verification required** | The claim depends on infrastructure, configuration, operating practice, or evidence outside this repository. | State the verification requirement plainly or omit the claim. |
| **Product verification required** | The claim concerns a product whose implementation is not present here. | Use neutral portfolio wording and request product-specific evidence. |

Repository implementation is evidence that code exists. It is not evidence that
every path is enabled, secure, reliable, or used in production.

## Approved public structural model

The public route describes five responsibility layers:

1. **Experience & Interface** — product surfaces and route boundaries shape how
   people and systems enter a product.
2. **Application & Workflow** — application rules, services, queues, and workers
   coordinate product behavior.
3. **Applied AI & Context** — selected paths retrieve context and prepare
   model-assisted proposals without gaining operational authority.
4. **Platform Integrations** — provider boundaries connect products to external
   payment, crawling, messaging, calendar, and model services.
5. **Data & Infrastructure** — schemas, storage, queues, and deployment
   configuration support durable product state and delivery.

Across every layer:

**Trust Plane — Security, Governance & Reliability**

Identity, authorization, evidence, failure handling, graceful degradation, and
operating controls are cross-cutting concerns. They are not a final checkpoint.
Their deployment state requires separate verification.

The structural model explains which responsibilities exist. It does not describe
the order in which one request executes.

## Approved operational reality flow

The behavioral sequence is:

1. **Receive** — capture the request and available identity, channel, and policy context.
2. **Ground** — retrieve relevant material and preserve its provenance.
3. **Propose** — combine model output with deterministic application rules.
4. **Authorize** — apply validation, access, policy, and accountable review requirements.
5. **Act & Record** — perform only the approved operation and leave evidence for review.

This flow explains behavior, not structural ownership. A product may omit the AI
proposal step, use deterministic behavior, or degrade to a limited experience when
an intelligent dependency is unavailable.

## Graceful degradation

If an AI reasoning service is unavailable:

- Experience & Interface should communicate the limitation without fabricating a result.
- Application & Workflow should retain deterministic and human-directed paths where designed.
- Platform Integrations should continue only when their own contracts remain available.
- Data & Infrastructure should preserve valid state and evidence.
- The Trust Plane should fail closed for actions that require unavailable context,
  review, or authorization evidence.
- Applied AI & Context is the layer expected to degrade; its absence must not grant
  broader authority to another layer.

These are design requirements, not proof that every current route implements each fallback.

## Repository-backed claims

| Public concept | Evidence in this repository | Classification |
| --- | --- | --- |
| Product interfaces | `src/app`, layouts, route handlers, and typed UI components | Implemented in repository |
| Application workflows | Route/service logic plus BullMQ queues and workers | Implemented in repository; worker deployment requires verification |
| Applied AI and context | Google AI, Anthropic, retrieval, embedding, file, GCS, and pgvector-oriented modules | Implemented in repository; runtime topology requires verification |
| Platform integrations | Paystack, Firecrawl, messaging, calendar, analytics, and model-client code | Implemented in repository; configuration and live use require verification |
| Data and infrastructure | Prisma/PostgreSQL schemas, vector fields, Redis/BullMQ, file/cloud paths, and Vercel configuration | Implemented in repository; live topology requires verification |
| Trust controls | Selected session, role, payment-approval, system-event, error, and health code | Implemented in selected paths; platform-wide coverage is not established |

## Approved and prohibited language

The architecture page may say:

- “The repository contains product, workflow, retrieval, and integration boundaries.”
- “Not every product uses every layer or an AI-assisted path.”
- “Consequential actions should cross explicit authorization and accountable-review boundaries.”
- “Implemented code and deployment state are different evidence categories.”
- “Controls and operating evidence must be verified for each deployment.”

The architecture page must not say:

- “zero leakage”;
- “enterprise-grade security”;
- “fully autonomous” or “autonomous multi-agent platform”;
- “24/7/365,” guaranteed uptime, or a latency guarantee;
- “fully observable” or “zero-downtime”;
- “multi-tenant isolation” as a platform-wide production invariant;
- that AWS, GCP, Neon PgBouncer, or a Vercel plan is the verified live topology;
- that code presence proves compliance, certification, customer adoption, or outcomes.

## Trust boundary

Applied AI may retrieve, summarize, classify, or prepare a proposal. A model
response remains untrusted application input until the surrounding system applies
the validation, authorization, policy, and review requirements of the action.

- **Proposal is not authorization.**
- **Retrieval is not factual certainty.**
- **Code presence is not deployment evidence.**
- **An event record is not complete observability.**
- **A control example is not a compliance claim.**

## Product evidence boundary

Product names or portfolio context do not establish runtime behavior. The
repository identifies Lodgist as a ShadowSpark property-platform project, but its
implementation, production status, capabilities, customers, traction, and scale
require product-specific evidence.

## Accessibility and performance invariants

- The route has one page-specific `h1` and an ordered heading hierarchy.
- Global banner and contentinfo landmarks are siblings of the route’s main landmark.
- The skip link targets page-specific content after global navigation.
- Structural layers and operational sequences use semantic lists.
- Evidence does not depend on color, hover, motion, or client JavaScript.
- Informative normal text meets WCAG AA contrast.
- Focus indicators remain visible and Escape restores disclosure-trigger focus.
- The layout must not introduce page-level horizontal scrolling.
- No new visualization dependency is justified for this static content.

## Metadata and discovery invariants

- Canonical origin: `https://www.shadowspark-tech.org`.
- Canonical URL: `https://www.shadowspark-tech.org/architecture`.
- The route owns truthful title, description, Open Graph, and X/Twitter metadata.
- Corporate Organization structured data describes a product and technology company.
- Product-specific keywords remain on product-specific surfaces.
- `/architecture` appears in the sitemap and shared corporate navigation.

## Verification hierarchy

1. **Type level** — evidence categories and layer identifiers are constrained.
2. **Data level** — approved layers and flow steps come from structured typed data.
3. **Render level** — evidence labels and qualifications remain visible in HTML.
4. **Metadata level** — tests inspect the route’s actual metadata export.
5. **Interaction level** — navigation state, Escape, focus restoration, destinations,
   and breakpoints receive behavioral coverage.
6. **Human level** — reviewers map every material claim to evidence.

Tests prove named invariants; they do not prove general truth or production readiness.

## Publication checklist

Before publication, verify:

- Structural architecture and operational flow remain distinct.
- Every material claim maps to an evidence classification.
- No product, deployment, scale, SLA, compliance, or outcome is inferred from code presence.
- Corporate metadata, visible shell, and structured data agree.
- Keyboard, landmarks, contrast, reduced motion, and mobile layout pass review.
- Scoped lint, typecheck, tests, production build, and configured runtime checks pass.
- External publication remains blocked until the required governance record exists.
