# Evidence

Each workflow needs proof that it ran for real before the project lists it as tested.

For every workflow, this folder holds a file named after it with:

- a link to a real run in a throwaway repo, including a failing run where it makes sense (a rollback, a failed health check, a restore test)
- a short log excerpt of the steps that matter
- the date and the versions of the actions and tools used

A workflow with no filled-in evidence file is **not tested**, and every README says so.

## Current status

| Workflow | Evidence file | Status |
| --- | --- | --- |
| pr-checks-python | [pr-checks-python.md](pr-checks-python.md) | placeholder — how to capture a real run |
| pr-checks-node | [pr-checks-node.md](pr-checks-node.md) | placeholder — how to capture a real run |
| docker-ghcr | [docker-ghcr.md](docker-ghcr.md) | placeholder — how to capture a real run |
| release-from-tag | [release-from-tag.md](release-from-tag.md) | placeholder — how to capture a real run |
| ssh-deploy | [ssh-deploy.md](ssh-deploy.md) | placeholder — how to capture a real run |
| nightly-db-backup | [nightly-db-backup.md](nightly-db-backup.md) | placeholder — how to capture a real run |

This repo’s own CI (actionlint / yamllint / markdownlint) does run against the YAML under `workflows/`. That is lint evidence, not an end-to-end run of the copy-paste workflows themselves.
