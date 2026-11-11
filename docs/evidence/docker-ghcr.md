# Evidence: docker-ghcr

**Status: not captured yet.**

## How to capture a real run

1. Create a throwaway repo with a tiny `Dockerfile` (`FROM alpine:3.20` is enough).
2. Copy `workflows/docker-ghcr/docker-ghcr.yml` to `.github/workflows/`.
3. Push to `main`. Confirm the image appears under the repo’s GHCR packages.
4. Optionally push a `v0.0.1` tag and confirm the semver tag on the image.
5. Paste the Actions run URL, the package URL, and a log excerpt from the build-and-push step.

## Record

- Successful run URL:
- Package URL:
- Date (UTC):
- action versions: checkout@v7.0.1, setup-buildx@v4.4.1, login@v4.8.0, metadata@v6.2.0, build-push@v7.4.0
- Log excerpt:
