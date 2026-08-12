# Features

## Overview

ShadowSpark presents pilot-stage workflow examples for African fintech operations. Public
marketing pages distinguish illustrative data and proposed capabilities from verified
customer outcomes, certifications, production availability, or published pricing.

## Pilot Workflow Examples

### Description

The home, pricing, about, and contact pages describe example intake, identity-check,
compliance-review, and recovery workflows. Dashboard values and model outputs are labeled as
examples rather than live customer data.

### How to Use

1. Review the example workflow and pilot-configuration sections.
2. Select **Book Demo**, **Discuss Pilot**, or **Request a Demo**.
3. Provide a name of at least two characters, a valid email address, and a message of at least
   ten characters.
4. Submit the form and wait for its success confirmation.

### Prerequisites

- JavaScript must be enabled for the interactive contact form and toast notification.
- The deployed application must configure `BACKEND_API_URL`.

### Configuration

| Variable | Purpose | Default |
| --- | --- | --- |
| `BACKEND_API_URL` | Backend origin that exposes `POST /v1/leads`. | Required |
| `CONTACT_LEAD_SINK_PATH` | Local JSON Lines sink used only when the backend returns 404. | `/tmp/shadowspark-contact-leads.jsonl` |
| `UPSTASH_REDIS_REST_URL` | Optional distributed rate-limit service URL. | Unset |
| `UPSTASH_REDIS_REST_TOKEN` | Optional distributed rate-limit service credential. | Unset |

### Example

A lending team can request a pilot conversation describing the workflow it wants to evaluate.
The website validates the submission and forwards it to the configured lead service.

### Limitations

- Pricing and dashboard values shown on marketing pages are illustrative.
- Pilot materials are not legal advice, certification, or proof of regulatory compliance.
- The local JSON sink is an operational fallback for a missing backend route. On serverless
  infrastructure it may be ephemeral and must not be treated as a durable lead database.
- Contact submissions are limited to five per minute when Upstash Redis is configured. The
  shared rate limiter permits requests when that optional service is not configured or is
  temporarily unavailable.
- A Sign In link sends users to the separate ShadowSpark dashboard login.

## Contact Lead Capture

### Description

`POST /api/contact` validates public submissions with Zod and forwards accepted data to the
configured backend. A backend 404 stores the validated request locally and returns a `202`
response containing `MISSING: ["/v1/leads"]` so operators can identify the undeployed route.

### Error Handling

Validation failures return field errors. Configuration and upstream failures return generic
messages without exposing backend diagnostics or secrets.

---

*Last updated: 2026-08-12*
