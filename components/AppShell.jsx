"use client";

import { AttendanceProvider, useAttendance } from "../context/AttendanceContext";
import Navbar from "./Navbar";
import Chatbot from "./Chatbot";
import Toast from "./Toast";
import Link from "next/link";
import { GraduationCap, Heart, ShieldCheck } from "lucide-react";

function ShellInner({ children }) {
  const { subjects, overallMetrics, settings, toastMessage, isLoaded } = useAttendance();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar overallMetrics={overallMetrics} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {!isLoaded ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-slate-400">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium">Loading AttendX Planner...</p>
          </div>
        ) : (
          children
        )}
      </main>

      <Chatbot
        subjects={subjects}
        overallMetrics={overallMetrics}
        globalTarget={settings.globalTarget}
      />

      <Toast toast={toastMessage} />

      {/* Global Academic Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 py-6 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              AttendX: Smart Attendance Planner
            </span>
            <span>&bull; Academic Major Project 2025-26</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Privacy First (100% LocalStorage)
            </span>
            <Link href="/settings" className="hover:underline">
              Settings & Backup
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function AppShell({ children }) {
  return (
    <AttendanceProvider>
      <ShellInner>{children}</ShellInner>
    </AttendanceProvider>
  );
}
