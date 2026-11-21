"use client";

import { AlertTriangle, X } from "lucide-react";

/**
 * ResetConfirmModal Component
 * Two-step confirmation modal preventing accidental data loss when wiping records.
 */
export default function ResetConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="attendx-card w-full max-w-md p-6 overflow-hidden shadow-2xl animate-slide-up">
        <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400 mb-3">
          <div className="p-2.5 rounded-xl bg-rose-100 dark:bg-rose-950/60">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
            Reset All Attendance Data?
          </h3>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          This will permanently wipe all subjects, attendance counts, and historical logs from your browser.
          You can re-load sample demo subjects at any time from Settings. Are you sure you wish to proceed?
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-500/20 transition-all active:scale-95"
          >
            Yes, Reset Everything
          </button>
        </div>
      </div>
    </div>
  );
}
