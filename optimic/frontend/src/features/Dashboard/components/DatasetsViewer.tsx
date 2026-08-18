import React, { useContext, useRef } from "react";
import { Database, Plus, FileSpreadsheet, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { DatasetContext } from "@/global/context/DatasetContext";
import { CustomerDataContext } from "@/global/context/CustomerDataContext";
import { DatasetType } from "@/global/types/DatasetType";
import { parseCSV } from "../utils/csvParser";
import { persistDataset, removeDataset } from "../services/datasetDb";

export default function DatasetsViewer() {
  const datasetCtx = useContext(DatasetContext);
  const customerCtx = useContext(CustomerDataContext);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!datasetCtx) return null;
  const { datasets, setDatasets, activeDataset, setActiveDataset } = datasetCtx;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
      setDatasets((prev) => [newDataset, ...prev]);
      setActiveDataset(newDataset);
      customerCtx?.setCustomerData([]);
      toast.success(`Imported ${file.name}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to process CSV.");
    } finally {
      e.target.value = "";
    }
  };

  const handleSelectDataset = (dataset: DatasetType) => {
    setActiveDataset(dataset);
    customerCtx?.setCustomerData([]);
  };

  const handleDeleteDataset = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    await removeDataset(id);
    const remaining = datasets.filter((d) => d.id !== id);
    setDatasets(remaining);

    if (activeDataset?.id === id) {
      setActiveDataset(remaining.length > 0 ? remaining[0] : null);
      customerCtx?.setCustomerData([]);
    }
    toast.success("Dataset deleted.");
  };

  return (
    <aside className="w-64 border-r border-orange-100/80 bg-white/70 backdrop-blur-sm p-4 flex flex-col justify-between shrink-0 select-none min-h-[calc(100vh-4rem)]">
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="hidden"
      />

      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between px-1 text-xs font-bold text-slate-800">
          <div className="flex items-center gap-1.5">
            <Database className="w-4 h-4 text-orange-600" />
            <span className="uppercase tracking-wider text-[11px]">
              Datasets ({datasets.length})
            </span>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-orange-600 hover:text-orange-700 p-1 rounded-lg hover:bg-orange-50 transition cursor-pointer"
            title="Upload CSV"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* List of Datasets */}
        <div className="space-y-2.5 overflow-y-auto max-h-[calc(100vh-220px)] pr-0.5">
          {datasets.map((item) => {
            const isActive = activeDataset?.id === item.id;

            return (
              <div
                key={item.id}
                onClick={() => handleSelectDataset(item)}
                className={`group relative p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  isActive
                    ? "bg-orange-50/50 border-orange-300 shadow-sm"
                    : "bg-white border-slate-200/80 hover:border-orange-200 hover:bg-orange-50/20"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileSpreadsheet
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? "text-orange-600" : "text-slate-400"
                      }`}
                    />
                    <span
                      className={`text-xs font-bold truncate ${
                        isActive ? "text-slate-900" : "text-slate-700"
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>

                  {datasets.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => handleDeleteDataset(e, item.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 transition shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  <span className="text-slate-500 font-semibold">
                    {item.rowCount} records
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}