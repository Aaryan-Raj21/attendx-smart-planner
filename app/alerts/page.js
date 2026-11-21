"use client";

import { useAttendance } from "../../context/AttendanceContext";
import { AlertCircle, AlertTriangle, CheckCircle2, ShieldAlert, ArrowRight } from "lucide-react";
import Link from "next/link";

/**
 * Shortage Alerts & Exam Eligibility Page
 * Comprehensive audit of subject attendance health, warning buffers, and debarment risks.
 */
export default function AlertsPage() {
  const { subjects, settings, overallMetrics } = useAttendance();

  // Sort by priority: Shortage first, Warning second, Safe third
  const sorted = [...subjects].sort((a, b) => {
    const priority = { shortage: 0, warning: 1, safe: 2 };
    return priority[a.status] - priority[b.status];
  });

  const shortages = sorted.filter((s) => s.status === "shortage");
  const warnings = sorted.filter((s) => s.status === "warning");
  const safes = sorted.filter((s) => s.status === "safe");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            Shortage Radar & Exam Debarment Alerts
          </h1>
          <p className="text-xs text-slate-500">
            Audit your eligibility under the university {settings.globalTarget}% requirement policy.
          </p>
        </div>
      </div>

      {/* Critical Shortage Warning Section */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-3 flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4" /> Critical Shortages ({shortages.length})
        </h2>

        {shortages.length === 0 ? (
          <div className="attendx-card p-4 text-xs text-emerald-700 dark:text-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            No subjects are currently below your {settings.globalTarget}% target!
          </div>
        ) : (
          <div className="space-y-3">
            {shortages.map((s) => (
              <div
                key={s.id}
                className="attendx-card p-5 border-rose-200 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-extrabold text-base text-slate-900 dark:text-white">
                      {s.name}
                    </span>
                    {s.code && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300">
                        {s.code}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                    Attended {s.attended} of {s.total} classes (
                    <strong className="text-rose-600 font-bold">{s.percentage.toFixed(1)}%</strong>)
                  </p>
                  <p className="text-xs font-semibold text-rose-700 dark:text-rose-300">
                    {s.requiredPossible ? (
                      <>
                        Recovery Strategy: Must attend the next{" "}
                        <span className="font-extrabold underline">{s.requiredToTarget} consecutive lectures</span> to
                        regain {s.effectiveTarget}% eligibility.
                      </>
                    ) : (
                      <>Mathematical Warning: 100% attendance impossible due to past absences.</>
                    )}
                  </p>
                </div>

                <Link
                  href="/required-calculator"
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shrink-0 text-center shadow-md shadow-rose-500/20 transition-all active:scale-95"
                >
                  Calculate Recovery
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Warning Zone Section */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-3 flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4" /> Warning Zone ({warnings.length})
        </h2>

        {warnings.length === 0 ? (
          <div className="attendx-card p-4 text-xs text-slate-500">
            No subjects are in the warning zone.
          </div>
        ) : (
          <div className="space-y-3">
            {warnings.map((s) => (
              <div
                key={s.id}
                className="attendx-card p-5 border-amber-200 dark:border-amber-900/60 bg-amber-50/30 dark:bg-amber-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-extrabold text-base text-slate-900 dark:text-white">
                      {s.name}
                    </span>
                    {s.code && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300">
                        {s.code}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                    Attended {s.attended} of {s.total} classes (
                    <strong className="text-amber-600 font-bold">{s.percentage.toFixed(1)}%</strong>)
                  </p>
                  <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">
                    High Risk: Standing within 5% of target ({s.effectiveTarget}%). Skipping even 1 class will drop you into critical shortage!
                  </p>
                </div>

                <Link
                  href="/bunk-calculator"
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shrink-0 text-center shadow-md shadow-amber-500/20 transition-all active:scale-95"
                >
                  Check Bunk Limit
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Safe Subjects Section */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4" /> Safe Zone ({safes.length})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {safes.map((s) => (
            <div
              key={s.id}
              className="attendx-card p-4 border-emerald-200/80 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-950/10 flex items-center justify-between"
            >
              <div>
                <p className="font-bold text-sm text-slate-900 dark:text-white">{s.name}</p>
                <p className="text-xs text-slate-500">
                  {s.attended}/{s.total} ({s.percentage.toFixed(1)}%)
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-1 rounded-md">
                +{s.bunkableClasses} bunks
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
