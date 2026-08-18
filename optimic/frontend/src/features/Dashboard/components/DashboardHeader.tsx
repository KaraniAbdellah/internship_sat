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
    <header className="h-16 border-b border-orange-100/80 bg-white/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Brand & Badge */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold shadow-md shadow-orange-500/20">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-900">Optimic Studio</span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-orange-50 text-orange-700 border border-orange-200">
            Multi-Dataset Active
          </span>
        </div>
      </div>

      {/* Right Controls: Active Dataset Indicator + Upload Button */}
      <div className="flex items-center gap-3">
        {activeDataset && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-50/60 border border-orange-200/60 text-xs">
            <FileSpreadsheet className="w-3.5 h-3.5 text-orange-600 shrink-0" />
            <span className="font-semibold text-slate-800 text-[11px] truncate max-w-[240px]">
              {activeDataset.name}
            </span>
            <span className="text-orange-600 font-medium text-[10px]">
              ({activeDataset.rowCount} rows)
            </span>
          </div>
        )}

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl shadow-md shadow-orange-600/20 transition flex items-center gap-1.5 cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload CSV</span>
        </button>
      </div>
    </header>
  );
}