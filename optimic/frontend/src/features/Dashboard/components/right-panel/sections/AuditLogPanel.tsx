import { OfferResult } from "../../../types/OfferResult";

type AuditLogPanelProps = {
  offerResult: OfferResult | null;
};

export default function AuditLogPanel({ offerResult }: AuditLogPanelProps) {
  return (
    <div className="space-y-3 text-sm">
      <div className="rounded-xl border border-slate-200 bg-white p-3">
        <p className="text-slate-400 font-bold text-xs">[1. Scoring Agent]</p>
        <p className="text-slate-800 font-semibold mt-1">
          Calculated score {offerResult?.score || "N/A"} based on transaction history.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-3">
        <p className="text-slate-400 font-bold text-xs">[2. Validation Agent]</p>
        <p className="text-emerald-700 font-bold mt-1">
          STATUS: {offerResult?.validation_feedback ? "VALID" : "PENDING"}
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-3">
        <p className="text-slate-400 font-bold text-xs">[3. Optimization Agent]</p>
        <p className="text-slate-700 font-semibold mt-1">
          {offerResult?.optimized_offre
            ? "Completed optimization and improved final offer copy."
            : "Skipped: waiting for generation input."}
        </p>
      </div>
    </div>
  );
}