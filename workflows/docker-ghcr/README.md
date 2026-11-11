# docker-ghcr

Builds a Docker image from the `Dockerfile` at the repo root and pushes it to GitHub Container Registry (`ghcr.io/<owner>/<repo>`). Layer cache is stored in the GitHub Actions cache.

**Status: not yet run in a real repo.** No evidence exists in `docs/evidence/` yet, so treat this as untested.

## Use it

Copy `docker-ghcr.yml` to `.github/workflows/` in your repo. It runs on pushes to `main` and on `v*` tags. Image tags come from docker/metadata-action: the branch name, the semver version (for a tag push, `v1.2.3` becomes `1.2.3`) and the commit SHA.

Only the `build-and-push` job has `packages: write`. The workflow-level permission is `contents: read`.

## Required secrets

None to create. The workflow logs in with the built-in `GITHUB_TOKEN`, which is passed to the login action as a secret reference and is masked in logs.

## Failure modes

- **`denied` or `permission_denied: write_package`.** The package already exists and is linked to a different repo, or this repo has no write access to it. In the package settings on GitHub, add this repo under "Manage Actions access" with the write role.
- **Image name is rejected.** GHCR names must be lowercase. docker/metadata-action lowercases the repository name, so this should not happen, but check the tag list in the logs if it does.
- **No `Dockerfile` at the root.** The build fails immediately. Set `context` and `file` in the build step for other layouts.
- **The pushed image is private.** New GHCR packages default to private. Change the visibility in the package settings if you want it public. This workflow does not change it.
- **Cache is not reused.** The `gha` cache is scoped by branch and has a size limit per repo. A cold cache is slower but not an error.
- **Pull requests from forks.** This workflow does not run on pull requests, on purpose, so fork code never gets a token that can push.
