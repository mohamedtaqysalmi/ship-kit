# Contributing

Thanks for looking. This project is maintained by one person, so replies to issues and pull requests may take a few days.

## The rule about evidence

A workflow in `workflows/` is only listed as tested when `docs/evidence/` links to a real run of it, in a real repo, with a log excerpt. A pull request that adds or changes a workflow should include that run link. Without it, the workflow can still be merged but it is marked untested.

## Lint locally

CI runs actionlint, yamllint and markdownlint. To run most of the same checks before pushing, install [pre-commit](https://pre-commit.com/) and run:

```bash
pre-commit install
pre-commit run --all-files
```

The pre-commit hooks cover whitespace, YAML syntax, yamllint, actionlint and gitleaks. Markdown is checked in CI only; to run it yourself use `npx markdownlint-cli2`.

## Branches and commits

- Branch from `main` and name the branch `type/short-description`, for example `feat/ssh-deploy` or `fix/backup-retention`.
- Use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages and PR titles (`feat:`, `fix:`, `docs:`, `chore:`).
- Pull requests are squash-merged, so the PR title becomes the commit message on `main`.

## Pull request expectations

- Fill in the PR template: what, why, how you tested it, and whether required secrets changed.
- Pin every action to a full commit SHA with the version in a trailing comment.
- Set `permissions:` to the minimum the workflow needs.
- Never put real secrets, hostnames or keys in examples. Use clearly fake placeholders.
- Update the workflow's README when its secrets or failure modes change, and add an entry to `CHANGELOG.md`.
