"use client";

import { createContext, useContext } from "react";
import { useAttendanceData } from "../hooks/useAttendanceData";

const AttendanceContext = createContext(null);

/**
 * AttendanceProvider Component
 * Exposes the global attendance data hook to all pages, Navbar, and Chatbot.
 */
export function AttendanceProvider({ children }) {
  const attendance = useAttendanceData();

  return (
    <AttendanceContext.Provider value={attendance}>
      {children}
    </AttendanceContext.Provider>
  );
}

/**
 * Hook to consume attendance data across any component
 */
export function useAttendance() {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error("useAttendance must be used within an AttendanceProvider");
  }
  return context;
}
