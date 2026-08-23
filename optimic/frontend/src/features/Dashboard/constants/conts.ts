import { TrendingUp, Megaphone, Settings, WandSparkles } from "lucide-react";

export const NAV_ITEMS = [
  { id: "dashboard", label: "Studio", icon: WandSparkles },
  { id: "agent-analytics", label: "Agent Analytics", icon: TrendingUp },
  { id: "active-campaigns", label: "Active Campaigns", icon: Megaphone },
  { id: "settings", label: "Settings", icon: Settings, hasDivider: true },
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