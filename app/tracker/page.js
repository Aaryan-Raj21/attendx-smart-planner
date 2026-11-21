"use client";

import { useState } from "react";
import { Plus, CalendarCheck, Search, Filter } from "lucide-react";
import { useAttendance } from "../../context/AttendanceContext";
import SubjectCard from "../../components/SubjectCard";
import SubjectModal from "../../components/SubjectModal";

/**
 * Subject Tracker Page
 * Focused view allowing students to manage all subject enrollments,
 * filter by status (All, Safe, Warning, Shortage), search by name/code, and view attendance logs.
 */
export default function TrackerPage() {
  const {
    subjects,
    settings,
    markAttendance,
    undoLastAction,
    addSubject,
    updateSubject,
    deleteSubject,
  } = useAttendance();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleOpenAdd = () => {
    setEditingSubject(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (subject) => {
    setEditingSubject(subject);
    setModalOpen(true);
  };

  const handleSave = (payload) => {
    if (editingSubject) {
      updateSubject(editingSubject.id, payload);
    } else {
      addSubject(payload);
    }
  };

  // Filtered subjects
  const filtered = subjects.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.code && s.code.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (s.teacher && s.teacher.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === "all" || s.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CalendarCheck className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Subject Attendance Tracker
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Log presence, absence, and cancelled lectures. View real-time percentages and timestamps.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 self-start sm:self-auto transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" /> Add Subject
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by subject name, code (e.g. CS-301), or faculty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "all", label: "All" },
            { id: "safe", label: "Safe" },
            { id: "warning", label: "Warning" },
            { id: "shortage", label: "Shortage" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors shrink-0 ${
                statusFilter === tab.id
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Subject Cards Grid */}
      {filtered.length === 0 ? (
        <div className="attendx-card p-12 text-center text-slate-400">
          No subjects matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((subject) => (
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

      {/* Add / Edit Modal */}
      <SubjectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editingSubject={editingSubject}
        globalTarget={settings.globalTarget}
      />
    </div>
  );
}
