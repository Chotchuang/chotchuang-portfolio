# Weekly Ops Kit diagram notes

**From:** Cursor (local)
**For:** Codex (composition · visual system · optional page wiring · deploy after `PUBLISH_APPROVAL`)
**As-of:** 2026-09-20
**Lane:** Weekly Ops Report Kit (Runnable kit) + Travel portfolio arc (source story)

---

## 1. Job for Codex

Take the **Mermaid sources** in this pack and turn them into **web-ready visuals** on the portfolio (or a kit subpage):

1. Choose layout density (one diagram per section; do not stack more than two above the fold).
2. Apply the existing `chotchuang-portfolio` visual system (typography, spacing, dark/light as already used on project pages).
3. Render Mermaid → SVG/PNG **or** keep client-side Mermaid if the site already supports it; prefer static SVG for reliability on `/project/…`.
4. Label every figure with **truth class** (sample / public / synthetic / simulated / derived).
5. **Do not deploy** until owner sets `PUBLISH_APPROVAL`.

Cursor owns: diagram source + claims language in this pack.
Codex owns: composition, format polish, page placement, deploy verification.

---

## 2. Suggested page IA (one scroll story)

| Section | Diagram | Hook (plain) |
|---------|------------|--------------|
| Why this exists | Portfolio vs reusable kit | เว็บโชว์สกิล ≠ กล่องที่คนอื่นรันได้ |
| Data pipeline | Data to report | ใส่ตัวเลข → เทียบ → ได้รายงาน |
| Run steps | Weekly run steps | ทุกขั้นของ `run_once.py` |
| Missing data | Stop on missing data | ไฟล์หาย = หยุด ไม่สร้างตัวเลขปลอม |
| Reuse | Use your data | เปลี่ยน 3 ไฟล์แล้วใช้ในโดเมนตัวเอง |
| Source story | Travel to reusable kit | งาน travel สามส่วนแล้วแยกเป็น kit |
| Report assembly | Weekly report assembly | ที่เย็บรายงานจากงาน content และ funnel |
| Publish | Publish handoff | Owner → Codex ก่อนขึ้น live |
| Content quality | Content quality workflow | Score → RICE → ops playbook |
| Funnel experiment | Funnel experiment workflow | Funnel → simulated A/B → decision |

Primary CTA on page: link to `USE_THIS_KIT.md` / public repo (when published) — not only “I built this.”

---

## 3. Claims / disclosure (must stay on page)

- Kit sample metrics are **sample**, not Agoda production.
- Travel P1 = public + derived + modelled proxy; P2 = synthetic + simulated; P3 = derived weekly package.
- Kit does **not** invent metrics on `missing-data:` / `invalid-data:`.
- Chat “channel” labels are workflow labels, not live Slack bots.

---

## 4. Source files

| File | Contents |
|------|----------|
| [diagram-notes.md](diagram-notes.md) | This brief |
| [diagrams/kit-vs-showcase.mmd](diagrams/kit-vs-showcase.mmd) | Showcase vs runnable kit |
| [diagrams/data-to-report.mmd](diagrams/data-to-report.mmd) | Kit data pipeline |
| [diagrams/weekly-run-steps.mmd](diagrams/weekly-run-steps.mmd) | Step workflow |
| [diagrams/stop-on-missing-data.mmd](diagrams/stop-on-missing-data.mmd) | Error path |
| [diagrams/use-your-data.mmd](diagrams/use-your-data.mmd) | Reuse path |
| [diagrams/travel-to-reusable-kit.mmd](diagrams/travel-to-reusable-kit.mmd) | Three travel workstreams → kit |
| [diagrams/weekly-report-binder.mmd](diagrams/weekly-report-binder.mmd) | Weekly report assembly |
| [diagrams/publish-handoff.mmd](diagrams/publish-handoff.mmd) | Agent handoff before deploy |
| [diagrams/content-quality-workflow.mmd](diagrams/content-quality-workflow.mmd) | Content quality workflow |
| [diagrams/funnel-experiment-workflow.mmd](diagrams/funnel-experiment-workflow.mmd) | Funnel experiment workflow |
| [diagrams/all-diagrams.md](diagrams/all-diagrams.md) | All Mermaid in one preview file |

Local kit root: `/Users/cc/Documents/Projects/weekly-ops-report-kit/`
Paste prompt: `/Users/cc/Documents/Projects/agent-command-center/prompts/NEXT_CODEX_PROMPT_WEEKLY_OPS_KIT.md`

---

## 5. Acceptance for Codex (pre-deploy)

- [ ] Each diagram renders and is readable on desktop + mobile width
- [ ] Captions include truth-class where data is shown
- [ ] No claim that kit = live Agoda ops or live Slack automation
- [ ] Page links to how to run (`USE_THIS_KIT`) not only screenshots
- [ ] Owner `PUBLISH_APPROVAL` recorded before production

---

## 6. Out of scope this pack

- Pushing a new public GitHub remote (owner/Codex when ready)
- Rewriting BlueX / HPG lanes
- Inventing impact numbers beyond sample artifacts
