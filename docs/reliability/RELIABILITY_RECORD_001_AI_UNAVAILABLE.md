# Reliability Record 001: AI Unavailable

**Evidence status:** VERIFIED local source; UNKNOWN production
**Architecture doctrine:** `docs/architecture/SHADOWSPARK_APPLIED_AI.md`
**Scope:** Behavior visible in repository code when an AI or reasoning dependency
is unavailable

This record documents source-code behavior. It does not prove that a provider,
worker, queue, fallback, or operator procedure is configured or operating in a
production environment.

## Boundary map

| Boundary | Normal behavior | AI unavailable | User-visible result | State preserved | Authority decision |
| --- | --- | --- | --- | --- | --- |
| Mini-audit preview | Gemini prepares recommendation copy. | DETERMINISTIC_FALLBACK returns fixed recommendation content. | A recommendation still appears. | UI state only; no durable write. | Automated display; no consequential authority. |
| Main website chat | Anthropic prepares a conversational answer. | DETERMINISTIC_FALLBACK returns contact-oriented failure copy. | The visitor sees a retry/contact message. | Browser conversation state only. | No operational action is authorized. |
| Assistant grounding | Gemini embeddings retrieve context for the prompt. | DEGRADE continues generation with absent or reduced grounding. | A generic answer may still appear without an explicit grounding-loss notice. | Retrieval is read-only. | The model remains proposal-only. |
| Assistant generation | Gemini streams the assistant answer. | FAIL_CLOSED returns an error without generated content. | The user sees a system error and retry instruction. | No application mutation is performed. | No action is authorized. |
| Demo vault-insight ranking | Gemini embedding ranks stored audit chunks. | DETERMINISTIC_FALLBACK uses keyword ranking or deterministic defaults. | Limited insights remain available. | Stored audit state is unchanged. | Automated presentation only. |
| WhatsApp reply | Anthropic prepares a short reply. | DETERMINISTIC_FALLBACK attempts a static receipt acknowledgment. | The sender is told that a team member will respond. | The handler does not prove durable inbound-message or handoff storage. | No durable human assignment is proven. |
| Inbound email reply | Gemini prepares and sends an automatic response. | FAIL_CLOSED sends no generated reply. | No outgoing response is received. | The inbound email event is written first. | Automated sending stops; no human handoff is proven. |
| Lead follow-up email | Gemini drafts the next follow-up. | FAIL_CLOSED sends no email. | The lead receives no follow-up. | Lead state remains; schedule and sent-event state do not advance. | Automated sending stops. |
| Lead scoring | AnythingLLM prepares intent score and reasoning. | DETERMINISTIC_FALLBACK assigns score 50. | No outage is disclosed. | No: qualification state and score can be written. | Automated qualification can continue. |
| Sniper HTTP draft | Gemini prepares an outbound draft. | FAIL_CLOSED records analysis failure and creates no draft. | No draft is available to send. | Target remains with failure status. | A separate authenticated operator boundary controls sending. |
| Sniper queued draft | Gemini prepares and stores a draft. | RETRY makes three attempts, then fails closed. | No customer communication is sent. | Target returns to a retriable state; no failed draft is stored. | A separate authenticated operator boundary controls sending. |
| RAG crawl and embedding | Gemini embeds crawled context and writes a new index. | RETRY makes three attempts, then keeps the prior or absent index. | Context remains stale or unavailable. | Existing index and already-authorized payment/demo state remain. | Payment authority is independent of AI. |
| Hybrid operator search | Gemini and pgvector add semantic search to local keyword search. | DETERMINISTIC_FALLBACK uses local keyword results. | Keyword results or an explicit no-results state appear. | Read-only. | A human consumes the result. |
| Semantic-only search | Gemini prepares the query embedding. | FAIL_CLOSED returns no semantic results. | An empty result is shown. | Read-only. | A human consumes the result. |
| Incremental embedding | Gemini embeds one item before insert. | FAIL_CLOSED omits the failed item. | Script output reports the failed item. | Earlier successful inserts remain; the failed item is not written. | Script operator controls execution. |
| Purge and re-embed | A maintenance script deletes and rebuilds vectors. | NO_FALLBACK can leave deleted vectors without replacements. | Script output may report completion with no replacement vectors. | No: deletion occurs before AI availability is established. | Script operator controls execution. |
| Payment and approval | Signature- or admin-authorized deterministic logic mutates payment state. | DETERMINISTIC_CONTINUATION; the authority path has no AI dependency. | Authorized payment processing can continue. | Transactional payment, lead, and demo state is retained. | Paystack signature or authenticated administrator. |

## Fail closed

- Assistant answer generation.
- Inbound email automatic reply.
- Automated lead follow-up email.
- Sniper HTTP draft generation.
- Sniper queued draft generation after retry exhaustion.
- RAG index generation after retry exhaustion.
- Semantic-only search.
- Failed individual embedding writes.

Fail closed here means the repository does not perform the AI-derived output or
consequential send/write for that boundary. It does not prove production alerting,
operator response, or recovery.

## Degrade

- Main website chat degrades to static contact-oriented failure copy.
- Assistant grounding can disappear while answer generation continues.
- Demo vault insights degrade to keyword ranking or deterministic defaults.
- Hybrid operator search degrades to local keyword matching.
- Mini-audit generation degrades to fixed recommendation content.
- Post-payment RAG generation retries while preserving already-authorized state.

## Human and deterministic fallbacks

**HUMAN_FALLBACK:** No durable human-review or human-handoff fallback is proven by
the inspected source.

**DETERMINISTIC_FALLBACK:** Website chat, demo vault ranking, hybrid search,
mini-audit copy, and the WhatsApp receipt acknowledgment contain deterministic
fallback behavior. Payment and operator approval are deterministic authority paths,
not AI fallbacks.

## No-fallback items and tracked known risks

- Lead scoring defaults to 50 and can still mutate a lead to `QUALIFIED`; it does
  not fail closed or require human review.
- Purge-and-re-embed deletes vector state before proving AI availability and has no
  repository-proven transaction or rollback.
- WhatsApp fallback promises human follow-up without a durable handoff record.
- Assistant grounding can be lost without a clear user-visible qualification.
- Mini-audit fallback can look personalized while using fixed content.
- Runtime ownership, alerting, retry exhaustion handling, and incident response are
  not established by source code.

These risks require separate remediation records or issues; this architecture change
does not alter the underlying workflows.

## Known limitations

- **P-D browser/runtime gap:** Browser interaction and production-runtime behavior
  remain partially unverified. Retire the browser portion through iPhone real-device
  review against an approved preview deployment.
- **Baseline lint debt:** The repository-wide baseline is 1,402 previously observed
  findings. Track reduction separately from changed-scope quality.
- **Production topology:** Hosting, model providers, queues, workers, data services,
  credentials, enabled routes, retry behavior, and operator procedures are UNKNOWN
  production until supported by a named-environment deployment record.
- Local unit tests and a successful build do not prove provider availability,
  incident response, recovery, or production state.

## Publication gate

Before any push, pull request, or deployment:

1. Publish and link the required issue/project governance record.
2. Confirm both local commits contain only approved architecture and reliability paths.
3. Re-run changed-scope lint, typecheck, tests, production build, diff checks, and
   secret-pattern review with no BLOCKER or HIGH finding.
4. Record the named production or preview topology without reproducing secret values.
5. Assign owners and intended authority behavior for every no-fallback risk.
6. Exercise AI-unavailable paths in an approved non-production environment.
7. Complete iPhone real-device navigation, focus, layout, and readability review
   against the preview.
8. Verify canonical, sitemap, apex-to-www redirect, and rendered metadata behavior.
9. Keep repository-wide lint debt in its separate hygiene/remediation issue.

Until every applicable condition is met, external publication remains blocked.
