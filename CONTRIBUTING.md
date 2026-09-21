# Contribution guide

This public repository powers <https://chotchuang.uk>. Keep every committed
file clear to a visitor, collaborator, or technical reader.

## Editorial standard

- Lead with the business decision, evidence, recommendation, and limitation.
- Preserve evidence labels: public source, derived, proxy, synthetic,
  simulated, concept, in progress, and unavailable.
- Never present a proxy, simulation, or association as revenue, realized
  business impact, or causal impact.
- Use short, plain, content-first public names. Do not expose internal IDs,
  timestamps, task labels, prompts, handoffs, local paths, or authoring-tool
  names.
- Generic terms such as `synthetic data`, `simulation`, and `machine learning`
  are valid when they accurately describe the work.

## Portfolio hierarchy

The homepage and project library use three levels:

1. Selected cases: Travel Analytics, Merchant Growth, and E-commerce Growth.
2. Current builds: active work with an explicit `In progress` label.
3. Archive and supporting work: earlier coursework, concepts, and research.

Do not delete supporting work merely to reduce prominence. Preserve its routes
and evidence, and keep it in the supporting section unless removal is approved.

## Public files

- Project content: `app/data/projects.ts`
- Public downloads: `public/work/<project>/`
- Release checks: `scripts/verify-pages-build.mjs` and
  `scripts/verify-public-hygiene.mjs`
- Public filenames: lowercase words separated by hyphens

Before adding a public artifact, inspect visible content and embedded metadata
for credentials, personal data, unpublished material, local paths, document
comments, tracked changes, hidden sheets, remote endpoints, and authoring-tool
traces. Never publish private datasets or proprietary BlueX implementation
details.

## Validation

```bash
npm run check:release
git diff --check
```

The release check validates public hygiene, lint, rendered content, static
links, required files, and Cloudflare Pages limits. A successful local build is
not proof that production is current.

## Publishing

Cloudflare Pages deploys the static `out/` build from `main`. Production
publication requires explicit owner approval. After deployment, verify the
changed pages and downloads at <https://chotchuang.uk>; do not rely only on a
successful build or push.

Preserve unrelated local changes. Do not rewrite Git history or force-push
without separate approval.
