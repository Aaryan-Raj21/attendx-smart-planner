"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  STORAGE_KEYS,
  DEFAULT_SETTINGS,
  SAMPLE_SUBJECTS,
  safeGetStorage,
  safeSetStorage,
  validateSubject,
  exportDataAsJSON,
  parseAndValidateImport,
} from "../lib/storage";
import {
  calculateSubjectMetrics,
  calculateOverallMetrics,
} from "../lib/attendanceCalculations";

/**
 * Custom React hook managing the student's attendance data layer.
 * Persists changes immediately to browser localStorage and guarantees zero hydration mismatches.
 */
export function useAttendanceData() {
  const [subjects, setSubjects] = useState([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Surface helper toast
  const showToast = useCallback((text, type = "success") => {
    setToastMessage({ text, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  }, []);

  // Hydrate from localStorage on client mount
  useEffect(() => {
    try {
      const storedSettings = safeGetStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
      setSettings(storedSettings);

      const storedSubjects = safeGetStorage(STORAGE_KEYS.SUBJECTS, null);
      if (storedSubjects && Array.isArray(storedSubjects) && storedSubjects.length > 0) {
        const validated = storedSubjects.map(validateSubject).filter(Boolean);
        setSubjects(validated);
      } else {
        // First-time visit: Initialize with sample subjects for immediate viva readiness
        setSubjects(SAMPLE_SUBJECTS);
        safeSetStorage(STORAGE_KEYS.SUBJECTS, SAMPLE_SUBJECTS);
      }
    } catch (err) {
      console.error("[useAttendanceData] Initialization error:", err);
      setSubjects(SAMPLE_SUBJECTS);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save subjects whenever they change (after initial hydration)
  const persistSubjects = useCallback((newSubjects) => {
    setSubjects(newSubjects);
    safeSetStorage(STORAGE_KEYS.SUBJECTS, newSubjects);
  }, []);

  // Save settings whenever they change
  const persistSettings = useCallback((newSettings) => {
    setSettings(newSettings);
    safeSetStorage(STORAGE_KEYS.SETTINGS, newSettings);
  }, []);

  /**
   * Adds a new subject to tracking
   */
  const addSubject = useCallback((rawSubject) => {
    const validated = validateSubject({
      ...rawSubject,
      id: `subj_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      history: [],
    });

    if (!validated) {
      showToast("Please enter a valid subject name.", "error");
      return false;
    }

    setSubjects((prev) => {
      const updated = [...prev, validated];
      safeSetStorage(STORAGE_KEYS.SUBJECTS, updated);
      return updated;
    });

    showToast(`Added "${validated.name}" successfully!`, "success");
    return true;
  }, [showToast]);

  /**
   * Updates an existing subject
   */
  const updateSubject = useCallback((id, updates) => {
    setSubjects((prev) => {
      const updated = prev.map((subj) => {
        if (subj.id !== id) return subj;
        const merged = { ...subj, ...updates };
        return validateSubject(merged) || subj;
      });
      safeSetStorage(STORAGE_KEYS.SUBJECTS, updated);
      return updated;
    });

    showToast("Subject details updated.", "success");
    return true;
  }, [showToast]);

  /**
   * Deletes a subject by ID
   */
  const deleteSubject = useCallback((id) => {
    setSubjects((prev) => {
      const target = prev.find((s) => s.id === id);
      const updated = prev.filter((s) => s.id !== id);
      safeSetStorage(STORAGE_KEYS.SUBJECTS, updated);
      if (target) {
        showToast(`Removed "${target.name}".`, "info");
      }
      return updated;
    });
  }, [showToast]);

  /**
   * Records attendance action ('present', 'absent', 'cancelled')
   */
  const markAttendance = useCallback((subjectId, action) => {
    const today = new Date().toISOString().split("T")[0];
    const logEntry = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
      date: today,
      action: action, // 'present' | 'absent' | 'cancelled'
      timestamp: Date.now(),
    };

    setSubjects((prev) => {
      const updated = prev.map((subj) => {
        if (subj.id !== subjectId) return subj;

        let nextAttended = subj.attended;
        let nextTotal = subj.total;

        if (action === "present") {
          nextAttended += 1;
          nextTotal += 1;
        } else if (action === "absent") {
          nextTotal += 1;
        }
        // If 'cancelled', attendance numbers do not change, but history is recorded

        return {
          ...subj,
          attended: nextAttended,
          total: nextTotal,
          history: [logEntry, ...(subj.history || [])],
        };
      });

      safeSetStorage(STORAGE_KEYS.SUBJECTS, updated);
      return updated;
    });

    const labels = {
      present: "Marked Present (+1)",
      absent: "Marked Absent",
      cancelled: "Marked Class Cancelled",
    };
    showToast(labels[action] || "Attendance updated", action === "absent" ? "warning" : "success");
  }, [showToast]);

  /**
   * Reverts the most recent attendance action for a subject
   */
  const undoLastAction = useCallback((subjectId) => {
    setSubjects((prev) => {
      let undoneAction = null;

      const updated = prev.map((subj) => {
        if (subj.id !== subjectId) return subj;

        if (!subj.history || subj.history.length === 0) {
          return subj;
        }

        const [lastLog, ...remainingHistory] = subj.history;
        undoneAction = lastLog.action;

        let nextAttended = subj.attended;
        let nextTotal = subj.total;

        if (undoneAction === "present") {
          nextAttended = Math.max(0, nextAttended - 1);
          nextTotal = Math.max(0, nextTotal - 1);
        } else if (undoneAction === "absent") {
          nextTotal = Math.max(0, nextTotal - 1);
        }

        return {
          ...subj,
          attended: nextAttended,
          total: nextTotal,
          history: remainingHistory,
        };
      });

      if (undoneAction) {
        safeSetStorage(STORAGE_KEYS.SUBJECTS, updated);
        showToast(`Undid last "${undoneAction}" action.`, "info");
      } else {
        showToast("No recent actions to undo for this subject.", "warning");
      }

      return updated;
    });
  }, [showToast]);

  /**
   * Updates global target percentage
   */
  const updateGlobalTarget = useCallback((newTarget) => {
    const safeTarget = Math.min(100, Math.max(1, parseInt(newTarget, 10) || 75));
    persistSettings({ ...settings, globalTarget: safeTarget });
    showToast(`Global target set to ${safeTarget}%.`, "success");
  }, [settings, persistSettings, showToast]);

  /**
   * Resets all subjects and history to empty state
   */
  const resetAllData = useCallback(() => {
    persistSubjects([]);
    showToast("All attendance data has been wiped.", "info");
  }, [persistSubjects, showToast]);

  /**
   * Reloads standard 5-subject sample dataset
   */
  const loadSampleData = useCallback(() => {
    persistSubjects(SAMPLE_SUBJECTS);
    persistSettings(DEFAULT_SETTINGS);
    showToast("Loaded 5 sample subjects for demonstration!", "success");
  }, [persistSubjects, persistSettings, showToast]);

  /**
   * Exports data to JSON
   */
  const exportData = useCallback(() => {
    exportDataAsJSON(subjects, settings);
    showToast("Downloaded attendance backup JSON file.", "success");
  }, [subjects, settings, showToast]);

  /**
   * Imports data from JSON
   */
  const importData = useCallback((jsonString) => {
    const result = parseAndValidateImport(jsonString);
    if (!result.success) {
      showToast(result.message, "error");
      return false;
    }

    persistSubjects(result.subjects);
    if (result.settings) {
      persistSettings(result.settings);
    }
    showToast(result.message, "success");
    return true;
  }, [persistSubjects, persistSettings, showToast]);

  // Derived metrics with memoization for snappy UI rendering
  const enrichedSubjects = useMemo(() => {
    return subjects.map((subj) => calculateSubjectMetrics(subj, settings.globalTarget));
  }, [subjects, settings.globalTarget]);

  const overallMetrics = useMemo(() => {
    return calculateOverallMetrics(subjects, settings.globalTarget);
  }, [subjects, settings.globalTarget]);

  return {
    isLoaded,
    subjects: enrichedSubjects,
    rawSubjects: subjects,
    settings,
    overallMetrics,
    toastMessage,
    addSubject,
    updateSubject,
    deleteSubject,
    markAttendance,
    undoLastAction,
    updateGlobalTarget,
    resetAllData,
    loadSampleData,
    exportData,
    importData,
    showToast,
  };
}
