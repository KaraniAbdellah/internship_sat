import React from "react";
import { NAV_ITEMS } from "../../constants/conts";

type SidebarNavProps = {
  activeId: string;
  onSelect: (id: string) => void;
  isCollapsed: boolean;
};

export default function SidebarNav({
  activeId,
  onSelect,
  isCollapsed,
}: SidebarNavProps) {
  return (
    <nav className="flex flex-col gap-1.5 overflow-y-auto overflow-x-hidden">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activeId === item.id;

        return (
          <React.Fragment key={item.id}>
            {item.hasDivider && <hr className="my-2 border-slate-200/80" />}
            <button
              type="button"
              onClick={() => onSelect(item.id)}
              title={isCollapsed ? item.label : undefined}
              className={`flex items-center rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${
                isCollapsed ? "justify-center p-3" : "gap-3.5 px-3.5 py-3"
              } ${
                isActive
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                  : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              <Icon
                className={`w-5 h-5 shrink-0 ${
                  isActive
                    ? "text-white"
                    : "text-slate-500 group-hover:text-orange-600"
                }`}
              />

              {!isCollapsed && (
                <span className="truncate whitespace-nowrap">{item.label}</span>
              )}
            </button>
          </React.Fragment>
        );
      })}
    </nav>
  );
}
