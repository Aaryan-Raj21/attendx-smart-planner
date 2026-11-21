"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  RotateCcw,
  Bot,
  User,
  AlertCircle,
  Minimize2,
  Trash2,
} from "lucide-react";

const SUGGESTED_PROMPTS = [
  "Which subject is currently in danger?",
  "Can I safely skip tomorrow's classes?",
  "How many classes do I need to reach 75% in all subjects?",
  "Make a personalized 30-day recovery plan",
];

/**
 * AttendX Assistant Chatbot Component
 * Floating conversational interface with real Google Gemini integration,
 * context injection of live student attendance data, retry handling, and suggestion chips.
 */
export default function Chatbot({ subjects = [], overallMetrics = null, globalTarget = 75 }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hello! I am AttendX Assistant, your personal attendance and exam-readiness advisor. Ask me anything about which classes you can bunk, how many classes you need to recover, or ask for a recovery schedule!",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastFailedMessage, setLastFailedMessage] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Construct structured attendance data payload for AI context
  const buildAttendanceContext = () => {
    return {
      globalTarget: globalTarget,
      overallPercentage: overallMetrics?.overallPercentage || 0,
      totalAttended: overallMetrics?.totalAttended || 0,
      totalHeld: overallMetrics?.totalHeld || 0,
      statusCounts: {
        safe: overallMetrics?.safeCount || 0,
        warning: overallMetrics?.warningCount || 0,
        shortage: overallMetrics?.shortageCount || 0,
      },
      subjects: subjects.map((s) => ({
        name: s.name,
        code: s.code || "N/A",
        attended: s.attended,
        total: s.total,
        percentage: s.percentage,
        target: s.effectiveTarget,
        status: s.status,
        bunkableClasses: s.bunkableClasses,
        requiredToTarget: s.requiredToTarget,
        requiredPossible: s.requiredPossible,
      })),
    };
  };

  const handleSend = async (messageToSend = null) => {
    const text = (messageToSend !== null ? messageToSend : input).trim();
    if (!text || isLoading) return;

    const userMessage = {
      id: `usr_${Date.now()}`,
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setLastFailedMessage(null);

    try {
      const attendanceSummary = buildAttendanceContext();
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
          attendanceSummary,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.friendlyMessage || data.error || "Failed to reach AI service.");
      }

      const aiMessage = {
        id: `ai_${Date.now()}`,
        role: "assistant",
        content: data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("[Chatbot UI Error]:", err);
      setLastFailedMessage(text);
      const errorMessage = {
        id: `err_${Date.now()}`,
        role: "assistant",
        isError: true,
        content: err.message || "Unable to reach AttendX Assistant right now. Please check your network and retry.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome_reset",
        role: "assistant",
        content: "Chat history cleared. How can I help you plan your attendance today?",
      },
    ]);
    setLastFailedMessage(null);
  };

  return (
    <>
      {/* Floating Trigger Button with Badge */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold shadow-xl shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-900 group"
            aria-label="Open AttendX AI Assistant"
          >
            <div className="relative">
              <Sparkles className="w-5 h-5 animate-pulse text-amber-300" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-900" />
            </div>
            <span className="text-sm">Ask AttendX AI</span>
          </button>
        )}
      </div>

      {/* Floating Chat Modal / Drawer */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-w-[420px] h-[550px] max-h-[85vh] rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm flex items-center gap-1.5">
                  AttendX Assistant
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-indigo-500/50 uppercase tracking-wider">
                    Gemini
                  </span>
                </h3>
                <p className="text-[11px] text-indigo-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Online & Aware of your data
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-colors"
                title="Clear conversation"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-colors"
                title="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role !== "user" && (
                  <div className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                )}

                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.role === "user"
                      ? "bg-indigo-600 text-white rounded-tr-none shadow-sm"
                      : m.isError
                      ? "bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 rounded-tl-none"
                      : "bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200/50 dark:border-slate-800"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.content}</p>

                  {/* Retry action button if error message */}
                  {m.isError && lastFailedMessage && (
                    <button
                      onClick={() => handleSend(lastFailedMessage)}
                      className="mt-2 flex items-center gap-1.5 font-bold text-rose-600 dark:text-rose-400 hover:underline"
                    >
                      <RotateCcw className="w-3 h-3" /> Retry question
                    </button>
                  )}
                </div>

                {m.role === "user" && (
                  <div className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
                  </div>
                )}
              </div>
            ))}

            {/* AI Typing Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 items-center">
                <div className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
                </div>
                <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 rounded-tl-none border border-slate-200/50 dark:border-slate-800 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Prompt Chips */}
          <div className="px-3 py-2 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/60 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
            {SUGGESTED_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-medium text-slate-700 dark:text-slate-300 hover:border-indigo-400 dark:hover:border-indigo-600 shrink-0 transition-colors disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box and Send Button */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              maxLength={500}
              placeholder="Ask AttendX anything about your classes..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-md shadow-indigo-500/20 transition-all active:scale-95"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
