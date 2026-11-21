import "./globals.css";
import AppShell from "../components/AppShell";

export const metadata = {
  title: "AttendX: Smart Attendance Planner",
  description:
    "Subject-wise college attendance tracking, bunk calculator, required classes prediction, shortage alerts, and AI advisor powered by Google Gemini.",
  keywords: "attendance planner, bunk calculator, attendance tracker, 75 percent attendance, college attendance, engineering attendance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen antialiased transition-colors">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
