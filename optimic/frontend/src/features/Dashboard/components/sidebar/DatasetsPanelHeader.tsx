import { Database, Plus } from "lucide-react";

type DatasetsPanelHeaderProps = {
  count: number;
  onUploadClick: () => void;
  isCollapsed: boolean;
};

export default function DatasetsPanelHeader({
  count,
  onUploadClick,
  isCollapsed,
}: DatasetsPanelHeaderProps) {
  return (
    <div
      className={`flex items-center text-xs font-bold text-slate-800 ${
        isCollapsed ? "justify-center gap-2 px-1" : "justify-between px-1"
      }`}
    >
      <div
        className={`flex items-center gap-1.5 ${
          isCollapsed ? "justify-center" : "min-w-0"
        }`}
      >
        <Database className="w-4 h-4 shrink-0 text-orange-600" />
        {!isCollapsed && (
          <span className="whitespace-nowrap text-[11px] uppercase tracking-wider">
            Datasets ({count})
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={onUploadClick}
        className="text-orange-600 hover:text-orange-700 p-1 rounded-lg hover:bg-orange-50 transition cursor-pointer"
        title="Upload CSV"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
