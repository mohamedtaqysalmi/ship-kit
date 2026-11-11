# Workflows

Each copy-paste workflow gets its own folder here: `workflows/<name>/`.

A folder contains:

- the workflow YAML, ready to copy into `.github/workflows/` of your own repo
- a `README.md` that says what it does, how to adapt it, and how to roll it back
- the list of required secrets and variables, with the exact names the YAML reads
- failure modes: what breaks, what the run looks like when it does, and what to check first

## Written so far

All of these are written but not yet run in a real app repo, so none of them is tested. Capture instructions live under [`docs/evidence/`](../docs/evidence/).

- [pr-checks-python](pr-checks-python/)
- [pr-checks-node](pr-checks-node/)
- [docker-ghcr](docker-ghcr/)
- [release-from-tag](release-from-tag/)
- [ssh-deploy](ssh-deploy/)
- [nightly-db-backup](nightly-db-backup/)

This repository's CI runs actionlint (and yamllint) on every YAML file under `workflows/`. That is lint coverage, not an end-to-end proof.
