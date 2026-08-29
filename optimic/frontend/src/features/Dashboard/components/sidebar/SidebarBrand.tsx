import persona_icon from "@/assets/persona_icon.png";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type SidebarBrandProps = {
  isCollapsed: boolean;
  onToggle: () => void;
};

export default function SidebarBrand({
  isCollapsed,
  onToggle,
}: SidebarBrandProps) {
  return (
    <div
      className={`flex items-center mb-6 pt-1 px-1 transition-all ${
        isCollapsed ? "flex-col gap-3 justify-center" : "justify-between"
      }`}
    >
      <div className="flex items-center gap-2.5 overflow-hidden">
        <img
          src={persona_icon}
          alt="Optimic Logo"
          className="w-11 h-11 object-contain shrink-0"
        />
        {!isCollapsed && (
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="text-xl hover:text-[#f54a00] cursor-pointer transition-colors font-bold text-slate-900 tracking-tight whitespace-nowrap">
              Optimic.
            </span>
          </Link>
        )}
      </div>

      <button
        type="button"
        onClick={onToggle}
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 border border-slate-200/80 shadow-xs transition-colors cursor-pointer"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
