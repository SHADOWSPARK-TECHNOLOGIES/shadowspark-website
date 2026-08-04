# ShadowSpark Launch Safety Audit Checklist

Use this checklist before promoting any ShadowSpark property to production or running a public pilot.

## Domain & Email Security

- [ ] DMARC policy set to `p=reject` with `rua` aggregate report mailbox.
- [ ] SPF record ends with `-all` (hard fail).
- [ ] DKIM signing enabled for all transactional and marketing senders.
- [ ] Continuous domain monitoring configured (alert on NS/MX/TXT changes, certificate expiry, subdomain additions).
- [ ] DNSSEC enabled at registrar.
- [ ] No wildcard SPF or overly permissive sender policies.

## Web Application & API Security

- [ ] CSRF protection enabled on all state-changing routes.
- [ ] CAPTCHA or proof-of-work on high-risk flows (registration, pilot application, contact, reward issuance).
- [ ] Rate limiting active on authentication, rewards, pilot, and webhook endpoints.
- [ ] Input validation with Zod (or equivalent) on every API route.
- [ ] Authorization enforced on admin and dashboard routes; unauthenticated access returns 401/403.
- [ ] Secrets rotated and stored in environment variables, never committed.
- [ ] Security headers set (HSTS, CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy).

## Crawler & Endpoint Disclosure

- [ ] `robots.txt` disallows admin, API, dashboard, finance, and support paths.
- [ ] Admin routes are not linked from public pages or sitemaps.
- [ ] No sensitive endpoints exposed in client-side code or source maps.

## Data & Privacy

- [ ] Privacy policy published and linked in footer.
- [ ] Cookie consent implemented if non-essential cookies are used.
- [ ] Data retention limits defined and enforced (contributor events, logs, leads).
- [ ] PII encrypted at rest and in transit.
- [ ] Data Processing Addenda in place with third-party subprocessors.

## Abuse & Trust

- [ ] Abuse policy published (`governance/policies/abuse.md`).
- [ ] Report channel (abuse@shadowspark-tech.org) monitored.
- [ ] Employee social-engineering training completed for all team members with production access.
- [ ] Human-in-the-loop review for high-impact reward grants and pilot approvals.
- [ ] Red-team or penetration test completed within the last 12 months.

## Operations & Incident Response

- [ ] Incident response playbook accessible to on-call engineers.
- [ ] Logging and alerting configured for authentication failures, rate-limit triggers, and errors.
- [ ] Database backups tested on a schedule.
- [ ] Rollback procedure documented and exercised for deployments.

## Accessibility & Trust Signals

- [ ] Navigation has an accessible name (`aria-label`).
- [ ] All interactive elements have visible focus indicators.
- [ ] Text contrast meets WCAG AA on the dark theme (verified ≥ 4.5:1 for body text).
- [ ] Marketing pages include mandated trust copy (DMARC, SPF, CSRF, CAPTCHA, training, monitoring).

## Marketplace & Integrations

- [ ] GitHub App webhook signatures validated.
- [ ] Vercel integration verifies `x-vercel-signature`.
- [ ] Slack URL-verification handshake implemented.
- [ ] Integration endpoints rate-limited and logged.

## Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Security Lead | | | |
| Engineering Lead | | | |
| Legal / DPO | | | |
| Founder | | | |

---

Last updated: 2026-08-04
