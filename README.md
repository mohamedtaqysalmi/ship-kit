# ship-kit

Copy-paste GitHub Actions workflows for solo developers and small agencies, each tested in a real repo.

**Status: early scaffold, no workflows yet.**

The idea is that each workflow lives in its own folder under `workflows/` with the YAML, a README, the secrets it needs and how it fails. A workflow is only called tested once a real run is linked from `docs/evidence/`.

## Planned workflows

All of these are planned. None exist yet.

- SSH deploy with a health check and rollback (planned)
- PR checks for Python and Node projects (planned)
- Nightly database backup to S3-compatible storage (planned)
- Docker build and push to GHCR (planned)
- Release from a tag (planned)

## License

MIT, see [LICENSE](LICENSE).
