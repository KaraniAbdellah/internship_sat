import React, { useContext, useRef, useEffect } from "react";
import { Paperclip, Sparkles, Send } from "lucide-react";
import toast from "react-hot-toast";

import { DatasetContext } from "@/global/context/DatasetContext";
import { CustomerDataContext } from "@/global/context/CustomerDataContext";
import { readTextFile } from "../utils/fileReader";
import { persistPolicy } from "../services/datasetDb";

const MIN_TEXTAREA_HEIGHT = 44; // Initial compact height (px)
const MAX_TEXTAREA_HEIGHT = 200; // Fixed maximum height before scrolling (px)

export default function OfferGenerator() {
  const datasetCtx = useContext(DatasetContext);
  const customerCtx = useContext(CustomerDataContext);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const activeDataset = datasetCtx?.activeDataset;
  const customerData = customerCtx?.customerData || [];
  const policy = activeDataset?.policy || "";

  // ── Auto-adjust textarea height smoothly based on content ──────────
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to calculate true scrollHeight
    textarea.style.height = "auto";
    const nextHeight = Math.min(
      Math.max(textarea.scrollHeight, MIN_TEXTAREA_HEIGHT),
      MAX_TEXTAREA_HEIGHT
    );
    textarea.style.height = `${nextHeight}px`;
  }, [policy]);

  // ── Policy Text Handlers ──────────────────────────────────────────
  const handlePolicyChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (!datasetCtx?.setActiveDataset || !activeDataset) return;

    const updated = { ...activeDataset, policy: text };
    datasetCtx.setActiveDataset(updated);
    datasetCtx.setDatasets((prev) =>
      prev.map((d) => (d.id === updated.id ? updated : d))
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
        prev.map((d) => (d.id === updated.id ? updated : d))
      );
      await persistPolicy(updated.id, text);
      toast.success(`Attached policy from ${file.name}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to attach file.");
    } finally {
      e.target.value = "";
    }
  };

  const handleGenerate = () => {
    if (!activeDataset) {
      toast.error("Please select a dataset first.");
      return;
    }
    if (customerData.length === 0) {
      toast.error("Please select at least one customer record.");
      return;
    }

    console.group("🚀 Generated Marketing Offer Payload");
    console.log("Dataset:", activeDataset.name);
    console.log("Policies:", policy);
    console.log("Selected Targets Count:", customerData.length);
    console.log("Target Audience Data:", customerData);
    console.groupEnd();

    toast.success(`Generated offer for ${customerData.length} selected targets!`);
  };

  return (
    <div className="fixed bottom-6 inset-x-0 max-w-3xl mx-auto px-4 z-40">
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,text/plain"
        onChange={handleTxtUpload}
        className="hidden"
      />

      {/* Floating Card Container */}
      <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-2xl rounded-3xl p-3.5 space-y-2 ring-4 ring-orange-600/5 transition-all duration-200">
        {/* Dynamic Expanding Textarea */}
        <textarea
          ref={textareaRef}
          rows={1}
          value={policy}
          onChange={handlePolicyChange}
          placeholder="Type offer policy rules (e.g. max discount 15%, exclusive for inactive legal partners)..."
          className="w-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent px-2 resize-none leading-relaxed overflow-y-auto transition-[height] duration-150 ease-out"
          style={{
            minHeight: `${MIN_TEXTAREA_HEIGHT}px`,
            maxHeight: `${MAX_TEXTAREA_HEIGHT}px`,
          }}
        />

        {/* Bottom Actions Bar */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-100 px-1">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 text-[11px] font-semibold cursor-pointer transition"
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
            disabled={customerData.length === 0}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-2xl shadow-xs transition-all cursor-pointer ${
              customerData.length > 0
                ? "bg-orange-600 hover:bg-orange-700 text-white shadow-orange-600/20 active:scale-95"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Offer</span>
            <Send className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}