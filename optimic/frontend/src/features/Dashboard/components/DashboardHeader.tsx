import React, { useContext, useRef } from "react";
import { Sparkles, FileSpreadsheet, Upload } from "lucide-react";
import toast from "react-hot-toast";

import { DatasetContext } from "@/global/context/DatasetContext";
import { CustomerDataContext } from "@/global/context/CustomerDataContext";
import { DatasetType } from "@/global/types/DatasetType";
import { parseCSV } from "../utils/csvParser";
import { persistDataset } from "../services/datasetDb";

export default function DashboardHeader() {
  const datasetCtx = useContext(DatasetContext);
  const customerCtx = useContext(CustomerDataContext);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const activeDataset = datasetCtx?.activeDataset;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !datasetCtx) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      toast.error("Please upload a valid .csv file.");
      return;
    }

    try {
      const text = await file.text();
      const { headers, rows } = parseCSV(text);

      const newDataset: DatasetType = {
        id: `ds_${Date.now()}`,
        name: file.name,
        headers,
        rows,
        rowCount: rows.length,
        policy: "",
        createdAt: Date.now(),
      };

      await persistDataset(newDataset);
      datasetCtx.setDatasets((prev) => [newDataset, ...prev]);
      datasetCtx.setActiveDataset(newDataset);
      customerCtx?.setCustomerData([]);
      toast.success(`Loaded ${rows.length} rows from ${file.name}`);
    } catch (err: any) {
      toast.error(err.message || "Error parsing CSV file.");
    } finally {
      e.target.value = "";
    }
  };

  return (
    <header className="h-16 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Brand & Badge */}
      <div className="flex items-center gap-3.5">
        <div className="relative group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-500 text-white flex items-center justify-center font-bold ring-1 ring-white/20 transition-transform duration-200 group-hover:scale-105">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-sm font-extrabold tracking-tight text-slate-900">
            Optimic Studio
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-orange-50/80 text-orange-700 border border-orange-200/70">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-500"></span>
            </span>
            Multi-Dataset Active
          </span>
        </div>
      </div>

      {/* Right Controls: Active Dataset Indicator + Upload Button */}
      <div className="flex items-center gap-3">
        {activeDataset && (
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-50 border border-slate-200/80 text-xs transition-all duration-200">
            <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-orange-100 text-orange-600 shrink-0">
              <FileSpreadsheet className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-slate-800 text-[12px] truncate max-w-[200px]">
              {activeDataset.name}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-orange-700 border border-orange-200/60 font-mono">
              {activeDataset.rowCount.toLocaleString()} rows
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="group relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-bold rounded-xl transition-all duration-200 active:scale-98 cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          <span>Upload CSV</span>
        </button>
      </div>
    </header>
  );
}