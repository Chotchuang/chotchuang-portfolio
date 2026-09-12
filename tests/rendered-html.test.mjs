import assert from "node:assert/strict";
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
  assert.match(html, /Explore my work/i);
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
  assert.match(caseHtml, /Open live project/i);
  assert.match(caseHtml, /MY ROLE/i);
  assert.match(caseHtml, /ML Signal Research Hub/i);
  assert.match(caseHtml, /index-ensemble\.html/i);
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
  assert.match(html, /Weekly Product Ops Brief/i);
  assert.match(html, /weekly-ops-brief\.html/i);
});
