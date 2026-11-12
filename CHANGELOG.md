# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- `ssh-deploy`: roll back when the deploy step fails after the symlink switch, not only on a failed health check; validate `DEPLOY_PATH` and the health check variables before use; stop excluding `site/`, `docs/` and `workflows/` from the rsync.
- `nightly-db-backup`: run retention only after the restore test passes; make the restore test fail on an empty restore instead of always passing; correct the schedule and version-mismatch notes.
- `pr-checks-python` README: setup-python fails, not warns, when there is no file to hash for the cache.
- `pages.yml`: `id-token: write` only on the deploy job.

## [0.1.0] — 2026-11-11

### Added

- Workflows `pr-checks-python`, `pr-checks-node`, `docker-ghcr`, `release-from-tag`, `ssh-deploy` (health check + rollback) and `nightly-db-backup` (S3-compatible upload, retention, restore test). Each folder has YAML, README, secrets and failure modes. None has a linked real-app run yet.
- GitHub Pages site under `site/` with a workflow picker and copy buttons; deploy workflow `.github/workflows/pages.yml`.
- Honest evidence placeholders under `docs/evidence/` and a `QA.md` checklist for v0.1.0.
- Community files (contributing guide, code of conduct, security policy, issue forms, PR template) and CI: actionlint, yamllint, markdownlint and CodeQL for Actions.
- Project scaffold: license, editor and lint configuration, pre-commit hooks, and folder layout.

[Unreleased]: https://github.com/mohamedtaqysalmi/ship-kit/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/mohamedtaqysalmi/ship-kit/releases/tag/v0.1.0
