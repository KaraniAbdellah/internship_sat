import { DatasetType } from "@/global/types/DatasetType";
import { FileSpreadsheet, Trash2 } from "lucide-react";

type DatasetItemProps = {
  item: DatasetType;
  isActive: boolean;
  isCollapsed: boolean;
  canDelete: boolean;
  onSelect: () => void;
  onDelete: (e: React.MouseEvent) => void;
};

export default function DatasetItem({
  item,
  isActive,
  isCollapsed,
  canDelete,
  onSelect,
  onDelete,
}: DatasetItemProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect();
    }
  };

  if (isCollapsed) {
    return (
      <div
        onClick={onSelect}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        title={`${item.name} · ${item.rowCount} records`}
        className={`group relative flex w-full items-center justify-center rounded-xl border p-3 transition-all cursor-pointer ${
          isActive
            ? "border-orange-300 bg-orange-50/70 text-orange-700 shadow-sm"
            : "border-slate-200/80 bg-white text-slate-500 hover:border-orange-200 hover:bg-orange-50/40 hover:text-orange-600"
        }`}
      >
        <FileSpreadsheet className="h-4 w-4 shrink-0" />
        {canDelete && (
          <button
            type="button"
            onClick={onDelete}
            aria-label={`Delete ${item.name}`}
            className="absolute -right-1 -top-1 hidden rounded-full bg-white p-1 text-slate-400 shadow-sm ring-1 ring-slate-200 transition group-hover:block hover:text-rose-600"
          >
            <Trash2 className="h-3 w-3" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className={`group relative w-full rounded-xl border p-3 text-left transition-all cursor-pointer ${
        isActive
          ? "border-orange-300 bg-orange-50/70 shadow-sm"
          : "border-slate-200/80 bg-white hover:border-orange-200 hover:bg-orange-50/30"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <FileSpreadsheet
            className={`h-4 w-4 shrink-0 ${isActive ? "text-orange-600" : "text-slate-400"}`}
          />
          <span
            className={`truncate text-sm font-semibold ${isActive ? "text-slate-900" : "text-slate-700"}`}
          >
            {item.name}
          </span>
        </div>

        {canDelete && (
          <button
            type="button"
            onClick={onDelete}
            aria-label={`Delete ${item.name}`}
            className="shrink-0 p-1 text-slate-400 opacity-0 transition group-hover:opacity-100 hover:text-rose-600"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="mt-1.5 flex items-center justify-between text-[11px] font-medium text-slate-400">
        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
        <span className="font-semibold text-slate-500">{item.rowCount} records</span>
      </div>
    </div>
  );
}
