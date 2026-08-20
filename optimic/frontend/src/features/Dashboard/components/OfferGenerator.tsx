import { useContext, useRef, useEffect, useState } from "react";
import { Paperclip, Sparkles, Send, Loader2, X, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";

import { DatasetContext } from "@/global/context/DatasetContext";
import { CustomerDataContext } from "@/global/context/CustomerDataContext";
import { OfferResultContext } from "@/global/context/OfferResultContext";
import { readTextFile } from "../utils/fileReader";
import { persistPolicy } from "../services/datasetDb";
import { generateOffre } from "../services/generateOffre";
import { OfferResultType } from "@/global/types/OfferResultType";

const MIN_TEXTAREA_HEIGHT = 44;
const MAX_TEXTAREA_HEIGHT = 200;

export default function OfferGenerator() {
  const datasetCtx = useContext(DatasetContext);
  const customerCtx = useContext(CustomerDataContext);
  const offreResultCtx = useContext(OfferResultContext);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const activeDataset = datasetCtx?.activeDataset;
  const customerData = customerCtx?.customerData || [];
  const policy = activeDataset?.policy || "";

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    const nextHeight = Math.min(
      Math.max(textarea.scrollHeight, MIN_TEXTAREA_HEIGHT),
      MAX_TEXTAREA_HEIGHT,
    );
    textarea.style.height = `${nextHeight}px`;
  }, [policy]);

  const handlePolicyChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const text = e.target.value;
    if (errorMessage) setErrorMessage(null);

    if (!datasetCtx?.setActiveDataset || !activeDataset) return;

    const updated = { ...activeDataset, policy: text };
    datasetCtx.setActiveDataset(updated);
    datasetCtx.setDatasets((prev) =>
      prev.map((d) => (d.id === updated.id ? updated : d)),
    );
    await persistPolicy(updated.id, text);
  };

  const handleTxtUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !datasetCtx?.setActiveDataset || !activeDataset) return;

    try {
      const text = await readTextFile(file);
      const updated = { ...activeDataset, policy: text };
      datasetCtx.setActiveDataset(updated);
      datasetCtx.setDatasets((prev) =>
        prev.map((d) => (d.id === updated.id ? updated : d)),
      );
      await persistPolicy(updated.id, text);
      toast.success(`Attached policy from ${file.name}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to attach file.");
    } finally {
      e.target.value = "";
    }
  };

  const handleGenerate = async () => {
    if (!activeDataset) {
      toast.error("Please select a dataset first.");
      return;
    }
    if (customerData.length === 0) {
      toast.error("Please select at least one customer record.");
      return;
    }

    setIsLoading(true);
    offreResultCtx?.setIsGenerated(false);
    setErrorMessage(null);

    try {
      const payload = {
        customer_data: JSON.stringify(customerData),
        policies: policy,
      };

      const result: OfferResultType = await generateOffre(payload);
      
      if (offreResultCtx) {
        offreResultCtx.setOffreResult((prev) => [result, ...prev]);
        console.log("Offer result updated:", result);
        offreResultCtx.setIsGenerated(true);
      }

      toast.success(`Generated offer for ${customerData.length} target(s)!`);
    } catch (err: any) {
      const msg =
        err.message || "An unexpected error occurred while generating offer.";
      setErrorMessage(msg);
      toast.error(msg, { duration: 5000 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute bottom-6 inset-x-4 z-30">
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,text/plain"
        onChange={handleTxtUpload}
        className="hidden"
      />

      <div className="bg-white border border-slate-200/90 rounded-3xl p-3.5 space-y-2 ring-4 ring-orange-600/5 transition-all duration-200 shadow-sm">
        {errorMessage && (
          <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
              <span className="truncate font-medium">{errorMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setErrorMessage(null)}
              className="p-1 hover:bg-rose-100 rounded-lg text-rose-500 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <textarea
          ref={textareaRef}
          rows={1}
          value={policy}
          onChange={handlePolicyChange}
          disabled={isLoading}
          placeholder="Type offer policy rules (e.g. max discount 15%, exclusive for inactive legal partners)..."
          className="w-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent px-2 resize-none leading-relaxed overflow-y-auto transition-[height] duration-150 ease-out disabled:opacity-50"
          style={{
            minHeight: `${MIN_TEXTAREA_HEIGHT}px`,
            maxHeight: `${MAX_TEXTAREA_HEIGHT}px`,
          }}
        />

        <div className="flex items-center justify-between pt-1 border-t border-slate-100 px-1">
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 text-[11px] font-semibold cursor-pointer transition disabled:opacity-50"
            >
              <Paperclip className="w-3.5 h-3.5" />
              <span>Attach .txt</span>
            </button>

            <span className="text-[10px] text-slate-400 font-medium select-none">
              {customerData.length} contacts selected
            </span>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={customerData.length === 0 || isLoading}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-2xl transition-all cursor-pointer ${
              customerData.length > 0 && !isLoading
                ? "bg-orange-600 hover:bg-orange-700 text-white active:scale-95"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Generating Offer...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate for {customerData.length} Selected</span>
                <Send className="w-3 h-3" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}