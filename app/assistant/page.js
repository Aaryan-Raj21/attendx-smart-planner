"use client";

import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Bot,
  User,
  Send,
  Trash2,
  RotateCcw,
  BookOpen,
  Target,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { useAttendance } from "../../context/AttendanceContext";

const QUICK_ACTIONS = [
  {
    title: "Can I skip tomorrow's class?",
    desc: "Calculate safe bunks for your lowest and highest attendance subjects",
    query: "Can I safely skip classes tomorrow? Analyze my subjects and tell me which ones I can bunk.",
  },
  {
    title: "Which subjects are in danger?",
    desc: "Audit courses below or bordering the 75% target threshold",
    query: "Which of my subjects are currently in the shortage or warning danger zone? How many classes to fix them?",
  },
  {
    title: "Create a 30-Day Recovery Plan",
    desc: "Step-by-step roadmap to achieve 75% before final examinations",
    query: "Make a personalized 30-day attendance recovery schedule so I can reach at least 75% in all my courses.",
  },
  {
    title: "Exam Eligibility Audit",
    desc: "Comprehensive check against college attendance regulations",
    query: "Audit my full academic attendance standing. Am I eligible for semester examinations right now?",
  },
];

/**
 * Dedicated Full-Page AI Assistant
 * Provides a focused chat environment powered by Google Gemini AI with real student attendance context.
 */
export default function AssistantPage() {
  const { subjects, overallMetrics, settings } = useAttendance();
  const [messages, setMessages] = useState([
    {
      id: "initial_assistant_greeting",
      role: "assistant",
      content:
        "Hello! I am your AttendX Academic AI Advisor. I have analyzed your live course records and current semester standing. Ask me which classes you can safely bunk, how many consecutive lectures you need to recover, or ask for a study schedule!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastFailedMessage, setLastFailedMessage] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const buildContext = () => ({
    globalTarget: settings.globalTarget,
    overallPercentage: overallMetrics.overallPercentage,
    totalAttended: overallMetrics.totalAttended,
    totalHeld: overallMetrics.totalHeld,
    statusCounts: {
      safe: overallMetrics.safeCount,
      warning: overallMetrics.warningCount,
      shortage: overallMetrics.shortageCount,
    },
    subjects: subjects.map((s) => ({
      name: s.name,
      code: s.code || "N/A",
      teacher: s.teacher || "N/A",
      attended: s.attended,
      total: s.total,
      percentage: s.percentage,
      target: s.effectiveTarget,
      status: s.status,
      bunkableClasses: s.bunkableClasses,
      requiredToTarget: s.requiredToTarget,
      requiredPossible: s.requiredPossible,
    })),
  });

  const handleSend = async (customQuery = null) => {
    const text = (customQuery !== null ? customQuery : input).trim();
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
      const attendanceSummary = buildContext();
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

      setMessages((prev) => [
        ...prev,
        {
          id: `ai_${Date.now()}`,
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (err) {
      console.error("[Assistant Page Error]:", err);
      setLastFailedMessage(text);
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          role: "assistant",
          isError: true,
          content: err.message || "Unable to reach AttendX Assistant right now. Please retry.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "cleared_greeting",
        role: "assistant",
        content: "Chat session refreshed. What would you like to plan or calculate today?",
      },
    ]);
    setLastFailedMessage(null);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-6 h-6 animate-pulse text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                AttendX AI Assistant
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 uppercase">
                Google Gemini
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Personalized academic attendance advisory powered by live context injection.
            </p>
          </div>
        </div>

        <button
          onClick={clearChat}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 self-start sm:self-auto transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear History
        </button>
      </div>

      {/* Quick Inquiry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {QUICK_ACTIONS.map((action, i) => (
          <button
            key={i}
            onClick={() => handleSend(action.query)}
            disabled={isLoading}
            className="attendx-card p-4 text-left hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group disabled:opacity-50"
          >
            <p className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 mb-1 transition-colors">
              {action.title}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
              {action.desc}
            </p>
          </button>
        ))}
      </div>

      {/* Main Chat Box Container */}
      <div className="attendx-card h-[600px] flex flex-col overflow-hidden shadow-xl">
        {/* Messages Stream */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.role !== "user" && (
                <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
              )}

              <div
                className={`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-indigo-600 text-white rounded-tr-none shadow-md"
                    : m.isError
                    ? "bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200 rounded-tl-none"
                    : "bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200/50 dark:border-slate-800"
                }`}
              >
                <div className="whitespace-pre-wrap">{m.content}</div>

                {m.isError && lastFailedMessage && (
                  <button
                    onClick={() => handleSend(lastFailedMessage)}
                    className="mt-2 flex items-center gap-1.5 font-bold text-xs text-rose-600 dark:text-rose-400 hover:underline"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Retry Question
                  </button>
                )}
              </div>

              {m.role === "user" && (
                <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-pulse" />
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900 rounded-tl-none border border-slate-200/50 dark:border-slate-800 flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">AttendX AI is computing...</span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-4 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3"
        >
          <input
            ref={inputRef}
            type="text"
            maxLength={500}
            placeholder="Ask anything (e.g., 'How many classes can I skip in Operating Systems?')..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold shadow-md shadow-indigo-500/20 transition-all active:scale-95"
          >
            <Send className="w-4 h-4" /> <span>Send</span>
          </button>
        </form>
      </div>

      {/* Security and Privacy Notice */}
      <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          Serverless Context Injection &bull; Rate-Limited &bull; Zero Data Storage on AI Servers
        </span>
        <span className="text-[11px] font-mono">Model: Google Gemini Flash</span>
      </div>
    </div>
  );
}
