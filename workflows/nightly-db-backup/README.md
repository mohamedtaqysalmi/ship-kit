# nightly-db-backup

Runs on a nightly schedule (and on `workflow_dispatch`), dumps a PostgreSQL database with `pg_dump`, uploads a gzip archive to S3-compatible storage, restores the archive into a fresh Postgres service on the runner as a smoke test, and only then deletes objects older than the retention window. If the restore test fails, nothing is deleted.

**Status: not yet run in a real repo.** No evidence exists in `docs/evidence/` yet, so treat this as untested.

## Use it

1. Create an S3 bucket (or Cloudflare R2 / MinIO / Backblaze B2 with an S3 API) and an access key limited to that bucket prefix.
2. Ensure GitHub-hosted runners can reach your Postgres host on the dump port (public IP with a tight firewall allowlist, or move this job to a self-hosted runner on the same network).
3. Copy `nightly-db-backup.yml` to `.github/workflows/` in your app repo.
4. Add the secrets below. The job already uses a GitHub Environment named `backups`; GitHub creates it on the first run if it does not exist. Put the secrets there so other workflows cannot read them, or remove the `environment:` line and use repository secrets.

Default schedule is `17 3 * * *` (03:17 UTC). Scheduled runs only start from the default branch, and GitHub may delay them by several minutes at busy times.

The restore test uses the job's `postgres:16` service container only. It never writes back to the source database. It fails when fewer than `MIN_TABLES` (default 1) non-system tables are loaded. The dump is stored unencrypted, so turn on server-side encryption and a private bucket on the storage side.

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
- **Schedule never fires.** The workflow file must be on the default branch. GitHub also disables scheduled workflows in a public repo after 60 days without repository activity; re-enable it from the Actions tab.
- **`pg_dump: error: aborting because of server version mismatch`.** The runner installs the Ubuntu 24.04 `postgresql-client` (version 16). A newer server needs a matching client, and the `postgres:16` service image used for the restore test must also be at least the server's major version. Change the install step and the service image together.
- **`Restore test` fails with fewer than `MIN_TABLES` tables.** The dump loaded no tables, for example because `DB_NAME` points at an empty database. Check the name, or lower `MIN_TABLES` on purpose.
