# Test report — ship-kit

Date: 2026-11-11.

## What was run

| Check | Result | Notes |
| --- | --- | --- |
| This repo CI: actionlint | Pending on the open feature PR | Lints `.github/workflows/**` and `workflows/**/*.yml` |
| This repo CI: yamllint | Pending on the open feature PR | Strict config in `.yamllint.yml` |
| This repo CI: markdownlint | Pending on the open feature PR | `markdownlint-cli2` |
| This repo CI: CodeQL (Actions) | Pending on the open feature PR | |
| End-to-end: pr-checks-python | Not run | Needs throwaway repo — see `docs/evidence/pr-checks-python.md` |
| End-to-end: pr-checks-node | Not run | Needs throwaway repo — see `docs/evidence/pr-checks-node.md` |
| End-to-end: docker-ghcr | Not run | Needs throwaway repo + Dockerfile |
| End-to-end: release-from-tag | Not run | Needs throwaway repo + tag push |
| End-to-end: ssh-deploy | Not run | Needs SSH host + health URL |
| End-to-end: nightly-db-backup | Not run | Needs Postgres + S3-compatible bucket |
| Pages picker smoke | Local files written; live Pages pending enable | Load `#picker`, select each workflow, copy YAML |

## Verdict

**Lint-ready, not end-to-end proven.** The kit is honest about that in every workflow README and in `docs/evidence/`. Filling the evidence files is the remaining bar before calling any workflow “tested”.
