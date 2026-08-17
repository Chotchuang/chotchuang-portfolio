export type ProjectCategory =
  | "Analytics & Growth"
  | "Product & Automation"
  | "Finance & AI"
  | "Data & Systems"
  | "Strategy & Research";

export type WorkFile = {
  title: string;
  format: "PDF" | "Excel" | "HTML";
  size: string;
  href: string;
  description: string;
};

export type ProjectGalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  category: ProjectCategory;
  featured: boolean;
  status: "Complete" | "In progress" | "Concept";
  disclosure: string;
  summary: string;
  decision: string;
  role?: string;
  methods: string[];
  evidence: string[];
  tech: string[];
  coverImage?: string;
  gallery?: ProjectGalleryImage[];
  liveUrl?: string;
  githubUrl?: string;
  files?: WorkFile[];
};

export const projects: Project[] = [
  {
    slug: "bluex",
    title: "BlueX — Investment Intelligence for Retail Investors",
    shortTitle: "BlueX",
    category: "Finance & AI",
    featured: true,
    status: "In progress",
    disclosure: "Proprietary research system · Active build · Not trading advice",
    summary:
      "A systematic momentum-scoring and portfolio-research platform that turns multi-timeframe signals into evidence-led decisions for portfolio management.",
    decision:
      "Which assets show the strongest current momentum, and is that signal statistically meaningful enough to inform portfolio weighting?",
    role:
      "End-to-end analyst and builder: indicator design, CSV pipeline, validation, ML experiments, and the public intelligence-board interface.",
    methods: [
      "Built a single canonical producer for multi-timeframe feature CSVs",
      "Designed TWxy/OPUS momentum families with ANOVA validation",
      "Ran tree/sklearn research and walk-forward checks on Mac; DL on RunPod only",
      "Translated the research layer into an interactive intelligence board",
    ],
    evidence: [
      "Working intelligence board with portfolio-oriented views",
      "Legacy ML remodel: ensemble, XGBoost, and LightGBM across 18 tickers",
      "18 interactive daily ensemble dashboards with Plotly drill-down",
      "Core research codebase remains proprietary; public case shows workflow and UI",
    ],
    tech: ["Python", "React", "Machine learning", "Backtesting", "Portfolio analytics"],
    files: [
      {
        title: "ML Signal Research Hub",
        format: "HTML",
        size: "4 KB",
        href: "/work/bluex/ml-signal-research.html",
        description:
          "Entry point for the June 2026 legacy pipeline: 18 tickers, three models, summary tables and daily ensemble dashboards.",
      },
      {
        title: "Ensemble Summary (18 × 3 timeframes)",
        format: "HTML",
        size: "17 KB",
        href: "/work/bluex/ml/index-ensemble.html",
        description:
          "Strategy return, alpha vs buy-and-hold, Sharpe, and ML accuracy for the ensemble model.",
      },
      {
        title: "XGBoost Summary",
        format: "HTML",
        size: "15 KB",
        href: "/work/bluex/ml/index-xgboost.html",
        description:
          "Gradient-boosted tree results on the same TWxy/OPUS feature pipeline and holdout window.",
      },
      {
        title: "LightGBM Summary",
        format: "HTML",
        size: "15 KB",
        href: "/work/bluex/ml/index-lightgbm.html",
        description:
          "LightGBM remodel metrics compared against ensemble and XGBoost on identical splits.",
      },
    ],
    coverImage: "/work/bluex/cover-dashboard.svg",
    gallery: [
      {
        src: "/work/bluex/cover-momentum-chart.svg",
        alt: "Multi-timeframe momentum chart preview",
        caption: "Illustrative momentum view across timeframes — research output, not a trade signal.",
      },
      {
        src: "/work/bluex/architecture.svg",
        alt: "BlueX three-layer architecture diagram",
        caption: "central_df → scoring/ML → intelligence UI — strict separation of concerns.",
      },
    ],
    liveUrl: "https://blux-intelligence-board.blackhorsepartner.chatgpt.site",
  },
  {
    slug: "merchant-growth-fintech",
    title: "Merchant Growth & Fintech Profitability",
    shortTitle: "Merchant Growth",
    category: "Analytics & Growth",
    featured: true,
    status: "Complete",
    disclosure: "Deterministic synthetic data · Simulated and modeled impact",
    summary:
      "An end-to-end decision system for merchant acquisition, retention, campaign economics, wallet adoption, and financing risk.",
    decision:
      "Where should a multi-sided platform invest its next growth baht while protecting contribution margin and credit quality?",
    methods: [
      "Modeled seven connected commerce and fintech datasets",
      "Built 14 documented SQL analyses and analytical marts",
      "Evaluated randomized campaign holdouts and a wallet onboarding experiment",
      "Created contribution-margin, CAC-payback, and financing guardrails",
    ],
    evidence: [
      "Reproducible pipeline with 11 automated tests",
      "Executive dashboard, recommendation memo, and decision deck",
      "Editable unit-economics and sensitivity workbook",
    ],
    tech: ["SQL", "DuckDB", "Python", "Statistics", "Tableau", "Excel"],
    files: [
      {
        title: "Merchant Growth Strategy Deck",
        format: "PDF",
        size: "305 KB",
        href: "/work/merchant-growth/strategy-deck.pdf",
        description:
          "Executive narrative covering acquisition, retention, unit economics, wallet adoption, and financing guardrails.",
      },
      {
        title: "Merchant Unit Economics Model",
        format: "Excel",
        size: "16 KB",
        href: "/work/merchant-growth/unit-economics.xlsx",
        description:
          "Editable workbook for contribution margin, CAC payback, and scenario sensitivity.",
      },
      {
        title: "Merchant Performance Dashboard",
        format: "HTML",
        size: "9 KB",
        href: "/work/merchant-growth/dashboard.html",
        description:
          "Browser-ready executive dashboard generated from the reproducible analytics pipeline.",
      },
    ],
  },
  {
    slug: "travel-product-analytics",
    title: "Travel Product & Supply Analytics",
    shortTitle: "Travel Analytics",
    category: "Analytics & Growth",
    featured: true,
    status: "Complete",
    disclosure: "Public listings + synthetic clickstream · Proxy and simulated impact",
    summary:
      "A three-part travel marketplace case connecting content quality, experiment design, and weekly product operations.",
    decision:
      "Which property-content gaps should be fixed first, how should impact be tested, and what should the operating cadence monitor?",
    role:
      "Sole analyst across content scoring, funnel experimentation, and the weekly ops automation that stitches both workstreams together.",
    methods: [
      "Designed a four-dimension Content Quality Score",
      "Ranked the backlog with RICE and business-impact proxies",
      "Built funnel SQL, power analysis, and a randomized A/B readout",
      "Automated a weekly operations report with anomaly flags",
    ],
    evidence: [
      "23,233 public Bangkok listings assessed",
      "11,480-listing prioritized content backlog",
      "Dashboard package, experiment readout, and weekly brief",
    ],
    tech: ["Python", "SQL", "Experimentation", "Tableau", "Automation"],
    coverImage: "/work/travel-analytics/cover-funnel.svg",
    gallery: [
      {
        src: "/work/travel-analytics/cover-funnel.svg",
        alt: "OTA funnel dashboard KPI preview",
        caption: "Synthetic Bangkok funnel dashboard with experiment decision surfaced.",
      },
    ],
    files: [
      {
        title: "Travel Funnel Dashboard",
        format: "HTML",
        size: "5 KB",
        href: "/work/travel-analytics/funnel-dashboard.html",
        description:
          "Browser-ready conversion funnel and experiment dashboard built from synthetic clickstream data.",
      },
      {
        title: "Weekly Product Ops Brief",
        format: "HTML",
        size: "4 KB",
        href: "/work/travel-analytics/weekly-ops-brief.html",
        description:
          "Slack-ready weekly brief combining content health, funnel metrics, experiment readout, and ops flags.",
      },
    ],
  },
  {
    slug: "ecommerce-growth",
    title: "E-commerce Growth & Commercial Strategy",
    shortTitle: "E-commerce Growth",
    category: "Analytics & Growth",
    featured: true,
    status: "Complete",
    disclosure: "Public learning dataset · Historical analysis and planning estimates",
    summary:
      "Commercial analysis of channel quality, mobile funnel performance, product mix, and refund risk across a 1.7M-row dataset.",
    decision:
      "How should marketing budget and product effort shift across channels, devices, and products?",
    methods: [
      "Analyzed six relational tables with joins, CTEs, and time-series SQL",
      "Compared conversion and revenue per session by channel and device",
      "Connected session depth, product mix, and refund behavior",
      "Created budget scenarios and decision guardrails",
    ],
    evidence: [
      "1.7M public records analyzed",
      "Desktop conversion 8.5% versus 3.1% on mobile",
      "Commercial recommendation, charts, workbook, and executive deck",
    ],
    tech: ["PostgreSQL", "DuckDB", "SQL", "Statistics", "Excel"],
    files: [
      {
        title: "E-commerce Growth Strategy",
        format: "PDF",
        size: "213 KB",
        href: "/work/ecommerce-growth/growth-strategy.pdf",
        description:
          "Executive deck connecting channel quality, mobile conversion, product mix, refunds, and budget allocation.",
      },
      {
        title: "E-commerce Budget Allocation",
        format: "Excel",
        size: "13 KB",
        href: "/work/ecommerce-growth/budget-allocation.xlsx",
        description:
          "Editable planning workbook for channel budgets, expected contribution, and decision guardrails.",
      },
    ],
  },
  {
    slug: "agentic-finops",
    title: "Agentic-AI FinOps Consultant Platform",
    shortTitle: "Agentic FinOps",
    category: "Finance & AI",
    featured: true,
    status: "Concept",
    disclosure: "Product strategy concept · Not a live financial product",
    summary:
      "A product and business foundation for an AI financial optimizer focused on Thai consumers and responsible money decisions.",
    decision:
      "How might an agentic financial assistant coordinate cash flow, debt, and investment decisions while remaining transparent and governed?",
    role:
      "Product strategist and business architect: customer problem, journey, trust model, go-to-market, and KPI framework.",
    methods: [
      "Defined the customer problem, value proposition, and journey",
      "Designed debt optimization, cash-flow, and investment-sweep concepts",
      "Mapped PDPA, trust, governance, and operating requirements",
      "Created go-to-market logic, financial model, and KPI framework",
    ],
    evidence: [
      "12-page executive summary (sanitized excerpt from foundation deck)",
      "Supporting marketing plan in private archive",
      "Explicit trust, risk, and operating assumptions",
    ],
    tech: ["Product strategy", "Fintech", "Agentic AI", "Financial modeling", "KPIs"],
    coverImage: "/work/agentic-finops/cover.svg",
    files: [
      {
        title: "Agentic FinOps Executive Summary",
        format: "PDF",
        size: "472 KB",
        href: "/work/agentic-finops/executive-summary.pdf",
        description:
          "Sanitized opening section of the business foundation deck — concept proposal only.",
      },
    ],
  },
  {
    slug: "digital-health-blockchain",
    title: "Digital Health with Digital Trust",
    shortTitle: "Digital Health",
    category: "Data & Systems",
    featured: true,
    status: "Concept",
    disclosure: "Proposed enterprise architecture · Research-led concept",
    summary:
      "A permissioned-blockchain architecture for health-data exchange, consent, privacy, and interoperability.",
    decision:
      "How can healthcare organizations share trusted records while preserving access control, patient consent, and regulatory boundaries?",
    role:
      "Research lead and enterprise architect for permissioned blockchain, consent flows, and governance design.",
    methods: [
      "Designed a Hyperledger Fabric permission model",
      "Separated on-chain proof from off-chain clinical data",
      "Mapped tokenization, identity, consent, and access controls",
      "Considered interoperability, PDPA, and HIPAA requirements",
    ],
    evidence: [
      "10-page architecture summary (sanitized excerpt)",
      "Supporting technical research collection in private archive",
      "End-to-end proposed data and governance flows",
    ],
    tech: ["Blockchain", "Hyperledger Fabric", "Data architecture", "Privacy", "Healthcare"],
    coverImage: "/work/digital-health/cover.svg",
    files: [
      {
        title: "Digital Health Architecture Summary",
        format: "PDF",
        size: "1.1 MB",
        href: "/work/digital-health/architecture-summary.pdf",
        description:
          "Sanitized opening section of the research deck — proposed architecture, not a deployed system.",
      },
    ],
  },
  {
    slug: "hotel-analyzer",
    title: "Hotel Analyzer for the Netherlands",
    shortTitle: "Hotel Analyzer",
    category: "Data & Systems",
    featured: false,
    status: "Complete",
    disclosure: "CS50 Python final project",
    summary:
      "A command-line hotel discovery tool that cleans, filters, and summarizes properties by city, price, and rating.",
    decision:
      "How can travelers narrow a large accommodation dataset into practical, comparable choices?",
    role: "Sole developer: data cleaning, CLI filters, aggregation, tests, and documentation.",
    methods: [
      "Built a reusable data-cleaning pipeline",
      "Implemented city, price, and rating filters",
      "Added grouped summaries and terminal-friendly outputs",
      "Covered core behavior with automated tests",
    ],
    evidence: ["Source code and dataset", "Automated tests", "README and video demonstration"],
    tech: ["Python", "pytest", "Data cleaning", "CLI"],
    coverImage: "/work/hotel-analyzer/cli-demo.svg",
    gallery: [
      {
        src: "/work/hotel-analyzer/cli-demo.svg",
        alt: "Hotel Analyzer terminal output preview",
        caption: "Illustrative CLI session showing filters, results, and test status.",
      },
    ],
  },
  {
    slug: "financial-crm-database",
    title: "Financial CRM & Portfolio Database",
    shortTitle: "Financial CRM",
    category: "Data & Systems",
    featured: false,
    status: "Complete",
    disclosure: "CS50 SQL final project",
    summary:
      "A relational database for clients, investment orders, portfolio summaries, and loan tracking.",
    decision:
      "How should a financial application organize client, investing, and lending records with reliable constraints and reporting views?",
    role: "Database designer and implementer: schema, constraints, views, triggers, and query layer.",
    methods: [
      "Designed normalized entities and relationships",
      "Implemented constraints, indexes, views, and triggers",
      "Created investment, portfolio, and lending queries",
      "Documented the model with an ER diagram and design rationale",
    ],
    evidence: ["Complete SQLite schema", "Query collection", "Design document and video overview"],
    tech: ["SQLite", "SQL", "Data modeling", "Database design"],
    coverImage: "/work/financial-crm/er-diagram.png",
    gallery: [
      {
        src: "/work/financial-crm/er-diagram.png",
        alt: "Financial CRM entity-relationship diagram",
        caption: "ER diagram for clients, orders, portfolios, and loans.",
      },
    ],
    files: [
      {
        title: "Schema Overview",
        format: "HTML",
        size: "2 KB",
        href: "/work/financial-crm/schema-overview.html",
        description: "Short overview of entities, relationships, and design choices.",
      },
    ],
  },
  {
    slug: "restaurant-data-model",
    title: "Restaurant & Cafe Chain Data Model",
    shortTitle: "Restaurant Data Model",
    category: "Data & Systems",
    featured: false,
    status: "Complete",
    disclosure: "UC Davis final assignment",
    summary:
      "A governed relational model for restaurant operations, customers, orders, inventory, and sensitive information.",
    decision:
      "How should a multi-location restaurant chain structure operational data so it remains usable, consistent, and governed?",
    role: "Data modeler: conceptual design, 3NF relational schema, governance classification, and SQL queries.",
    methods: [
      "Designed conceptual and relational models",
      "Normalized 11 tables and 57 attributes to 3NF",
      "Classified sensitive fields and data-quality risks",
      "Implemented representative business queries",
    ],
    evidence: ["SQLite database and schema", "Entity-relationship diagrams", "Four-part final submission"],
    tech: ["SQL", "SQLite", "3NF", "Data governance", "ER modeling"],
    files: [
      {
        title: "Relational Data Model",
        format: "PDF",
        size: "302 KB",
        href: "/work/restaurant-data-model/relational-model.pdf",
        description: "UC Davis Part 2 submission — relational model and normalization rationale.",
      },
    ],
  },
  {
    slug: "daily-intel-hub",
    title: "Daily Intel Hub",
    shortTitle: "Daily Intel Hub",
    category: "Product & Automation",
    featured: false,
    status: "In progress",
    disclosure: "Engineering lab · Partially operational",
    summary:
      "An automated intelligence pipeline for market data, fundamentals, travel-price monitoring, and agent-orchestrated briefings.",
    decision:
      "How can recurring intelligence collection be coordinated into one inspectable, automated workflow?",
    role: "Sole builder of collectors, SQLite persistence, LangGraph orchestration, and ops documentation.",
    methods: [
      "Built market and fundamental-data collectors (operational)",
      "Designed SQLite persistence and LangGraph orchestration flows",
      "Documented travel-price and AI-response capture as incomplete",
      "Kept component status transparent in README and case study",
    ],
    evidence: [
      "Market collector: operational",
      "Fundamentals collector: operational",
      "Travel monitoring: not complete",
      "AI response capture: not complete",
      "LangGraph orchestration: documented harness",
    ],
    tech: ["Python", "SQLite", "LangGraph", "Automation", "Web data"],
    coverImage: "/work/daily-intel-hub/architecture.svg",
    gallery: [
      {
        src: "/work/daily-intel-hub/architecture.svg",
        alt: "Daily Intel Hub architecture diagram",
        caption: "Collectors → SQLite → LangGraph → briefings. Travel and AI capture still in progress.",
      },
    ],
  },
  {
    slug: "adblocker-strategy",
    title: "GYF Adblocker Strategy",
    shortTitle: "Adblocker Strategy",
    category: "Strategy & Research",
    featured: false,
    status: "Complete",
    disclosure: "Business analytics capstone",
    summary:
      "A structured response to adblock-related revenue pressure spanning research, experimentation, optimization, and team design.",
    decision:
      "How should a digital business diagnose and respond to adblocker adoption without relying on a single tactical fix?",
    methods: [
      "Structured the revenue-impact research plan",
      "Designed hiring and capability decisions",
      "Proposed optimization and A/B testing approaches",
      "Defined a KPI and measurement framework",
    ],
    evidence: ["15-slide completed capstone deck", "Cross-functional action plan"],
    tech: ["Business analytics", "Experimentation", "Strategy", "People analytics"],
  },
  {
    slug: "diversification-model",
    title: "Comparing the Power of Diversification",
    shortTitle: "Diversification Model",
    category: "Finance & AI",
    featured: false,
    status: "Complete",
    disclosure: "Historical financial-modeling capstone · 2012–2015 comparison",
    summary:
      "A compact portfolio model comparing a mixed bond-and-equity portfolio with a concentrated single-stock position.",
    decision:
      "How did diversification change return, volatility, and drawdown in the selected historical window?",
    methods: [
      "Constructed a 67.85% VBTLX and 32.15% VFIAX portfolio",
      "Compared the portfolio with AAPL",
      "Calculated return, volatility, and maximum drawdown",
      "Presented results in an executive six-slide narrative",
    ],
    evidence: ["Excel workbooks", "Completed six-slide capstone deck"],
    tech: ["Excel", "Portfolio construction", "Risk analysis", "Financial modeling"],
  },
  {
    slug: "blockchain-remittance",
    title: "Blockchain Remittance Strategic Action Plan",
    shortTitle: "Blockchain Remittance",
    category: "Strategy & Research",
    featured: false,
    status: "Complete",
    disclosure: "Financial-services strategy study",
    summary:
      "A strategic action plan exploring how blockchain could reshape cross-border remittance operations and economics.",
    decision:
      "Where might blockchain create practical value in remittance, and what would responsible adoption require?",
    methods: [
      "Mapped the remittance value chain",
      "Assessed strategic opportunities and adoption barriers",
      "Framed a phased action plan",
      "Separated technology potential from implementation certainty",
    ],
    evidence: ["Completed Keynote strategy deck"],
    tech: ["Blockchain", "Remittance", "Financial services", "Strategy"],
  },
  {
    slug: "retail-reward-visualization",
    title: "Retail Reward Adoption Visualization",
    shortTitle: "Retail Rewards",
    category: "Analytics & Growth",
    featured: false,
    status: "Complete",
    disclosure: "Focused data-visualization assignment",
    summary:
      "A visual comparison of reward-program adoption and reward generosity among leading US retailers.",
    decision:
      "How do reward adoption and benefit generosity differ across retail industries?",
    methods: [
      "Structured a top-100 retailer comparison",
      "Compared adoption with reward generosity",
      "Segmented the analysis by industry",
      "Designed concise decision-oriented visual outputs",
    ],
    evidence: ["Completed analysis and visualization"],
    tech: ["Data visualization", "Retail analytics", "Comparative analysis"],
  },
  {
    slug: "booking-analytics-automation",
    title: "Booking Analytics Automation",
    shortTitle: "Booking Automation",
    category: "Product & Automation",
    featured: false,
    status: "Concept",
    disclosure: "Agent-system specification · No runnable implementation located",
    summary:
      "An orchestrated analytics workflow spanning SQL ingestion, Python modeling, dashboard publishing, and recurring delivery.",
    decision:
      "How could specialized agents coordinate a repeatable booking-analytics production process?",
    methods: [
      "Defined orchestrator and specialist-agent responsibilities",
      "Specified SQL ingestion and Python processing stages",
      "Mapped Tableau and Excel delivery steps",
      "Documented email and reporting handoffs",
    ],
    evidence: ["Complete agent and orchestration specifications"],
    tech: ["Agent orchestration", "SQL", "Python", "Tableau", "Reporting automation"],
  },
  {
    slug: "ai-algorithmic-trading",
    title: "AI in Algorithmic Trading & Portfolio Optimization",
    shortTitle: "AI in Trading",
    category: "Strategy & Research",
    featured: false,
    status: "Complete",
    disclosure: "Research guide · Not a software implementation",
    summary:
      "A research guide to supervised, unsupervised, reinforcement, and agentic approaches in trading and portfolio management.",
    decision:
      "Where can different AI approaches support investment workflows, and which risks and governance controls matter?",
    methods: [
      "Compared four AI paradigms and their investment use cases",
      "Mapped data, validation, and model-risk concerns",
      "Connected portfolio objectives to analytical techniques",
      "Emphasized governance and implementation limits",
    ],
    evidence: ["Seven-page completed research article"],
    tech: ["Machine learning", "Portfolio optimization", "Agentic AI", "Model risk"],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const projectsWithFiles = projects.filter(
  (project) => project.files && project.files.length > 0,
);

export const workFiles = projectsWithFiles.flatMap((project) =>
  (project.files ?? []).map((file) => ({
    ...file,
    projectSlug: project.slug,
    projectTitle: project.shortTitle,
    disclosure: project.disclosure,
  })),
);

export const categories = [
  "All",
  "Analytics & Growth",
  "Product & Automation",
  "Finance & AI",
  "Data & Systems",
  "Strategy & Research",
] as const;

export const projectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);
