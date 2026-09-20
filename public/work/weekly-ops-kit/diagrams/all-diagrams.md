# All diagrams (preview)

Copy Mermaid blocks into a Mermaid live editor, or let Codex render to SVG for the site.
Canonical brief: [../diagram-notes.md](../diagram-notes.md)

---

## Portfolio vs reusable kit

```mermaid
flowchart TB
  subgraph SHOW["ชั้นโชว์บนเว็บ"]
    A1[Case study / screenshot] --> A2[Recruiter เชื่อว่าทำได้]
  end

  subgraph KIT["ชั้น Runnable kit"]
    B1[Sample หรือข้อมูลของคุณ] --> B2[config + run_once.py]
    B2 --> B3[รายงาน + brief + flags + lineage]
    B3 --> B4[คนอื่นดัดแปลงโดเมนตัวเองได้]
  end

  SHOW -.->|ไม่พอถ้าเป้าหมายคือ reuse| KIT
```

---

## Data to report

```mermaid
flowchart LR
  subgraph IN["Inputs"]
    C[config/kit_config.yaml]
    W1[current_week.json]
    W0[prior_week.json optional]
  end

  subgraph ENG["Engine"]
    L[load + schema check]
    X[compare targets + WoW]
    R[render report + brief]
  end

  subgraph OUT["Outputs"]
    O1[weekly_report_latest.md]
    O2[slack_brief_latest.txt]
    O3[anomaly_flags.json]
    O4[lineage.json]
  end

  C --> L
  W1 --> L
  W0 --> L
  L --> X --> R
  R --> O1
  R --> O2
  R --> O3
  R --> O4
```

---

## Weekly run steps

```mermaid
flowchart TD
  S0([scripts/run_once.py]) --> S1[อ่าน config]
  S1 --> S2[อ่าน current week]
  S2 --> S3{prior ครบ?}
  S3 -->|ใช่| S4[WoW deltas]
  S3 -->|ไม่| S5[WoW unavailable]
  S4 --> S6[เป้า + anomaly flags]
  S5 --> S6
  S6 --> S7[traffic lights → owners]
  S7 --> S8[เขียน output/]
  S8 --> S9([จบ])
```

---

## Stop on missing data

```mermaid
flowchart TD
  A[อ่านไฟล์] --> B{มีไฟล์?}
  B -->|ไม่| E1[missing-data]
  B -->|ใช่| C{parse + คีย์ครบ?}
  C -->|ไม่| E2[invalid-data]
  C -->|ใช่| D{metric ids ตรง config?}
  D -->|ไม่| E2
  D -->|ใช่| F[pipeline]
  E1 --> Z([หยุด — ไม่ invent])
  E2 --> Z
  F --> G([เขียน output])
```

---

## Use your data

```mermaid
flowchart TD
  U0([เปิด kit]) --> U1[copy sample → data/]
  U1 --> U2[แก้ current_week.json]
  U2 --> U3[แก้หรือข้าม prior]
  U3 --> U4[แก้ kit_config.yaml]
  U4 --> U5[run_once.py]
  U5 --> U6[รายงานโดเมนตัวเอง]
```

---

## Travel to reusable kit

```mermaid
flowchart LR
  P1["P1 public+derived+proxy"] --> P3["P3 derived binder"]
  P2["P2 synthetic+simulated"] --> P3
  P3 --> KIT["weekly-ops-report-kit BYO"]
```

---

## Weekly report assembly

```mermaid
flowchart TB
  A1[P1 artifacts] --> G1{ครบ?}
  A2[P2 artifacts] --> G1
  G1 -->|ไม่| G2[missing/invalid-data]
  G1 -->|ใช่| C1[collect] --> C2[prior] --> C3[WoW+flags] --> C4[report+brief+lineage]
```

---

## Publish handoff

```mermaid
sequenceDiagram
  participant O as Owner
  participant Cu as Cursor
  participant Co as Codex
  participant W as Website
  Cu->>O: Diagram pack ready
  O->>Co: Paste NEXT_CODEX prompt
  Co->>Co: Compose + format
  O->>Co: PUBLISH_APPROVAL
  Co->>W: Deploy + verify
```

---

## Content quality workflow

```mermaid
flowchart LR
  P0[Ingest] --> P2[Score] --> P3[Stats] --> P4[RICE] --> P5[Playbook] --> P6[Reports]
```

---

## Funnel experiment workflow

```mermaid
flowchart LR
  Q0[Generate] --> Q2[Funnel SQL] --> Q3[Design] --> Q4[Simulate A/B] --> Q5[Decision] --> Q6[Dashboard]
  Q6 --> DNS[DO_NOT_SHIP on this package]
```
