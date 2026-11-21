"use client";

import { AlertCircle, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

/**
 * AlertsBanner Component
 * Aggregates all attendance warnings, sorted strictly by risk severity (Shortage first, then Warning, then Safe).
 */
export default function AlertsBanner({ subjects = [], globalTarget = 75 }) {
  if (!subjects || subjects.length === 0) return null;

  // Sort subjects by severity: shortage first, then warning, then safe
  const sorted = [...subjects].sort((a, b) => {
    const priority = { shortage: 0, warning: 1, safe: 2 };
    return priority[a.status] - priority[b.status];
  });

  const shortages = sorted.filter((s) => s.status === "shortage");
  const warnings = sorted.filter((s) => s.status === "warning");

  return (
    <div className="attendx-card p-5 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Attendance Health & Shortage Radar
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {shortages.length > 0
                ? `${shortages.length} subject(s) in critical shortage zone!`
                : warnings.length > 0
                ? `${warnings.length} subject(s) on the warning boundary.`
                : "All subjects are currently in the safe zone!"}
            </p>
          </div>
        </div>

        <Link
          href="/alerts"
          className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
        >
          View Full Report <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grid of alerts */}
      <div className="space-y-2.5">
        {shortages.map((s) => (
          <div
            key={s.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 gap-3"
          >
            <div className="flex items-start sm:items-center gap-2.5 min-w-0">
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5 sm:mt-0" />
              <div className="min-w-0">
                <span className="font-extrabold text-xs text-slate-900 dark:text-white mr-2">
                  {s.name} ({s.code || "Course"}):
                </span>
                <span className="text-xs text-rose-700 dark:text-rose-300">
                  {s.requiredPossible ? (
                    <>
                      Currently at <strong>{s.percentage.toFixed(1)}%</strong>. Must attend next{" "}
                      <strong className="underline underline-offset-2">{s.requiredToTarget} consecutive classes</strong> to reach {s.effectiveTarget}%.
                    </>
                  ) : (
                    <>Target {s.effectiveTarget}% mathematically impossible after absences.</>
                  )}
                </span>
              </div>
            </div>

            <Link
              href="/required-calculator"
              className="text-xs font-bold px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white shrink-0 self-start sm:self-center transition-colors text-center"
            >
              Plan Recovery
            </Link>
          </div>
        ))}

        {warnings.map((s) => (
          <div
            key={s.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 gap-3"
          >
            <div className="flex items-start sm:items-center gap-2.5 min-w-0">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
              <div className="min-w-0">
                <span className="font-extrabold text-xs text-slate-900 dark:text-white mr-2">
                  {s.name}:
                </span>
                <span className="text-xs text-amber-700 dark:text-amber-300">
                  Standing at <strong>{s.percentage.toFixed(1)}%</strong>. You are within 5% above the target threshold. Zero bunk allowance remaining!
                </span>
              </div>
            </div>

            <Link
              href="/bunk-calculator"
              className="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white shrink-0 self-start sm:self-center transition-colors text-center"
            >
              Check Bunk Limit
            </Link>
          </div>
        ))}

        {shortages.length === 0 && warnings.length === 0 && (
          <div className="p-3.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 flex items-center gap-2.5 text-xs text-emerald-800 dark:text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>
              Outstanding job! Every tracked subject meets or exceeds your {globalTarget}% target.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
