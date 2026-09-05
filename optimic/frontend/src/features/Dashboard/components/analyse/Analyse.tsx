import React, { useState, useContext, useRef, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { DatasetContext } from "@/global/context/DatasetContext";
import { executeDatasetAnalysis } from "@/features/Dashboard/services/analyseService";
import { AnalyseHeader } from "./AnalyseHeader";
import { AnalyseChatFeed, Message } from "./AnalyseChatFeed";
import { AnalyseInputBar } from "./AnalyseInputBar";

const Analyse: React.FC = () => {
  const context = useContext(DatasetContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  if (!context) {
    return (
      <div className="p-6 text-sm text-red-500 flex items-center gap-2">
        <AlertCircle className="w-5 h-5" />
        <span>DatasetContext missing. Please wrap your application in a DatasetProvider.</span>
      </div>
    );
  }

  const { datasets, activeDataset, setActiveDataset } = context;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSelectDataset = (id: string) => {
    const target = datasets.find((d) => d.id === id);
    if (target) {
      setActiveDataset(target);
      setMessages([]);
    }
  };

  const handleSend = async (questionText?: string) => {
    const q = (questionText || input).trim();
    if (!q || !activeDataset) return;

    if (!activeDataset.headers?.length || !activeDataset.rows?.length) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "agent",
          text: `Dataset "${activeDataset.name}" does not contain readable rows or headers.`,
        },
      ]);
      return;
    }

    setMessages((prev) => [...prev, { sender: "user", text: q }]);
    setInput("");
    setLoading(true);

    try {
      const res = await executeDatasetAnalysis({
        question: q,
        headers: activeDataset.headers,
        rows: activeDataset.rows,
        dataset_name: activeDataset.name,
      });

      setMessages((prev) => [
        ...prev,
        {
          sender: "agent",
          text: res.reply,
          chart: res.chart,
          sql: res.executed_sql,
        },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "agent",
          text: `Analysis error: ${err.message || "Failed to contact analysis server"}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden font-sans">
      <div className="flex-1 flex flex-col h-full">
        <AnalyseHeader
          datasets={datasets}
          activeDataset={activeDataset}
          onSelectDataset={handleSelectDataset}
          onClearChat={() => setMessages([])}
          hasMessages={messages.length > 0}
        />

        <AnalyseChatFeed
          messages={messages}
          loading={loading}
          activeDataset={activeDataset}
          onSelectPrompt={(prompt) => handleSend(prompt)}
          endRef={endRef}
        />

        <AnalyseInputBar
          input={input}
          setInput={setInput}
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          loading={loading}
          activeDataset={activeDataset}
        />
      </div>
    </div>
  );
};

export default Analyse;
