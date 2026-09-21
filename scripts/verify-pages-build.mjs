import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const rootUrl = new URL("../out/", import.meta.url);
const root = resolve(fileURLToPath(rootUrl));
const maxFileCount = 20_000;
const maxFileBytes = 25 * 1024 * 1024;
const bluexDashboardTickers = [
  "aapl",
  "amd",
  "amzn",
  "ba",
  "brk-b",
  "cl=f",
  "fdx",
  "gld",
  "googl",
  "intc",
  "ko",
  "mu",
  "nflx",
  "nvda",
  "qcom",
  "qqq",
  "wdc",
  "wmt",
];

const requiredFiles = [
  "index.html",
  "project/index.html",
  "project/bluex/index.html",
  "project/merchant-growth-fintech/index.html",
  "project/travel-product-analytics/index.html",
  "project/agentic-finops/index.html",
  "project/digital-health-blockchain/index.html",
  "files/index.html",
  "work/bluex/cover-dashboard.svg",
  "work/bluex/cover-momentum-chart.svg",
  "work/bluex/architecture.svg",
  "work/bluex/ml-signal-research.html",
  "work/bluex/decision-dashboard.html",
  "work/bluex/ml/index-ensemble.html",
  "work/bluex/ml/index-xgboost.html",
  "work/bluex/ml/index-lightgbm.html",
  ...bluexDashboardTickers.map(
    (ticker) =>
      `work/bluex/ml/dashboards/${ticker}_signal_daily_ensemble.html`,
  ),
  "work/travel-analytics/funnel-dashboard.html",
  "work/travel-analytics/weekly-ops-brief.html",
  "work/travel-analytics/content-quality-prioritization.sql",
  "work/travel-analytics/funnel-experiment-analysis.sql",
  "work/travel-analytics/cover-funnel.svg",
  "work/weekly-ops-kit/index.html",
  "work/weekly-ops-kit/full.html",
  "work/adblocker-strategy-capstone.pdf",
  "work/diversification-model-capstone.pdf",
  "work/ai-algorithmic-trading-research-guide.pdf",
  "work/agentic-finops/executive-summary.pdf",
  "work/agentic-finops/cover.svg",
  "work/digital-health/architecture-summary.pdf",
  "work/digital-health/cover.svg",
  "work/financial-crm/er-diagram.png",
  "work/financial-crm/schema-overview.html",
  "work/financial-crm/schema.sql",
  "work/restaurant-data-model/relational-model.pdf",
  "work/restaurant-data-model/schema.sql",
  "work/restaurant-data-model/business-queries.sql",
  "work/hotel-analyzer/cli-demo.svg",
  "work/hotel-analyzer/project.py",
  "work/hotel-analyzer/test_project.py",
  "work/daily-intel-hub/architecture.svg",
  "work/merchant-growth/strategy-deck.pdf",
  "work/merchant-growth/unit-economics.xlsx",
  "work/merchant-growth/dashboard.html",
  "work/ecommerce-growth/growth-strategy.pdf",
  "work/ecommerce-growth/capstone-evidence.pdf",
  "work/ecommerce-growth/budget-allocation.xlsx",
  "work/ecommerce-growth/schema.sql",
  "work/ecommerce-growth/exploratory-analysis.sql",
  "work/ecommerce-growth/descriptive-analysis.sql",
  "work/ecommerce-growth/correlation-analysis.sql",
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

async function assertLocalHtmlLinks(files) {
  const localLinkPattern = /\b(?:href|src)=["']([^"']+)["']/gi;

  for (const file of files.filter((path) => path.endsWith(".html"))) {
    const html = await readFile(file, "utf8");

    for (const [, rawLink] of html.matchAll(localLinkPattern)) {
      if (
        !rawLink ||
        rawLink.startsWith("#") ||
        rawLink.startsWith("//") ||
        /^[a-z][a-z0-9+.-]*:/i.test(rawLink)
      ) {
        continue;
      }

      const pathWithoutQuery = rawLink.split(/[?#]/, 1)[0];
      if (!pathWithoutQuery) {
        continue;
      }

      const decodedPath = decodeURIComponent(pathWithoutQuery);
      const target = decodedPath.startsWith("/")
        ? resolve(root, `.${decodedPath}`)
        : resolve(dirname(file), decodedPath);

      assert.ok(
        target === root || target.startsWith(`${root}${sep}`),
        `${relative(root, file)} links outside the build output: ${rawLink}`,
      );

      try {
        await stat(target);
      } catch {
        assert.fail(
          `${relative(root, file)} has a missing local link: ${rawLink}`,
        );
      }
    }
  }
}

for (const file of requiredFiles) {
  await stat(new URL(file, rootUrl));
}

const files = await walk(root);
await assertLocalHtmlLinks(files);
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
assert.match(projectIndex, /PORTFOLIO LIBRARY/i);
assert.match(projectIndex, /Selected cases/i);
assert.match(projectIndex, /Archive &amp; supporting work/i);
assert.match(filesIndex, /WORK FILES/i);
assert.match(filesIndex, /Merchant Growth Strategy Deck/i);
assert.match(filesIndex, /Weekly Product Ops Brief/i);
assert.match(filesIndex, /Weekly Ops Diagrams/i);
assert.match(filesIndex, /Agentic FinOps Executive Summary/i);
assert.doesNotMatch(filesIndex, /\bD0[1-9]\b/i);
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
