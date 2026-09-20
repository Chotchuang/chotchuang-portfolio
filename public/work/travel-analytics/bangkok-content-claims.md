# Recruiter Claims — Project 4

Use only the statements below in recruiter-facing materials. Keep truth labels adjacent to every figure.

## Claim sheet

| ID | Claim (exact intent) | Evidence class | Denominator / grain | Primary artifact | Allowed wording | Forbidden wording |
|---|---|---|---|---|---|---|
| TA-P4-001 | 31,069 public-source Bangkok listings | public source | listing · snapshot 2026-06-29 | `output/metrics.json`, `output/validation_report.md` | “31,069 Inside Airbnb Bangkok listings (snapshot 2026-06-29); OTA analogue, not Agoda data” | “Agoda inventory of 31,069”, “our supply base” |
| TA-P4-002 | 14,551 listings (46.8%) below provisional Listing Readiness Score 70 | derived | 14,551 / 31,069 · threshold 70 | `output/decision_readout.md`, `output/metrics.json` | “14,551 (46.8%) below provisional readiness threshold 70” with triage caveat | “half of properties are poor quality”, conversion/booking score language |
| TA-P4-003 | Ticket owner, state, SLA and resolution fields illustrate workflow | **simulated** | issue/ticket and week | `DATA_AND_METRIC_CONTRACT.md`, `output/metrics.json` | “Deterministic simulated ticket/SLA layer (e.g. open backlog 13,178; critical open 896; SLA 21.73%)” with **simulated** label | “real SLA”, “team performance”, “production ops KPI” without simulation label |

## Supporting disclosures (always adjacent)

1. Public Airbnb Bangkok source snapshot; OTA industry analogue, not Agoda data.
2. Ticket/SLA/owner fields are deterministic workflow simulations.
3. Priority proxy uses review activity as a demand proxy; it is not bookings or revenue.
4. Entity matches are review candidates; no automated merges are asserted.

## Non-claims (blocked)

- Agoda production data, company workflow, or workplace SLA.
- Bookings, revenue, GMV, or causal conversion uplift from content fixes.
- Entity-match precision, recall, calibrated probability, or auto-merge permission.
- Treating priority-proxy sensitivity overlap as measured business impact.

## Inspection path

1. `DATA_AND_METRIC_CONTRACT.md`
2. `docs/METHODOLOGY_AND_LIMITATIONS.md`
3. `docs/ENTITY_MATCH_EVALUATION_PLAN.md`
4. `output/recruiter_evidence_check.md`
5. `output/priority_sensitivity.md`
6. `output/dashboard.html` (offline portable artifact — do not treat chart SLA as real ops)
