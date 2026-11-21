/**
 * AttendX: Core Attendance Calculation Engine
 * 
 * This module houses all mathematical formulas for attendance tracking, bunk calculation,
 * requirement planning, and future scenario prediction.
 * 
 * =========================================================================================
 * 5 VERIFIED MATHEMATICAL EXAMPLES IN COMMENTS (As per Academic Verification Standard):
 * =========================================================================================
 * 
 * Example 1: Attended = 18, Total = 25, Target = 75%
 *   - Attendance %: (18 / 25) * 100 = 72.00% (Status: Shortage, below 75%)
 *   - Required classes: ceil((75 * 25 - 100 * 18) / (100 - 75)) = ceil((1875 - 1800) / 25)
 *                       = ceil(75 / 25) = 3 consecutive classes.
 *   - Verification: (18 + 3) / (25 + 3) = 21 / 28 = 75.00%. Exactly reaches target!
 *   - Bunkable classes: floor((100 * 18 / 75) - 25) = floor(24 - 25) = -1 -> clamped to 0.
 * 
 * Example 2: Attended = 22, Total = 25, Target = 75%
 *   - Attendance %: (22 / 25) * 100 = 88.00% (Status: Safe, > 80%)
 *   - Required classes: 0 (Already well above the 75% threshold).
 *   - Bunkable classes: floor((100 * 22 / 75) - 25) = floor(29.333 - 25) = floor(4.333) = 4 classes.
 *   - Verification: If 4 classes skipped: 22 / (25 + 4) = 22 / 29 = 75.86% >= 75.00%.
 *                   If 5 classes skipped: 22 / (25 + 5) = 22 / 30 = 73.33% < 75.00%.
 *                   Therefore, exactly 4 classes is the safe maximum bunk limit!
 * 
 * Example 3: Attended = 15, Total = 20, Target = 75%
 *   - Attendance %: (15 / 20) * 100 = 75.00% (Status: Warning, exactly at threshold)
 *   - Required classes: 0 (Target currently met).
 *   - Bunkable classes: floor((100 * 15 / 75) - 20) = floor(20 - 20) = 0 classes.
 *   - Verification: Next missed class drops percentage to 15 / 21 = 71.43% (Shortage).
 * 
 * Example 4: Attended = 0, Total = 10, Target = 75%
 *   - Attendance %: (0 / 10) * 100 = 0.00% (Status: Severe Shortage)
 *   - Required classes: ceil((75 * 10 - 100 * 0) / (100 - 75)) = ceil(750 / 25) = 30 classes.
 *   - Verification: (0 + 30) / (10 + 30) = 30 / 40 = 75.00%.
 *   - Bunkable classes: 0.
 * 
 * Example 5: Attended = 9, Total = 10, Target = 100%
 *   - Attendance %: (9 / 10) * 100 = 90.00%.
 *   - Required classes: T = 100, (100 - T) = 0 (division by zero). Since 1 class is already missed,
 *     100% is mathematically impossible. Returns { possible: false, count: null, message: "Impossible to reach 100%" }.
 *   - Bunkable classes: 0.
 * =========================================================================================
 */

/**
 * Calculates current attendance percentage.
 * Formula: (attended / total) * 100, returns 0 if total is 0.
 * 
 * @param {number} attended - Number of classes attended
 * @param {number} total - Total number of classes held
 * @returns {number} Percentage formatted as a float with 2 decimal places precision
 */
export function calculateAttendancePercentage(attended, total) {
  const safeAttended = Math.max(0, Number(attended) || 0);
  const safeTotal = Math.max(0, Number(total) || 0);

  if (safeTotal === 0) {
    return 0;
  }

  // Cap attended at total to avoid corrupted percentage > 100% unless authorized
  const validAttended = Math.min(safeAttended, safeTotal);
  const pct = (validAttended / safeTotal) * 100;
  return Number(pct.toFixed(2));
}

/**
 * Calculates consecutive classes required to reach a target percentage T%.
 * Formula: x = ceil((T * total - 100 * attended) / (100 - T)), minimum 0.
 * 
 * Handles edge cases:
 * - Already above target: returns 0.
 * - Target >= 100 and attended < total: returns impossible.
 * - Total = 0: if target > 0, requires at least 1 class.
 * 
 * @param {number} attended - Number of classes attended
 * @param {number} total - Total number of classes held
 * @param {number} target - Required percentage target T (default 75)
 * @returns {{ possible: boolean, count: number, message: string }}
 */
export function calculateRequiredClasses(attended, total, target = 75) {
  const safeAttended = Math.max(0, Number(attended) || 0);
  const safeTotal = Math.max(0, Number(total) || 0);
  const safeTarget = Math.min(100, Math.max(1, Number(target) || 75));

  // If no classes have happened yet
  if (safeTotal === 0) {
    return {
      possible: true,
      count: 0,
      message: "No classes held yet. Maintain attendance from class 1.",
    };
  }

  const currentPct = (safeAttended / safeTotal) * 100;

  // Already at or above target
  if (currentPct >= safeTarget) {
    return {
      possible: true,
      count: 0,
      message: `You are already at ${currentPct.toFixed(1)}%, which is at or above your ${safeTarget}% target!`,
    };
  }

  // Edge case: Target is 100%, but at least one class was missed
  if (safeTarget >= 100 && safeAttended < safeTotal) {
    return {
      possible: false,
      count: null,
      message: "100% attendance is mathematically impossible because one or more classes have already been missed.",
    };
  }

  // Standard formula: ceil((T * total - 100 * attended) / (100 - T))
  const numerator = safeTarget * safeTotal - 100 * safeAttended;
  const denominator = 100 - safeTarget;

  if (denominator <= 0) {
    return {
      possible: false,
      count: null,
      message: "Target must be strictly less than 100% to recover from absences.",
    };
  }

  const required = Math.ceil(numerator / denominator);
  const count = Math.max(0, required);

  return {
    possible: true,
    count: count,
    message: `Need to attend the next ${count} consecutive class${count === 1 ? "" : "es"} to reach ${safeTarget}%.`,
  };
}

/**
 * Calculates maximum number of classes that can be safely bunked without dropping below target T%.
 * Formula: b = floor((100 * attended / T) - total), minimum 0.
 * 
 * @param {number} attended - Number of classes attended
 * @param {number} total - Total number of classes held
 * @param {number} target - Required target percentage T (default 75)
 * @returns {{ count: number, resultingPct: number, message: string }}
 */
export function calculateBunkableClasses(attended, total, target = 75) {
  const safeAttended = Math.max(0, Number(attended) || 0);
  const safeTotal = Math.max(0, Number(total) || 0);
  const safeTarget = Math.min(100, Math.max(1, Number(target) || 75));

  if (safeTotal === 0 || safeAttended === 0) {
    return {
      count: 0,
      resultingPct: 0,
      message: "No bunk allowance. You must attend upcoming classes.",
    };
  }

  const currentPct = (safeAttended / safeTotal) * 100;

  // If already below target, no bunks allowed
  if (currentPct < safeTarget) {
    return {
      count: 0,
      resultingPct: Number(currentPct.toFixed(2)),
      message: `Already below ${safeTarget}%. You cannot skip any classes.`,
    };
  }

  // Formula: floor((100 * attended / T) - total)
  const maxTotalClasses = (100 * safeAttended) / safeTarget;
  const bunkable = Math.floor(maxTotalClasses - safeTotal);
  const count = Math.max(0, bunkable);

  // Resulting percentage after bunking all allowable classes
  const resultingTotal = safeTotal + count;
  const resultingPct = (safeAttended / resultingTotal) * 100;

  return {
    count: count,
    resultingPct: Number(resultingPct.toFixed(2)),
    message: count > 0
      ? `You can safely skip ${count} class${count === 1 ? "" : "es"}. Attendance will drop to ${resultingPct.toFixed(1)}%.`
      : `On the edge! Skipping even 1 class will drop you below ${safeTarget}%.`,
  };
}

/**
 * Predicts final percentage after n future classes with k attended.
 * Formula: ((attended + k) / (total + n)) * 100
 * 
 * @param {number} attended - Current classes attended
 * @param {number} total - Current classes held
 * @param {number} futureHeld - Total future classes scheduled (n)
 * @param {number} futureAttended - Future classes the student plans to attend (k)
 * @returns {number} Predicted percentage rounded to 2 decimal places
 */
export function calculatePredictedPercentage(attended, total, futureHeld, futureAttended) {
  const safeAttended = Math.max(0, Number(attended) || 0);
  const safeTotal = Math.max(0, Number(total) || 0);
  const safeFutureHeld = Math.max(0, Number(futureHeld) || 0);
  const safeFutureAttended = Math.min(safeFutureHeld, Math.max(0, Number(futureAttended) || 0));

  const finalAttended = safeAttended + safeFutureAttended;
  const finalTotal = safeTotal + safeFutureHeld;

  if (finalTotal === 0) return 0;
  const pct = (finalAttended / finalTotal) * 100;
  return Number(pct.toFixed(2));
}

/**
 * Determines attendance status badge and category:
 * - Safe: >= target + 5% (green)
 * - Warning: >= target and < target + 5% (yellow, within 5% buffer of target)
 * - Shortage: < target (red, critically below requirement)
 * 
 * @param {number} percentage - Current percentage
 * @param {number} target - Target percentage (default 75)
 * @returns {{ status: 'safe'|'warning'|'shortage', label: string, color: string, badgeBg: string, badgeText: string }}
 */
export function getAttendanceStatus(percentage, target = 75) {
  const pct = Number(percentage) || 0;
  const tgt = Number(target) || 75;

  if (pct >= tgt + 5) {
    return {
      status: "safe",
      label: "Safe",
      color: "#10b981", // green-500
      badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
      progressColor: "bg-emerald-500",
      description: "Comfortably above minimum requirement.",
    };
  }

  if (pct >= tgt) {
    return {
      status: "warning",
      label: "Warning",
      color: "#f59e0b", // amber-500
      badgeBg: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
      progressColor: "bg-amber-500",
      description: `Within 5% buffer above ${tgt}%. Avoid skipping.`,
    };
  }

  return {
    status: "shortage",
    label: "Shortage",
    color: "#ef4444", // red-500
    badgeBg: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800",
    progressColor: "bg-rose-500",
    description: `Below required ${tgt}%! Attend classes immediately.`,
  };
}

/**
 * Computes all combined metrics for a single subject.
 * 
 * @param {Object} subject - The subject record
 * @param {number} globalTarget - Fallback target if subject has no specific target
 * @returns {Object} Full subject metrics object
 */
export function calculateSubjectMetrics(subject, globalTarget = 75) {
  const target = Number(subject.target) || Number(globalTarget) || 75;
  const attended = Number(subject.attended) || 0;
  const total = Number(subject.total) || 0;

  const percentage = calculateAttendancePercentage(attended, total);
  const statusInfo = getAttendanceStatus(percentage, target);
  const requiredInfo = calculateRequiredClasses(attended, total, target);
  const bunkInfo = calculateBunkableClasses(attended, total, target);

  return {
    ...subject,
    effectiveTarget: target,
    percentage,
    status: statusInfo.status,
    statusLabel: statusInfo.label,
    statusBadge: statusInfo.badgeBg,
    progressColor: statusInfo.progressColor,
    statusColor: statusInfo.color,
    statusDescription: statusInfo.description,
    requiredToTarget: requiredInfo.count,
    requiredPossible: requiredInfo.possible,
    requiredMessage: requiredInfo.message,
    bunkableClasses: bunkInfo.count,
    bunkMessage: bunkInfo.message,
    resultingBunkPct: bunkInfo.resultingPct,
  };
}

/**
 * Computes aggregate summary metrics across all tracked subjects.
 * 
 * @param {Array<Object>} subjects - List of all subjects
 * @param {number} globalTarget - Default global target percentage
 * @returns {Object} Overall summary object
 */
export function calculateOverallMetrics(subjects = [], globalTarget = 75) {
  if (!subjects || subjects.length === 0) {
    return {
      totalAttended: 0,
      totalHeld: 0,
      overallPercentage: 0,
      status: "safe",
      statusLabel: "Safe",
      statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
      progressColor: "bg-emerald-500",
      totalSubjects: 0,
      safeCount: 0,
      warningCount: 0,
      shortageCount: 0,
      totalBunkable: 0,
      totalRequired: 0,
    };
  }

  let totalAttended = 0;
  let totalHeld = 0;
  let safeCount = 0;
  let warningCount = 0;
  let shortageCount = 0;
  let totalBunkable = 0;
  let totalRequired = 0;

  subjects.forEach((subj) => {
    const metrics = calculateSubjectMetrics(subj, globalTarget);
    totalAttended += metrics.attended;
    totalHeld += metrics.total;

    if (metrics.status === "safe") safeCount++;
    else if (metrics.status === "warning") warningCount++;
    else if (metrics.status === "shortage") shortageCount++;

    totalBunkable += metrics.bunkableClasses;
    if (metrics.requiredPossible && metrics.requiredToTarget > 0) {
      totalRequired += metrics.requiredToTarget;
    }
  });

  const overallPercentage = calculateAttendancePercentage(totalAttended, totalHeld);
  const statusInfo = getAttendanceStatus(overallPercentage, globalTarget);

  return {
    totalAttended,
    totalHeld,
    overallPercentage,
    status: statusInfo.status,
    statusLabel: statusInfo.label,
    statusBadge: statusInfo.badgeBg,
    progressColor: statusInfo.progressColor,
    statusColor: statusInfo.color,
    totalSubjects: subjects.length,
    safeCount,
    warningCount,
    shortageCount,
    totalBunkable,
    totalRequired,
  };
}
