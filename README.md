# Chotchuang Portfolio

A decision-focused professional portfolio covering business analytics, product,
fintech, automation, and data systems.

## What is included

- Home page with selected work and capability overview
- Filterable project archive at `/project`
- Six featured case studies and ten supporting projects
- Explicit evidence labels for public data, synthetic data, simulations,
  in-progress engineering, and concept work
- Responsive layout, social preview, sitemap, robots policy, redirects, and
  baseline security headers

## Local development

Requirements:

- Node.js `22.16.0` (pinned in `.node-version`)
- npm

```bash
npm ci
npm run dev
```

## Validate both deployment targets

The repository supports the local application build and a fully static
Cloudflare Pages export.

```bash
# Local application build
npm test

# Cloudflare Pages static export and limit checks
npm run check:pages
```

Cloudflare Pages output is written to `out/`.

## Cloudflare Pages settings

Use the **Next.js (Static HTML Export)** preset with:

| Setting | Value |
|---|---|
| Production branch | `main` |
| Build command | `npm run build:pages` |
| Build output directory | `out` |
| Root directory | `/` |
| Node.js | Read from `.node-version` |

Detailed cutover instructions are in
[`CLOUDFLARE_HANDOFF.md`](CLOUDFLARE_HANDOFF.md).

## Content maintenance

Project content is centralized in `app/data/projects.ts`. Update a project
record there, run both validation commands, then commit the result.

No database, authentication service, or runtime environment variables are
required for this portfolio.
