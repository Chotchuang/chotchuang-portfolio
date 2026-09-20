# Executive One-Pager — Conversion Funnel & A/B Experiment

**Date:** 2026-08-10 | **Market:** Bangkok OTA (simulated sessions, n=25,000)

---

## PROBLEM
Mobile PDP sessions show high drop-off before checkout. We lack evidence that **review prominence** on PDP improves conversion — Project 1 showed content quality correlates with reviews, but not demand-side impact.

## FUNNEL HEALTH
| Metric | Value |
|--------|-------|
| Overall CVR | **2.89%** |
| PDP CVR | **3.62%** |
| Revenue per session | **57.76 THB** |
| Largest absolute leak | view_listing → select_dates |

## EXPERIMENT RESULT (Review badge on PDP)
| Metric | Control | Treatment | Uplift |
|--------|---------|-----------|--------|
| PDP CVR | 3.64% | 3.66% | **+0.69%** relative |
| p-value | — | — | **0.93612** |
| **Decision** | — | — | **DO_NOT_SHIP** |

## ACTION
1. **DO_NOT_SHIP** per rollout recommendation
2. If ship: roll out to BKK mobile first; monitor guardrails 7 days
3. Pair with Project 1 content upgrades on high-RICE listings for compound lift

## ASK
Approve experiment decision and allocate 1 analyst day/week for funnel monitoring dashboard.

---
_Synthetic OTA clickstream linked to Project 1 Bangkok listings. Methodology mirrors Agoda experimentation workflow._
