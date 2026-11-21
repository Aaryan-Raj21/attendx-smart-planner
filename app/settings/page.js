"use client";

import { useState } from "react";
import {
  Settings as SettingsIcon,
  Download,
  Upload,
  RefreshCw,
  Trash2,
  ShieldCheck,
  Sparkles,
  Database,
  Sliders,
} from "lucide-react";
import { useAttendance } from "../../context/AttendanceContext";
import ResetConfirmModal from "../../components/ResetConfirmModal";

/**
 * Settings & Data Management Page
 * Handles global target configuration, JSON export/import backups,
 * sample demo dataset initialization, and complete memory wipe.
 */
export default function SettingsPage() {
  const {
    subjects,
    settings,
    updateGlobalTarget,
    exportData,
    importData,
    loadSampleData,
    resetAllData,
    showToast,
  } = useAttendance();

  const [targetInput, setTargetInput] = useState(settings.globalTarget);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const handleTargetSave = (e) => {
    e.preventDefault();
    updateGlobalTarget(targetInput);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === "string") {
        importData(content);
      }
    };
    reader.readAsText(file);
    // Reset input so same file can be uploaded again if needed
    e.target.value = "";
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
          <SettingsIcon className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Settings & Data Management
          </h1>
          <p className="text-xs text-slate-500">
            Configure global requirements, manage JSON backups, and control local browser storage.
          </p>
        </div>
      </div>

      {/* Global Target Requirement Card */}
      <div className="attendx-card p-6">
        <div className="flex items-center gap-2 mb-3">
          <Sliders className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
            Global Attendance Requirement
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          The default minimum percentage required by your institution (commonly 75% for Indian colleges).
          Individual subjects can override this in their settings.
        </p>

        <form onSubmit={handleTargetSave} className="flex items-center gap-4 max-w-sm">
          <div className="flex-1">
            <input
              type="number"
              min="1"
              max="100"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-bold focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all active:scale-95"
          >
            Save Target
          </button>
        </form>
      </div>

      {/* JSON Backup & Portability Card */}
      <div className="attendx-card p-6">
        <div className="flex items-center gap-2 mb-3">
          <Database className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
            Data Backup & Portability
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Export your entire attendance database to a secure JSON file to transfer between devices, or restore a previous backup.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            onClick={exportData}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold shadow-sm transition-colors"
          >
            <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> Export JSON Backup
          </button>

          <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold shadow-sm cursor-pointer transition-colors">
            <Upload className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Import JSON Backup
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Viva Demo & Danger Zone */}
      <div className="attendx-card p-6">
        <h2 className="text-base font-extrabold text-slate-900 dark:text-white mb-2">
          Demonstration & Storage Controls
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Tools for quick evaluator demonstration and local storage management.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Load Sample Data */}
          <div className="p-4 rounded-xl border border-indigo-100 dark:border-indigo-950 bg-indigo-50/30 dark:bg-indigo-950/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 font-bold text-xs text-indigo-900 dark:text-indigo-200 mb-1">
                <Sparkles className="w-4 h-4 text-amber-500" /> Instant Viva Demo
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Loads 5 standard engineering subjects (DSA, DBMS, OS, CN, Math) with authentic attendance percentages and history.
              </p>
            </div>
            <button
              onClick={loadSampleData}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Load Sample Subjects
            </button>
          </div>

          {/* Reset All Data */}
          <div className="p-4 rounded-xl border border-rose-100 dark:border-rose-950 bg-rose-50/30 dark:bg-rose-950/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 font-bold text-xs text-rose-900 dark:text-rose-200 mb-1">
                <Trash2 className="w-4 h-4 text-rose-500" /> Wipe Storage
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Permanently wipes all subjects and logs from your browser. Irreversible without a backup file.
              </p>
            </div>
            <button
              onClick={() => setResetModalOpen(true)}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Reset All Data
            </button>
          </div>
        </div>
      </div>

      {/* Privacy & Architecture Guarantee Note */}
      <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-start gap-3 text-xs text-slate-600 dark:text-slate-400">
        <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-800 dark:text-slate-200">100% Client-Side Privacy: </span>
          AttendX stores all student subjects, attendance records, and logs strictly in your browser&apos;s localStorage.
          No third-party database or server login is used. The Gemini AI receives attendance data only during active questions in chat.
        </div>
      </div>

      {/* Confirmation Modal */}
      <ResetConfirmModal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        onConfirm={resetAllData}
      />
    </div>
  );
}
