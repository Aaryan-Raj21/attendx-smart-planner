"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  LayoutDashboard,
  CalendarCheck,
  TrendingUp,
  Calculator,
  AlertTriangle,
  Settings as SettingsIcon,
  Menu,
  X,
  Target,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

/**
 * Main Application Navigation Bar
 * Responsive header with active link states, overall attendance pill, and dark mode toggle.
 */
export default function Navbar({ overallMetrics }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/tracker", label: "Subject Tracker", icon: CalendarCheck },
    { href: "/predictor", label: "Predictor", icon: TrendingUp },
    { href: "/bunk-calculator", label: "Bunk Calc", icon: Calculator },
    { href: "/required-calculator", label: "Required Calc", icon: Target },
    { href: "/alerts", label: "Alerts", icon: AlertTriangle },
    { href: "/settings", label: "Settings", icon: SettingsIcon },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                Attend<span className="text-indigo-600 dark:text-indigo-400">X</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 px-1.5 py-0.5 rounded-md border border-indigo-200/60 dark:border-indigo-800">
                PRO
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:block">
              Smart Attendance Planner
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100/60 dark:hover:bg-slate-800/60"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-indigo-600 dark:text-indigo-400" : ""}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Attendance Pill + Theme Toggle */}
        <div className="flex items-center gap-3">
          {overallMetrics && (
            <div
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold ${overallMetrics.statusBadge}`}
              title={`Total: ${overallMetrics.totalAttended} / ${overallMetrics.totalHeld} attended across ${overallMetrics.totalSubjects} subjects`}
            >
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              <span>Overall: {overallMetrics.overallPercentage.toFixed(1)}%</span>
            </div>
          )}

          <ThemeToggle />

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-2 pb-4 space-y-1 animate-slide-up">
          {overallMetrics && (
            <div className={`flex items-center justify-between p-3 rounded-xl border text-xs font-bold mb-2 ${overallMetrics.statusBadge}`}>
              <span>Overall Attendance</span>
              <span>{overallMetrics.overallPercentage.toFixed(1)}% ({overallMetrics.statusLabel})</span>
            </div>
          )}
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
