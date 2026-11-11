import { workflows } from "./catalog.js";

const listEl = document.getElementById("workflow-list");
const titleEl = document.getElementById("detail-title");
const blurbEl = document.getElementById("detail-blurb");
const statusEl = document.getElementById("detail-status");
const secretsPanel = document.getElementById("secrets-panel");
const secretsList = document.getElementById("secrets-list");
const yamlView = document.getElementById("yaml-view");
const yamlLabel = document.getElementById("yaml-label");
const copyBtn = document.getElementById("copy-btn");
const copyFeedback = document.getElementById("copy-feedback");
const readmeLink = document.getElementById("detail-readme");

let activeId = null;
let activeYaml = "";

function renderList() {
  listEl.innerHTML = "";
  for (const wf of workflows) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "wf-btn";
    btn.setAttribute("role", "option");
    btn.setAttribute("aria-selected", "false");
    btn.dataset.id = wf.id;
    btn.innerHTML = `<span>${wf.title}</span><small>${wf.status}</small>`;
    btn.addEventListener("click", () => selectWorkflow(wf.id));
    listEl.appendChild(btn);
  }
}

async function selectWorkflow(id) {
  const wf = workflows.find((item) => item.id === id);
  if (!wf) return;

  activeId = id;
  for (const btn of listEl.querySelectorAll(".wf-btn")) {
    btn.setAttribute("aria-selected", btn.dataset.id === id ? "true" : "false");
  }

  titleEl.textContent = wf.title;
  blurbEl.textContent = wf.blurb;
  statusEl.hidden = false;
  statusEl.textContent = wf.status;
  readmeLink.hidden = false;
  readmeLink.href = wf.readme;

  secretsPanel.hidden = false;
  secretsList.innerHTML = "";
  for (const secret of wf.secrets) {
    const li = document.createElement("li");
    li.textContent = secret;
    secretsList.appendChild(li);
  }

  yamlLabel.textContent = wf.snippet;
  yamlView.textContent = "Loading…";
  copyBtn.disabled = true;
  copyFeedback.textContent = "";

  try {
    const res = await fetch(`./snippets/${wf.snippet}`, { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    activeYaml = await res.text();
    yamlView.textContent = activeYaml;
    copyBtn.disabled = false;
  } catch (err) {
    activeYaml = "";
    yamlView.textContent = `Could not load ./snippets/${wf.snippet}. ${err}`;
  }
}

async function copyYaml() {
  if (!activeYaml) return;
  try {
    await navigator.clipboard.writeText(activeYaml);
    copyFeedback.textContent = "Copied";
  } catch {
    // Fallback for older browsers / denied clipboard permission.
    const range = document.createRange();
    range.selectNodeContents(yamlView);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    copyFeedback.textContent = "Select the YAML and copy manually";
  }
  window.setTimeout(() => {
    if (copyFeedback.textContent === "Copied") copyFeedback.textContent = "";
  }, 1600);
}

copyBtn.addEventListener("click", copyYaml);
renderList();

const initial = new URLSearchParams(window.location.search).get("wf") || workflows[0]?.id;
if (initial) selectWorkflow(initial);
