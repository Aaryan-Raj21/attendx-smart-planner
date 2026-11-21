"use client";

import { CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-react";

/**
 * Floating Toast Notification Component
 * Displays non-intrusive feedback for actions like marking present, undo, or saving.
 */
export default function Toast({ toast }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
    error: <XCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-indigo-500 shrink-0" />,
  };

  const borders = {
    success: "border-emerald-200 dark:border-emerald-800",
    warning: "border-amber-200 dark:border-amber-800",
    error: "border-rose-200 dark:border-rose-800",
    info: "border-indigo-200 dark:border-indigo-800",
  };

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 animate-slide-up pointer-events-none">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border ${borders[toast.type] || borders.info} text-slate-800 dark:text-slate-100 max-w-md`}
      >
        {icons[toast.type] || icons.info}
        <span className="text-sm font-medium">{toast.text}</span>
      </div>
    </div>
  );
}
