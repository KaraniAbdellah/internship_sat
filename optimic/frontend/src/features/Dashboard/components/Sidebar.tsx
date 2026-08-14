import React, { useState } from 'react';
import { NAV_ITEMS } from '../constants/conts';
import image from "@/assets/optimic.png";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  activeId: string;
  onSelect: (id: string) => void;
}

export default function Sidebar({ activeId, onSelect }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen bg-white border-r border-slate-200 flex flex-col p-3 select-none flex-shrink-0 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* ── Brand Header & Toggle Button ───────────────────────────── */}
      <div
        className={`flex items-center mb-6 pt-1 px-1 transition-all ${
          isCollapsed ? 'flex-col gap-3 justify-center' : 'justify-between'
        }`}
      >
        {/* Logo & Brand Name */}
        <div className="flex items-center gap-2.5 overflow-hidden">
          <img
            src={image}
            alt="Optimic Logo"
            className="w-7 h-7 object-contain shrink-0"
          />
          {!isCollapsed && (
            <span className="text-xl font-bold text-slate-900 tracking-tight whitespace-nowrap">
              Optimic.
            </span>
          )}
        </div>

        {/* Minimize / Expand Toggle Button */}
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 border border-slate-200/80 shadow-xs transition-colors cursor-pointer"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* ── Navigation Items ────────────────────────────────────────── */}
      <nav className="flex flex-col gap-1.5 flex-1 overflow-y-auto overflow-x-hidden">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;

          return (
            <React.Fragment key={item.id}>
              {item.hasDivider && (
                <hr className="my-2 border-slate-200/80" />
              )}
              <button
                type="button"
                onClick={() => onSelect(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`flex items-center rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  isCollapsed ? 'justify-center p-3' : 'gap-3.5 px-3.5 py-3'
                } ${
                  isActive
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
                    : 'text-slate-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 ${
                    isActive ? 'text-white' : 'text-slate-500'
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
    </aside>
  );
}
