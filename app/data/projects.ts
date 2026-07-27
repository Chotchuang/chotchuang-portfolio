export type ProjectCategory =
  | "Analytics & Growth"
  | "Product & Automation"
  | "Finance & AI"
  | "Data & Systems"
  | "Strategy & Research";

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
  methods: string[];
  evidence: string[];
  tech: string[];
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "bluex",
    title: "BlueX — Investment Intelligence for Retail Investors",
    shortTitle: "BlueX",
    category: "Finance & AI",
    featured: true,
    status: "In progress",
    disclosure: "Proprietary research system · Active build",
    summary:
      "A momentum-scoring and portfolio-analysis system that turns multi-timeframe market signals into a focused intelligence workflow.",
    decision:
      "How can a retail investor compare market momentum, supporting evidence, and portfolio implications without stitching together multiple tools?",
    methods: [
      "Designed a multi-timeframe momentum scoring framework",
      "Built research workflows for indicator validation and backtesting",
      "Explored statistical validation, machine learning, and portfolio views",
      "Translated the analytical layer into an interactive intelligence board",
    ],
    evidence: [
      "Working web-based intelligence board",
      "Documented scoring and research framework",
      "Multiple product and investor narrative iterations",
    ],
    tech: ["Python", "React", "Machine learning", "Backtesting", "Portfolio analytics"],
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
    methods: [
      "Defined the customer problem, value proposition, and journey",
      "Designed debt optimization, cash-flow, and investment-sweep concepts",
      "Mapped PDPA, trust, governance, and operating requirements",
      "Created go-to-market logic, financial model, and KPI framework",
    ],
    evidence: [
      "26-page business foundation deck",
      "Supporting marketing plan",
      "Explicit trust, risk, and operating assumptions",
    ],
    tech: ["Product strategy", "Fintech", "Agentic AI", "Financial modeling", "KPIs"],
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
    methods: [
      "Designed a Hyperledger Fabric permission model",
      "Separated on-chain proof from off-chain clinical data",
      "Mapped tokenization, identity, consent, and access controls",
      "Considered interoperability, PDPA, and HIPAA requirements",
    ],
    evidence: [
      "78-page architecture and research deck",
      "Supporting technical research collection",
      "End-to-end proposed data and governance flows",
    ],
    tech: ["Blockchain", "Hyperledger Fabric", "Data architecture", "Privacy", "Healthcare"],
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
    methods: [
      "Built a reusable data-cleaning pipeline",
      "Implemented city, price, and rating filters",
      "Added grouped summaries and terminal-friendly outputs",
      "Covered core behavior with automated tests",
    ],
    evidence: ["Source code and dataset", "Automated tests", "README and video demonstration"],
    tech: ["Python", "pytest", "Data cleaning", "CLI"],
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
    methods: [
      "Designed normalized entities and relationships",
      "Implemented constraints, indexes, views, and triggers",
      "Created investment, portfolio, and lending queries",
      "Documented the model with an ER diagram and design rationale",
    ],
    evidence: ["Complete SQLite schema", "Query collection", "Design document and video overview"],
    tech: ["SQLite", "SQL", "Data modeling", "Database design"],
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
    methods: [
      "Designed conceptual and relational models",
      "Normalized 11 tables and 57 attributes to 3NF",
      "Classified sensitive fields and data-quality risks",
      "Implemented representative business queries",
    ],
    evidence: ["SQLite database and schema", "Entity-relationship diagrams", "Four-part final submission"],
    tech: ["SQL", "SQLite", "3NF", "Data governance", "ER modeling"],
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
    methods: [
      "Built market and fundamental-data collectors",
      "Designed SQLite persistence and orchestration flows",
      "Connected collector outputs to an agent workflow",
      "Documented incomplete capture and travel-monitoring components",
    ],
    evidence: [
      "Operational market and fundamentals collectors",
      "Documented LangGraph orchestration",
      "Transparent in-progress component status",
    ],
    tech: ["Python", "SQLite", "LangGraph", "Automation", "Web data"],
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
