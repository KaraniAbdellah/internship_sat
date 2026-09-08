import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check, TrendingUp, CheckCircle2 } from "lucide-react";

export default function ReportView({ report, onCopy, copied }) {
  return (
    <div className="flex flex-col gap-6 bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <span className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">
            Automated Intelligence Brief
          </span>
          <h2 className="text-lg font-bold text-slate-900 mt-0.5">{report.title}</h2>
        </div>
        <button
          onClick={onCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? "Copied" : "Copy Markdown"}</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {report.metrics.map((m, idx) => (
          <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">{m.label}</p>
            <p className="text-base font-black text-slate-900 mt-1">{m.value}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{m.detail}</p>
          </div>
        ))}
      </div>

      {/* Executive Summary */}
      <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200/60">
        <h3 className="text-xs font-bold text-orange-950 flex items-center gap-1.5">
          <TrendingUp className="h-3.5 w-3.5 text-orange-600" />
          Executive Takeaway
        </h3>
        <p className="text-xs text-orange-900 mt-1.5 leading-relaxed font-medium">
          {report.executive_summary}
        </p>
      </div>

      {/* Detailed Analysis */}
      <div className="text-xs text-slate-800 leading-relaxed border-b border-slate-100 pb-6 overflow-x-auto">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ children }) => <h2 className="text-sm font-bold text-slate-900 mt-4 mb-2">{children}</h2>,
            h3: ({ children }) => <h3 className="text-xs font-bold text-slate-800 mt-3 mb-1.5">{children}</h3>,
            p: ({ children }) => <p className="mb-2 leading-relaxed">{children}</p>,
            ul: ({ children }) => <ul className="list-disc pl-4 mb-3 space-y-1">{children}</ul>,
            strong: ({ children }) => <strong className="font-bold text-slate-950">{children}</strong>,
            table: ({ children }) => (
              <div className="my-3 overflow-x-auto rounded-xl border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200 text-left text-xs">{children}</table>
              </div>
            ),
            thead: ({ children }) => <thead className="bg-slate-50 font-bold text-slate-700">{children}</thead>,
            th: ({ children }) => <th className="px-3 py-2 border-b border-slate-200 uppercase text-[10px]">{children}</th>,
            td: ({ children }) => <td className="px-3 py-2 border-b border-slate-100">{children}</td>,
          }}
        >
          {report.detailed_analysis}
        </ReactMarkdown>
      </div>

      {/* Action Items */}
      <div>
        <h3 className="text-xs font-bold text-slate-900 mb-3 flex items-center gap-1.5">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          Recommended Next Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {report.action_items.map((action, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl border border-slate-100 bg-slate-50/60 text-xs text-slate-700">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">
                {idx + 1}
              </span>
              <span className="leading-snug">{action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
