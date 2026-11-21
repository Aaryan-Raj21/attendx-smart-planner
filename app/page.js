"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Calculator,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { useAttendance } from "../context/AttendanceContext";
import SubjectCard from "../components/SubjectCard";
import SubjectModal from "../components/SubjectModal";
import AttendanceCharts from "../components/AttendanceCharts";
import AlertsBanner from "../components/AlertsBanner";

/**
 * AttendX Main Dashboard Page
 * Central hub displaying overall stats, alerts, subject cards with quick attendance buttons,
 * and visual performance charts.
 */
export default function DashboardPage() {
  const {
    subjects,
    overallMetrics,
    settings,
    markAttendance,
    undoLastAction,
    addSubject,
    updateSubject,
    deleteSubject,
    loadSampleData,
  } = useAttendance();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);

  const handleOpenAdd = () => {
    setEditingSubject(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (subject) => {
    setEditingSubject(subject);
    setModalOpen(true);
  };

  const handleSaveSubject = (payload) => {
    if (editingSubject) {
      updateSubject(editingSubject.id, payload);
    } else {
      addSubject(payload);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner: Greeting and Quick Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Attendance Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Target threshold set to{" "}
            <strong className="text-indigo-600 dark:text-indigo-400 font-extrabold">
              {settings.globalTarget}%
            </strong>
            . Track daily classes, simulate bunks, and avoid examination debarment.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" /> Add Subject
          </button>
          <Link
            href="/bunk-calculator"
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold shadow-sm transition-colors"
          >
            <Calculator className="w-3.5 h-3.5 text-indigo-500" /> Bunk Calc
          </Link>
          <Link
            href="/predictor"
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold shadow-sm transition-colors"
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> Predictor
          </Link>
        </div>
      </div>

      {/* 4 Summary Stats Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Attendance Percentage */}
        <div className="attendx-card p-5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Overall Attendance
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${overallMetrics.statusBadge}`}>
              {overallMetrics.statusLabel}
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">
            {overallMetrics.overallPercentage.toFixed(1)}%
          </div>
          <p className="text-xs text-slate-500">
            {overallMetrics.totalAttended} attended of {overallMetrics.totalHeld} total held
          </p>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
            <div
              className={`h-full rounded-full ${overallMetrics.progressColor}`}
              style={{ width: `${Math.min(100, overallMetrics.overallPercentage)}%` }}
            />
          </div>
        </div>

        {/* Safe Subjects Count */}
        <div className="attendx-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Safe Zone
            </span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-1">
            {overallMetrics.safeCount}{" "}
            <span className="text-xs font-medium text-slate-400">/ {overallMetrics.totalSubjects}</span>
          </div>
          <p className="text-xs text-slate-500">
            Subjects at or above {settings.globalTarget + 5}%
          </p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
            Allowance: {overallMetrics.totalBunkable} total bunks available
          </p>
        </div>

        {/* Warning Subjects Count */}
        <div className="attendx-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Warning Zone
            </span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-amber-600 dark:text-amber-400 mb-1">
            {overallMetrics.warningCount}{" "}
            <span className="text-xs font-medium text-slate-400">/ {overallMetrics.totalSubjects}</span>
          </div>
          <p className="text-xs text-slate-500">
            Within 5% of target ({settings.globalTarget}% - {settings.globalTarget + 5}%)
          </p>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-2 font-medium">
            High risk of dropping if next class is missed
          </p>
        </div>

        {/* Shortage Subjects Count */}
        <div className="attendx-card p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Critical Shortage
            </span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-3xl font-black text-rose-600 dark:text-rose-400 mb-1">
            {overallMetrics.shortageCount}{" "}
            <span className="text-xs font-medium text-slate-400">/ {overallMetrics.totalSubjects}</span>
          </div>
          <p className="text-xs text-slate-500">
            Debarment risk below {settings.globalTarget}%
          </p>
          <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-2 font-medium">
            Need {overallMetrics.totalRequired} consecutive classes to recover
          </p>
        </div>
      </div>

      {/* Shortage Alerts Radar Banner */}
      <AlertsBanner subjects={subjects} globalTarget={settings.globalTarget} />

      {/* Subject Cards Section with Quick Attendance Tracking */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              Tracked Subjects ({subjects.length})
            </h2>
            <p className="text-xs text-slate-500">
              Click Present, Absent, or Cancelled to log daily attendance instantly.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <Plus className="w-4 h-4" /> Add Subject
          </button>
        </div>

        {subjects.length === 0 ? (
          <div className="attendx-card p-12 text-center">
            <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="font-extrabold text-base text-slate-800 dark:text-slate-200 mb-1">
              No Subjects Tracked Yet
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-5">
              Add your first subject to start tracking attendance, or load sample engineering subjects for a quick test.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleOpenAdd}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20"
              >
                Add Your Subject
              </button>
              <button
                onClick={loadSampleData}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Load Sample Data
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {subjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                onMarkAttendance={markAttendance}
                onUndo={undoLastAction}
                onEdit={handleOpenEdit}
                onDelete={deleteSubject}
              />
            ))}
          </div>
        )}
      </div>

      {/* Visual Analytics & Distribution Charts */}
      {subjects.length > 0 && (
        <div className="pt-4">
          <h2 className="text-lg font-black text-slate-900 dark:text-white mb-4">
            Visual Attendance Analytics
          </h2>
          <AttendanceCharts subjects={subjects} globalTarget={settings.globalTarget} />
        </div>
      )}

      {/* Add / Edit Modal */}
      <SubjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveSubject}
        editingSubject={editingSubject}
        globalTarget={settings.globalTarget}
      />
    </div>
  );
}
