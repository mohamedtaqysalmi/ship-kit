# Evidence: pr-checks-node

**Status: not captured yet.**

## How to capture a real run

1. Create a public throwaway repo with `package.json` scripts `lint` and `build`, plus a committed `package-lock.json`.
2. Copy `workflows/pr-checks-node/pr-checks-node.yml` to `.github/workflows/`.
3. Open a pull request and confirm Node 20 and 22 jobs pass.
4. Break the lint script on a second PR and confirm the check fails.
5. Paste the run URLs and a log excerpt below.

## Record

- Successful run URL:
- Failing run URL:
- Date (UTC):
- action/tool versions: checkout@v7.0.1, setup-node@v7.1.0
- Log excerpt:
