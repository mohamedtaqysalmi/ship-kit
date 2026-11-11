// Copies each workflows/<id>/<id>.yml into site/snippets/ so the page shows the real files,
// and fails if site/catalog.mjs has drifted from the repo. Run from the repo root:
//   node scripts/sync-site.mjs
// The Pages workflow and CI both run it. site/snippets/ is not committed.
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const { workflows } = await import(pathToFileURL(join(root, "site", "catalog.mjs")).href);
const errors = [];

const folders = readdirSync(join(root, "workflows"), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
const ids = workflows.map((wf) => wf.id).sort();

for (const id of folders) if (!ids.includes(id)) errors.push(`workflows/${id}/ has no entry in site/catalog.mjs`);
for (const id of ids) if (!folders.includes(id)) errors.push(`catalog entry "${id}" has no workflows/${id}/ folder`);

const out = join(root, "site", "snippets");
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

for (const wf of workflows) {
  const source = join(root, "workflows", wf.id, `${wf.id}.yml`);
  if (!existsSync(source)) {
    errors.push(`missing ${source}`);
    continue;
  }
  copyFileSync(source, join(out, wf.snippet));
  const yaml = readFileSync(source, "utf8");

  for (const name of wf.secrets) {
    if (!new RegExp(`\\b${name}\\b`).test(yaml)) errors.push(`${wf.id}: secret ${name} is listed on the page but not used in the YAML`);
  }
  const used = new Set([...yaml.matchAll(/secrets\.([A-Z0-9_]+)/g)].map((m) => m[1]));
  used.delete("GITHUB_TOKEN");
  for (const name of used) {
    if (!wf.secrets.includes(name)) errors.push(`${wf.id}: YAML uses secrets.${name} but the page does not list it`);
  }

  if (wf.evidence) {
    const doc = join(root, "docs", "evidence", `${wf.id}.md`);
    if (!existsSync(doc) || /not captured yet/i.test(readFileSync(doc, "utf8"))) {
      errors.push(`${wf.id}: catalog claims evidence but docs/evidence/${wf.id}.md has none`);
    }
    if (!/^https:\/\/github\.com\/.+\/actions\/runs\/\d+/.test(wf.evidence.url || "")) {
      errors.push(`${wf.id}: evidence.url must be a GitHub Actions run link`);
    }
  }
}

if (errors.length) {
  console.error(errors.map((e) => `error: ${e}`).join("\n"));
  process.exit(1);
}
console.log(`site/snippets: ${workflows.length} workflow files copied, catalog matches the repo.`);
