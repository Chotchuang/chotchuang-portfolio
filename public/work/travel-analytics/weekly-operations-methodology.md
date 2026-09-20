# Methodology and Limitations — Project 3

## What this project is

A **portfolio workflow demonstration** that binds verified Project 1 and Project 2 artifacts into a weekly-style operating package. It is practice for how product ops might read content + funnel + experiment signals together — not a live Agoda ops report.

Analogy: a flight checklist binder. Useful for rehearsing the Monday review; it is not yesterday’s real airline traffic log.

## Method

1. Read committed P1 scoring / impact / RICE backlog artifacts (public + derived + proxy).
2. Read committed P2 funnel + experiment readout artifacts (synthetic + simulated).
3. Validate required fields; reconcile to the fixed headline numbers for this portfolio cut.
4. Load the newest compatible committed reference snapshot strictly before `--report-date` (read-only).
5. Compute traffic lights and optional **illustrative simulated WoW** deltas.
6. Write only the eight allowed recruiter outputs. Never write snapshots. Never call P1/P2 phase scripts.

## Truth labels travel with the numbers

P3 may format and juxtapose upstream figures, but it may not upgrade them:

- P1 below-threshold rates stay **derived**.
- P1 8,908 stays a **modelled review proxy**.
- P2 sessions/events/purchases/CVR stay **synthetic**.
- P2 ship decision and rates stay **simulated**.

## WoW discipline

Week-over-week here compares demonstration snapshots only. If no compatible prior exists, report **WoW unavailable**. Do not invent a prior week to make the chart look complete.

## Timing claim

`TA-P3-002` (automation timing-save claim) remains **unavailable**. It is omitted from README, badges, reports, dashboard and source comments. No replacement benchmark is invented.

## Segments and rollout

Exploratory P2 device cuts cannot override `DO_NOT_SHIP`. This package does not recommend a segmented or device-specific rollout.

## Limitations

- Not Agoda production performance, staffing, or channel process.
- Owners / `#product-ops` are simulated workflow labels.
- P2 THB fields are simulated proxies if retained for lineage; they do not justify actions.
- Clean clones without P1/P2 artifacts fail closed with `missing-data:` — they do not fabricate inputs.
- Recruiter package repeatability depends on identical inputs + explicit `--report-date`, not the system clock.
