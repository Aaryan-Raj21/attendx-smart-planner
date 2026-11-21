"use client";

import { useAttendance } from "../../context/AttendanceContext";
import BunkCalculator from "../../components/BunkCalculator";

/**
 * Dedicated Bunk Calculator Page
 */
export default function BunkCalculatorPage() {
  const { subjects, settings } = useAttendance();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <BunkCalculator subjects={subjects} globalTarget={settings.globalTarget} />
    </div>
  );
}
