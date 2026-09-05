import React from "react";
import { Send } from "lucide-react";
import { DatasetType } from "@/global/context/DatasetContext";

interface Props {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  activeDataset: DatasetType | null;
}

export const AnalyseInputBar: React.FC<Props> = ({
  input,
  setInput,
  onSubmit,
  loading,
  activeDataset,
}) => {
  return (
    <div className="p-3 sm:p-4 border-t border-gray-200 bg-white">
      {/* Scrollable Column Chips */}
      {activeDataset && activeDataset.headers && activeDataset.headers.length > 0 && (
        <div className="max-w-4xl mx-auto mb-2 flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] text-gray-400 scrollbar-none">
          <span className="shrink-0 font-medium text-gray-500">Columns:</span>
          {activeDataset.headers.map((col) => (
            <button
              type="button"
              key={col}
              onClick={() => setInput((prev) => `${prev} ${col}`.trim())}
              className="bg-gray-100 hover:bg-orange-100 hover:text-orange-700 text-gray-600 px-2 py-0.5 rounded transition shrink-0 font-mono"
              title="Click to append column"
            >
              {col}
            </button>
          ))}
        </div>
      )}

      {/* Input Field */}
      <form onSubmit={onSubmit} className="flex items-center gap-2 max-w-4xl mx-auto">
        <input
          type="text"
          disabled={!activeDataset || loading}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            activeDataset ? `Ask anything about ${activeDataset.name}...` : "Select a dataset first"
          }
          className="flex-1 text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-orange-500 disabled:bg-gray-50 shadow-2xs"
        />
        <button
          type="submit"
          disabled={loading || !input.trim() || !activeDataset}
          className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white px-3.5 sm:px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition shrink-0"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  );
};
