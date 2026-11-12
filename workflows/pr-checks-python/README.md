# pr-checks-python

Runs ruff (lint and format check) and pytest on every pull request, on Python 3.11 and 3.13.

**Status: not yet run in a real repo.** No evidence exists in `docs/evidence/` yet, so treat this as untested.

## Use it

Copy `pr-checks-python.yml` to `.github/workflows/` in your repo. Adjust the Python versions in the matrix to the ones you support.

The job installs `ruff` and `pytest`, then `requirements.txt` and `requirements-dev.txt` if they exist. If your project uses `pyproject.toml` only, replace the install step with something like `python -m pip install -e ".[dev]"`.

## Required secrets

None. The workflow has `permissions: contents: read` and does not use any secret.

## Failure modes

- **`ruff format --check` fails on code that passes `ruff check`.** The formatter and the linter are separate. Run `ruff format .` locally and commit the result.
- **pytest exits with code 5, "no tests collected".** pytest treats an empty test suite as a failure. Add at least one test or remove the step.
- **Dependencies install but the import fails.** Your project may need to be installed itself (`pip install -e .`). The default install step does not do that.
- **Works on 3.13, fails on 3.11 (or the reverse).** The matrix runs both with `fail-fast: false`, so you see both results. Fix the code or narrow the matrix.
- **`No file in ... matched to [requirements*.txt, pyproject.toml]`.** The pip cache needs one of those files, and setup-python fails the job when none exists. Add one, or delete the `cache` and `cache-dependency-path` lines from the setup step.
