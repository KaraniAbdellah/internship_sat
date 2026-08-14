import { Sparkles, RefreshCw, TrendingUp, ThumbsUp, ThumbsDown, Edit3 } from 'lucide-react';

export default function OffreGenerator() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">Generated Offers</h3>
          <p className="text-xs text-slate-400">Targeted AI recommendations</p>
        </div>
        <button title="Regenerate" className="text-slate-400 hover:text-slate-600 transition">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive / Editable Offer Card */}
      <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="text-xs font-bold text-slate-900">Summer Flash 20% off</h4>
            <p className="text-[10px] text-slate-400">Target: High Value Segment</p>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <TrendingUp className="w-3 h-3" /> 98% Match
          </span>
        </div>

        {/* Editable Copy Area */}
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1">
            <Edit3 className="w-3 h-3" /> Offer Copy:
          </label>
          <textarea
            defaultValue="Hey Alex, exclusive for you: Enjoy 20% off our flagship collection before anyone else! Valid for 48 hours."
            className="w-full bg-white text-xs text-slate-700 border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-red-500 resize-none min-h-[65px]"
          />
        </div>

        {/* Feedback & Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-200/70 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-slate-400">Feedback:</span>
            <button className="p-1.5 rounded-lg border bg-white border-slate-200 text-slate-400 hover:text-emerald-600 transition">
              <ThumbsUp className="w-3.5 h-3.5" />
            </button>
            <button className="p-1.5 rounded-lg border bg-white border-slate-200 text-slate-400 hover:text-rose-600 transition">
              <ThumbsDown className="w-3.5 h-3.5" />
            </button>
          </div>

          <button className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold rounded-lg transition shadow-sm inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Generate Offer
          </button>
        </div>
      </div>

      {/* Offer Cards List (Matches Image) */}
      <div className="space-y-2.5 pt-1">
        <div className="p-3 bg-white border border-slate-100 rounded-xl flex items-center justify-between hover:border-slate-200 transition">
          <div>
            <h5 className="text-xs font-semibold text-slate-800">VIP Early Access</h5>
            <span className="text-[10px] text-slate-400">Target: At Risk Segment</span>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
            92% Match
          </span>
        </div>

        <div className="p-3 bg-white border border-slate-100 rounded-xl flex items-center justify-between hover:border-slate-200 transition">
          <div>
            <h5 className="text-xs font-semibold text-slate-800">Welcome Bundle</h5>
            <span className="text-[10px] text-slate-400">Target: New Segment</span>
          </div>
          <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
            78% Match
          </span>
        </div>
      </div>
    </div>
  );
}
