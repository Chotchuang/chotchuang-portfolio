# Methodology and Limitations — Project 1

## What this project measures

An explainable **Content Quality Score** (0–100) on public Bangkok listing fields, plus statistical association checks and an ops prioritization layer (RICE + segment playbooks).

Analogy: a restaurant health checklist — useful for triage, not a guarantee of tonight’s revenue.

## Method (high level)

1. Clean Inside Airbnb Bangkok listings (price bounds, derived word/amenity counts).
2. Score four components with documented targets and working-assumption weights (sum 100).
3. Compare high vs low tiers (t-tests) and fit a log-review regression holding price constant.
4. Estimate review-gap uplift for below-threshold listings and rank by RICE.
5. Publish SOP / KPI / experiment proposal for ops use.

## Association vs causal impact

| Observed | What it means | What it does **not** mean |
|---|---|---|
| High-content listings have higher median reviews (16 vs 0) | Association in a cross-section | Editing content **causes** more bookings |
| +10 score points ↔ ~77% more reviews in regression (R² ≈ 0.45) | Correlational model fit | Guaranteed lift from a content sprint |
| 8,908 top-50 uplift | **Modelled review proxy** under Phase-4 assumptions | Observed yearly reviews or GMV |

Causal claims require a pre-registered experiment or credible quasi-experiment with content-change timestamps and booking outcomes — not available in this public snapshot.

## Denominators and missingness

- Portfolio denominator for below-threshold rate: **23,233** scored listings.
- Host response missing (~11.8% after clean): component scores 0 and is flagged; not treated as proven “bad host.”
- Review rating nulls are common at zero reviews; scoring uses `number_of_reviews`, not rating.

## Score weights are working assumptions

Baseline weights (35 / 25 / 20 / 20) follow the documented photo-weight redistribution. Sensitivity analysis recomputes scores under alternative weights that also sum to 100 and reports below-threshold rate, tier-change rate, rank correlation, and segment rates **with sample sizes**. Weights are not an Agoda standard.

## Limitations

- Word count ≠ writing quality; amenity count ≠ amenity accuracy.
- Review volume is a demand **proxy**, not bookings or revenue.
- Dataset is Airbnb Bangkok, not Agoda inventory.
- Revenue opportunity THB figures are occupancy-gap × price proxies — not GMV.
- Snapshot dated **2025-09-26**; results are not live production metrics.

## Production evidence needed before acting on impact

- Impressions, booking outcomes, and content-change event timestamps.
- Stable property IDs across content and commercial systems.
- Pre-registered A/B or interrupted time-series design for content interventions.
