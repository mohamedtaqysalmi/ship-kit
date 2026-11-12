# ssh-deploy

Deploys every push to `main` over SSH using a release directory plus a `current` symlink, polls a health URL, and rolls the symlink back if the health check fails.

**Status: not yet run in a real repo.** No evidence exists in `docs/evidence/` yet, so treat this as untested.

## Use it

1. On the server, create a deploy root (for example `/var/www/app`) owned by the deploy user, with `releases/` and `shared/` underneath. Put optional hooks at `shared/pre-switch.sh` and `shared/post-switch.sh` (executable).
2. Copy `ssh-deploy.yml` to `.github/workflows/` in your app repo.
3. Create a GitHub Environment named `production` (Settings → Environments). Turn on required reviewers if you want a human gate before every deploy.
4. Add the secrets and optional variables below to that environment.

Each run rsyncs the checkout into `DEPLOY_PATH/releases/<timestamp>-<sha7>/`, flips `DEPLOY_PATH/current` to that directory, runs `post-switch.sh` if present, then curls `HEALTHCHECK_URL` until it gets HTTP 200 or 204. On failure it points `current` back at the previous release, re-runs `post-switch.sh` (with the argument `rollback` instead of a release id), and fails the job. This covers a failed health check and also a failure after the symlink was switched, for example when `post-switch.sh` exits non-zero.

The whole checkout is copied except `.git/`, `.github/`, `node_modules/` and `.venv/`. If your app needs `node_modules/` on the server, remove that exclude or build on the server in `pre-switch.sh`.

## Required secrets

| Name | Where | Purpose |
| --- | --- | --- |
| `DEPLOY_SSH_KEY` | Environment or repo | Private key for the deploy user. PEM or OpenSSH format. Never log it. |
| `DEPLOY_KNOWN_HOSTS` | Environment or repo | Output of `ssh-keyscan -H <host>` (and `-p <port>` if needed). Pins the host key; the workflow does not fall back to trusting on first use. |
| `DEPLOY_HOST` | Environment or repo | Hostname or IP. |
| `DEPLOY_USER` | Environment or repo | SSH login name. |
| `DEPLOY_PATH` | Environment or repo | Absolute deploy root on the host (parent of `releases/` and `current`). Only letters, digits, `.`, `-`, `_` and `/` are accepted; the job fails early otherwise. |
| `HEALTHCHECK_URL` | Environment or repo | URL that must return HTTP 200 or 204 after the switch. |

### Optional variables

| Name | Default | Purpose |
| --- | --- | --- |
| `HEALTHCHECK_ATTEMPTS` | `12` | How many curl attempts before declaring failure. |
| `HEALTHCHECK_SLEEP_SECONDS` | `5` | Seconds between attempts. |

## Failure modes

- **`Host key verification failed`.** `DEPLOY_KNOWN_HOSTS` is missing, stale, or was captured for a different IP or port. Re-run `ssh-keyscan` from a trusted network and update the secret.
- **`Permission denied (publickey)`.** Wrong key, wrong user, or the public half is not in `authorized_keys` on the host.
- **`rsync: connection unexpectedly closed` / permission errors under `DEPLOY_PATH`.** The deploy user cannot write the release directory. Fix ownership on the server.
- **Health check keeps returning non-200/204.** App did not start, wrong URL, TLS problem, or the endpoint needs auth. The job rolls back (if a previous release exists) and then fails so Actions stays red.
- **`Deploy or health check failed and there is no previous release to restore`.** First deploy, or `current` was never a symlink. Fix the app by hand; the failed release directory is left under `releases/` for inspection.
- **Rollback health check still fails.** The previous release is also broken, or the health URL is wrong. The job still exits non-zero.
- **Environment protection blocks the job.** Expected when reviewers are required. Approve the pending deployment in the Actions UI.
- **Concurrent deploys.** `concurrency` is per repository with `cancel-in-progress: false`, so a second push waits instead of racing the symlink. GitHub keeps only one pending run per group, so if three pushes land while one deploy runs, the middle one is cancelled and the newest runs next.
- **`DEPLOY_PATH must be an absolute path...` or `... must be a whole number`.** The early check rejected a value that would break the remote commands. Fix the secret or variable.
