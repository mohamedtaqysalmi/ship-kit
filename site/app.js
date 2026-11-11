import { workflows } from "./catalog.mjs";

const chips = document.getElementById("workflow-chips");
const title = document.getElementById("detail-title");
const tag = document.getElementById("detail-tag");
const blurb = document.getElementById("detail-blurb");
const evidenceNote = document.getElementById("detail-evidence");
const readme = document.getElementById("detail-readme");
const evidenceDoc = document.getElementById("detail-evidence-doc");
const secretsPanel = document.getElementById("secrets-panel");
const secretsList = document.getElementById("secrets-list");
const secretsNote = document.getElementById("secrets-note");
const yamlCode = document.getElementById("yaml-code");
const copyBtn = document.getElementById("copy-btn");

const withEvidence = workflows.filter((wf) => wf.evidence).length;
document.getElementById("fact-count").textContent = String(workflows.length);
document.getElementById("fact-evidence").textContent = String(withEvidence);

function setYaml(text) {
  const code = document.createElement("code");
  code.textContent = text;
  yamlCode.replaceChildren(code);
}

async function select(id) {
  const wf = workflows.find((item) => item.id === id);
  if (!wf) return;

  for (const button of chips.children) {
    button.setAttribute("aria-pressed", button.dataset.id === id ? "true" : "false");
  }

  title.textContent = wf.title;
  blurb.textContent = wf.blurb;
  tag.hidden = false;
  if (wf.evidence) {
    tag.textContent = "run linked";
    tag.className = "tag tag-ok";
    evidenceNote.replaceChildren(
      "Real run: ",
      Object.assign(document.createElement("a"), { href: wf.evidence.url, textContent: wf.evidence.url }),
    );
  } else {
    tag.textContent = "not run";
    tag.className = "tag tag-no";
    evidenceNote.textContent = "Not yet run in a real repo. No run evidence exists for this workflow.";
  }
  readme.href = wf.readme;
  readme.hidden = false;
  evidenceDoc.href = wf.evidenceDoc;
  evidenceDoc.hidden = false;

  secretsPanel.hidden = false;
  secretsList.replaceChildren(
    ...wf.secrets.map((name) => {
      const li = document.createElement("li");
      li.textContent = name;
      return li;
    }),
  );
  secretsList.hidden = wf.secrets.length === 0;
  secretsNote.textContent = wf.note;

  copyBtn.disabled = true;
  setYaml("Loading…");
  try {
    const response = await fetch(`snippets/${wf.snippet}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    if (document.querySelector('#workflow-chips [aria-pressed="true"]')?.dataset.id !== id) return;
    setYaml(text);
    copyBtn.disabled = false;
  } catch (error) {
    setYaml(`Could not load snippets/${wf.snippet} (${error.message}). The file is in workflows/${wf.id}/ on GitHub.`);
  }
}

for (const wf of workflows) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "chip";
  button.dataset.id = wf.id;
  button.setAttribute("aria-pressed", "false");
  button.textContent = wf.id;
  button.addEventListener("click", () => select(wf.id));
  chips.appendChild(button);
}

const requested = new URLSearchParams(window.location.search).get("wf");
select(workflows.some((wf) => wf.id === requested) ? requested : workflows[0].id);
