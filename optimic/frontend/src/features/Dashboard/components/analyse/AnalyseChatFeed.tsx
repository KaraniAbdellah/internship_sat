import React from "react";
import { Sparkles, Loader2, AlertCircle } from "lucide-react";
import { DatasetType } from "@/global/context/DatasetContext";
import { SUGGESTED_QUESTIONS } from "@/features/Dashboard/constants/conts";
import { ChartData } from "@/features/Dashboard/services/analyseService";
import { InteractiveChartCard } from "./InteractiveChartCard";

export interface Message {
  sender: "user" | "agent";
  text: string;
  chart?: ChartData | null;
  sql?: string | null;
}

interface Props {
  messages: Message[];
  loading: boolean;
  activeDataset: DatasetType | null;
  onSelectPrompt: (prompt: string) => void;
  endRef: React.RefObject<HTMLDivElement>;
}

export const AnalyseChatFeed: React.FC<Props> = ({
  messages,
  loading,
  activeDataset,
  onSelectPrompt,
  endRef,
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
      {!activeDataset ? (
        <div className="h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto text-gray-500 px-4">
          <AlertCircle className="w-8 h-8 text-orange-400 mb-2" />
          <p className="text-sm font-medium text-gray-700">No active dataset selected</p>
          <p className="text-xs mt-1">Select a dataset from the dropdown to start exploring.</p>
        </div>
      ) : messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto px-4">
          <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-gray-800">
            Explore {activeDataset.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1 mb-6 max-w-md">
            Ask questions in plain English. The agent inspects dynamic columns, runs DuckDB SQL aggregations, and delivers interactive charts.
          </p>

          <div className="flex flex-wrap gap-2 justify-center">
            {SUGGESTED_QUESTIONS.map((sug, i) => (
              <button
                key={i}
                onClick={() => onSelectPrompt(sug)}
                className="text-xs bg-white border border-gray-200 hover:border-orange-500 px-3 py-1.5 rounded-lg text-gray-600 transition shadow-2xs"
              >
                {sug}
              </button>
            ))}
          </div>
        </div>
      ) : (
        messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[95%] sm:max-w-2xl rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm ${
                msg.sender === "user"
                  ? "bg-orange-600 text-white"
                  : "bg-white border border-gray-200 text-gray-800 shadow-xs"
              }`}
            >
              <p className="leading-relaxed">{msg.text}</p>
              {msg.chart && <InteractiveChartCard initialChart={msg.chart} sql={msg.sql} />}
            </div>
          </div>
        ))
      )}

      {loading && (
        <div className="flex items-center gap-2 text-xs text-orange-600 font-medium">
          <Loader2 className="w-4 h-4 animate-spin" />
          Compiling DuckDB query & generating charts...
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
};
