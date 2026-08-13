import { UploadCloud } from 'lucide-react';

export default function DataLoader() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Hello DataLoader</h1>
        <p className="text-sm text-slate-500 mt-1">Upload CSV or Excel files to train and feed your agents.</p>
      </div>

      {/* Example UI File Drop Area */}
      <div className="p-12 bg-white border-2 border-dashed border-slate-200 hover:border-[#c81000] rounded-2xl flex flex-col items-center justify-center transition-colors cursor-pointer text-center">
        <div className="w-12 h-12 rounded-full bg-red-50 text-[#c81000] flex items-center justify-center mb-3">
          <UploadCloud className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-800">Drag & drop your dataset here</h3>
        <p className="text-xs text-slate-400 mt-1">Supports .csv, .xlsx up to 50MB</p>
      </div>
    </div>
  );
}