# ship-kit

Copy-paste GitHub Actions workflows for solo developers and small agencies, each meant to be tested in a real repo.

**Status: v0.1.0 contents are written. None of the six copy-paste workflows has a linked real-app run yet.** See [QA.md](QA.md).

Each workflow lives in its own folder under `workflows/` with the YAML, a README, the secrets it needs and how it fails. A workflow is only called tested once a real run is linked from `docs/evidence/`. Until then, every README says so.

## Workflows

| Workflow | Status |
| --- | --- |
| [pr-checks-python](workflows/pr-checks-python/) (ruff, pytest) | written, not yet run in a real repo |
| [pr-checks-node](workflows/pr-checks-node/) (lint, build) | written, not yet run in a real repo |
| [docker-ghcr](workflows/docker-ghcr/) (build and push to GHCR, GHA cache) | written, not yet run in a real repo |
| [release-from-tag](workflows/release-from-tag/) (GitHub Release from a `v*` tag) | written, not yet run in a real repo |
| [ssh-deploy](workflows/ssh-deploy/) (SSH release symlink, health check, rollback) | written, not yet run in a real repo |
| [nightly-db-backup](workflows/nightly-db-backup/) (pg_dump → S3, retention, restore test) | written, not yet run in a real repo |

## Try the picker

The GitHub Pages site is a workflow picker: choose a workflow, read the secrets list, copy the YAML.

- Site: <https://mohamedtaqysalmi.github.io/ship-kit/>
- Source: [`site/`](site/)

## Security notes

- Actions pinned to full commit SHAs.
- Least-privilege job permissions; deploy and backup use GitHub Environments.
- No secrets printed in logs; SSH host keys are pinned via `DEPLOY_KNOWN_HOSTS`.

## Docs

- [QA checklist](QA.md)
- [Test report](TEST_REPORT.md)
- [Evidence](docs/evidence/)
- [Changelog](CHANGELOG.md)

## License

MIT, see [LICENSE](LICENSE). Owner: Mohamed-Taqy Salmi.
