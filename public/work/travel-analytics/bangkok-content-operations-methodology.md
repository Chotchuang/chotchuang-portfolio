# Methodology and Limitations — Project 4

## What this project is

A **public-source operations analogue** for Bangkok accommodation content: Inside Airbnb listings + a bounded OSM accommodation extract, a provisional Listing Readiness Score, issue triage, entity-match **review candidates**, and a **deterministic simulated** ticket/SLA layer for portfolio demonstration.

Analogy: a flight simulator for content ops — useful for practising triage and queue design; it is not yesterday’s real airline (or Agoda) traffic.

## Method

1. Validate and standardize a public Bangkok listing snapshot (2026-06-29).
2. Score provisional Listing Readiness (0–100) from explainable field components.
3. Detect content/metadata issues and rank them with a demand-weighted **priority proxy**.
4. Propose OSM entity-match candidates via 1 km spatial blocking + normalized-name similarity.
5. Attach a deterministic simulated ticket/SLA/weekly backlog layer labelled `is_simulated = true`.
6. Publish offline dashboard + decision/executive artifacts. Recruiter package reconciles committed artifacts only — no download.

## Truth classes

| Layer | Class | Must say |
|---|---|---|
| Listings / OSM tags | Public source | Airbnb OTA analogue; not Agoda inventory |
| Readiness score / below-70 rate / issues | Derived | Triage framework; not property quality, conversion, or booking score |
| Priority ranking | Derived proxy | Review activity is a **demand proxy** — not revenue/bookings/causal uplift |
| Entity matches | Heuristic candidates | No precision/recall; no auto-merge until labelled sample |
| Tickets / SLA / weekly KPI | Deterministic simulation | Not real team, channel, or SLA performance |

## Entity matching

Confidence mixes name similarity (65%) and proximity within 1 km (35%). Statuses are `manual_review` or `high_confidence_review` only. See `docs/ENTITY_MATCH_EVALUATION_PLAN.md` — evaluation is **planned**, not completed.

## Priority sensitivity

Severity weights are working assumptions. The recruiter package compares baseline vs an alternate weight map on synthetic fixtures and reports top-queue overlap as a **sensitivity diagnostic**, not measured impact.

## Limitations

- Raw listings/OSM extracts are gitignored; clean clones fail source-contract checks with `missing-data:` (expected).
- Simulated open backlog / critical open / SLA attainment illustrate workflow design only.
- OSM completeness varies; candidates remain human-reviewed.
- Do not claim Agoda operations, bookings, revenue, causal impact, entity-match precision/recall, or real SLA performance.
