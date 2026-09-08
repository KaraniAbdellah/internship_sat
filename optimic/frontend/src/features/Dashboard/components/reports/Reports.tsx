import { useContext, useState } from "react";
import { FileText, Sparkles, Loader2, Database } from "lucide-react";
import { DatasetContext } from "@/global/context/DatasetContext";
import UserDataContext from "@/global/context/UserDataContext";
import { generateReport, ReportResult } from "@/features/Dashboard/services/reportsService";
import ReportView from "./ReportView";
import { REPORT_TYPES } from "@/features/Dashboard/constants/conts";


export default function Reports() {
  const datasetCtx = useContext(DatasetContext);
  const user = useContext(UserDataContext);
  const activeDataset = datasetCtx?.activeDataset;

  const [selectedType, setSelectedType] = useState<string>(REPORT_TYPES[0].id);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [report, setReport] = useState<ReportResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleGenerateReport = async () => {
    if (!activeDataset || !activeDataset.rows?.length) {
      alert("Please select and load an active dataset first.");
      return;
    }

    setIsGenerating(true);
    try {
      const data = await generateReport({
        userUid: user?.user_data?.uid,
        reportType: selectedType,
        dataset: {
          id: activeDataset.id,
          name: activeDataset.name,
          rows: activeDataset.rows ?? [],
          headers: activeDataset.headers ?? [],
        },
      });
      setReport(data);
    } catch (error: any) {
      console.error("Error generating report:", error);
      alert(error.message || "Could not generate report. Check backend logs.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!report) return;
    const fullText = `# ${report.title}\n\n## Executive Summary\n${report.executive_summary}\n\n${report.detailed_analysis}\n\n## Action Items\n${report.action_items.map((a) => `- ${a}`).join("\n")}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-neutral-50 flex flex-col h-full gap-6 p-6 mx-auto overflow-y-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center
        justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <FileText className="h-5 w-5 text-orange-600" />
            Marketing Reporting Agent
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Generate one-click executive summaries and strategic action plans from any loaded dataset.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700">
          <Database className="h-4 w-4 text-orange-600" />
          <span className="truncate max-w-[180px]">{activeDataset?.name || "No Dataset Selected"}</span>
          <span className="text-[10px] text-slate-400 font-normal">
            ({activeDataset?.rows?.length || 0} rows)
          </span>
        </div>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {REPORT_TYPES.map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() => setSelectedType(type.id)}
            className={`p-3.5 text-left rounded-2xl border transition-all ${
              selectedType === type.id
                ? "border-orange-500 bg-orange-50/50 shadow-xs ring-1 ring-orange-500/30"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <p className="text-xs font-bold text-slate-900">{type.id}</p>
            <p className="text-[11px] text-slate-500 mt-1">{type.desc}</p>
          </button>
        ))}
      </div>

      {/* Trigger Button */}
      <div className="flex justify-end">
        <button
          onClick={handleGenerateReport}
          disabled={isGenerating || !activeDataset?.rows?.length}
          className="flex items-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white px-5 py-2.5 text-xs font-bold transition-all shadow-sm active:scale-95"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Analyzing Dataset...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              <span>Generate Executive Report</span>
            </>
          )}
        </button>
      </div>

      {/* Output / Empty State */}
      {report ? (
        <ReportView report={report} onCopy={handleCopy} copied={copied} />
      ) : !isGenerating ? (
        <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-200 rounded-3xl text-center">
          <FileText className="h-10 w-10 text-slate-300 mb-2" />
          <p className="text-xs font-semibold text-slate-700">No report generated yet</p>
          <p className="text-[11px] text-slate-400 mt-1 max-w-sm">
            Select a report focus above and click "Generate Executive Report" to produce an instant breakdown of your active dataset.
          </p>
        </div>
      ) : null}
    </div>
  );
}
