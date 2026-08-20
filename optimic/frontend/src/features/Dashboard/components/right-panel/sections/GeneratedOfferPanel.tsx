import { Copy, Check } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import { OfferResult } from "../../../types/OfferResult";

type GeneratedOfferPanelProps = {
  offerResult: OfferResult | null;
  isGenerating: boolean;
  selectedCount: number;
};

export default function GeneratedOfferPanel({
  offerResult,
  isGenerating,
  selectedCount,
}: GeneratedOfferPanelProps) {
  const [copied, setCopied] = useState(false);
  const hasOffer = Boolean(offerResult?.optimized_offre || offerResult?.offre);

  const handleCopy = () => {
    const text = offerResult?.optimized_offre || offerResult?.offre;
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Offer copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col gap-3">
      <div className="rounded-2xl border border-orange-200 bg-white p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-black text-orange-500 uppercase tracking-wider">
              Offer Studio
            </p>
            <h3 className="text-lg font-black text-slate-900">Offer for selected targets</h3>
          </div>
          <button
            type="button"
            disabled={!hasOffer}
            onClick={handleCopy}
            className="h-8 px-3 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none"
          >
            {copied ? (
              <span className="inline-flex items-center gap-1"><Check className="w-3.5 h-3.5" />Copied</span>
            ) : (
              <span className="inline-flex items-center gap-1"><Copy className="w-3.5 h-3.5" />Copy</span>
            )}
          </button>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 min-h-36 text-sm text-slate-800 whitespace-pre-wrap">
          {isGenerating
            ? "Generating offer..."
            : offerResult?.optimized_offre ||
              offerResult?.offre ||
              "Generated offer content will appear here after you click Generate."}
        </div>
      </div>

      <div className="rounded-2xl border border-emerald-200 bg-white p-3.5 text-xs text-slate-700 font-semibold">
        Guardrail Verified — {offerResult?.validation_feedback || "No policy breach detected."}
      </div>

      <button
        type="button"
        className="mt-auto h-12 rounded-xl bg-slate-900 text-white font-bold text-sm disabled:opacity-40"
        disabled={!hasOffer || selectedCount === 0}
      >
        Batch Send ({selectedCount})
      </button>
    </div>
  );
}
