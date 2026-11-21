import Link from "next/link";
import { GraduationCap, Home, ArrowLeft } from "lucide-react";

/**
 * Custom 404 Not Found Page
 */
export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="attendx-card max-w-md w-full p-8 text-center animate-slide-up shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-4">
          <GraduationCap className="w-8 h-8" />
        </div>

        <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400 block mb-2">
          404
        </span>

        <h1 className="text-xl font-black text-slate-900 dark:text-white mb-2">
          Page Not Found
        </h1>

        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          The planner page you are looking for does not exist or has been relocated.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all active:scale-95"
          >
            <Home className="w-4 h-4" /> Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
