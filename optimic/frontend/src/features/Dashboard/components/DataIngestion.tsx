import { UploadCloud, FileSpreadsheet, CheckCircle2 } from 'lucide-react';

export default function DataIngestion() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
      <h2 className="text-base font-bold text-slate-900">Ingest Data</h2>

      {/* Dropzone */}
      <div className="border-2 border-dashed border-red-200 bg-red-50/20 hover:bg-red-50/40 rounded-2xl p-6 text-center transition cursor-pointer flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-3 shadow-inner">
          <UploadCloud className="w-6 h-6" />
        </div>
        <p className="text-sm font-bold text-slate-700">Drag & Drop files here</p>
        <p className="text-xs text-slate-400 mt-1">Supports .csv, .xlsx up to 50MB</p>

        <button className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-md transition">
          Browse Files
        </button>
      </div>

      {/* Synced File Status */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
        <span className="flex items-center gap-1.5 font-medium truncate">
          <FileSpreadsheet className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          customers_dataset.csv
        </span>
        <span className="text-emerald-600 font-semibold flex items-center gap-1 shrink-0">
          <CheckCircle2 className="w-3.5 h-3.5" /> Synced
        </span>
      </div>
    </div>
  );
}
