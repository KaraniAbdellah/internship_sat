import { useContext, useState, useRef, useEffect } from "react";
import { DatasetContext } from "@/global/context/DatasetContext";
import {
  askQuestion,
  startChatWithDataset,
  makeDatasetActive,
} from "@/features/Dashboard/services/chatBot";
import UserDataContext from "@/global/context/UserDataContext";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
}

export default function ChatDatasetPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const datasetCtx = useContext(DatasetContext);
  const activeDataset = datasetCtx?.activeDataset;
  const user = useContext(UserDataContext);

  const isReady = Boolean(activeDataset?.isActive);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const uploadDataset = async () => {
    if (!activeDataset) {
      alert("Please select a dataset first.");
      return;
    }

    setIsUploading(true);
    try {
      const userUid = user?.user_data?.uid || "";

      await startChatWithDataset(
        activeDataset?.rows,
        activeDataset?.id,
        activeDataset.name,
        activeDataset.isActive,
        userUid
      );

      datasetCtx?.setActiveDataset({ ...activeDataset, isActive: true });
      await makeDatasetActive(activeDataset.id);
    } catch (error) {
      console.error("Failed to start chat with dataset:", error);
      alert("Something went wrong while connecting to the dataset.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAskQuestion = async () => {
    const questionText = inputValue.trim();
    if (!questionText || !activeDataset || isThinking) return;

    // 1. Immediately append user question to the chat
    const userMessage: Message = {
      id: crypto.randomUUID(),
      sender: "user",
      text: questionText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsThinking(true);

    try {
      const userUid = user?.user_data?.uid || "";
      const datasetId = activeDataset.id;

      // 2. Request backend Qdrant RAG pipeline
      const result = await askQuestion(questionText, userUid, datasetId);

      // 3. Append assistant response
      if (result?.response) {
        const botMessage: Message = {
          id: crypto.randomUUID(),
          sender: "assistant",
          text: result.response,
        };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        sender: "assistant",
        text: "Sorry, I couldn't process your request. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAskQuestion();
    }
  };

  return (
    <div className="h-full flex flex-col gap-3">
      {/* Header & Status */}
      <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-slate-50/70 px-4 py-3 shadow-xs">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <div className="truncate">
            <p className="text-xs font-bold text-slate-800 truncate">
              {activeDataset?.name || "No Dataset Selected"}
            </p>
            <p className="text-[10px] text-slate-400">
              {activeDataset?.rows?.length ? `${activeDataset.rows.length} rows loaded` : "Select a dataset to begin"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 text-[11px] font-semibold">
          {isUploading ? (
            <span className="flex items-center gap-1.5 text-orange-600 bg-orange-50 border border-orange-200/60 px-2.5 py-0.5 rounded-full">
              <span className="h-2 w-2 animate-spin rounded-full border-2 border-orange-600 border-t-transparent" />
              Syncing
            </span>
          ) : isReady ? (
            <span className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Ready
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
              <span className="h-2 w-2 rounded-full bg-slate-300" />
              Not Connected
            </span>
          )}
        </div>
      </div>

      {/* Connect Button */}
      {!isReady && (
        <button
          onClick={uploadDataset}
          disabled={isUploading || !activeDataset}
          className="group relative flex items-center justify-center gap-2 rounded-2xl bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-3 text-xs font-bold transition-all shadow-sm active:scale-[0.99]"
        >
          {isUploading ? (
            <>
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <span>Indexing Dataset...</span>
            </>
          ) : (
            <>
              <svg className="h-4 w-4 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Connect Dataset for AI Chat</span>
            </>
          )}
        </button>
      )}

      {/* Dynamic Messages Stream */}
      <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1">
        {messages.length === 0 ? (
          <div className="m-auto text-center p-6 text-slate-400">
            <svg className="h-8 w-8 mx-auto mb-2 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-xs font-medium">No messages yet</p>
            <p className="text-[11px] text-slate-400">Ask any question to analyze your dataset.</p>
          </div>
        ) : (
          messages.map((msg) =>
            msg.sender === "user" ? (
              <div
                key={msg.id}
                className="self-end rounded-2xl bg-slate-900 text-white px-4 py-3 text-xs font-semibold max-w-[85%] shadow-xs leading-relaxed"
              >
                {msg.text}
              </div>
            ) : (
              <div
                key={msg.id}
                className="self-start rounded-2xl border border-slate-200/90 bg-white px-4 py-3 text-xs text-slate-800 font-medium leading-relaxed max-w-[90%] shadow-xs"
              >
                {msg.text}
              </div>
            )
          )
        )}

        {/* AI Typing Indicator */}
        {isThinking && (
          <div className="self-start flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-bounce [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-bounce [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-bounce" />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="mt-auto flex items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={!isReady || isThinking}
          placeholder={
            isReady
              ? "Ask about totals, trends, or segments..."
              : "Connect dataset above to enable chat..."
          }
          className="w-full h-11 pl-3.5 pr-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed transition-all"
        />
        <button
          onClick={handleAskQuestion}
          disabled={!isReady || !inputValue.trim() || isThinking}
          type="button"
          className="h-11 px-4 flex items-center justify-center gap-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold transition-all shrink-0 active:scale-95"
        >
          <span>Send</span>
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}