import { useState } from "react";

import { OfferResult } from "../../types/OfferResult";
import AuditLogPanel from "./sections/AuditLogPanel";
import ChatDatasetPanel from "./sections/ChatDatasetPanel";
import GeneratedOfferPanel from "./sections/GeneratedOfferPanel";

type RightSidebarProps = {
  offerResult: OfferResult | null;
  isGenerating: boolean;
  selectedCount: number;
};

type PanelTab = "dataset-chat" | "offer-studio" | "agent-logs";

const TABS: Array<{ id: PanelTab; label: string }> = [
  { id: "dataset-chat", label: "Dataset Chat" },
  { id: "offer-studio", label: "Offer Studio" },
  { id: "agent-logs", label: "Agent Logs" },
];

export default function RightSidebar({
  offerResult,
  isGenerating,
  selectedCount,
}: RightSidebarProps) {
  const [activeTab, setActiveTab] = useState<PanelTab>("dataset-chat");

  return (
    <aside className="w-[340px] border-l border-slate-200 bg-white flex flex-col shrink-0">
      <div className="h-14 px-3 border-b border-slate-200 flex items-end gap-4 text-sm font-bold text-slate-400">
        {TABS.map((tab) => {
          const active = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                active
                  ? "text-slate-900 border-orange-500"
                  : "border-transparent hover:text-slate-600"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto p-3 bg-slate-50/30">
        {activeTab === "dataset-chat" && <ChatDatasetPanel />}
        {activeTab === "offer-studio" && (
          <GeneratedOfferPanel
            offerResult={offerResult}
            isGenerating={isGenerating}
            selectedCount={selectedCount}
          />
        )}
        {activeTab === "agent-logs" && <AuditLogPanel offerResult={offerResult} />}
      </div>
    </aside>
  );
}
