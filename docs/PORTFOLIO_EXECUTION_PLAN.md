# Portfolio Execution Plan

**Purpose:** raise the portfolio from a strong collection of projects to a recruiter-friendly proof system for Analytics & Growth, Product Operations, and Strategy / Fintech roles.

**Principle:** a recruiter should be able to understand the business decision, inspect credible evidence, and see the boundary of the claim within one to two minutes. A new project is lower priority than making existing proof easy to inspect.

## Current baseline

- 16 project pages are published.
- 11 projects are marked Complete, two In progress, and three Concept.
- 30 work files are publicly linked.
- The strongest evidence-led cases are Merchant Growth & Fintech Profitability, Travel Product & Supply Analytics, and E-commerce Growth & Commercial Strategy.

## Delivery order

### Phase 1 — Make the three lead cases easier to choose

**Owner:** portfolio implementation

Create three clear role paths from the home page and project archive:

| Role path | Lead cases | What the reader should infer |
| --- | --- | --- |
| Analytics & Growth | Merchant Growth, E-commerce Growth | I can turn customer, channel, and unit-economics data into commercial decisions. |
| Product Operations | Travel Product & Supply Analytics | I can prioritize operational problems, test changes, and run a measurable cadence. |
| Strategy & Fintech | Merchant Growth, BlueX, Financial CRM | I can structure decisions, build analytical systems, and communicate risk boundaries. |

For each lead page, put this order near the top: **decision → evidence → recommendation → data limitation**. Do not add unsupported outcome claims.

**Done when:** a visitor can select a relevant role path in one click and land on a case whose primary evidence is visible without searching through the full archive.

### Phase 2 — Close the two evidence gaps

**Owner input required before a public version can be made:**

1. [Blockchain Remittance deck brief](owner-inputs/blockchain-remittance-deck-brief.md)
2. [Retail Rewards visual brief](owner-inputs/retail-rewards-visual-brief.md)

These cases remain in the archive, but should not be used as lead proof until their supporting files are prepared and reviewed. The goal is a faithful, sanitized portfolio version—not a reconstructed or embellished history.

**Done when:** each case has one public file, a short evidence summary, and an explicit scope statement.

### Phase 3 — Strengthen supporting technical proof

| Case | Next deliverable | Skill demonstrated | Important boundary |
| --- | --- | --- | --- |
| Financial CRM | Query-results walkthrough or short demo | SQL design, constraints, reporting | Coursework, not workplace CRM ownership |
| Restaurant Data Model | One-page data-governance summary | 3NF, modeling, privacy-aware design | Assignment; do not invent production scale |
| Hotel Analyzer | Short README-style use-case and test result summary | Python, data cleaning, testing | CLI coursework project |
| GYF Adblocker | Updated executive one-pager | research framing, experimentation, strategy | Educational case, not company results |
| Daily Intel Hub | Runnable public-safe end-to-end sample | automation architecture and quality controls | Keep incomplete components visibly In progress |

### Phase 4 — Keep research and concepts credible

- **BlueX:** show only public-safe workflow, validation process, governance, and interface outcomes. Never publish formulas, parameters, features, signal recipes, raw trade data, or instructions that permit trade replication.
- **AI in Trading and Diversification:** present as historical or educational research, never investment advice or performance proof.
- **Agentic FinOps, Digital Health, Booking Automation:** retain Concept labels until a runnable prototype or evaluated output exists.

## Owner-to-public workflow for decks, PDFs, and visuals

1. Use the relevant brief in `docs/owner-inputs/` to create or locate the original material.
2. Send the source file plus any context needed to understand it. Do not send confidential client data, credentials, or proprietary BlueX research.
3. The portfolio version will be reviewed for claim accuracy, privacy, legibility, disclosure wording, and recruiter relevance.
4. Only then create the public version, add it to the project record, validate the site, and publish it.

## Public-file quality gate

Every public asset must answer the following before it is linked:

- What decision or question did this work address?
- What did I personally do?
- What data was used: observed, public, synthetic, or simulated?
- What is the strongest inspectable evidence?
- What should not be inferred from the result?
- Is every number, company name, and result defensible from the source?
- Does it exclude personal data, credentials, confidential material, and BlueX signal logic?

## Recommended sequence of future work

1. Implement Phase 1 role paths and lead-case skim structure.
2. Receive the Blockchain Remittance source deck and prepare its public case.
3. Receive the Retail Rewards source visualization/data and prepare its public case.
4. Add the Financial CRM walkthrough.
5. Add the GYF executive one-pager.
6. Build one runnable, public-safe Daily Intel Hub sample.

Do not start a new concept project before items 1–3 are complete.
