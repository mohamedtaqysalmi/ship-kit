/**
 * Workflow catalog for the page. The YAML itself is never written here: it is copied from
 * workflows/<id>/<id>.yml into site/snippets/ by scripts/sync-site.mjs, which also checks this file
 * against the repo (same ids as the folders, secret names present in the YAML, evidence honest).
 *
 * evidence: null means there is no real run yet. When a real run exists, set it to
 * { url: "<link to the run>" } and fill in docs/evidence/<id>.md. The sync script refuses
 * evidence that still says "not captured yet".
 */
const repo = "https://github.com/mohamedtaqysalmi/ship-kit";

export const workflows = [
  {
    id: "pr-checks-python",
    title: "PR checks (Python)",
    blurb: "ruff lint and format check, then pytest, on Python 3.11 and 3.13.",
    secrets: [],
    note: "No secrets. The workflow only has contents: read.",
    evidence: null,
  },
  {
    id: "pr-checks-node",
    title: "PR checks (Node)",
    blurb: "npm ci, lint and build on Node 20 and 22.",
    secrets: [],
    note: "No secrets. The workflow only has contents: read.",
    evidence: null,
  },
  {
    id: "docker-ghcr",
    title: "Docker build and push (GHCR)",
    blurb: "Build from the root Dockerfile and push to ghcr.io with the Actions layer cache.",
    secrets: [],
    note: "Nothing to create. It uses GITHUB_TOKEN, with packages: write on the build job only.",
    evidence: null,
  },
  {
    id: "release-from-tag",
    title: "Release from tag",
    blurb: "Create a GitHub Release with generated notes when a v* tag is pushed.",
    secrets: [],
    note: "Nothing to create. It uses GITHUB_TOKEN, with contents: write on the release job only.",
    evidence: null,
  },
  {
    id: "ssh-deploy",
    title: "SSH deploy and rollback",
    blurb: "rsync a release over SSH, switch a current symlink, health-check, roll back on failure.",
    secrets: [
      "DEPLOY_SSH_KEY",
      "DEPLOY_KNOWN_HOSTS",
      "DEPLOY_HOST",
      "DEPLOY_USER",
      "DEPLOY_PATH",
      "HEALTHCHECK_URL",
    ],
    note: "Set these as secrets on the production environment.",
    evidence: null,
  },
  {
    id: "nightly-db-backup",
    title: "Nightly DB backup (S3)",
    blurb: "pg_dump, upload to S3-compatible storage, apply retention, restore into a runner Postgres.",
    secrets: [
      "DB_HOST",
      "DB_PORT",
      "DB_USER",
      "DB_PASSWORD",
      "DB_NAME",
      "S3_ACCESS_KEY_ID",
      "S3_SECRET_ACCESS_KEY",
      "S3_REGION",
      "S3_ENDPOINT",
      "S3_BUCKET",
    ],
    note: "Set these as secrets on the environment the workflow uses.",
    evidence: null,
  },
];

for (const wf of workflows) {
  wf.snippet = `${wf.id}.yml`;
  wf.readme = `${repo}/tree/main/workflows/${wf.id}`;
  wf.evidenceDoc = `${repo}/blob/main/docs/evidence/${wf.id}.md`;
}
