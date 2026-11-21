"use client";

import { useAttendance } from "../../context/AttendanceContext";
import RequiredClassesCalculator from "../../components/RequiredClassesCalculator";

/**
 * Dedicated Required Classes Calculator Page
 */
export default function RequiredCalculatorPage() {
  const { subjects, settings } = useAttendance();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <RequiredClassesCalculator subjects={subjects} globalTarget={settings.globalTarget} />
    </div>
  );
}
