# QA — ship-kit v0.1.0

Checklist used before calling the kit ready enough to tag. Items marked **done** were verified in this repository. Items marked **human** need the owner (or a throwaway app repo) and are not faked here.

## Kit contents

- [x] `pr-checks-python` — YAML, README, secrets, failure modes
- [x] `pr-checks-node` — YAML, README, secrets, failure modes
- [x] `docker-ghcr` — YAML, README, secrets, failure modes (GHA layer cache)
- [x] `release-from-tag` — YAML, README, secrets, failure modes
- [x] `ssh-deploy` — YAML, README, secrets, failure modes (health check + rollback)
- [x] `nightly-db-backup` — YAML, README, secrets, failure modes (S3-compatible + retention + restore test)
- [x] Each workflow states it is not yet run in a real repo

## CI in this repo

- [x] `actionlint` job lints `.github/workflows/**` and `workflows/**`
- [x] `yamllint` (strict) and `markdownlint-cli2` on the tree
- [x] CodeQL for Actions
- [ ] **human** Confirm the PR that adds ssh-deploy / backup / Pages is green on GitHub Actions before merge

## Evidence

- [x] `docs/evidence/` has one file per workflow with capture instructions and empty record slots
- [x] No fabricated Actions run URLs
- [ ] **human** Capture at least one real green run (and one intentional failure where it matters) per workflow; paste URLs into the evidence files

## Pages

- [x] `site/` workflow picker with copy buttons and secrets list
- [x] Unique accent (ink / paper / signal yellow — not purple or cream-terracotta)
- [x] `.github/workflows/pages.yml` deploys `site/` via Actions
- [ ] **human** Enable Pages: Settings → Pages → Source = GitHub Actions
- [ ] **human** After first green Pages deploy, set the repo homepage URL to the Pages site

## Release

- [x] CHANGELOG notes for the six workflows and Pages
- [ ] **human** Merge the completing PR(s) to `main`
- [ ] **human** Tag `v0.1.0` and confirm `release-from-tag` (once copied into this repo, or via `gh release create`) publishes notes
- [ ] **human** No AI co-author trailers on commits or the release

## Security / hygiene

- [x] Actions pinned to commit SHAs
- [x] Least-privilege job permissions
- [x] Deploy and backup recommend GitHub Environments for secrets
- [x] SSH host keys required (`DEPLOY_KNOWN_HOSTS`); no trust-on-first-use
