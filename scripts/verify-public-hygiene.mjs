import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFileSync } from "node:child_process";

const forbiddenContent = [
  { label: "authoring service name", pattern: /\b(?:codex|chatgpt|openai|claude|copilot)\b/i },
  { label: "internal task label", pattern: /\b(?:work[- ]order|next_(?:codex|cursor)|wo-\d{3,})\b/i },
  { label: "local user path", pattern: /\/Users\/[A-Za-z0-9._-]+\// },
];

const forbiddenPath = /(?:^|\/)(?:\.openai|agents\.md)(?:\/|$)|\b(?:codex|chatgpt|openai)\b/i;
const fileList = execFileSync(
  "git",
  ["ls-files", "--cached", "--others", "--exclude-standard"],
  { encoding: "utf8" },
)
  .split("\n")
  .filter(Boolean)
  .filter((path) => existsSync(path));

const findings = [];
const selfPath = "scripts/verify-public-hygiene.mjs";
const textExtensions = new Set([
  ".css", ".html", ".js", ".json", ".md", ".mjs", ".sql", ".svg",
  ".ts", ".tsx", ".txt", ".xml", ".yml", ".yaml",
]);

for (const path of fileList) {
  if (forbiddenPath.test(path)) {
    findings.push(`${path}: public filename exposes an internal authoring trace`);
  }

  if (path === selfPath) continue;

  const extension = path.includes(".") ? `.${path.split(".").pop().toLowerCase()}` : "";
  const content = textExtensions.has(extension)
    ? (await readFile(path)).toString("utf8")
    : execFileSync("strings", ["-a", path], { encoding: "utf8" });
  const normalized = path.endsWith(".css")
    ? content.replace(/\bcursor\s*:/gi, "")
    : content;

  for (const rule of forbiddenContent) {
    if (rule.pattern.test(normalized)) {
      findings.push(`${path}: ${rule.label}`);
    }
  }
}

assert.deepEqual(
  findings,
  [],
  `Public-hygiene check failed:\n${findings.map((item) => `- ${item}`).join("\n")}`,
);

console.log(`Public-hygiene check passed for ${fileList.length} files.`);
