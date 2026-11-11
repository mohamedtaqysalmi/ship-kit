# Workflows

Each copy-paste workflow gets its own folder here: `workflows/<name>/`.

A folder contains:

- the workflow YAML, ready to copy into `.github/workflows/` of your own repo
- a `README.md` that says what it does, how to adapt it, and how to roll it back
- the list of required secrets and variables, with the exact names the YAML reads
- failure modes: what breaks, what the run looks like when it does, and what to check first

## Written so far

All of these are written but not yet run in a real repo, so none of them is tested.

- [pr-checks-python](pr-checks-python/)
- [pr-checks-node](pr-checks-node/)
- [docker-ghcr](docker-ghcr/)
- [release-from-tag](release-from-tag/)

The SSH deploy and nightly backup workflows are still planned. A workflow only gets listed as tested once there is real run evidence in `docs/evidence/`.
