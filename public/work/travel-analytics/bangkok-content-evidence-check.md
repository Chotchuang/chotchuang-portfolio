# Recruiter evidence check — Project 4

**Overall:** PASS

Evidence class: **public** Airbnb/OSM source + **derived** readiness/priority + **simulated** ticket/SLA workflow.
Not Agoda inventory, not bookings/revenue, not causal impact, not labelled entity-match precision/recall.

## Fixed headline reconciliation

- Listings: 31,069 (public source · snapshot 2026-06-29)
- Below provisional 70: 14,551 / 46.8% (derived)
- Simulated open backlog / critical open / SLA: 13,178 / 896 / 21.73% (**simulated workflow**)

## Claims

- **TA-P4-001:** 31,069 public-source Bangkok listings (snapshot 2026-06-29; Airbnb OTA analogue)
- **TA-P4-002:** 14,551 / 46.8% below provisional Listing Readiness Score 70 (derived triage)
- **TA-P4-003:** Ticket owner/state/SLA/resolution illustrate simulated workflow only

## Checks

| Check | OK | Detail |
|---|---|---|
| listings_31069 | True | properties=31069 expected 31069 |
| below_threshold_14551_46_8pct | True | below_target=14551 rate=0.4683 expected 14551 / 0.4683 |
| source_snapshot_2026_06_29 | True | source_snapshot=2026-06-29 |
| provisional_threshold_70 | True | decision readout must state provisional threshold 70 |
| simulated_backlog_labelled | True | open_backlog=13178 layer=deterministic synthetic workflow data; source content remains real |
| simulated_critical_and_sla | True | critical_open=896 sla=0.2173 |
| agoda_disclosure | True | public artifacts must disclose 'not Agoda' |
| demand_proxy_label | True | public artifacts must disclose 'demand proxy' |
| simulated_label | True | public artifacts must disclose 'simulated' |
| entity_candidate_label | True | public artifacts must disclose 'candidate' |
| no_forbidden_claimed_entity_match_precision | True | forbidden claim language must stay out of decision/executive: precision of our entity |
| no_forbidden_claimed_entity_match_recall | True | forbidden claim language must stay out of decision/executive: recall of our entity |
| no_forbidden_asserted_auto_merge | True | forbidden claim language must stay out of decision/executive: auto-merged without review |
| no_forbidden_real_sla_performance | True | forbidden claim language must stay out of decision/executive: demonstrates real SLA performance |
| no_forbidden_agoda_supply_performance | True | forbidden claim language must stay out of decision/executive: Agoda supply performance |
| no_forbidden_causal_booking_lift | True | forbidden claim language must stay out of decision/executive: causal booking lift |
| dashboard_offline_no_cdn | True | dashboard must not load remote/CDN resources (svg xmlns w3.org ignored) |
| dashboard_label_source_airbnb | True | expected one of ('Inside Airbnb Bangkok', 'Airbnb Bangkok') |
| dashboard_label_simulated_workflow | True | expected one of ('Simulated content operations workflow', 'Deterministic synthetic') |
| dashboard_label_entity_candidates | True | expected one of ('candidate', 'human review') |

## Required disclosures

1. Public Airbnb Bangkok source snapshot; OTA industry analogue, not Agoda data.
2. Ticket/SLA/owner fields are deterministic workflow simulations.
3. Priority proxy uses review activity as a demand proxy; it is not bookings or revenue.
4. Entity matches are review candidates; no automated merges are asserted.
