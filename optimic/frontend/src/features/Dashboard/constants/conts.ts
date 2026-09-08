import { TrendingUp, WandSparkles, ClipboardMinus } from "lucide-react";

export const NAV_ITEMS = [
  { id: "dashboard", label: "Studio", icon: WandSparkles },
  { id: "agent-analytics", label: "Agent Analytics", icon: TrendingUp },
  { id: "reports", label: "Agent Reports", icon: ClipboardMinus },
];

// Data Viewer Constants
export const PAGE_SIZE = 5;


// Policy Presets & DB Config
export const POLICY_PRESETS: string[] = [
  "Max 15% discount for legal partners",
  "Include free consultation audit",
];

export const DB_CONFIG = {
  NAME: "OptimicStudioDB",
  STORE: "datasets",
  VERSION: 1,
} as const;


// TABS
export const TABS: Array<{ id: string; label: string }> = [
  { id: "dataset-chat", label: "Dataset Chat" },
  { id: "offer-studio", label: "Offer Studio" },
];


// Anaylse Constants
export const CHART_PALETTE = [
  "#ea580c", // Brand orange
  "#f97316",
  "#fb923c",
  "#fdba74",
  "#38bdf8", // Contrasting cyan
  "#818cf8", // Contrasting indigo
];

export const SUGGESTED_QUESTIONS = [
  "Show top categories by total value",
  "Show trend over time",
  "Breakdown of order counts",
  "Top 5 highest performing items",
];



// Reports
export const REPORT_TYPES = [
  { id: "Executive Performance Summary", desc: "Overall business health, volume, and revenue drivers" },
  { id: "Customer & Segment Audit", desc: "VIP clients, order frequency, and retention opportunities" },
  { id: "Product & Category Deep-Dive", desc: "Best-selling lines, unit pricing, and inventory velocity" },
];
