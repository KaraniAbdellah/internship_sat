import React from 'react';
import { NAV_ITEMS } from '../constants/conts';
import image from "@/assets/optimic.png"
interface SidebarProps {
  activeId: string;
  onSelect: (id: string) => void;
}

export default function Sidebar({ activeId, onSelect }: SidebarProps) {
  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col p-4 select-none flex-shrink-0">
      {/* Brand Header */}
      <div className="flex items-center gap-2.5 px-3 py-2 mb-6">
        <img 
          src={image}
          alt="Optimic Logo" 
          className="w-7 h-7 object-contain" 
        />
        <span className="text-xl font-bold text-slate-900 tracking-tight">Optimic.</span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1.5 flex-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;

          return (
            <React.Fragment key={item.id}>
              {item.hasDivider && <hr className="my-3 border-slate-200/80" />}
              <button
                type="button"
                onClick={() => onSelect(item.id)}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
                    : 'text-slate-600 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            </React.Fragment>
          );
        })}
      </nav>
    </aside>
  );
}