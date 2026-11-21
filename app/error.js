"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

/**
 * Global Error Boundary Page
 * Catches uncaught runtime exceptions and presents a clean recovery option instead of crashing.
 */
export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    console.error("[AttendX Client Error Caught]:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="attendx-card max-w-md w-full p-8 text-center animate-slide-up shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <h1 className="text-xl font-black text-slate-900 dark:text-white mb-2">
          Something went wrong
        </h1>

        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          AttendX encountered an unexpected client exception. Your attendance data in localStorage remains safe and uncorrupted.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" /> Try Again
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-colors"
          >
            <Home className="w-4 h-4" /> Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
