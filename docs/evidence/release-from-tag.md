# Evidence: release-from-tag

**Status: not captured yet.**

## How to capture a real run

1. Use a throwaway repo that already has at least one merged PR on the default branch.
2. Copy `workflows/release-from-tag/release-from-tag.yml` to `.github/workflows/`.
3. Tag and push: `git tag v0.0.1 && git push origin v0.0.1`.
4. Confirm a GitHub Release appears with generated notes.
5. Optionally push `v0.0.2-rc.1` and confirm it is marked as a pre-release.
6. Paste the workflow run URL and the release URL below.

## Record

- Successful run URL:
- Release URL:
- Date (UTC):
- Tools: `gh` on ubuntu-24.04, checkout@v7.0.1
- Log excerpt:
