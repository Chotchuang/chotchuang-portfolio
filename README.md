# Chotchuang — Decision-Focused Portfolio

Business analytics, product operations, fintech, and data systems presented
through decisions, evidence, and clearly stated limitations.

**[View the live portfolio](https://chotchuang.uk)** ·
**[Browse all projects](https://chotchuang.uk/project/)** ·
**[Open work files](https://chotchuang.uk/files/)**

## Selected cases

### [Travel Product & Supply Analytics](https://chotchuang.uk/project/travel-product-analytics/)

Four connected cases covering content quality, conversion experiments, weekly
operations, and supply-readiness prioritization. Uses public sources, derived
metrics, synthetic clickstream data, and simulated workflows with explicit
limitations.

### [Merchant Growth & Fintech Profitability](https://chotchuang.uk/project/merchant-growth-fintech/)

A reproducible decision system for merchant acquisition, retention, campaign
economics, wallet adoption, contribution margin, and financing guardrails.
Built with deterministic synthetic data.

### [E-commerce Growth & Commercial Strategy](https://chotchuang.uk/project/ecommerce-growth/)

SQL analysis, commercial recommendations, and an editable planning model for
channel quality, conversion, product mix, refunds, and budget allocation.

## Current builds

- [BlueX investment intelligence](https://chotchuang.uk/project/bluex/) — a sanitized research interface; in progress and not trading advice.
- [Daily Intel Hub](https://chotchuang.uk/project/daily-intel-hub/) — a recurring decision-brief workflow in active development.

Earlier coursework, concepts, and focused research remain available in the
[project library](https://chotchuang.uk/project/) as supporting work.

## Evidence standard

Every case states the decision, data type, methods, evidence, and limitations.
Public-source, derived, proxy, synthetic, simulated, concept, and in-progress
work are kept distinct. Simulated or proxy outcomes are never presented as
real commercial impact.

## Run locally

Requirements: Node.js `22.16.0` and npm.

```bash
npm ci
npm run dev
```

Before a release:

```bash
npm run check:release
```

The static output is written to `out/` for Cloudflare Pages.
