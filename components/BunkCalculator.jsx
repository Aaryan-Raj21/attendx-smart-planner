"use client";

import { useState } from "react";
import { Calculator, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { calculateBunkableClasses, calculateAttendancePercentage } from "../lib/attendanceCalculations";

/**
 * BunkCalculator Component
 * Interactive calculator computing allowable bunks, resulting percentages,
 * and a scenario table showing the exact impact of skipping classes.
 */
export default function BunkCalculator({ subjects = [], globalTarget = 75 }) {
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id || "custom");
  const [customAttended, setCustomAttended] = useState(22);
  const [customTotal, setCustomTotal] = useState(25);
  const [target, setTarget] = useState(globalTarget);

  // Find active subject data or use custom input
  let attended = customAttended;
  let total = customTotal;
  let subjectName = "Custom Calculation";

  if (selectedSubjectId !== "custom") {
    const found = subjects.find((s) => s.id === selectedSubjectId);
    if (found) {
      attended = found.attended;
      total = found.total;
      subjectName = found.name;
    }
  }

  const currentPct = calculateAttendancePercentage(attended, total);
  const bunkResult = calculateBunkableClasses(attended, total, target);

  // Generate impact table for skipping 1, 2, 3, 4, 5 classes
  const impactScenarios = [1, 2, 3, 4, 5].map((skipCount) => {
    const newTotal = total + skipCount;
    const newPct = calculateAttendancePercentage(attended, newTotal);
    const isSafe = newPct >= target;
    return {
      skipCount,
      newTotal,
      newPct,
      isSafe,
    };
  });

  return (
    <div className="attendx-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            Bunk Calculator
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Determine how many classes you can skip while remaining at or above your required percentage.
          </p>
        </div>
      </div>

      {/* Input Selector Grid */}
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
                {s.name} ({s.attended}/{s.total})
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
              Current Status
            </label>
            <div className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 text-sm font-semibold">
              {attended} / {total} attended ({currentPct.toFixed(1)}%)
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Target Percentage (%)
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

      {/* Main Calculation Result Banner */}
      <div
        className={`p-5 rounded-2xl border mb-6 ${
          bunkResult.count > 0
            ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
            : "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200"
        }`}
      >
        <div className="flex items-center gap-3 mb-2">
          {bunkResult.count > 0 ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          )}
          <h3 className="text-lg font-black">
            {bunkResult.count > 0
              ? `You can safely bunk ${bunkResult.count} class${bunkResult.count === 1 ? "" : "es"}!`
              : "Zero Bunk Allowance!"}
          </h3>
        </div>

        <p className="text-sm mb-3">{bunkResult.message}</p>

        {/* Step-by-Step Viva Formula Explanation */}
        <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-900/70 text-xs font-mono border border-slate-200 dark:border-slate-800 space-y-1">
          <p className="font-bold text-slate-700 dark:text-slate-300">Viva Mathematical Proof:</p>
          <p>b = floor((100 * attended / T) - total)</p>
          <p>
            b = floor((100 * {attended} / {target}) - {total}) = floor({((100 * attended) / target).toFixed(2)} - {total}) ={" "}
            <strong>{bunkResult.count} classes</strong>
          </p>
          {bunkResult.count > 0 && (
            <p className="text-emerald-600 dark:text-emerald-400">
              Resulting Attendance: {attended} / ({total} + {bunkResult.count}) = {bunkResult.resultingPct.toFixed(2)}% &gt;= {target}%
            </p>
          )}
        </div>
      </div>

      {/* Class Skip Simulation Table */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Skip Impact Simulation Table
        </h4>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 font-bold text-slate-700 dark:text-slate-300">
              <tr>
                <th className="p-3">Classes Skipped</th>
                <th className="p-3">Total Classes</th>
                <th className="p-3">Projected Attendance %</th>
                <th className="p-3">Exam Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {impactScenarios.map((row) => (
                <tr key={row.skipCount} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40">
                  <td className="p-3 font-semibold">+{row.skipCount} class{row.skipCount === 1 ? "" : "es"}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">{attended} / {row.newTotal}</td>
                  <td className="p-3 font-bold">{row.newPct.toFixed(2)}%</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase ${
                        row.isSafe
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                          : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                      }`}
                    >
                      {row.isSafe ? "Eligible (Safe)" : "Shortage (Barred)"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
