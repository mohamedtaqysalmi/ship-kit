# nightly-db-backup

Runs on a nightly schedule (and on `workflow_dispatch`), dumps a PostgreSQL database with `pg_dump`, uploads a gzip archive to S3-compatible storage, deletes objects older than the retention window, and restores the archive into a fresh Postgres service on the runner as a smoke test.

**Status: not yet run in a real repo.** No evidence exists in `docs/evidence/` yet, so treat this as untested.

## Use it

1. Create an S3 bucket (or Cloudflare R2 / MinIO / Backblaze B2 with an S3 API) and an access key limited to that bucket prefix.
2. Ensure GitHub-hosted runners can reach your Postgres host on the dump port (public IP with a tight firewall allowlist, or move this job to a self-hosted runner on the same network).
3. Copy `nightly-db-backup.yml` to `.github/workflows/` in your app repo.
4. Add the secrets below. Prefer a GitHub Environment named `backups` with environment secrets so other workflows cannot read them (add `environment: backups` on the job if you use that).

Default schedule is `17 3 * * *` (03:17 UTC). Trigger the workflow once manually after merging so GitHub enables the schedule on the default branch.

The restore test uses the job's `postgres:16` service container only. It never writes back to the source database.

## Required secrets

| Name | Purpose |
| --- | --- |
| `DB_HOST` | Postgres hostname reachable from the runner. |
| `DB_PORT` | Postgres port (usually `5432`). |
| `DB_USER` | Role used for the dump. Prefer a read-only role with `CONNECT` and `SELECT`. |
| `DB_PASSWORD` | Password for that role. Mapped to `PGPASSWORD` so it is not passed on the command line. |
| `DB_NAME` | Database name to dump. |
| `S3_ACCESS_KEY_ID` | Access key for the S3 API. |
| `S3_SECRET_ACCESS_KEY` | Secret key. Never log it. |
| `S3_REGION` | Region string the SDK expects (`auto` works for some R2 setups). |
| `S3_ENDPOINT` | Full endpoint URL (required here so AWS, R2, MinIO and B2 share one path). |
| `S3_BUCKET` | Bucket name. |

Retention defaults to 14 days (`RETENTION_DAYS` in the workflow `env`). Object keys look like `db-backups/backup-YYYYMMDDTHHMMSSZ.sql.gz`.

## Failure modes

- **`pg_dump: connection ... failed`.** Wrong host/port/user/password, or the runner cannot route to a private DB. Use a self-hosted runner or an allowlisted dump path.
- **`AccessDenied` on upload or list.** The key cannot write or list the prefix. Confirm bucket policy and that `S3_ENDPOINT` points at the right provider.
- **`Could not connect to the endpoint URL`.** Bad `S3_ENDPOINT` or missing scheme (`https://...`).
- **Retention skips objects.** Keys must match `backup-YYYYMMDDTHHMMSSZ.sql.gz`. Manual uploads with other names are left alone.
- **Restore test fails in `psql`.** The dump is truncated, not Postgres, or contains roles/extensions the service image lacks. Open it with `gzip -dc` and fix the dump flags.
- **Schedule never fires.** Scheduled workflows stay disabled until someone runs the workflow once from the Actions tab after it lands on the default branch.
- **Empty source database.** The restore still succeeds (`tables >= 0`). Add a stricter assertion for your schema once you know the expected table count.
