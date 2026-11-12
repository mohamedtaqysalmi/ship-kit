# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Rebuilt the Pages site on the shared page style (`base.css`, `base.js`, `page.css`). The picker now shows per workflow whether real run evidence exists.
- `site/snippets/` is no longer committed. `scripts/sync-site.mjs` copies the YAML from `workflows/` at build time, and CI fails if the catalog and the folders disagree.

## [0.1.0] — 2026-11-11

### Added

- Workflows `pr-checks-python`, `pr-checks-node`, `docker-ghcr`, `release-from-tag`, `ssh-deploy` (health check + rollback) and `nightly-db-backup` (S3-compatible upload, retention, restore test). Each folder has YAML, README, secrets and failure modes. None has a linked real-app run yet.
- GitHub Pages site under `site/` with a workflow picker and copy buttons; deploy workflow `.github/workflows/pages.yml`.
- Honest evidence placeholders under `docs/evidence/` and a `QA.md` checklist for v0.1.0.
- Community files (contributing guide, code of conduct, security policy, issue forms, PR template) and CI: actionlint, yamllint, markdownlint and CodeQL for Actions.
- Project scaffold: license, editor and lint configuration, pre-commit hooks, and folder layout.

[Unreleased]: https://github.com/mohamedtaqysalmi/ship-kit/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/mohamedtaqysalmi/ship-kit/releases/tag/v0.1.0
