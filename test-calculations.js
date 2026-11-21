import {
  calculateAttendancePercentage,
  calculateRequiredClasses,
  calculateBunkableClasses,
  calculatePredictedPercentage,
  getAttendanceStatus,
} from "./lib/attendanceCalculations.js";

console.log("=== ATTENDX FORMULA VERIFICATION SUITE ===");

let passed = 0;
let total = 0;

function assert(description, actual, expected) {
  total++;
  const isMatch = JSON.stringify(actual) === JSON.stringify(expected);
  if (isMatch) {
    passed++;
    console.log(`[PASS] ${description}`);
  } else {
    console.error(`[FAIL] ${description}\n  Expected: ${JSON.stringify(expected)}\n  Actual:   ${JSON.stringify(actual)}`);
  }
}

// Test 1: Example 1 - 18/25, target 75%
assert("Test 1a: Attendance % for 18/25", calculateAttendancePercentage(18, 25), 72);
assert("Test 1b: Required classes for 18/25 to reach 75%", calculateRequiredClasses(18, 25, 75).count, 3);
assert("Test 1c: Bunkable classes for 18/25 at 75%", calculateBunkableClasses(18, 25, 75).count, 0);

// Test 2: Example 2 - 22/25, target 75%
assert("Test 2a: Attendance % for 22/25", calculateAttendancePercentage(22, 25), 88);
assert("Test 2b: Required classes for 22/25 at 75% (already above)", calculateRequiredClasses(22, 25, 75).count, 0);
assert("Test 2c: Bunkable classes for 22/25 at 75%", calculateBunkableClasses(22, 25, 75).count, 4);

// Test 3: Example 3 - 15/20, target 75% (edge boundary)
assert("Test 3a: Attendance % for 15/20", calculateAttendancePercentage(15, 20), 75);
assert("Test 3b: Required classes for 15/20 at 75%", calculateRequiredClasses(15, 20, 75).count, 0);
assert("Test 3c: Bunkable classes for 15/20 at 75%", calculateBunkableClasses(15, 20, 75).count, 0);

// Test 4: Example 4 - 0/10, target 75%
assert("Test 4a: Attendance % for 0/10", calculateAttendancePercentage(0, 10), 0);
assert("Test 4b: Required classes for 0/10 at 75%", calculateRequiredClasses(0, 10, 75).count, 30);
assert("Test 4c: Bunkable classes for 0/10 at 75%", calculateBunkableClasses(0, 10, 75).count, 0);

// Test 5: Example 5 - 9/10, target 100% (impossible edge case)
assert("Test 5a: Required classes for 9/10 at 100%", calculateRequiredClasses(9, 10, 100).possible, false);

// Test 6: Zero classes held
assert("Test 6a: 0 held gives 0%", calculateAttendancePercentage(0, 0), 0);
assert("Test 6b: 0 held required returns 0 count", calculateRequiredClasses(0, 0, 75).count, 0);
assert("Test 6c: 0 held bunk returns 0 count", calculateBunkableClasses(0, 0, 75).count, 0);

// Test 7: Prediction scenarios - 20/28, 15 future classes
assert("Test 7a: Attend all future (k=n=15)", calculatePredictedPercentage(20, 28, 15, 15), 81.4);
assert("Test 7b: Attend none future (k=0)", calculatePredictedPercentage(20, 28, 15, 0), 46.51);
assert("Test 7c: Attend custom (k=10)", calculatePredictedPercentage(20, 28, 15, 10), 69.77);

// Test 8: Status labels
assert("Test 8a: 85% at 75% target is Safe", getAttendanceStatus(85, 75).status, "safe");
assert("Test 8b: 77% at 75% target is Warning", getAttendanceStatus(77, 75).status, "warning");
assert("Test 8c: 72% at 75% target is Shortage", getAttendanceStatus(72, 75).status, "shortage");

console.log(`\nRESULTS: ${passed} / ${total} tests passed successfully!`);
if (passed === total) {
  console.log("ALL MATHEMATICAL FORMULAS VERIFIED 100% CORRECT!");
} else {
  process.exit(1);
}
