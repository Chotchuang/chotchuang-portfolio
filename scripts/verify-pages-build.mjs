import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const rootUrl = new URL("../out/", import.meta.url);
const root = fileURLToPath(rootUrl);
const maxFileCount = 20_000;
const maxFileBytes = 25 * 1024 * 1024;

const requiredFiles = [
  "index.html",
  "project/index.html",
  "project/bluex/index.html",
  "project/merchant-growth-fintech/index.html",
  "files/index.html",
  "work/merchant-growth/strategy-deck.pdf",
  "work/merchant-growth/unit-economics.xlsx",
  "work/merchant-growth/dashboard.html",
  "work/ecommerce-growth/growth-strategy.pdf",
  "work/ecommerce-growth/budget-allocation.xlsx",
  "work/travel-analytics/funnel-dashboard.html",
  "og.png",
  "robots.txt",
  "sitemap.xml",
  "_headers",
  "_redirects",
];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(path)));
    } else {
      files.push(path);
    }
  }

  return files;
}

for (const file of requiredFiles) {
  await stat(new URL(file, rootUrl));
}

const files = await walk(root);
assert.ok(
  files.length <= maxFileCount,
  `Pages output has ${files.length} files; the Free-plan limit is ${maxFileCount}.`,
);

let totalBytes = 0;
let largestFile = { path: "", size: 0 };

for (const file of files) {
  const info = await stat(file);
  totalBytes += info.size;
  assert.ok(
    info.size <= maxFileBytes,
    `${relative(root, file)} exceeds the 25 MiB Pages file limit.`,
  );
  if (info.size > largestFile.size) {
    largestFile = { path: relative(root, file), size: info.size };
  }
}

const home = await readFile(new URL("index.html", rootUrl), "utf8");
const projectIndex = await readFile(
  new URL("project/index.html", rootUrl),
  "utf8",
);
const filesIndex = await readFile(new URL("files/index.html", rootUrl), "utf8");

assert.match(home, /CHOTCHUANG/i);
assert.match(home, /decisions people can act on/i);
assert.match(projectIndex, /PROJECT ARCHIVE/i);
assert.match(filesIndex, /WORK FILES/i);
assert.match(filesIndex, /Merchant Growth Strategy Deck/i);
assert.match(home, /chotchuang\.cc@gmail\.com/i);
assert.doesNotMatch(home, /cc\.tsrif@gmail\.com/i);

console.log(
  JSON.stringify(
    {
      status: "ready",
      files: files.length,
      totalMiB: Number((totalBytes / 1024 / 1024).toFixed(2)),
      largestFile: {
        path: largestFile.path,
        sizeMiB: Number((largestFile.size / 1024 / 1024).toFixed(2)),
      },
    },
    null,
    2,
  ),
);
