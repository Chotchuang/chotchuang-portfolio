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
});
