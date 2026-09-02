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
                  ? "bg-gray-100 text-white shadow-md shadow-gray-600/20"
                  : "text-slate-600 hover:text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon
                className={`w-5 h-5 shrink-0 ${
                  isActive ? "text-gray-500" : "text-slate-500"
                }`}
              />
              {!isCollapsed && (
                <span className="truncate text-gray-500 whitespace-nowrap">{item.label}</span>
              )}
            </button>
          </React.Fragment>
        );
      })}
    </nav>
  );
}
