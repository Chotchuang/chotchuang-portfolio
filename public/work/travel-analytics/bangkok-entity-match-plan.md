# Entity-Match Evaluation Plan — Project 4

**Status:** Plan only. **No labelled sample exists today.** Therefore this portfolio case reports **zero** precision, recall, F1, or calibrated match probability, and **forbids auto-merge**.

## Goal

Estimate how often the 1 km spatial-block + normalized-name heuristic proposes the correct OSM accommodation element for an Inside Airbnb listing, and set an abstention / auto-merge policy only after labels exist.

## Population and sampling

| Stratum | Why | Target sample (illustrative) |
|---|---|---|
| High-confidence review (`match_confidence` ≥ 0.78) | Stress false merges if automation were considered | ~100 pairs |
| Mid-confidence manual review (0.52–0.78) | Typical queue mix | ~150 pairs |
| Near-miss name disagreement (high proximity, low name similarity) | Catch brand/alias failures | ~50 pairs |
| Near-miss distance disagreement (similar name, near 1 km boundary) | Catch spatial-block leakage | ~50 pairs |
| Unmatched listings with an OSM neighbour inside 1 km | Estimate missed links (recall pressure) | ~50 listings |

Draw a stratified random sample from committed `entity_matches` plus a spatial neighbour draw for unmatched listings. Freeze the sample IDs before labelling.

## Labelling protocol

1. **Two independent human labelers** review each pair (or listing) with map context, names, and addresses when available.
2. Labels: `same_entity` · `different_entity` · `abstain_insufficient_evidence`.
3. **Adjudication:** a third reviewer resolves disagreements; abstentions stay abstentions.
4. Labelers must not see the model’s `match_status` string during primary labelling (confidence band may be used only for sampling).

## Metrics to report (after labels exist)

| Metric | Definition | Use |
|---|---|---|
| Coverage | Share of listings with ≥1 candidate under current thresholds | Queue design |
| Precision @ band | `same_entity` / labelled candidates in each confidence band | Thresholding |
| Recall (proxy) | Among labelled true links in the neighbour sample, share recovered as candidates | Missed-link risk |
| False-positive cost | Estimated human minutes × FP rate if a band were auto-merged | Policy |
| Abstention rate | Share labelled `abstain_insufficient_evidence` | Safety |

## Policy until labels exist

- Every match remains a **review candidate**.
- Allowed statuses: `manual_review`, `high_confidence_review` only.
- **No auto-merge**, no “probability of match”, no published precision/recall.
- Recruiter materials must say evaluation is pending.

## Exit criteria for any future automation pilot

1. Labelled sample meets the stratum minimums above.
2. Precision in the proposed auto-merge band meets a pre-registered floor.
3. False-positive cost and partner/support guardrails are accepted by the simulated ops owner role.
4. Abstention/auto-merge policy is written and versioned beside the matcher.
