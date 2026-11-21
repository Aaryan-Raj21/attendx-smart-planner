"use client";

import { useState } from "react";
import { TrendingUp, CheckCircle, XCircle, Sparkles } from "lucide-react";
import {
  calculateAttendancePercentage,
  calculatePredictedPercentage,
  getAttendanceStatus,
} from "../lib/attendanceCalculations";

/**
 * AttendancePredictor Component (Pure Logic Engine, No AI)
 * Models 3 deterministic future scenarios: Attend All, Attend None, and Custom Plan.
 */
export default function AttendancePredictor({ subjects = [], globalTarget = 75 }) {
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id || "custom");
  const [futureClasses, setFutureClasses] = useState(15);
  const [customFutureAttended, setCustomFutureAttended] = useState(10);

  // Custom standalone mode inputs
  const [customAttended, setCustomAttended] = useState(20);
  const [customTotal, setCustomTotal] = useState(28);

  let attended = customAttended;
  let total = customTotal;
  let subjectName = "Custom Calculation";
  let target = globalTarget;

  if (selectedSubjectId !== "custom") {
    const found = subjects.find((s) => s.id === selectedSubjectId);
    if (found) {
      attended = found.attended;
      total = found.total;
      subjectName = found.name;
      target = found.effectiveTarget || globalTarget;
    }
  }

  const currentPct = calculateAttendancePercentage(attended, total);

  // Scenario 1: Attend All upcoming classes (k = n)
  const pctAttendAll = calculatePredictedPercentage(attended, total, futureClasses, futureClasses);
  const statusAttendAll = getAttendanceStatus(pctAttendAll, target);

  // Scenario 2: Attend None upcoming classes (k = 0)
  const pctAttendNone = calculatePredictedPercentage(attended, total, futureClasses, 0);
  const statusAttendNone = getAttendanceStatus(pctAttendNone, target);

  // Scenario 3: Attend Custom (k = customFutureAttended)
  const validCustomAttended = Math.min(futureClasses, Math.max(0, customFutureAttended));
  const pctAttendCustom = calculatePredictedPercentage(attended, total, futureClasses, validCustomAttended);
  const statusAttendCustom = getAttendanceStatus(pctAttendCustom, target);

  return (
    <div className="attendx-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
          <TrendingUp className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            Future Attendance Scenario Predictor
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Pure mathematical simulation. See exactly where your attendance ends up before the semester concludes.
          </p>
        </div>
      </div>

      {/* Select Subject & Future Classes Input */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Subject to Predict
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

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Upcoming Classes Remaining (n)
          </label>
          <input
            type="number"
            min="1"
            max="150"
            value={futureClasses}
            onChange={(e) => setFutureClasses(Math.max(1, parseInt(e.target.value, 10) || 1))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Current Status ({subjectName})
          </label>
          <div className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 text-sm font-semibold">
            {attended} / {total} held ({currentPct.toFixed(1)}%)
          </div>
        </div>
      </div>

      {/* 3 Scenario Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {/* Scenario A: Attend 100% of upcoming */}
        <div className="p-5 rounded-2xl border bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Scenario A: Best Case
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusAttendAll.badgeBg}`}>
                {statusAttendAll.label}
              </span>
            </div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-1">
              Attend All Future Classes
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
              Attend all {futureClasses} of {futureClasses} scheduled classes.
            </p>
            <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-2">
              {pctAttendAll.toFixed(1)}%
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Final: {attended + futureClasses} / {total + futureClasses} classes
            </p>
          </div>

          <div className="text-xs font-medium text-emerald-800 dark:text-emerald-300 p-2.5 rounded-xl bg-emerald-100/60 dark:bg-emerald-900/40">
            {pctAttendAll >= target
              ? `Guarantees examination eligibility! (+${(pctAttendAll - currentPct).toFixed(1)}% boost)`
              : `Warning: Even attending 100% reaches only ${pctAttendAll.toFixed(1)}%. Consult faculty.`}
          </div>
        </div>

        {/* Scenario B: Attend 0% of upcoming */}
        <div className="p-5 rounded-2xl border bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                Scenario B: Worst Case
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusAttendNone.badgeBg}`}>
                {statusAttendNone.label}
              </span>
            </div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-1">
              Attend Zero Classes
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
              Bunk all {futureClasses} upcoming classes completely.
            </p>
            <div className="text-3xl font-black text-rose-600 dark:text-rose-400 mb-2">
              {pctAttendNone.toFixed(1)}%
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Final: {attended} / {total + futureClasses} classes
            </p>
          </div>

          <div className="text-xs font-medium text-rose-800 dark:text-rose-300 p-2.5 rounded-xl bg-rose-100/60 dark:bg-rose-900/40">
            {pctAttendNone >= target
              ? `You can still pass eligibility even if you skip all classes!`
              : `Critical Shortage: Drops by -${(currentPct - pctAttendNone).toFixed(1)}%. Immediate exam debarment.`}
          </div>
        </div>

        {/* Scenario C: Custom Goal */}
        <div className="p-5 rounded-2xl border bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                Scenario C: Custom Plan
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusAttendCustom.badgeBg}`}>
                {statusAttendCustom.label}
              </span>
            </div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-1">
              Custom Attendance Target
            </h3>

            {/* Slider to interactively adjust custom planned attendance */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
                <span>Plan to attend:</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                  {validCustomAttended} / {futureClasses} classes
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={futureClasses}
                value={validCustomAttended}
                onChange={(e) => setCustomFutureAttended(parseInt(e.target.value, 10))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mb-2">
              {pctAttendCustom.toFixed(1)}%
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Final: {attended + validCustomAttended} / {total + futureClasses} classes
            </p>
          </div>

          <div className="text-xs font-medium text-indigo-800 dark:text-indigo-300 p-2.5 rounded-xl bg-indigo-100/60 dark:bg-indigo-900/40">
            {pctAttendCustom >= target
              ? `Target achieved! You will satisfy the ${target}% requirement.`
              : `Leaves you ${(target - pctAttendCustom).toFixed(1)}% short of target ${target}%. Increase attendance.`}
          </div>
        </div>
      </div>

      {/* Visual Prediction Comparison Bar */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs">
        <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-2">
          Comparative Prediction Spectrum
        </h4>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span>Scenario A (Attend All):</span>
              <strong className="text-emerald-600 dark:text-emerald-400">{pctAttendAll.toFixed(1)}%</strong>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${Math.min(100, pctAttendAll)}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span>Scenario C (Custom Plan):</span>
              <strong className="text-indigo-600 dark:text-indigo-400">{pctAttendCustom.toFixed(1)}%</strong>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${Math.min(100, pctAttendCustom)}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span>Scenario B (Attend None):</span>
              <strong className="text-rose-600 dark:text-rose-400">{pctAttendNone.toFixed(1)}%</strong>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-rose-500 h-full rounded-full" style={{ width: `${Math.min(100, pctAttendNone)}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
