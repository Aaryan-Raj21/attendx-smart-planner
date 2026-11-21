"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

/**
 * AttendanceCharts Component
 * Visualizes subject-wise attendance percentages, targets, and status distributions.
 */
export default function AttendanceCharts({ subjects = [], globalTarget = 75 }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="attendx-card p-6 h-72 flex items-center justify-center text-slate-400">
        Loading attendance charts...
      </div>
    );
  }

  if (!subjects || subjects.length === 0) {
    return (
      <div className="attendx-card p-6 text-center text-slate-400 dark:text-slate-500 py-12">
        Add subjects to visualize attendance charts.
      </div>
    );
  }

  // Data for Subject Bar Chart
  const barData = subjects.map((subj) => ({
    name: subj.code || (subj.name.length > 12 ? `${subj.name.substring(0, 10)}...` : subj.name),
    fullName: subj.name,
    percentage: subj.percentage,
    target: subj.effectiveTarget,
    attended: subj.attended,
    total: subj.total,
    status: subj.status,
  }));

  // Data for Status Donut Chart
  let safeCount = 0;
  let warningCount = 0;
  let shortageCount = 0;

  subjects.forEach((s) => {
    if (s.status === "safe") safeCount++;
    else if (s.status === "warning") warningCount++;
    else if (s.status === "shortage") shortageCount++;
  });

  const pieData = [
    { name: "Safe (>= 80%)", value: safeCount, color: "#10b981" },
    { name: "Warning (75-80%)", value: warningCount, color: "#f59e0b" },
    { name: "Shortage (< 75%)", value: shortageCount, color: "#ef4444" },
  ].filter((d) => d.value > 0);

  // Custom tooltip for bar chart
  const CustomBarTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="p-3 rounded-xl bg-slate-900 text-white text-xs shadow-xl border border-slate-700 space-y-1">
          <p className="font-bold text-slate-200">{data.fullName}</p>
          <p className="text-emerald-400">
            Attendance: <strong className="text-white">{data.percentage.toFixed(1)}%</strong>
          </p>
          <p className="text-slate-400">
            Classes: {data.attended} / {data.total}
          </p>
          <p className="text-indigo-300">Target Threshold: {data.target}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Subject-wise Bar Chart */}
      <div className="attendx-card p-5 lg:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Subject Attendance vs Target
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Dashed line marks the target ({globalTarget}%) requirement
            </p>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "#64748b" }}
                interval={0}
                angle={-15}
                textAnchor="end"
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: "#64748b" }}
                unit="%"
              />
              <Tooltip content={<CustomBarTooltip />} />
              <ReferenceLine
                y={globalTarget}
                stroke="#ef4444"
                strokeDasharray="4 4"
                label={{
                  value: `Target ${globalTarget}%`,
                  fill: "#ef4444",
                  fontSize: 10,
                  position: "insideTopRight",
                }}
              />
              <Bar dataKey="percentage" radius={[6, 6, 0, 0]}>
                {barData.map((entry, index) => {
                  let fillColor = "#10b981"; // Safe
                  if (entry.status === "warning") fillColor = "#f59e0b";
                  if (entry.status === "shortage") fillColor = "#ef4444";
                  return <Cell key={`cell-${index}`} fill={fillColor} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status Breakdown Donut Chart */}
      <div className="attendx-card p-5">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-1">
          Attendance Status Breakdown
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Subjects categorized by exam eligibility
        </p>

        <div className="h-56 w-full flex items-center justify-center">
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`pie-cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val, name) => [`${val} Subject(s)`, name]}
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    borderColor: "#334155",
                    borderRadius: "0.75rem",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  iconType="circle"
                  wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-xs text-slate-400">No subject data available</div>
          )}
        </div>
      </div>
    </div>
  );
}
