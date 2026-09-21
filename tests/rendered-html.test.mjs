import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the portfolio home page", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Chotchuang/i);
  assert.match(html, /decisions people can act on/i);
  assert.match(html, /View Product Operations case/i);
  assert.match(html, /PRODUCT OPERATIONS PATH/i);
  assert.match(html, /From an operational gap to a measured weekly cadence/i);
  assert.match(html, /project\/travel-product-analytics/i);
  assert.match(html, /Completed work/i);
  assert.match(html, /Merchant Growth/i);
  assert.match(html, /Financial CRM/i);
  assert.match(html, /Build in progress/i);
  assert.match(html, /Concept &amp; Research/i);
  assert.doesNotMatch(html, /codex-preview/i);
  assert.doesNotMatch(html, /react-loading-skeleton/i);
});

test("renders the project archive and a project case", async () => {
  const [archiveResponse, caseResponse] = await Promise.all([
    render("/project"),
    render("/project/bluex"),
  ]);

  assert.equal(archiveResponse.status, 200);
  assert.equal(caseResponse.status, 200);

  const archiveHtml = await archiveResponse.text();
  const caseHtml = await caseResponse.text();

  assert.match(archiveHtml, /Project archive/i);
  assert.match(archiveHtml, /Merchant Growth/i);
  assert.match(caseHtml, /Investment Intelligence for Retail Investors/i);
  assert.match(caseHtml, /MY ROLE/i);
  assert.match(caseHtml, /Research Overview/i);
  assert.match(caseHtml, /Current Signal Overview/i);
  assert.doesNotMatch(caseHtml, /Current HUD Hub/i);
});

test("renders selected work files and the updated work email", async () => {
  const [homeResponse, filesResponse, merchantResponse] = await Promise.all([
    render("/"),
    render("/files"),
    render("/project/merchant-growth-fintech"),
  ]);

  assert.equal(homeResponse.status, 200);
  assert.equal(filesResponse.status, 200);
  assert.equal(merchantResponse.status, 200);

  const homeHtml = await homeResponse.text();
  const filesHtml = await filesResponse.text();
  const merchantHtml = await merchantResponse.text();

  assert.match(homeHtml, /chotchuang\.cc@gmail\.com/i);
  assert.doesNotMatch(homeHtml, /cc\.tsrif@gmail\.com/i);
  assert.match(filesHtml, /Evidence you can/i);
  assert.match(filesHtml, /Merchant Growth Strategy Deck/i);
  assert.match(filesHtml, /E-commerce Budget Allocation/i);
  assert.match(merchantHtml, /Selected work files/i);
  assert.match(merchantHtml, /unit-economics\.xlsx/i);
});

test("renders travel case with weekly ops brief", async () => {
  const response = await render("/project/travel-product-analytics");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Travel Analytics Case Library/i);
  assert.match(html, /travel-analytics\/index\.html/i);
  assert.match(html, /travel-analytics-case\.pdf/i);
  assert.match(html, /Weekly Ops Diagrams/i);
  assert.match(html, /Weekly Product Ops Brief/i);
  assert.doesNotMatch(html, /D0[1-9]/i);
});

test("renders travel as four equal cases with evidence labels", async () => {
  const response = await render("/project/travel-product-analytics");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Content Quality Audit/);
  assert.match(html, /Conversion Funnel &amp; Experiment|Conversion Funnel & Experiment/);
  assert.match(html, /Weekly Product Operations/);
  assert.match(html, /Bangkok Content Operations Platform/);

  assert.match(html, /Public source \+ derived metrics; proxy opportunity estimate/);
  assert.match(html, /Synthetic clickstream \+ simulated experiment/);
  assert.match(html, /Derived portfolio package \+ simulated workflow/);
  assert.match(
    html,
    /Public-source analogue \+ derived metrics \+ simulated workflow/,
  );

  assert.match(html, /DO NOT SHIP/);
  assert.match(html, /8,908 annual-review estimate is a proxy/);
  assert.match(html, /No real user behavior or realized lift is represented/);
  assert.match(html, /no verified time-saving claim/i);
  assert.match(html, /not Agoda data or workflow/);

  assert.doesNotMatch(html, /three-part/i);
  assert.doesNotMatch(html, /flagship/i);
  assert.doesNotMatch(html, /300K\+/i);
});

test("ships a self-contained travel case library", async () => {
  const root = new URL("../public/work/travel-analytics/", import.meta.url);
  const [library, bangkokDashboard] = await Promise.all([
    readFile(new URL("index.html", root), "utf8"),
    readFile(new URL("bangkok-content-operations-dashboard.html", root), "utf8"),
  ]);

  for (const file of [
    "content-quality-dashboard.html",
    "conversion-funnel-dashboard.html",
    "weekly-operations-dashboard.html",
    "bangkok-content-operations-dashboard.html",
    "travel-analytics-case.pdf",
  ]) {
    assert.match(library, new RegExp(`href=\"${file}\"`));
  }

  assert.match(bangkokDashboard, /href="bangkok-content-claims\.md"/);
  assert.doesNotMatch(library, /agoda-portfolio|project-[1-4]-|WO-[0-9]/i);
  assert.doesNotMatch(bangkokDashboard, /\.\.\/docs\//i);
});
