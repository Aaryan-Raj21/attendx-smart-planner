"use client";

import { useAttendance } from "../../context/AttendanceContext";
import AttendancePredictor from "../../components/AttendancePredictor";

/**
 * Dedicated Attendance Predictor Page
 */
export default function PredictorPage() {
  const { subjects, settings } = useAttendance();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <AttendancePredictor subjects={subjects} globalTarget={settings.globalTarget} />
    </div>
  );
}
