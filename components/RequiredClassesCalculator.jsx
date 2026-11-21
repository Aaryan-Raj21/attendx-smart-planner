"use client";

import { useState } from "react";
import { Target, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import {
  calculateRequiredClasses,
  calculateAttendancePercentage,
} from "../lib/attendanceCalculations";

/**
 * RequiredClassesCalculator Component
 * Computes exact consecutive classes required to reach exam eligibility targets
 * with full mathematical proofs and edge-case protection.
 */
export default function RequiredClassesCalculator({ subjects = [], globalTarget = 75 }) {
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id || "custom");
  const [customAttended, setCustomAttended] = useState(18);
  const [customTotal, setCustomTotal] = useState(25);
  const [target, setTarget] = useState(globalTarget);

  let attended = customAttended;
  let total = customTotal;

  if (selectedSubjectId !== "custom") {
    const found = subjects.find((s) => s.id === selectedSubjectId);
    if (found) {
      attended = found.attended;
      total = found.total;
    }
  }

  const currentPct = calculateAttendancePercentage(attended, total);
  const result = calculateRequiredClasses(attended, total, target);

  // Verification numbers if possible
  const verifiedAttended = result.possible && result.count ? attended + result.count : attended;
  const verifiedTotal = result.possible && result.count ? total + result.count : total;
  const verifiedPct = calculateAttendancePercentage(verifiedAttended, verifiedTotal);

  return (
    <div className="attendx-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
          <Target className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            Required Classes Calculator
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Find out exactly how many consecutive classes you must attend to achieve your target percentage.
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Select Subject
          </label>
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500"
          >
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.attended}/{s.total} - {s.percentage.toFixed(1)}%)
              </option>
            ))}
            <option value="custom">Custom Values</option>
          </select>
        </div>

        {selectedSubjectId === "custom" ? (
          <>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Attended Classes
              </label>
              <input
                type="number"
                min="0"
                value={customAttended}
                onChange={(e) => setCustomAttended(Math.max(0, parseInt(e.target.value, 10) || 0))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Total Classes Held
              </label>
              <input
                type="number"
                min="0"
                value={customTotal}
                onChange={(e) => setCustomTotal(Math.max(0, parseInt(e.target.value, 10) || 0))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
              />
            </div>
          </>
        ) : (
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Current Standing
            </label>
            <div className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 text-sm font-semibold">
              {attended} / {total} ({currentPct.toFixed(1)}%)
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Goal Target % (1-100)
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={target}
            onChange={(e) => setTarget(Math.min(100, Math.max(1, parseInt(e.target.value, 10) || 75)))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Main Result Display */}
      <div
        className={`p-5 rounded-2xl border mb-6 ${
          !result.possible
            ? "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200"
            : result.count === 0
            ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
            : "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200"
        }`}
      >
        <div className="flex items-center gap-3 mb-2">
          {!result.possible ? (
            <XCircle className="w-6 h-6 text-rose-600 dark:text-rose-400" />
          ) : result.count === 0 ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <AlertCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          )}
          <h3 className="text-lg font-black">
            {!result.possible
              ? "Mathematically Impossible!"
              : result.count === 0
              ? "Target Already Achieved!"
              : `Attend Next ${result.count} Consecutive Class${result.count === 1 ? "" : "es"}`}
          </h3>
        </div>

        <p className="text-sm mb-3">{result.message}</p>

        {/* Step-by-Step Viva Formula Explanation */}
        <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-900/70 text-xs font-mono border border-slate-200 dark:border-slate-800 space-y-1">
          <p className="font-bold text-slate-700 dark:text-slate-300">Viva Mathematical Proof:</p>
          <p>x = ceil((T * total - 100 * attended) / (100 - T))</p>
          {result.possible ? (
            <>
              <p>
                x = ceil(({target} * {total} - 100 * {attended}) / (100 - {target})) = ceil(({target * total} - {100 * attended}) / {100 - target}) ={" "}
                <strong>{result.count} classes</strong>
              </p>
              {result.count > 0 && (
                <p className="text-indigo-600 dark:text-indigo-400">
                  Verification: ({attended} + {result.count}) / ({total} + {result.count}) = {verifiedAttended} / {verifiedTotal} = {verifiedPct.toFixed(2)}% &gt;= {target}%
                </p>
              )}
            </>
          ) : (
            <p className="text-rose-600 dark:text-rose-400 font-bold">
              Edge Case: Denominator (100 - {target}) = 0 or target 100% impossible after missed classes.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
