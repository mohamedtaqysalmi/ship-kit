# Evidence: nightly-db-backup

**Status: not captured yet.** Needs a reachable Postgres and an S3-compatible bucket — not available from this laptop session alone.

## How to capture a real run

1. Create a throwaway Postgres (Neon free tier, Docker on a VPS, etc.) with at least one table and row.
2. Create a bucket on AWS S3, Cloudflare R2, MinIO or B2. Issue an access key limited to that bucket.
3. Copy `workflows/nightly-db-backup/nightly-db-backup.yml` into a throwaway repo. Create Environment `backups` with the secrets from the workflow README.
4. Run the workflow with `workflow_dispatch`. Confirm upload, retention listing, and the restore-test step against the service container.
5. Paste the run URL, the S3 object key, and a log excerpt from dump / upload / restore-test.

## Record

- Successful run URL:
- Object key (no credentials):
- Date (UTC):
- Provider (AWS / R2 / MinIO / B2):
- Log excerpt:
