export type Project = {
  id: string;
  slug: string;
  title: string;
  eyebrow: string;
  tagline: string;
  sector: string;
  productType: "AI software" | "Software" | "AI-enabled platform";
  ventureStage: "Idea" | "Prototype" | "MVP" | "Pilot" | "Raising" | "Paused" | "Closed";
  stage: string;
  geography: string;
  status: "Idea" | "Prototype" | "MVP" | "Pilot" | "Pre-launch" | "Raising" | "Paused" | "Closed";
  visibility: "Public teaser" | "Registered users only" | "Invitation only";
  ticket: string;
  summary: string;
  accent: string;
  metric: string;
  metricLabel: string;
  featured?: boolean;
  traction: string;
  opportunity: string;
  businessModel: string;
  useOfFunds: string[];
  faq: { q: string; a: string }[];
};

export const projects: Project[] = [
  {
    id: "prj-004",
    slug: "cafepass",
    title: "CafePass",
    eyebrow: "01 / Consumer membership",
    tagline: "One membership. A connected network of independent specialty cafés.",
    sector: "Consumer subscriptions",
    productType: "Software",
    ventureStage: "Prototype",
    stage: "Pre-seed / Pre-launch",
    geography: "Dubai · UAE",
    status: "Pre-launch",
    visibility: "Public teaser",
    ticket: "USD 500k pre-seed",
    summary: "A digital membership connecting coffee lovers with a curated network of independent specialty cafés across Dubai.",
    accent: "#A87555",
    metric: "Pre-launch",
    metricLabel: "Current status",
    featured: true,
    traction: "No participating cafés, paying members, revenue, retention data, or product-market-fit claims are being made at this public teaser stage. The next milestone is a controlled Dubai-first pilot.",
    opportunity: "Dubai’s specialty-coffee scene is active and growing, but discovery is fragmented and independent cafés face expensive customer acquisition. CafePass is designed to create a simple, recurring discovery and loyalty layer for both sides of the local coffee market.",
    businessModel: "A digital membership gives coffee lovers one pass for discovering and visiting participating cafés, while cafés gain a targeted channel for recurring foot traffic, discovery, and customer loyalty.",
    useOfFunds: ["Dubai pilot launch", "Café network build-out", "Product refinement", "Member acquisition", "Legal and UAE setup", "18-month execution runway"],
    faq: [
      { q: "What is CafePass today?", a: "CafePass is a pre-launch venture with core platform flows and product foundations developed, preparing for a controlled Dubai-first pilot." },
      { q: "What will the pilot measure?", a: "The pilot is designed to measure activation, redemption frequency, repeat usage, retention, and measurable value for participating cafés." },
      { q: "What is the current raise?", a: "CafePass is seeking USD 500,000 in pre-seed capital for an 18-month Dubai execution and validation plan." },
    ],
  },
];

export type InterestRequest = {
  id: string;
  name: string;
  initials: string;
  email: string;
  projectId: string;
  project: string;
  type: string;
  region: string;
  ticket: string;
  timeline: string;
  stage: "NEW" | "UNDER_REVIEW" | "QUALIFIED" | "NDA_SENT" | "NDA_SIGNED" | "DATA_ROOM_APPROVED" | "IN_DISCUSSION" | "TERM_SHEET" | "CLOSED" | "NOT_A_FIT";
  owner: string;
  submitted: string;
  note: string;
};

export const requests: InterestRequest[] = [];

export const documents = [
  { id: "DOC-124", name: "CafePass — Level 0 Public Teaser", project: "CafePass", level: "Level 0 — Public teaser", visibility: "Public teaser", version: "v1.0", size: "Source document", updated: "Oct 29, 2026", permissions: "View only", active: true, watermark: "No watermark", views: 0 },
  { id: "DOC-125", name: "CafePass — Pitch Deck", project: "CafePass", level: "Level 1 — Registered investor brief", visibility: "Registered users only", accessRule: "After email verification; before NDA-gated financial, cap-table, or legal materials", version: "v1.0", size: "14.7 MB · 15 slides", updated: "Oct 29, 2026", permissions: "View and download", active: true, watermark: "Standard footer", views: 0, filePath: "/manus-storage/CafePass_Pitch_Deck_(2)_683ca26d.pptx" },
];

export const activity = [
  { time: "Just now", action: "Pitch deck added", subject: "Amelia Reed", project: "CafePass", outcome: "Level 1", tone: "good" },
  { time: "Today", action: "Project published", subject: "CafePass", project: "CafePass", outcome: "Public teaser", tone: "accent" },
];

export const stageLabels: InterestRequest["stage"][] = ["NEW", "UNDER_REVIEW", "QUALIFIED", "NDA_SENT", "NDA_SIGNED", "DATA_ROOM_APPROVED", "IN_DISCUSSION", "TERM_SHEET", "CLOSED", "NOT_A_FIT"];
