import { useState } from "react";

import ChatDatasetPanel from "./sections/ChatDatasetPanel";
import GeneratedOfferPanel from "./sections/GeneratedOfferPanel";
import { TABS } from "../../constants/conts";

type RightSidebarProps = {
  selectedCount?: number;
};

export default function RightSidebar({ selectedCount = 0 }: RightSidebarProps) {
  const [activeTab, setActiveTab] = useState("dataset-chat");

  return (
    <aside className="w-[400px] border-l border-slate-200 bg-white flex flex-col shrink-0">
      <div className="h-14 px-3 border-b border-slate-200 flex items-end gap-6 text-sm font-bold text-slate-400">
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

      <div className="flex-1 overflow-y-auto p-2 bg-slate-50/30">
        {activeTab === "dataset-chat" && <ChatDatasetPanel />}
        {activeTab === "offer-studio" && (
          <GeneratedOfferPanel selectedCount={selectedCount} />
        )}
      </div>
    </aside>
  );
}
