# Codex loop ledger: ShadowSpark website
Updated 2026-11-07. These are read-only historical observations to be reverified.

## Loop 0 preflight
STATE: PREPARED / NOT EXECUTED by Codex.
KNOWN: repository `SHADOWSPARK-TECHNOLOGIES/shadowspark-website`; Node 24.x / pnpm 11.20.0.
KNOWN: Railway project `shadowspark-tech` production service tracks `main`, commit `87b91730...`, success reported on 2026-10-18; Railway custom domain `shadowspark-tech.com`.
KNOWN: an older Vercel deployment document lists `www.shadowspark-tech.org` as canonical in August 2026. These are NOT proven to be the same currently active domain/runtime.
BLOCKER: Connected Vercel inventory returned HTTP 403 forbidden; no fresh Vercel project/deployment status. Public HTTP reachability and both domain DNS maps need direct checks.
KNOWN: issue #11 is deployment-topology evidence; #20 is stabilization/integrations. `shadowspark-production` is a distinct repository.
RESTRICTIONS: no DNS/IAM/env/billing/deployment changes, no unapproved Meta/Stripe/Twilio activation, do not confuse historical site source with current deployed code.

## Codex next action
Read-only Loop 0: map .org and .com DNS and active hosting (and compare to Railway source); verify current Vercel auth if connector reconnected; inspect exact runtime env variable NAMES, current tests and public route health. Produce a signed-off GO/NO-GO architecture map before any code or DNS change.

## Loop record template
| Loop | Objective | HEAD | Result | Commands and evidence | Reviewer | Blockers |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | Prove current domain/runtime/source truth | TBD | NOT RUN | TBD | TBD | Vercel 403 / domain identity |
