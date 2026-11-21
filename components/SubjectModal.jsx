"use client";

import { useState, useEffect } from "react";
import { X, Check } from "lucide-react";

const PRESET_COLORS = [
  "#6366f1", // Indigo
  "#06b6d4", // Cyan
  "#10b981", // Emerald
  "#f59e0b", // Amber
  "#ec4899", // Pink
  "#8b5cf6", // Purple
  "#3b82f6", // Blue
  "#ef4444", // Rose
];

/**
 * SubjectModal Component
 * Modal form for creating a new subject or editing an existing one with full input validation.
 */
export default function SubjectModal({
  isOpen,
  onClose,
  onSave,
  editingSubject = null,
  globalTarget = 75,
}) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [teacher, setTeacher] = useState("");
  const [color, setColor] = useState(PRESET_COLORS[0]);
  const [target, setTarget] = useState(globalTarget);
  const [attended, setAttended] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingSubject) {
      setName(editingSubject.name || "");
      setCode(editingSubject.code || "");
      setTeacher(editingSubject.teacher || "");
      setColor(editingSubject.color || PRESET_COLORS[0]);
      setTarget(editingSubject.target || globalTarget);
      setAttended(editingSubject.attended || 0);
      setTotal(editingSubject.total || 0);
    } else {
      setName("");
      setCode("");
      setTeacher("");
      setColor(PRESET_COLORS[Math.floor(Math.random() * PRESET_COLORS.length)]);
      setTarget(globalTarget);
      setAttended(0);
      setTotal(0);
    }
    setError("");
  }, [editingSubject, globalTarget, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanName = name.trim();

    if (!cleanName) {
      setError("Please enter a subject name.");
      return;
    }

    const numAttended = parseInt(attended, 10) || 0;
    const numTotal = parseInt(total, 10) || 0;
    const numTarget = parseInt(target, 10) || 75;

    if (numAttended < 0 || numTotal < 0) {
      setError("Class counts cannot be negative.");
      return;
    }

    if (numAttended > numTotal) {
      setError("Attended classes cannot exceed total classes held.");
      return;
    }

    if (numTarget < 1 || numTarget > 100) {
      setError("Target percentage must be between 1% and 100%.");
      return;
    }

    const payload = {
      name: cleanName,
      code: code.trim(),
      teacher: teacher.trim(),
      color,
      target: numTarget,
      attended: numAttended,
      total: numTotal,
    };

    onSave(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="attendx-card w-full max-w-lg overflow-hidden shadow-2xl animate-slide-up">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
          <h2 className="font-extrabold text-lg text-slate-900 dark:text-white">
            {editingSubject ? "Edit Subject" : "Add New Subject"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-xs font-semibold text-rose-700 dark:text-rose-300">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Subject Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Operating Systems"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Subject Code (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. CS-301"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Teacher / Faculty (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Dr. Gupta"
                value={teacher}
                onChange={(e) => setTeacher(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Attended Classes
              </label>
              <input
                type="number"
                min="0"
                value={attended}
                onChange={(e) => setAttended(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Total Classes Held
              </label>
              <input
                type="number"
                min="0"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Target % (1-100)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Color Palette Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
              Color Tag
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {PRESET_COLORS.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setColor(c)}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                  style={{ backgroundColor: c }}
                >
                  {color === c && <Check className="w-4 h-4 text-white stroke-[3]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md shadow-indigo-500/20 transition-all active:scale-95"
            >
              {editingSubject ? "Save Changes" : "Create Subject"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
