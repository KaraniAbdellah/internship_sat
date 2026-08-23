import { useContext } from "react";
import { DatasetContext } from "@/global/context/DatasetContext";

export default function ChatDatasetPanel() {
  const datasetCtx = useContext(DatasetContext);
  const activeDataset = datasetCtx?.activeDataset;

  return (
    <div className="h-full flex flex-col gap-3">
      <button className="rounded-2xl bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 text-xs font-bold">
        start chatting with your dataset
      </button>

      <div className="rounded-2xl border border-slate-200 bg-white p-3 text-xs text-slate-800 font-semibold leading-relaxed">
        Connect to {activeDataset?.name || "your dataset"} and ask anything about
        trends, totals, or customer segments.
      </div>

      <div className="self-end rounded-2xl bg-slate-900 text-white px-4 py-3 text-xs font-semibold max-w-[90%]">
        Which city has the highest average spend?
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-800 font-semibold leading-relaxed">
        Based on the current sample, the strongest spend cluster appears around high-value
        urban records.
      </div>

      <div className="mt-auto flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask about this dataset (e.g totals, clients)..."
          className="flex-1 h-10 px-3 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/20"
        />
        <button
          type="button"
          className="h-10 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold"
        >
          Send
        </button>
      </div>
    </div>
  );
}
