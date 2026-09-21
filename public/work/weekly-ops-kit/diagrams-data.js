/* auto-generated from docs/diagrams/*.mmd — do not hand-edit */
const DIAGRAMS = [
  {
    "id": "kit-vs-showcase",
    "title": "Portfolio vs reusable kit",
    "caption": "เว็บโชว์สกิล vs กล่องที่คนอื่นรันซ้ำได้",
    "truth": "process — no metrics",
    "file": "kit-vs-showcase.mmd",
    "mermaid": "flowchart TB\n  subgraph SHOW[\"ชั้นโชว์บนเว็บ\"]\n    A1[Case study / screenshot] --> A2[Recruiter เชื่อว่าทำได้]\n  end\n\n  subgraph KIT[\"ชั้น Runnable kit\"]\n    B1[Sample หรือข้อมูลของคุณ] --> B2[config + run_once.py]\n    B2 --> B3[รายงาน + brief + flags + lineage]\n    B3 --> B4[คนอื่นดัดแปลงโดเมนตัวเองได้]\n  end\n\n  SHOW -.->|ไม่พอถ้าเป้าหมายคือ reuse| KIT\n\n  classDef muted fill:#f5f5f5,stroke:#999,color:#333\n  classDef accent fill:#e8f4ff,stroke:#336699,color:#123\n  class SHOW muted\n  class KIT accent\n"
  },
  {
    "id": "data-to-report",
    "title": "Data to report",
    "caption": "Inputs → validate → compare → render → outputs",
    "truth": "sample path uses data/sample",
    "file": "data-to-report.mmd",
    "mermaid": "flowchart LR\n  subgraph IN[\"Inputs\"]\n    C[config/kit_config.yaml<br/>targets · thresholds · owners]\n    W1[current_week.json<br/>metrics · highlights · actions]\n    W0[prior_week.json<br/>optional]\n  end\n\n  subgraph ENG[\"Engine\"]\n    L[load + schema check]\n    X[compare: targets + WoW]\n    R[render markdown + brief]\n  end\n\n  subgraph OUT[\"Outputs\"]\n    O1[weekly_report_latest.md]\n    O2[slack_brief_latest.txt]\n    O3[anomaly_flags.json]\n    O4[lineage.json]\n  end\n\n  C --> L\n  W1 --> L\n  W0 --> L\n  L --> X --> R\n  R --> O1\n  R --> O2\n  R --> O3\n  R --> O4\n"
  },
  {
    "id": "weekly-run-steps",
    "title": "Weekly run steps",
    "caption": "ทุกขั้นภายในคำสั่งเดียว",
    "truth": "process only",
    "file": "weekly-run-steps.mmd",
    "mermaid": "flowchart TD\n  S0([เริ่ม: scripts/run_once.py]) --> S1[อ่าน config YAML]\n  S1 --> S2[อ่าน current week JSON]\n  S2 --> S3{prior มีและครบ metric ids?}\n  S3 -->|ใช่| S4[โหลด prior + คำนวณ WoW deltas]\n  S3 -->|ไม่ / --no-prior| S5[ติดป้าย WoW unavailable<br/>ไม่สร้าง trend ปลอม]\n  S4 --> S6[เช็คเป้า KPI + ธง anomaly]\n  S5 --> S6\n  S6 --> S7[traffic lights → owner actions]\n  S7 --> S8[เขียน report + brief + flags + lineage]\n  S8 --> S9([จบ: ไฟล์ใน output/])\n"
  },
  {
    "id": "stop-on-missing-data",
    "title": "Stop on missing data",
    "caption": "ไฟล์หาย/ไม่ครบ = หยุด ไม่ invent ตัวเลข",
    "truth": "contract / process",
    "file": "stop-on-missing-data.mmd",
    "mermaid": "flowchart TD\n  A[อ่านไฟล์] --> B{ไฟล์มีจริง?}\n  B -->|ไม่| E1[missing-data: …<br/>exit ≠ 0]\n  B -->|ใช่| C{JSON/YAML parse ได้?<br/>คีย์จำเป็นครบ?}\n  C -->|ไม่| E2[invalid-data: …<br/>exit ≠ 0]\n  C -->|ใช่| D{metric ids ตรง config?}\n  D -->|ไม่| E2\n  D -->|ใช่| F[เดิน pipeline ต่อ]\n  E1 --> Z([หยุด — ไม่เขียนตัวเลขปลอม])\n  E2 --> Z\n  F --> G([เขียน output ตามจริง])\n"
  },
  {
    "id": "use-your-data",
    "title": "Use your data",
    "caption": "แก้ 3 ไฟล์แล้วใช้ในโดเมนตัวเอง",
    "truth": "process",
    "file": "use-your-data.mmd",
    "mermaid": "flowchart TD\n  U0([Clone / เปิดโฟลเดอร์ kit]) --> U1[คัดลอก data/sample → data/]\n  U1 --> U2[แก้ current_week.json<br/>ใส่ตัวเลขโดเมนตัวเอง]\n  U2 --> U3[แก้ prior_week.json<br/>หรือข้ามถ้ายังไม่มี]\n  U3 --> U4[แก้ kit_config.yaml<br/>เป้า · ธง · ชื่อเจ้าของ · ช่อง]\n  U4 --> U5[\"รัน: python scripts/run_once.py<br/>--current … --prior …\"]\n  U5 --> U6[ได้รายงานประจำสัปดาห์ของโดเมนนั้น]\n  U6 --> U7[วาง brief ในแชททีม / standup]\n"
  },
  {
    "id": "travel-to-reusable-kit",
    "title": "Travel to reusable kit",
    "caption": "P1 → P2 → P3 แล้วแยกเป็นแม่พิมพ์",
    "truth": "truth labels on nodes",
    "file": "travel-to-reusable-kit.mmd",
    "mermaid": "flowchart LR\n  P1[\"P1 Content quality<br/>truth: public + derived + proxy\"]\n  P2[\"P2 Funnel + A/B<br/>truth: synthetic + simulated\"]\n  P3[\"P3 Weekly binder<br/>truth: derived package\"]\n  KIT[\"weekly-ops-report-kit<br/>truth: sample / BYO metrics\"]\n\n  P1 -->|\"artifacts for binder\"| P3\n  P2 -->|\"artifacts for binder\"| P3\n  P3 -->|\"แนวคิดแยกเป็นแม่พิมพ์<br/>ไม่ผูก P1/P2\"| KIT\n"
  },
  {
    "id": "weekly-report-binder",
    "title": "Weekly report assembly",
    "caption": "คลิปชีต P1+P2 เป็นรายงานสัปดาห์",
    "truth": "derived weekly demo",
    "file": "weekly-report-binder.mmd",
    "mermaid": "flowchart TB\n  subgraph UP[\"Upstream artifacts\"]\n    A1[P1 scoring / RICE / tiers]\n    A2[P2 funnel / experiment readout]\n  end\n\n  subgraph P3[\"P3 Weekly Ops Report\"]\n    C1[collect_p1 + collect_p2]\n    C2[load prior snapshot]\n    C3[WoW compare + anomaly flags]\n    C4[report + Slack-style brief<br/>+ lineage + recruiter package]\n  end\n\n  subgraph GATE[\"Contract\"]\n    G1{artifacts ครบ?}\n    G2[missing-data / invalid-data]\n  end\n\n  A1 --> G1\n  A2 --> G1\n  G1 -->|ไม่| G2\n  G1 -->|ใช่| C1 --> C2 --> C3 --> C4\n"
  },
  {
    "id": "publish-handoff",
    "title": "Publish handoff",
    "caption": "จากการเตรียมหลักฐานสู่การเผยแพร่ที่ตรวจสอบได้",
    "truth": "governance",
    "file": "publish-handoff.mmd",
    "mermaid": "sequenceDiagram\n  participant O as Owner\n  participant R as Reviewer\n  participant W as Website\n\n  O->>R: Submit evidence package\n  R->>R: Check claims and presentation\n  R->>O: Release ready\n  O->>R: Approve publication\n  R->>W: Deploy and verify live URLs\n  R->>O: Production verified\n"
  },
  {
    "id": "content-quality-workflow",
    "title": "Content quality workflow",
    "caption": "Ingest → Score → RICE → Reports",
    "truth": "public + derived + proxy",
    "file": "content-quality-workflow.mmd",
    "mermaid": "flowchart LR\n  P0[Phase 0–1<br/>Ingest / clean] --> P2[Phase 2<br/>Score + tiers]\n  P2 --> P3[Phase 3<br/>Stats / association]\n  P3 --> P4[Phase 4<br/>RICE backlog]\n  P4 --> P5[Phase 5<br/>Ops playbook]\n  P5 --> P6[Phase 6<br/>Reports + dashboard]\n"
  },
  {
    "id": "funnel-experiment-workflow",
    "title": "Funnel experiment workflow",
    "caption": "Funnel → simulated A/B → DO_NOT_SHIP",
    "truth": "synthetic + simulated",
    "file": "funnel-experiment-workflow.mmd",
    "mermaid": "flowchart LR\n  Q0[Phase 0–1<br/>Generate clickstream] --> Q2[Phase 2<br/>Funnel SQL]\n  Q2 --> Q3[Phase 3<br/>Power / design]\n  Q3 --> Q4[Phase 4<br/>Simulate A/B]\n  Q4 --> Q5[Phase 5<br/>Guardrails + decision]\n  Q5 --> Q6[Phase 6<br/>Dashboard + briefs]\n  Q6 --> DEC{Primary readout}\n  DEC -->|this package| DNS[DO_NOT_SHIP]\n"
  }
];
