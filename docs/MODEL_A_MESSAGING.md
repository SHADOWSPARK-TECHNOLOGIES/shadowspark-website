# Model A secure messaging

Local implementation for epic #24 / issues #25–#28. This is not a production-readiness claim. Provider accounts, webhook registration, secret values, DNS, and deploy remain human-only.

## Routing invariant

| Channel | Provider |
| --- | --- |
| WHATSAPP | META only |
| SMS | TWILIO |
| VOICE | TWILIO |

Twilio must not send WhatsApp. There is no Twilio WhatsApp route, `whatsapp:` send prefix, or Twilio WhatsApp configuration.

## Required secret names (values never stored in git)

Meta WhatsApp:

- `WHATSAPP_VERIFY_TOKEN` — GET webhook verification; no built-in fallback
- `META_APP_SECRET` — POST `X-Hub-Signature-256` HMAC
- `WHATSAPP_API_TOKEN` or `META_ACCESS_TOKEN` — Graph send. Prefer `WHATSAPP_API_TOKEN`. One token per request; do not concatenate.
- `WHATSAPP_PHONE_NUMBER_ID` or `META_PHONE_NUMBER_ID` — Graph phone number id. Prefer `WHATSAPP_PHONE_NUMBER_ID`.
- `WHATSAPP_ENABLED`

Twilio SMS / Voice:

- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_PUBLIC_BASE_URL` — public origin Twilio signs (no trailing slash), e.g. `https://shadowspark-tech.org`
- `TWILIO_SMS_FROM`
- `TWILIO_VOICE_FROM`

Webhook paths Twilio must register:

- SMS: `{TWILIO_PUBLIC_BASE_URL}/api/webhooks/twilio/sms`
- Voice: `{TWILIO_PUBLIC_BASE_URL}/api/webhooks/twilio/voice`

Meta webhook path (existing):

- `{public origin}/api/webhooks/whatsapp/meta`

## Human setup (no automation)

1. Create/confirm a Meta WhatsApp Cloud API app and set the verify token and app secret in the hosting environment.
2. Point Meta's webhook at the Meta path above. Subscribe to messages and message statuses.
3. Create a Twilio account with separately approved SMS and Voice numbers. Do not enable Twilio WhatsApp.
4. Register Twilio SMS and Voice webhooks at the exact public URLs above.
5. Capture channel consent before any outbound send. STOP/STOPALL/UNSUBSCRIBE/CANCEL/END/QUIT on SMS revokes SMS consent only.
6. Do not paste secret values into issues, PRs, or logs.

## Local verification performed

- Isolated PostgreSQL (pgvector container on loopback, not production)
- `prisma migrate deploy` including `20260917220000_add_model_a_messaging`
- Unit, signature, consent, idempotency, retry, and delivery-state tests
- Typecheck, changed-scope lint, full Vitest suite
- Secret scan of added diff lines
- Production build (recorded in the overnight handoff)

No merge, production deploy, credential entry, or DNS change is authorized by this document.
