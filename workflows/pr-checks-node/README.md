# pr-checks-node

Runs `npm ci`, `npm run lint` and `npm run build` on every pull request, on Node 20 and 22.

**Status: not yet run in a real repo.** No evidence exists in `docs/evidence/` yet, so treat this as untested.

## Use it

Copy `pr-checks-node.yml` to `.github/workflows/` in your repo. Your `package.json` needs `lint` and `build` scripts, and a `package-lock.json` must be committed. Change the Node versions in the matrix to the ones you support.

## Required secrets

None. The workflow has `permissions: contents: read` and does not use any secret.

## Failure modes

- **`npm ci` fails with "package.json and package-lock.json are not in sync".** Run `npm install` locally and commit the updated lock file.
- **`npm ci` fails because there is no lock file.** `npm ci` requires one, and the npm cache setup needs it too. Commit `package-lock.json`.
- **Missing script: "lint" or "build".** The steps call `npm run lint` and `npm run build` directly and fail if the script does not exist. Add the script or delete the step.
- **Passes on Node 22, fails on Node 20.** Both run with `fail-fast: false`. Check your dependencies' `engines` fields.
- **Monorepo.** This assumes `package.json` is at the repo root. Otherwise add `working-directory` to the steps and `cache-dependency-path` to the setup step.
