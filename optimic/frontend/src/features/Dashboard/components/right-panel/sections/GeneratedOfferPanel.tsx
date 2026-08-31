import { Copy, Check, Loader2, Sparkles, Award } from "lucide-react";
import { useState, useContext } from "react";
import toast from "react-hot-toast";

import { OfferResultType } from "@/global/types/OfferResultType";
import { OfferResultContext } from "@/global/context/OfferResultContext";

type GeneratedOfferPanelProps = {
  offerResult?: OfferResultType | null;
  isGenerating?: boolean;
  selectedCount?: number;
};

export default function GeneratedOfferPanel({
  offerResult: propOfferResult,
  isGenerating: propIsGenerating,
  selectedCount = 0,
}: GeneratedOfferPanelProps) {
  const offerCtx = useContext(OfferResultContext);

  const offerResult = propOfferResult ?? offerCtx?.offreResult?.[0] ?? null;
  const isGenerating = propIsGenerating ?? false;

  const [copied, setCopied] = useState(false);
  const hasOffer = Boolean(offerResult?.optimized_offre || offerResult?.offre);

  const handleCopy = () => {
    const text = offerResult?.optimized_offre || offerResult?.offre;
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendOffre = () => {
    // Implement the logic to send the offer to the selected customers
    // This could involve calling an API endpoint or performing some action
    toast.success(`Comming Soon ...`);
    
  }

  return (
    <div className="h-full flex flex-col gap-3 bg-white">
      {/* Offer Content Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            Generated Copy
          </span>
          <button
            type="button"
            disabled={!hasOffer || isGenerating}
            onClick={handleCopy}
            className="h-7 px-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            {copied ? (
              <span className="inline-flex items-center gap-1 text-emerald-600">
                <Check className="w-3.5 h-3.5" />
                Copied
              </span>
            ) : (
              <span className="inline-flex items-center gap-1">
                <Copy className="w-3.5 h-3.5" />
                Copy
              </span>
            )}
          </button>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 min-h-36 text-xs leading-relaxed text-slate-800 whitespace-pre-wrap font-sans">
          {isGenerating ? (
            <div className="flex items-center justify-center gap-2 py-8 text-slate-400">
              <Loader2 className="w-4 h-4 animate-spin text-orange-600" />
              <span>Generating tailored offer...</span>
            </div>
          ) : (
            offerResult?.optimized_offre ||
            offerResult?.offre || (
              <span className="text-slate-400">
                Generated offer content will appear here after you click
                Generate.
              </span>
            )
          )}
        </div>
      </div>

      {/* Score Banner (Hides feedback when there is a discount mismatch) */}
      <div className="rounded-xl border border-orange-200/80 bg-orange-50/50 p-3 text-xs text-slate-700 font-medium space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-orange-600 shrink-0" />
            <span className="font-bold text-orange-950 text-[14px]">Offer Score</span>
          </div>
        </div>
        <p className="items-center px-2 py-0.5 rounded-md bg-orange-100 text-orange-800 font-bold text-[12px] border border-orange-200">
          {offerResult?.score || "N/A"}
        </p>
      </div>

      {/* Action CTA */}
      <button
        type="button"
        className="mt-auto h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
        disabled={!hasOffer || selectedCount === 0 || isGenerating}
        onClick={sendOffre}
      >
        Batch Send ({selectedCount})
      </button>
    </div>
  );
}
