# Bangkok Accommodation Content Operations — Executive Report

## Executive Summary

- **Listing readiness needs systematic triage.** 14,551 of 31,069 Bangkok listings (46.8%) score below the provisional 70/100 operating threshold.
- **The largest detected gap is `thin_description`.** It contributes 27,113 issues across 27,113 properties, so a standardized partner prompt or automated validation should precede manual cleanup.
- **Geographic prioritization matters.** `Bueng Kum` has the highest below-target rate among districts with at least 100 listings (83.3%, n=257).
- **Entity matching is a review aid, not truth.** 8,095 Inside Airbnb–OSM candidate pairs passed the minimum confidence threshold; 213 are high-confidence review candidates. No candidate is auto-merged because no labelled ground-truth set is available.

## The content gap is operationally large

The average **Listing Readiness Score** is **67.6/100**. The provisional model gives separate credit for core description, commercial fields, discovery metadata, and trust signals, which makes every listing score explainable and actionable. It measures field readiness rather than property quality or conversion likelihood, and should be calibrated with product outcomes before any production policy use.

## Prioritize fixes by impact, not issue count

The operations queue combines issue severity with demand proxies (`reviews_per_month` and historical review volume) and the listing's readiness gap. This prevents a large but low-priority cleanup category from consuming the entire queue. The resulting *priority proxy* is a ranking hypothesis, not measured business impact. The output preserves the reason, severity, owner, status, due date, proposed resolution path, and action needed for execution.

## Recommended next steps

1. **Launch a two-week pilot** on the top 250 rows in `priority_operations_queue.csv`, separating automated prompts from manual partner outreach.
2. **Validate the score against product outcomes** using impression → property-page → checkout → booking conversion, with price, location, supply, and review volume as controls.
3. **Create a labelled entity-match validation sample:** use confidence bands to order review, measure precision/recall, then set any future auto-merge rule only after a threshold is validated.
4. **Track weekly operating KPIs:** backlog, critical backlog, SLA attainment, automation rate, reopen rate, and verified quality lift.
5. **Run an experiment** on one issue family, measuring content completion, conversion, partner effort, and customer-contact guardrails.

## Further Questions

- Which missing fields have the highest causal impact on conversion rather than only correlation with mature listings?
- Does the quality target need to vary by property type, district, language, or supply segment?
- What precision/recall threshold creates the lowest total cost for entity matching plus human review?

## Caveats and Assumptions

- Listing content is from Inside Airbnb's public Bangkok snapshot dated 2026-06-29; it is an OTA analogue, not Agoda inventory.
- OSM completeness varies by place and contributor. Candidate matches require validation.
- Operations fields are explicitly simulated and deterministic. They demonstrate workflow design and must not be interpreted as company performance or real SLA results. Reported scenario figures (open backlog 13,178; critical open 896; SLA attainment 21.73%) stay **simulated**.
- Review activity is a **demand proxy**, not bookings or revenue. Impact rankings are prioritization hypotheses.
- Entity matches are review candidates; no automated merges are asserted and no precision/recall is published without labels.
