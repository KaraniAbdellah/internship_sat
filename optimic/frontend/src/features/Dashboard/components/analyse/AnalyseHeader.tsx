import React from "react";
import { BarChart3, Database, RotateCcw } from "lucide-react";
import { DatasetType } from "@/global/context/DatasetContext";

interface Props {
  datasets: DatasetType[];
  activeDataset: DatasetType | null;
  onSelectDataset: (id: string) => void;
  onClearChat: () => void;
  hasMessages: boolean;
}

export const AnalyseHeader: React.FC<Props> = ({
  datasets,
  activeDataset,
  onSelectDataset,
  onClearChat,
  hasMessages,
}) => {
  return (
    <div className="border-b border-gray-200 bg-white px-4 py-3 sm:py-0 sm:h-16 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      {/* Title */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 shrink-0">
          <BarChart3 className="w-4 h-4" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-gray-900">Agent Analytics</h1>
          <p className="text-[11px] text-gray-500 hidden sm:block">
            In-memory DuckDB querying & charting
          </p>
        </div>
      </div>

      {/* Dataset Picker and Clear Chat */}
      <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
        {hasMessages && (
          <button
            onClick={onClearChat}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 transition px-2.5 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Clear Chat</span>
          </button>
        )}

        <div className="flex items-center gap-1.5 flex-1 sm:flex-initial justify-end">
          <Database className="w-4 h-4 text-gray-400 shrink-0" />
          <select
            value={activeDataset?.id || ""}
            onChange={(e) => onSelectDataset(e.target.value)}
            className="w-full sm:w-auto text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white text-gray-700 focus:outline-none focus:border-orange-500 font-medium truncate"
          >
            {datasets.length === 0 && <option value="">No datasets</option>}
            {datasets.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.rowCount || d.rows?.length || 0} rows)
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
