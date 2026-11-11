# Evidence: pr-checks-python

**Status: not captured yet.**

## How to capture a real run

1. Create a public throwaway repo (for example `ship-kit-evidence-python`).
2. Add a minimal `pyproject.toml` or `requirements.txt`, one passing test under `tests/`, and copy `workflows/pr-checks-python/pr-checks-python.yml` to `.github/workflows/`.
3. Open a pull request that changes a Python file.
4. Confirm the matrix jobs for 3.11 and 3.13 go green.
5. Open a second PR that breaks formatting (`ruff format`) or a test, confirm the check fails, then revert.
6. Paste below: the successful run URL, the failing run URL, the date (UTC), and a short log excerpt from the ruff and pytest steps.

## Record

- Successful run URL:
- Failing run URL:
- Date (UTC):
- action/tool versions: checkout@v7.0.1, setup-python@v7.1.0, ruff and pytest as installed by the workflow
- Log excerpt:
