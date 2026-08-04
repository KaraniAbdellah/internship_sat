import { useState } from 'react';
import { SquarePen, FileSpreadsheet, PanelLeftClose, PanelLeft } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onNotify: (msg: string) => void;
}

const USER_SESSIONS = [
  'Formulaire chauffeur Maroc',
  'Frontend Dossier Logic Update',
  'White Gradient Button',
  'Button Color Update',
  'React Router Setup',
  'Development Best Practices',
  'Correction grammaire CV',
];

export default function Sidebar({ isOpen, onToggle, onNotify }: SidebarProps) {
  const [activeSession, setActiveSession] = useState<string | null>(null);

  const handleSelectSession = (name: string) => {
    setActiveSession(name);
    onNotify(`Session "${name}" selected`);
  };

  const handleExcelImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onNotify(`Excel file "${file.name}" uploaded — Coming soon!`);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="fixed top-3 left-3 z-40 p-2 text-slate-600 hover:text-[#ff1d00] hover:bg-orange-50 rounded-xl transition-colors cursor-pointer"
        title="Open Sidebar"
      >
        <PanelLeft className="w-5 h-5" />
      </button>
    );
  }

  return (
    <aside className="w-64 h-screen bg-[#fafafa] border-r border-slate-200/80 flex flex-col justify-between p-3 select-none flex-shrink-0">
      <div className="flex flex-col gap-3">
        {/* Top Actions: New Chat & Toggle Sidebar */}
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => onNotify('New Chat created')}
            className="flex-1 flex items-center gap-2 text-[#ff1d00] bg-orange-50 hover:bg-orange-100/80 border border-[#ff1d00]/20 text-sm font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer"
          >
            <SquarePen className="w-4 h-4" />
            <span>New chat</span>
          </button>
          <button
            onClick={onToggle}
            className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-200/50 rounded-xl transition-colors cursor-pointer"
            title="Close Sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>

        {/* Import Excel File Action */}
        <label className="flex items-center justify-center gap-2 px-3 py-2 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-xl cursor-pointer transition-colors">
          <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
          <span>Import Excel File</span>
          <input
            type="file"
            accept=".xlsx, .xls, .csv"
            onChange={handleExcelImport}
            className="hidden"
          />
        </label>

        {/* User Sessions List */}
        <div className="mt-2">
          <span className="px-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Your Sessions
          </span>
          <p className="px-2 text-sm text-slate-500">Sorry, no sessions yet.</p>
        </div>
      </div>

      {/* User Footer */}
      <div className="pt-3 border-t border-slate-200/80 flex items-center gap-2.5 px-2">
        <div className="w-8 h-8 rounded-full bg-[#ff1d00] text-white flex items-center justify-center text-xs font-black shadow-xs">
          AK
        </div>
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold text-slate-900 leading-tight">Abdellah Karani</span>
          <span className="text-[11px] text-[#ff1d00] font-medium leading-tight">Free Plan</span>
        </div>
      </div>
    </aside>
  );
}
