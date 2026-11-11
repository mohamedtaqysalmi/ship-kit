# Evidence: ssh-deploy

**Status: not captured yet.** Needs a reachable SSH host and a health URL — not available from this laptop session alone.

## How to capture a real run

1. Provision a small VPS (or a local VM with a public health endpoint via tunnel). Create deploy user, `DEPLOY_PATH/releases`, `DEPLOY_PATH/shared`, and an optional `post-switch.sh` that restarts the app.
2. Create a throwaway app repo with a trivial HTTP health endpoint returning 200.
3. Copy `workflows/ssh-deploy/ssh-deploy.yml` into that repo. Create Environment `production` with secrets from the workflow README.
4. Push to `main`. Capture the green deploy run URL.
5. Break the health endpoint (or point `HEALTHCHECK_URL` at a 500). Push again. Capture the red run that shows the rollback step flipping `current` back.
6. Paste both URLs and log excerpts below.

## Record

- Successful deploy run URL:
- Rollback (failed health) run URL:
- Date (UTC):
- Host OS / app notes:
- Log excerpt (deploy + health + rollback):
