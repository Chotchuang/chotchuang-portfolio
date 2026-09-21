# Methodology and Limitations — Project 2

## What this project is

A **synthetic** OTA clickstream plus a **simulated** A/B test of a review-prominence badge on Bangkok PDP sessions. It demonstrates funnel SQL, experiment design and readout discipline for a portfolio — not Agoda production analytics.

Analogy: a flight simulator. Useful for practicing decisions; it is not yesterday’s real airline traffic.

## Method

1. Generate session-level events linked to Project 1 listing IDs (synthetic).
2. Analyze funnel transitions with DuckDB SQL.
3. Pre-register design assumptions (α, power, relative MDE, sample size).
4. Simulate assignment and compute two-proportion z-test on PDP CVR.
5. Check guardrails (bounce **proxy**, AOV) and issue ship / iterate / do-not-ship.

## Project 1 association is hypothesis fuel only

Project 1 showed content score **associates** with review volume. That motivates the badge hypothesis. It does **not** establish that changing PDP UI **causes** more bookings. Causal claims need a real experiment on production traffic.

## Power and uncertainty

Design requires **339,614** PDP sessions for 80% power at 5% relative MDE. This simulation uses **14,417** BKK PDP sessions — underpowered versus design. Wide confidence intervals are expected; non-significance here is not proof of zero effect in a powered test.

## Guardrails and proxies

- Bounce check uses a **proxy** (PDP without date select), not a product bounce definition.
- THB figures are simulated session revenue proxies — never realised GMV.
- If a guardrail cannot be calculated → `unavailable` (does not pass).

## Segments

Device cut readouts are exploratory and face multiple-testing risk. They cannot override the primary decision.

## Limitations

- Synthetic data ≠ Agoda or any live marketplace.
- Simulated treatment effect path is illustrative.
- Design days-to-power (239) is a planning assumption, not a calendar commitment.
- Tableau HTML remains an archival asset; the case dashboard is the primary reference for this contract.
