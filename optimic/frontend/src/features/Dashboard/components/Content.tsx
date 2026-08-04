import { useState, KeyboardEvent } from 'react';
import { ArrowUp } from 'lucide-react';

interface ContentProps {
  onNotify: (msg: string) => void;
}

export default function Content({ onNotify }: ContentProps) {
  const [prompt, setPrompt] = useState('');

  const handleSend = () => {
    if (!prompt.trim()) return;
    onNotify(`"${prompt}" — Coming Soon!`);
    setPrompt('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <main className="flex-1 h-screen bg-white flex flex-col justify-between relative overflow-hidden">
      {/* Top Header */}
      <header className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tight text-slate-900">
            Optimic<span className="text-[#ff1d00]">.</span>
          </span>
        </div>
      </header>

      {/* Hero Workspace */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 max-w-2xl w-full mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-8 tracking-tight text-center">
          Comming soon ...
        </h1>

        {/* Clean Simple Input */}
        <div className="w-full bg-slate-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#ff1d00]/30 border border-slate-200/80 rounded-2xl px-4 py-3 flex items-center gap-3 transition-all shadow-xs">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Optimic anything..."
            className="flex-1 bg-transparent text-slate-900 placeholder-slate-400 text-base focus:outline-none"
          />

          <button
            onClick={handleSend}
            disabled={!prompt.trim()}
            className="p-2.5 bg-[#ff1d00] text-white rounded-xl hover:bg-orange-600 disabled:opacity-40 disabled:hover:bg-[#ff1d00] transition-all cursor-pointer active:scale-95 flex-shrink-0"
          >
            <ArrowUp className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <footer className="py-4 text-center text-xs text-slate-400 font-medium">
        Optimic AI can make mistakes. Verify important information.
      </footer>
    </main>
  );
}
