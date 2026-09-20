# Priority sensitivity — Project 4

Sensitivity diagnostic comparing baseline severity weights against an alternate map.
**Not** measured business impact, revenue, bookings, or causal uplift.

## Assumptions

Alternate scenario raises Critical weight 4→5 and lowers Medium 2→1.5. Reviews remain a demand proxy — not bookings, revenue, or causal uplift.

- Baseline weights: `{'Critical': 4.0, 'High': 3.0, 'Medium': 2.0, 'Low': 1.0}`
- Alternate weights: `{'Critical': 5.0, 'High': 3.0, 'Medium': 1.5, 'Low': 1.0}`

## Top-queue overlap

- Top N: 5
- Overlap count / rate: 5 / 100%
- Dropped from baseline top-N under alternate: none

Committed metrics.json documents portfolio totals only; full issue-level re-ranking from raw queues is out of scope for the artifact-only package.

_Sensitivity diagnostic only — not measured business impact, revenue, bookings, or causal uplift._
