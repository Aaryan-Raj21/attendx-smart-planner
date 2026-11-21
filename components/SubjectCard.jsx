"use client";

import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Ban,
  Undo2,
  Edit2,
  Trash2,
  History,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/**
 * SubjectCard Component
 * Displays a subject's live attendance metrics, quick action buttons (Present, Absent, Cancelled, Undo),
 * progress bar with status color, and history timeline.
 */
export default function SubjectCard({
  subject,
  onMarkAttendance,
  onUndo,
  onEdit,
  onDelete,
}) {
  const [showHistory, setShowHistory] = useState(false);

  const {
    id,
    name,
    code,
    teacher,
    color,
    attended,
    total,
    effectiveTarget,
    percentage,
    status,
    statusLabel,
    statusBadge,
    progressColor,
    requiredToTarget,
    requiredPossible,
    bunkableClasses,
    resultingBunkPct,
    history = [],
  } = subject;

  return (
    <div className="attendx-card p-5 relative overflow-hidden flex flex-col justify-between group">
      {/* Top Color Accent Line */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5"
        style={{ backgroundColor: color || "#6366f1" }}
      />

      <div>
        {/* Card Header: Subject info & status badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              {code && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  {code}
                </span>
              )}
              {teacher && (
                <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {teacher}
                </span>
              )}
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white truncate" title={name}>
              {name}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full border ${statusBadge}`}
            >
              {statusLabel}
            </span>
          </div>
        </div>

        {/* Attendance Numbers & Percentage */}
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              {percentage.toFixed(1)}%
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              / target {effectiveTarget}%
            </span>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {attended} <span className="font-normal text-slate-500">/ {total}</span>
            </span>
            <p className="text-[10px] text-slate-500">classes attended</p>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 mb-4 overflow-hidden relative">
          <div
            className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
            style={{ width: `${Math.min(100, percentage)}%` }}
          />
          {/* Target marker line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-slate-900/60 dark:bg-white/70 z-10"
            style={{ left: `${effectiveTarget}%` }}
            title={`Required threshold: ${effectiveTarget}%`}
          />
        </div>

        {/* Actionable Advice Insight Pill */}
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 mb-4 text-xs">
          {status === "shortage" ? (
            <div className="flex items-start gap-2 text-rose-600 dark:text-rose-400">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Shortage Alert: </span>
                {requiredPossible ? (
                  <span>
                    Attend next <strong className="font-extrabold">{requiredToTarget}</strong> consecutive
                    classes to recover to {effectiveTarget}%.
                  </span>
                ) : (
                  <span>100% target impossible after absences. Lower target.</span>
                )}
              </div>
            </div>
          ) : bunkableClasses > 0 ? (
            <div className="flex items-start gap-2 text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Safe to Bunk: </span>
                You can skip <strong className="font-extrabold">{bunkableClasses}</strong> more
                class{bunkableClasses === 1 ? "" : "es"} (will drop to {resultingBunkPct.toFixed(1)}%).
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2 text-amber-600 dark:text-amber-400">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Boundary Warning: </span>
                At edge of {effectiveTarget}%. Skipping even 1 class causes shortage!
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Quick Attendance Action Buttons */}
      <div>
        <div className="grid grid-cols-4 gap-2 mb-3">
          {/* Present Button */}
          <button
            onClick={() => onMarkAttendance(id, "present")}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200/80 dark:border-emerald-800 transition-all active:scale-95 text-center group/btn"
            title="Mark Present (+1 attended, +1 total)"
          >
            <CheckCircle className="w-4 h-4 mb-0.5 group-hover/btn:scale-110 transition-transform" />
            <span className="text-[11px] font-bold">Present</span>
          </button>

          {/* Absent Button */}
          <button
            onClick={() => onMarkAttendance(id, "absent")}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200/80 dark:border-rose-800 transition-all active:scale-95 text-center group/btn"
            title="Mark Absent (+0 attended, +1 total)"
          >
            <XCircle className="w-4 h-4 mb-0.5 group-hover/btn:scale-110 transition-transform" />
            <span className="text-[11px] font-bold">Absent</span>
          </button>

          {/* Cancelled Button */}
          <button
            onClick={() => onMarkAttendance(id, "cancelled")}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all active:scale-95 text-center group/btn"
            title="Class Cancelled by Teacher (Does not affect percentage)"
          >
            <Ban className="w-4 h-4 mb-0.5 group-hover/btn:scale-110 transition-transform text-slate-500" />
            <span className="text-[11px] font-bold">Off</span>
          </button>

          {/* Undo Button */}
          <button
            onClick={() => onUndo(id)}
            disabled={!history || history.length === 0}
            className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 text-center group/btn"
            title="Undo last attendance entry"
          >
            <Undo2 className="w-4 h-4 mb-0.5 group-hover/btn:scale-110 transition-transform text-slate-500" />
            <span className="text-[11px] font-bold">Undo</span>
          </button>
        </div>

        {/* Card Footer: History toggle & Edit/Delete actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white font-medium transition-colors"
          >
            <History className="w-3.5 h-3.5" />
            <span>Logs ({history.length})</span>
            {showHistory ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(subject)}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              title="Edit Subject"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(id)}
              className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 text-slate-600 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 transition-colors"
              title="Delete Subject"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Expandable History Drawer */}
        {showHistory && (
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs space-y-1.5 max-h-36 overflow-y-auto animate-fade-in pr-1">
            {history.length === 0 ? (
              <p className="text-slate-400 italic text-center py-2">No attendance logs yet.</p>
            ) : (
              history.map((log) => {
                const badgeStyles = {
                  present: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
                  absent: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300",
                  cancelled: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300",
                };
                return (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50 dark:bg-slate-900/60"
                  >
                    <span className="text-slate-600 dark:text-slate-400">{log.date}</span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${badgeStyles[log.action]}`}
                    >
                      {log.action}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
