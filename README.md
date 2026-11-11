# ship-kit

Copy-paste GitHub Actions workflows for solo developers and small agencies, each tested in a real repo.

**Status: early. Four workflows are written, none has been run in a real repo yet.**

Each workflow lives in its own folder under `workflows/` with the YAML, a README, the secrets it needs and how it fails. A workflow is only called tested once a real run is linked from `docs/evidence/`. Until then, each one says "Not yet run in a real repo".

## Workflows

| Workflow | Status |
| --- | --- |
| [pr-checks-python](workflows/pr-checks-python/) (ruff, pytest) | written, not yet run in a real repo |
| [pr-checks-node](workflows/pr-checks-node/) (lint, build) | written, not yet run in a real repo |
| [docker-ghcr](workflows/docker-ghcr/) (build and push to GHCR) | written, not yet run in a real repo |
| [release-from-tag](workflows/release-from-tag/) (GitHub Release from a `v*` tag) | written, not yet run in a real repo |
| SSH deploy with health check and rollback | planned |
| Nightly database backup to S3-compatible storage | planned |

## License

MIT, see [LICENSE](LICENSE).
