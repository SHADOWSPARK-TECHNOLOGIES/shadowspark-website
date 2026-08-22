# Deployment Evidence Records

**Authority:** DEPLOYMENT-SPECIFIC EVIDENCE

This directory owns evidence about what is configured and operating in a named
environment. Repository source and public architecture doctrine do not substitute
for these records.

## Current records

- [`PRODUCTION_2026-08-22.md`](./PRODUCTION_2026-08-22.md) maps the public website
  production deployment. It verifies hosting, domain, source revision, canonical,
  and database-health evidence while explicitly preserving unknown worker, provider,
  storage, recovery, retention, and human-ownership boundaries.

Each future record should identify:

- environment and public endpoint;
- source commit and deployment identifier;
- hosting, data, queue, worker, and integration topology;
- enabled feature boundaries;
- authorization and secret-management controls, without reproducing secret values;
- health, logging, retention, backup, and recovery evidence;
- verification date, verifier, commands or dashboards inspected, and limitations.

Historical plans must not be copied here as operating fact without fresh evidence.
