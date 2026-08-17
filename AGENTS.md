# Chotchuang Portfolio — Agent Handoff and Website Guidelines

Last updated: 2026-07-28

This file is the operating guide for any agent continuing work on this
portfolio. Read it before changing content, assets, hosting, DNS, or deployment
configuration.

## 1. Purpose and editorial direction

This is Chotchuang's job-application portfolio. It should help a recruiter or
hiring manager understand:

- what decision each project supports;
- what Chotchuang personally built or analyzed;
- what evidence is available;
- which data is public, synthetic, simulated, conceptual, or proprietary; and
- which selected work files can be reviewed directly.

Keep the writing concise, credible, and decision-focused. Do not overstate
impact. Preserve evidence labels such as `Complete`, `In progress`, `Concept`,
`Public data`, `Synthetic data`, and `Simulated impact`.

The website language is currently English. Maintain a professional,
recruiter-friendly tone unless the owner explicitly requests another language.

## 2. Current live architecture

```text
Local repository
  → GitHub public repository
  → Cloudflare Pages
  → https://chotchuang.uk

The same validated source is also published manually to OpenAI Sites
as a fallback deployment.
```

| Role | Current location |
|---|---|
| Primary production website | <https://chotchuang.uk> |
| Public source repository | <https://github.com/Chotchuang/chotchuang-portfolio> |
| Cloudflare Pages project | `chotchuang-portfolio` |
| OpenAI Sites fallback | <https://chotchuang-portfolio.blackhorsepartner.chatgpt.site> |
| Work-files index | <https://chotchuang.uk/files/> |
| Public work email | `chotchuang.cc@gmail.com` |

Cloudflare Pages is the primary host. OpenAI Sites is a rollback/fallback copy;
it is not the primary custom-domain host. Canva is not part of the production
hosting path.

Do not migrate this site to Vercel, Supabase, Google Sites, Canva hosting, or a
database unless the owner explicitly changes the architecture. The current
portfolio is static and does not require Supabase, authentication, server-side
persistence, or runtime environment variables.

The `www.chotchuang.uk` to `chotchuang.uk` redirect is managed in Cloudflare,
not in this repository. Normal content updates do not require another DNS
change.

## 3. Technical stack

- Next.js 16 with React 19 and TypeScript
- Static Cloudflare Pages export for the primary website
- vinext/Cloudflare-compatible build for OpenAI Sites
- Node.js version pinned in `.node-version`
- npm with `package-lock.json` committed
- No database, Supabase, Vercel, or application authentication

Preserve the existing package manager, lockfile, architecture, and
`.openai/hosting.json`. Do not initialize a second Sites project. Treat the
`project_id` in `.openai/hosting.json` as an opaque identifier.

## 4. Important files and ownership

| Path | Purpose |
|---|---|
| `app/data/projects.ts` | Source of truth for project names, summaries, evidence, technology, URLs, and public work files |
| `app/page.tsx` | Homepage content and primary calls to action |
| `app/project/page.tsx` | Main project archive route |
| `app/project/[slug]/page.tsx` | Individual case-study pages |
| `app/files/page.tsx` | Recruiter-facing Work Files index |
| `app/components/SiteHeader.tsx` | Global navigation |
| `app/components/SiteFooter.tsx` | Footer navigation and contact |
| `app/globals.css` | Shared visual system and responsive styling |
| `app/layout.tsx` | Metadata, Open Graph information, fonts, and root layout |
| `public/work/` | Files intentionally approved for public download |
| `public/og.png` | Social sharing preview |
| `public/_headers` | Cloudflare security and caching headers |
| `public/_redirects` | Repository-managed route redirects |
| `scripts/verify-pages-build.mjs` | Required-route, asset, and Cloudflare Free-plan output checks |
| `tests/rendered-html.test.mjs` | Server-rendered content regression tests |
| `.openai/hosting.json` | Existing OpenAI Sites project binding |
| `wrangler.jsonc` | Cloudflare Pages build configuration |
| `CLOUDFLARE_HANDOFF.md` | Detailed Cloudflare setup, cutover, build-count, and rollback notes |

When adding or editing a project, start in `app/data/projects.ts`. Avoid
duplicating project metadata in components.

## 5. Current public work files

These files are intentionally public:

| Project | Public file | Format |
|---|---|---|
| BlueX | `public/work/bluex/cover-dashboard.svg` | SVG |
| BlueX | `public/work/bluex/cover-momentum-chart.svg` | SVG |
| BlueX | `public/work/bluex/architecture.svg` | SVG |
| BlueX | `public/work/bluex/ml-signal-research.html` | HTML hub |
| BlueX | `public/work/bluex/ml/index-ensemble.html` | HTML |
| BlueX | `public/work/bluex/ml/index-xgboost.html` | HTML |
| BlueX | `public/work/bluex/ml/index-lightgbm.html` | HTML |
| BlueX | `public/work/bluex/ml/dashboards/*_signal_daily_ensemble.html` | HTML (18 tickers) |
| Merchant Growth & Fintech Profitability | `public/work/merchant-growth/strategy-deck.pdf` | PDF |
| Merchant Growth & Fintech Profitability | `public/work/merchant-growth/unit-economics.xlsx` | Excel |
| Merchant Growth & Fintech Profitability | `public/work/merchant-growth/dashboard.html` | HTML |
| Travel Product & Supply Analytics | `public/work/travel-analytics/funnel-dashboard.html` | HTML |
| Travel Product & Supply Analytics | `public/work/travel-analytics/weekly-ops-brief.html` | HTML |
| Travel Product & Supply Analytics | `public/work/travel-analytics/cover-funnel.svg` | SVG |
| E-commerce Growth & Commercial Strategy | `public/work/ecommerce-growth/growth-strategy.pdf` | PDF |
| E-commerce Growth & Commercial Strategy | `public/work/ecommerce-growth/budget-allocation.xlsx` | Excel |
| Agentic FinOps | `public/work/agentic-finops/executive-summary.pdf` | PDF |
| Digital Health | `public/work/digital-health/architecture-summary.pdf` | PDF |
| Financial CRM | `public/work/financial-crm/er-diagram.png` | PNG |
| Financial CRM | `public/work/financial-crm/schema-overview.html` | HTML |
| Restaurant Data Model | `public/work/restaurant-data-model/relational-model.pdf` | PDF |
| Hotel Analyzer | `public/work/hotel-analyzer/cli-demo.svg` | SVG |
| Daily Intel Hub | `public/work/daily-intel-hub/architecture.svg` | SVG |

The public URL mirrors the path below `public`. For example:

```text
public/work/merchant-growth/strategy-deck.pdf
→ https://chotchuang.uk/work/merchant-growth/strategy-deck.pdf
```

Each public file must also be declared in the relevant project's `files` array
in `app/data/projects.ts`. The `/files` page and case-study download cards are
generated from that data.

## 6. Adding a project

1. Add one `Project` record in `app/data/projects.ts`.
2. Use a stable lowercase slug with hyphens.
3. State the decision or problem clearly.
4. Describe methods as actions Chotchuang performed.
5. Add verifiable evidence without inventing results.
6. Mark the correct status and disclosure.
7. Add a `liveUrl` only when the destination works publicly.
8. Set `featured: true` only for the strongest recruiter-facing work.
9. Run all validation steps in section 9.

The case-study route is generated automatically at `/project/<slug>`.

## 7. Adding a public work file

1. Confirm that the owner intends the exact file to be public.
2. Make a safe copy; never publish the only private original.
3. Place it under `public/work/<project-name>/`.
4. Use a descriptive lowercase filename with hyphens.
5. Add its title, format, size, URL, and plain-language description to the
   project's `files` array in `app/data/projects.ts`.
6. Add the asset path to `requiredFiles` in
   `scripts/verify-pages-build.mjs`.
7. Add or update a rendered-content assertion when the public title or route is
   important.
8. Build both targets and test the live download after deployment.

Keep public files small and browser-friendly. Cloudflare Pages checks currently
enforce a maximum of 25 MiB per file and 20,000 files per deployment.

### BlueX / Bluexprice export policy (mandatory)

This portfolio repo is **public**. The Bluexprice research repo is proprietary.

Agents may publish **sanitized result artifacts only** under `public/work/bluex/`:

| Allowed | Forbidden |
|---|---|
| Generated HTML summary tables and Plotly dashboards | Any Bluexprice source (`core/`, `ML/`, `strategies/`, Pine) |
| Architecture / cover SVGs written for the portfolio | Indicator formulas, feature recipes, strategy stacks |
| Plain-language case narrative and disclaimers | Instructions that recreate the private pipeline |
| Aggregate metrics already shown in research HTML | Raw CSV, full batch JSON, trade dumps that expose rules |

If a file could help someone rebuild the signal system, do **not** add it.
Cross-check Bluexprice **C-20 / U-03** before any BlueX export.

### Mandatory privacy and safety review

Before publishing any PDF, spreadsheet, HTML dashboard, image, dataset, or
archive, check for:

- passwords, API keys, tokens, cookies, connection strings, and `.env` values;
- private email addresses, phone numbers, addresses, IDs, and personal data;
- client-confidential, employer-confidential, or unpublished material;
- real customer, merchant, patient, financial-account, or transaction data;
- comments, speaker notes, tracked changes, hidden sheets, hidden rows, named
  ranges, workbook metadata, and external spreadsheet links;
- embedded scripts, analytics IDs, remote endpoints, source maps, or local file
  paths in HTML;
- document author metadata and attachments; and
- copyrighted data or assets that are not licensed for public distribution.

For PDF and Office files, inspect both the visible pages/sheets and embedded
metadata. A simple text search alone is not sufficient.

Never add raw datasets, private documents, credentials, `.env` files, large
archives, or proprietary Bluexprice source/formulas/strategy code to this public
repository.

## 8. Design and UX guidelines

- Preserve the current restrained editorial style, strong typography, dark
  neutral palette, and evidence-led case-study structure.
- Keep the main navigation limited to `About`, `Projects`, `Files`, and
  `Contact` unless a new section has a clear recruiting purpose.
- Maintain keyboard access, visible focus states, semantic headings, readable
  contrast, and descriptive link labels.
- Test layouts at mobile and desktop widths after structural UI changes.
- Avoid decorative features, dashboards, animations, or dependencies that do
  not improve recruiter comprehension.
- Keep external project links clearly distinguished from downloadable evidence.
- Do not replace the existing social preview with a generic image.

## 9. Local workflow and validation

Initial setup:

```bash
npm ci
npm run dev
```

Before committing a content, code, route, or public-asset change, run:

```bash
npm test
npm run check:pages
npm run lint
git diff --check
```

What these checks cover:

- `npm test` builds the OpenAI Sites/vinext target and runs rendered HTML tests.
- `npm run check:pages` creates the static `out/` export, confirms required
  routes/assets, and checks Cloudflare Pages output limits.
- `npm run lint` checks source quality.
- `git diff --check` catches whitespace and malformed patch output.

Documentation-only changes do not need a site rebuild unless they also affect
served content or deployment configuration.

## 10. Publishing workflow

### Primary: GitHub and Cloudflare Pages

The GitHub `main` branch is the source of truth. Cloudflare Pages automatically
builds it with:

| Setting | Value |
|---|---|
| Production branch | `main` |
| Build command | `npm run build:pages` |
| Output directory | `out` |
| Root directory | `/` |

For a website change:

1. Validate locally.
2. Commit only the intended files.
3. Push `main` to GitHub.
4. Wait for the Cloudflare production deployment to succeed.
5. Verify the affected routes and assets at `https://chotchuang.uk`.

Do not change Cloudflare DNS for normal deployments. If the domain briefly
serves an older page or a cached 404 after a successful deployment, verify the
new deployment URL first, then purge only the affected Cloudflare cache entries
or use a full purge when necessary.

### Fallback: OpenAI Sites

Because `.openai/hosting.json` exists, agents with the Sites capability must
follow the `sites-building` and `sites-hosting` instructions.

For a deployable website change:

1. Build and validate the exact source.
2. Commit it and push the same branch-head commit to the existing Sites source
   repository using a short-lived per-command credential.
3. Never expose the credential or store it in a Git remote URL/config.
4. Package the validated build using the Sites `package-site.sh` helper.
5. Save one Sites version using the exact pushed commit SHA.
6. Obtain the required approval before a public/shared production deployment.
7. Deploy only the saved version and poll until the deployment succeeds.
8. Verify the fallback URL and key public assets.

Never call `create_site` for this repository: reuse the existing
`.openai/hosting.json` project.

## 11. Live verification checklist

After a production content or asset deployment, verify at minimum:

- `/`
- `/project`
- one changed `/project/<slug>` page
- `/files/`
- each newly added PDF, Excel, or HTML work-file URL
- `/og.png`
- `/robots.txt`
- `/sitemap.xml`
- the displayed email is `chotchuang.cc@gmail.com`
- `www.chotchuang.uk` redirects to the apex domain

For downloadable files, confirm status `200`, a non-empty response, and an
appropriate content type when the host provides one. Some static hosts may
serve `.xlsx` as `application/octet-stream`; a successful non-empty download is
acceptable.

## 12. Change-management rules

- Preserve unrelated user changes in a dirty worktree.
- Never commit credentials or temporary deployment archives.
- Do not rewrite Git history or delete deployments without explicit approval.
- Prefer one reviewed push over many small pushes because each watched push may
  consume a Cloudflare build.
- Keep `package-lock.json` in sync with `package.json`.
- **Commit message (U-04, mandatory):** Before every owner-requested commit, ask
  the owner to write the exact commit message and wait for it, unless the owner
  already supplied the exact message in the same request. Use the owner's text
  verbatim; do not silently rewrite, expand, or replace it.
- **Automated-message fallback:** Use an agent-authored commit message only when
  the owner has explicitly authorized automatic commits or a pre-authorized
  automation cannot pause for input. The message must be a neutral,
  internationally understandable description of the technical change. It must
  not mention recruiters, HR, job applications, AI/ChatGPT, agents, prompts,
  handoffs, internal workflow, or build-skip instructions. Do not include
  proprietary BlueX formulas or strategy details. Suitable patterns include
  `feat: add project evidence files`, `docs: update site documentation`, and
  `fix: correct project metadata`.
- Never rewrite an existing public commit message or force-push history without
  the owner's separate explicit approval.
- Update this guide whenever the hosting architecture, domain, work email,
  validation workflow, or public-file policy changes.

When in doubt, protect private material and ask the owner before publishing it.
