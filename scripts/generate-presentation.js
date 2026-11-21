import pptxgen from "pptxgenjs";
import path from "path";
import fs from "fs";

console.log("Generating AttendX Major Project Presentation (.pptx)...");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Aryan Raj";
pres.company = "JECRC University, Jaipur";
pres.title = "AttendX: Smart Attendance Planner";

// Color Palette
const COLORS = {
  primary: "1E1B4B",     // Deep Indigo
  accent: "4F46E5",      // Indigo
  secondary: "0284C7",   // Sky
  darkText: "0F172A",    // Slate 900
  lightText: "475569",   // Slate 600
  bgLight: "F8FAFC",     // Slate 50
  cardBg: "FFFFFF",
  success: "16A34A",
  danger: "DC2626",
  warning: "D97706",
};

const FONT_TITLE = "Times New Roman";
const FONT_BODY = "Times New Roman";

// Helper function to create consistent slide headers
function addSlideHeader(slide, titleText, categoryText = "ATTENDX: MAJOR PROJECT PRESENTATION") {
  // Category Pill / Header
  slide.addText(categoryText.toUpperCase(), {
    x: 0.8,
    y: 0.4,
    w: 8.5,
    h: 0.3,
    fontFace: FONT_BODY,
    fontSize: 10,
    bold: true,
    color: COLORS.accent,
  });

  // Main Slide Title
  slide.addText(titleText, {
    x: 0.8,
    y: 0.65,
    w: 11.5,
    h: 0.6,
    fontFace: FONT_TITLE,
    fontSize: 22,
    bold: true,
    color: COLORS.primary,
  });

  // Decorative header line
  slide.addShape(pres.ShapeType.line, {
    x: 0.8,
    y: 1.25,
    w: 11.7,
    h: 0,
    line: { color: "CBD5E1", width: 1 },
  });

  // Footer on content slides
  slide.addText("JECRC University, Jaipur | Dept. of Computer Science & Engineering", {
    x: 0.8,
    y: 7.0,
    w: 6.0,
    h: 0.3,
    fontFace: FONT_BODY,
    fontSize: 9,
    color: "94A3B8",
  });
}

// ==========================================
// SLIDE 1: TITLE SLIDE
// ==========================================
const s1 = pres.addSlide();
s1.background = { color: COLORS.bgLight };

s1.addShape(pres.ShapeType.rect, {
  x: 0.8,
  y: 0.8,
  w: 11.7,
  h: 5.9,
  fill: { color: "FFFFFF" },
  line: { color: "E2E8F0", width: 1.5 },
});

s1.addText("JECRC UNIVERSITY, JAIPUR", {
  x: 1.2,
  y: 1.2,
  w: 10.9,
  h: 0.4,
  fontFace: FONT_TITLE,
  fontSize: 14,
  bold: true,
  align: "center",
  color: "DC2626", // JECRC Red
});

s1.addText("DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING", {
  x: 1.2,
  y: 1.55,
  w: 10.9,
  h: 0.35,
  fontFace: FONT_BODY,
  fontSize: 11,
  bold: true,
  align: "center",
  color: COLORS.lightText,
});

s1.addText("MAJOR PROJECT PRESENTATION ON", {
  x: 1.2,
  y: 2.1,
  w: 10.9,
  h: 0.3,
  fontFace: FONT_BODY,
  fontSize: 12,
  align: "center",
  color: COLORS.lightText,
});

s1.addText("AttendX: Smart Attendance Planner", {
  x: 1.2,
  y: 2.45,
  w: 10.9,
  h: 0.8,
  fontFace: FONT_TITLE,
  fontSize: 28,
  bold: true,
  align: "center",
  color: COLORS.primary,
});

s1.addText("A Context-Aware Decision Support Engine & Gemini AI Academic Advisor", {
  x: 1.2,
  y: 3.25,
  w: 10.9,
  h: 0.4,
  fontFace: FONT_BODY,
  fontSize: 13,
  italic: true,
  align: "center",
  color: COLORS.accent,
});

s1.addShape(pres.ShapeType.line, {
  x: 3.5,
  y: 3.8,
  w: 6.3,
  h: 0,
  line: { color: COLORS.accent, width: 2 },
});

// Presenter Block
s1.addText("Presented By:\nAryan Raj\nReg. No.: 23BCON123 [Your Reg. No.]\nSession: 2025–2026", {
  x: 1.6,
  y: 4.2,
  w: 4.8,
  h: 1.4,
  fontFace: FONT_BODY,
  fontSize: 12,
  lineSpacing: 18,
  color: COLORS.darkText,
});

// Guide Block
s1.addText("Supervised By:\n[Guide Name]\nAssistant Professor, Dept. of CSE\nJECRC University, Jaipur", {
  x: 7.2,
  y: 4.2,
  w: 4.8,
  h: 1.4,
  fontFace: FONT_BODY,
  fontSize: 12,
  lineSpacing: 18,
  color: COLORS.darkText,
});

// ==========================================
// SLIDE 2: AGENDA / TABLE OF CONTENTS
// ==========================================
const s2 = pres.addSlide();
s2.background = { color: COLORS.bgLight };
addSlideHeader(s2, "Presentation Overview & Agenda");

const agendaCol1 = [
  "1. Introduction & Academic Background",
  "2. Problem Statement & Motivation",
  "3. Objectives & Project Scope",
  "4. Literature Review & Comparative Matrix",
  "5. Feasibility Study (Tech, Econ, Ops)",
  "6. System Architecture & Block Diagram",
  "7. UML Modeling: Use Case & Sequence",
  "8. Data Flow Diagrams (Level 0 & Level 1)",
];

const agendaCol2 = [
  "9. ER Modeling & LocalStorage Schema",
  "10. Core Mathematics & Algorithm Logic",
  "11. Software Stack & Tool Rationale",
  "12. AI Integration & Prompt Guardrails",
  "13. Implementation Modules Walkthrough",
  "14. Testing Plan & 22-Case Verification",
  "15. Live Demonstration & Dashboard Views",
  "16. Conclusion, Future Scope & Q&A",
];

s2.addText(agendaCol1.join("\n\n"), {
  x: 1.0,
  y: 1.6,
  w: 5.4,
  h: 5.0,
  fontFace: FONT_BODY,
  fontSize: 12,
  bold: true,
  color: COLORS.darkText,
});

s2.addText(agendaCol2.join("\n\n"), {
  x: 6.8,
  y: 1.6,
  w: 5.4,
  h: 5.0,
  fontFace: FONT_BODY,
  fontSize: 12,
  bold: true,
  color: COLORS.darkText,
});

// ==========================================
// SLIDE 3: INTRODUCTION & BACKGROUND
// ==========================================
const s3 = pres.addSlide();
s3.background = { color: COLORS.bgLight };
addSlideHeader(s3, "1. Introduction & Academic Context");

s3.addText("The 75% Attendance Ordinance in Engineering Education:", {
  x: 1.0,
  y: 1.5,
  w: 11.0,
  h: 0.4,
  fontFace: FONT_BODY,
  fontSize: 14,
  bold: true,
  color: COLORS.accent,
});

s3.addText(
  "• Statutory Mandatory Mandate: Governing bodies including AICTE and university ordinances strictly require engineering undergraduates to maintain a minimum of 75% lecture and laboratory attendance across every enrolled course.\n\n" +
  "• Debarment Consequences: Failure to achieve the minimum percentage results in student debarment from semester end-term examinations, leading to backlogs, loss of credits, and academic distress.\n\n" +
  "• Complex Student Schedules: Modern engineering students frequently balance classes with hackathons, technical internships, placement drives, campus events, and illness, making strategic attendance management essential.\n\n" +
  "• Retrospective vs Predictive Need: Students need to know forward-looking numbers—how many upcoming classes they can safely skip or must attend—rather than looking at static past percentages.",
  {
    x: 1.0,
    y: 2.0,
    w: 11.2,
    h: 4.8,
    fontFace: FONT_BODY,
    fontSize: 13,
    lineSpacing: 22,
    color: COLORS.darkText,
  }
);

// ==========================================
// SLIDE 4: PROBLEM STATEMENT & MOTIVATION
// ==========================================
const s4 = pres.addSlide();
s4.background = { color: COLORS.bgLight };
addSlideHeader(s4, "2. Problem Statement & Motivation");

s4.addShape(pres.ShapeType.rect, {
  x: 1.0,
  y: 1.6,
  w: 5.2,
  h: 4.8,
  fill: { color: "FEE2E2" },
  line: { color: "FCA5A5", width: 1 },
});
s4.addText("Limitations of Existing College ERPs", {
  x: 1.2,
  y: 1.8,
  w: 4.8,
  h: 0.4,
  fontFace: FONT_TITLE,
  fontSize: 14,
  bold: true,
  color: COLORS.danger,
});
s4.addText(
  "1. Static Retrospection: Merely shows historical percentages (e.g. 68.2%) with no recovery steps.\n\n" +
  "2. Late Shortage Discovery: Students discover shortages in the final 2 weeks when recovery is mathematically impossible.\n\n" +
  "3. Zero Bunk Guidance: Students guess whether they can skip a class, risking instant debarment.\n\n" +
  "4. Frequent Server Downtime: ERP portals crash during exam weeks, blocking access when needed most.",
  {
    x: 1.2,
    y: 2.3,
    w: 4.8,
    h: 3.8,
    fontFace: FONT_BODY,
    fontSize: 11.5,
    lineSpacing: 18,
    color: COLORS.darkText,
  }
);

s4.addShape(pres.ShapeType.rect, {
  x: 6.8,
  y: 1.6,
  w: 5.4,
  h: 4.8,
  fill: { color: "DCFCE7" },
  line: { color: "86EFAC", width: 1 },
});
s4.addText("The AttendX Solution & Motivation", {
  x: 7.0,
  y: 1.8,
  w: 5.0,
  h: 0.4,
  fontFace: FONT_TITLE,
  fontSize: 14,
  bold: true,
  color: COLORS.success,
});
s4.addText(
  "1. Predictive Math Engine: Computes exact bunk allowances and consecutive classes required.\n\n" +
  "2. Instant 1-Click Action: Present, Absent, Cancelled, and Undo buttons with full audit logs.\n\n" +
  "3. 3-Scenario Future Simulation: Models attend-all, attend-none, and custom plan scenarios.\n\n" +
  "4. Gemini AI Academic Advisor: Natural language Q&A synthesizing live attendance records.\n\n" +
  "5. 100% Client Privacy: Zero database leaks; stored entirely in browser LocalStorage.",
  {
    x: 7.0,
    y: 2.3,
    w: 5.0,
    h: 3.8,
    fontFace: FONT_BODY,
    fontSize: 11.5,
    lineSpacing: 18,
    color: COLORS.darkText,
  }
);

// ==========================================
// SLIDE 5: OBJECTIVES & SCOPE
// ==========================================
const s5 = pres.addSlide();
s5.background = { color: COLORS.bgLight };
addSlideHeader(s5, "3. Objectives & Project Scope");

s5.addText(
  "Project Objectives:\n" +
  "1. Develop a high-precision mathematical engine for attendance percentages, bunk limits, and recovery targets.\n" +
  "2. Implement a zero-friction, client-first architecture utilizing LocalStorage for 100% offline data privacy.\n" +
  "3. Integrate a conversational AI Assistant powered by Google Gemini Flash via secure serverless routes.\n" +
  "4. Provide visual analytics (Recharts bar charts and status distribution donuts) for immediate health audits.\n" +
  "5. Ensure complete data portability through JSON backup export, import, and instant sample data demo loading.\n\n" +
  "Project Scope:\n" +
  "• Target Audience: Undergraduate B.Tech / University students adhering to strict attendance policies.\n" +
  "• Platform Support: Fully responsive web application compatible with desktop, tablet, and mobile devices.\n" +
  "• Flexible Policy: Configurable global target (default 75%) with subject-level target percentage overrides.",
  {
    x: 1.0,
    y: 1.6,
    w: 11.2,
    h: 5.0,
    fontFace: FONT_BODY,
    fontSize: 12.5,
    lineSpacing: 20,
    color: COLORS.darkText,
  }
);

// ==========================================
// SLIDE 6: COMPARATIVE STUDY MATRIX
// ==========================================
const s6 = pres.addSlide();
s6.background = { color: COLORS.bgLight };
addSlideHeader(s6, "4. Literature Review & Comparative Study");

s6.addText("Table 4.1: Feature Evaluation Matrix of AttendX vs Existing Paradigms", {
  x: 1.0,
  y: 1.5,
  w: 11.0,
  h: 0.35,
  fontFace: FONT_BODY,
  fontSize: 11,
  bold: true,
  color: COLORS.accent,
});

s6.addTable(
  [
    [
      { text: "Capability / Feature", options: { bold: true, fill: "1E1B4B", color: "FFFFFF" } },
      { text: "University ERP Portal", options: { bold: true, fill: "1E1B4B", color: "FFFFFF" } },
      { text: "Manual Spreadsheets", options: { bold: true, fill: "1E1B4B", color: "FFFFFF" } },
      { text: "AttendX Smart Planner", options: { bold: true, fill: "4F46E5", color: "FFFFFF" } },
    ],
    ["Bunk Capacity Calculator", "No (Static numbers only)", "Manual formula setup required", "Automated (Exact floor formula)"],
    ["Consecutive Recovery Math", "No remediation advice", "Complex formula required", "Automated (Exact ceiling formula)"],
    ["Multi-Scenario Prediction", "No future modeling", "Requires manual scenario tables", "Integrated (3-Scenario Slider)"],
    ["AI Context-Aware Chatbot", "Not available", "Not available", "Integrated (Google Gemini Flash)"],
    ["1-Click Undo Capability", "No", "Ctrl+Z (file scope)", "Instant per-subject history undo"],
    ["Data Privacy & Storage", "Centralized server logins", "Local file / cloud sync", "100% Client LocalStorage"],
    ["Visual Analytics & Radar", "Generic tabular lists", "Manual chart configuration", "Live Recharts Bar & Donut"],
  ],
  {
    x: 0.8,
    y: 2.0,
    w: 11.7,
    h: 4.4,
    fontFace: FONT_BODY,
    fontSize: 10.5,
    border: { color: "CBD5E1", pt: 1 },
    rowH: 0.5,
  }
);

// ==========================================
// SLIDE 7: FEASIBILITY STUDY
// ==========================================
const s7 = pres.addSlide();
s7.background = { color: COLORS.bgLight };
addSlideHeader(s7, "5. Feasibility Study");

const feasCards = [
  {
    title: "5.1 Technical Feasibility",
    color: COLORS.primary,
    desc: "• Next.js 14 App Router and React 18 are established production-grade frameworks.\n• Browser LocalStorage is universally supported across 99.8% of modern web browsers.\n• Recharts enables high-performance client SVG rendering without heavy server dependencies.\n• Gemini Flash API provides low-latency (<1s) inference via serverless REST endpoints.",
  },
  {
    title: "5.2 Economic Feasibility",
    color: COLORS.accent,
    desc: "• Zero Software License Costs: Built entirely with open-source tools (Next.js, Tailwind, React).\n• Free AI API Allocation: Google Gemini offers a generous free tier for academic projects.\n• Free Global Deployment: Vercel provides zero-cost static and serverless edge hosting.\n• No Database Infrastructure: LocalStorage completely eliminates paid database servers.",
  },
  {
    title: "5.3 Operational Feasibility",
    color: COLORS.secondary,
    desc: "• Intuitive User Experience: Immediate 1-click attendance buttons require zero user training.\n• High Classroom Usability: Fast mobile-responsive layout for instant between-class logging.\n• Safe Recovery: LocalStorage corrupted data fallback and 1-click JSON backup portability.",
  },
];

feasCards.forEach((c, idx) => {
  const xPos = 0.8 + idx * 4.0;
  s7.addShape(pres.ShapeType.rect, {
    x: xPos,
    y: 1.7,
    w: 3.7,
    h: 4.8,
    fill: { color: "FFFFFF" },
    line: { color: "CBD5E1", width: 1 },
  });
  s7.addText(c.title, {
    x: xPos + 0.2,
    y: 1.9,
    w: 3.3,
    h: 0.4,
    fontFace: FONT_TITLE,
    fontSize: 13,
    bold: true,
    color: c.color,
  });
  s7.addText(c.desc, {
    x: xPos + 0.2,
    y: 2.4,
    w: 3.3,
    h: 3.9,
    fontFace: FONT_BODY,
    fontSize: 10.5,
    lineSpacing: 16,
    color: COLORS.darkText,
  });
});

// ==========================================
// SLIDE 8: SYSTEM ARCHITECTURE
// ==========================================
const s8 = pres.addSlide();
s8.background = { color: COLORS.bgLight };
addSlideHeader(s8, "6. System Architecture & Block Diagram");

s8.addText(
  "Architectural Pattern: Client-First Decoupled Architecture with Stateless AI Proxy\n\n" +
  "┌─────────────────────────────────────────────────────────────────────────────────┐\n" +
  "│                             CLIENT TIER (Browser Runtime)                       │\n" +
  "│                                                                                 │\n" +
  "│   ┌────────────────────┐   ┌────────────────────┐   ┌────────────────────────┐  │\n" +
  "│   │  React UI Views    │   │  Math Calc Engine  │   │   Browser LocalStorage │  │\n" +
  "│   │  - Dashboard       │◄─►│  (attendanceCalc)  │◄─►│   - attendx_subjects   │  │\n" +
  "│   │  - Tracker / Logs  │   │  - % formula       │   │   - attendx_settings   │  │\n" +
  "│   │  - Bunk/Req Calc   │   │  - Bunk capacity   │   │   - JSON Export/Import │  │\n" +
  "│   │  - Predictor (3-Sc)│   │  - Recovery count  │   │                        │  │\n" +
  "│   └─────────┬──────────┘   └────────────────────┘   └────────────────────────┘  │\n" +
  "└─────────────┼───────────────────────────────────────────────────────────────────┘\n" +
  "              │  HTTP POST (Student message + Compact attendance summary)\n" +
  "              ▼\n" +
  "┌─────────────────────────────────────────────────────────────────────────────────┐\n" +
  "│                       SERVERLESS TIER (Next.js App Router)                      │\n" +
  "│                                                                                 │\n" +
  "│   ┌──────────────────────────────────────────────────────────────────────────┐  │\n" +
  "│   │  Endpoint: /api/chat                                                     │  │\n" +
  "│   │  - IP Rate Limiting (15 req/min) & Input Sanitization (max 500 chars)    │  │\n" +
  "│   │  - System Prompt Construction (Role + Real Student Data + Rules)         │  │\n" +
  "│   │  - Securely reads process.env.GEMINI_API_KEY (Never sent to client)      │  │\n" +
  "│   └─────────────────────────────────────┬────────────────────────────────────┘  │\n" +
  "└─────────────────────────────────────────┼───────────────────────────────────────┘\n" +
  "                                          │  REST API HTTPS\n" +
  "                                          ▼\n" +
  "┌─────────────────────────────────────────────────────────────────────────────────┐\n" +
  "│                        EXTERNAL AI SERVICE (Google Cloud)                       │\n" +
  "│   Google Gemini Flash API (gemini-2.5-flash / gemini-1.5-flash)                 │\n" +
  "│   Evaluates student query against context & returns step-by-step math advice    │\n" +
  "└─────────────────────────────────────────────────────────────────────────────────┘",
  {
    x: 0.8,
    y: 1.45,
    w: 11.7,
    h: 5.3,
    fontFace: "Courier New",
    fontSize: 9.5,
    color: COLORS.primary,
  }
);

// ==========================================
// SLIDE 9: UML USE CASE DIAGRAM
// ==========================================
const s9 = pres.addSlide();
s9.background = { color: COLORS.bgLight };
addSlideHeader(s9, "7. UML Modeling: Use Case Diagram");

s9.addText(
  "Actor: College Student (Undergraduate Engineering Learner)\n\n" +
  "Key System Use Cases:\n" +
  "• UC-01: Subject Management (Create, Edit, Delete subjects with codes, instructors, and colors)\n" +
  "• UC-02: Daily Attendance Logging (Mark Present +1/+1, Absent +0/+1, or Class Cancelled)\n" +
  "• UC-03: Undo Last Attendance Action (Instantly revert previous log and restore counters)\n" +
  "• UC-04: Bunk Capacity Computation (Calculate safe skips while staying >= 75% target)\n" +
  "• UC-05: Consecutive Recovery Calculation (Calculate consecutive lectures needed to clear shortage)\n" +
  "• UC-06: Future Scenario Simulation (Model attend-all, attend-none, and custom upcoming plans)\n" +
  "• UC-07: AI Chatbot Consultation (Ask natural language questions evaluated against live data)\n" +
  "• UC-08: Data Portability & Backup (Export JSON backup, import existing file, load sample data)\n\n" +
  "System Boundary Guarantees: All state updates execute with zero database roundtrips, ensuring instantaneous UI feedback.",
  {
    x: 1.0,
    y: 1.6,
    w: 11.2,
    h: 5.0,
    fontFace: FONT_BODY,
    fontSize: 12.5,
    lineSpacing: 20,
    color: COLORS.darkText,
  }
);

// ==========================================
// SLIDE 10: UML SEQUENCE DIAGRAM
// ==========================================
const s10 = pres.addSlide();
s10.background = { color: COLORS.bgLight };
addSlideHeader(s10, "8. UML Sequence Diagram: AI Assistant Flow");

s10.addText(
  "Step-by-Step Message Flow for Context-Aware AI Advisory:\n\n" +
  "1. Student Input: Student asks: 'Can I skip tomorrow\\'s DBMS class?' in Chatbot.jsx.\n" +
  "2. Context Extraction: Client retrieves live course array from LocalStorage (attended: 22, total: 30, target: 75%).\n" +
  "3. Request Dispatch: Client posts payload { message, history, attendanceSummary } to /api/chat.\n" +
  "4. Server-Side Protection: Route validates message length (<=500 chars) and verifies IP rate limit (<15 req/min).\n" +
  "5. System Prompt Assembly: Server builds prompt embedding Role (friendly advisor), Data Context, and Math Rules.\n" +
  "6. External Inference: Server calls Google Gemini Flash REST API with server-side GEMINI_API_KEY.\n" +
  "7. Response Delivery: Gemini computes exact bunk formula and returns step-by-step arithmetic proof.\n" +
  "8. Client Render: Chatbot parses JSON { reply: string } and animates response bubble for student.",
  {
    x: 1.0,
    y: 1.6,
    w: 11.2,
    h: 5.0,
    fontFace: FONT_BODY,
    fontSize: 12.5,
    lineSpacing: 21,
    color: COLORS.darkText,
  }
);

// ==========================================
// SLIDE 11: DATA FLOW DIAGRAMS (LEVEL 0 & LEVEL 1)
// ==========================================
const s11 = pres.addSlide();
s11.background = { color: COLORS.bgLight };
addSlideHeader(s11, "9. Data Flow Diagrams (DFD Level 0 & Level 1)");

s11.addText(
  "DFD Level 0 (Context Diagram):\n" +
  "• External Entity [Student] ───(Attendance Updates & Queries)───► (Process 0.0: AttendX System)\n" +
  "• (Process 0.0: AttendX System) ───(Status Badges, Calculations, AI Advice)───► [Student]\n" +
  "• (Process 0.0: AttendX System) ◄───(JSON Records)───► [Data Store D1: Browser LocalStorage]\n" +
  "• (Process 0.0: AttendX System) ◄───(Context Payload / AI Stream)───► [External Entity: Gemini API]\n\n" +
  "DFD Level 1 (Decomposition):\n" +
  "• Process 1.0: Subject & Attendance Management (Validates inputs, appends history log, saves to D1)\n" +
  "• Process 2.0: Core Mathematical Processing (Calculates percentage, bunk allowance, and recovery count)\n" +
  "• Process 3.0: Scenario Prediction Processing (Applies future held/attended formula)\n" +
  "• Process 4.0: AI Context Injection & Chat Processing (Constructs prompt, validates rate limit, queries Gemini)",
  {
    x: 1.0,
    y: 1.6,
    w: 11.2,
    h: 5.0,
    fontFace: FONT_BODY,
    fontSize: 12,
    lineSpacing: 19,
    color: COLORS.darkText,
  }
);

// ==========================================
// SLIDE 12: ER MODELING & STORAGE SCHEMA
// ==========================================
const s12 = pres.addSlide();
s12.background = { color: COLORS.bgLight };
addSlideHeader(s12, "10. Entity-Relationship & LocalStorage Schema");

s12.addText(
  "Although operating without a traditional SQL RDBMS, AttendX enforces strict schema integrity:\n\n" +
  "1. Subject Entity (Primary Key: id):\n" +
  "   • id: String (e.g. 'subj_cs301')\n" +
  "   • name: String (Course title, 1-60 chars)\n" +
  "   • code: String (Optional, e.g. 'CS-301')\n" +
  "   • teacher: String (Optional instructor name)\n" +
  "   • color: String (Hex color code for visual branding)\n" +
  "   • attended: Integer (>= 0, validated <= total)\n" +
  "   • total: Integer (Total classes held to date)\n" +
  "   • target: Integer (Required %, defaults to global target 75%)\n" +
  "   • history: Array of AttendanceRecord entities\n\n" +
  "2. AttendanceRecord Entity (Child of Subject, 1-to-Many Relationship):\n" +
  "   • id: String (Unique log identifier)\n" +
  "   • date: String (YYYY-MM-DD)\n" +
  "   • action: Enum ('present' | 'absent' | 'cancelled')\n" +
  "   • timestamp: Integer (Epoch milliseconds for chronological undo ordering)\n\n" +
  "3. Settings Entity: globalTarget (1-100), theme ('light'|'dark'), notificationsEnabled (Boolean)",
  {
    x: 1.0,
    y: 1.6,
    w: 11.2,
    h: 5.0,
    fontFace: FONT_BODY,
    fontSize: 11.5,
    lineSpacing: 17,
    color: COLORS.darkText,
  }
);

// ==========================================
// SLIDE 13: CORE MATHEMATICAL FORMULAS
// ==========================================
const s13 = pres.addSlide();
s13.background = { color: COLORS.bgLight };
addSlideHeader(s13, "11. Core Mathematical Calculations & Logic");

const formulas = [
  {
    name: "1. Current Percentage",
    formula: "P = (attended / total) * 100",
    desc: "Returns 0% when total classes held = 0 to prevent division by zero.",
  },
  {
    name: "2. Consecutive Recovery Classes (x)",
    formula: "x = ceil((T * total - 100 * attended) / (100 - T))",
    desc: "Minimum consecutive lectures needed to reach target T%. Returns 0 if already safe. If T=100 and attended < total, automatically flags 100% as mathematically impossible.",
  },
  {
    name: "3. Maximum Allowable Bunks (b)",
    formula: "b = floor((100 * attended / T) - total)",
    desc: "Classes that can be skipped while staying at or above target T%. Clamped to minimum 0. If current % < T, returns 0 bunks.",
  },
  {
    name: "4. Multi-Scenario Future Prediction",
    formula: "P_pred = ((attended + k) / (total + n)) * 100",
    desc: "Projects final attendance after n upcoming classes with k attended (Scenario A: k=n, Scenario B: k=0, Scenario C: custom k).",
  },
];

formulas.forEach((f, idx) => {
  const yPos = 1.6 + idx * 1.3;
  s13.addShape(pres.ShapeType.rect, {
    x: 0.8,
    y: yPos,
    w: 11.7,
    h: 1.15,
    fill: { color: "FFFFFF" },
    line: { color: "CBD5E1", width: 1 },
  });
  s13.addText(f.name, {
    x: 1.0,
    y: yPos + 0.1,
    w: 4.5,
    h: 0.35,
    fontFace: FONT_TITLE,
    fontSize: 12,
    bold: true,
    color: COLORS.primary,
  });
  s13.addText(f.formula, {
    x: 5.5,
    y: yPos + 0.1,
    w: 6.8,
    h: 0.35,
    fontFace: "Courier New",
    fontSize: 11.5,
    bold: true,
    color: COLORS.accent,
  });
  s13.addText(f.desc, {
    x: 1.0,
    y: yPos + 0.5,
    w: 11.3,
    h: 0.55,
    fontFace: FONT_BODY,
    fontSize: 10.5,
    color: COLORS.lightText,
  });
});

// ==========================================
// SLIDE 14: VERIFIED CALCULATION EXAMPLES
// ==========================================
const s14 = pres.addSlide();
s14.background = { color: COLORS.bgLight };
addSlideHeader(s14, "12. Verified Mathematical Proofs");

s14.addText("Table 12.1: Mathematical Proofs & Edge-Case Verifications", {
  x: 1.0,
  y: 1.5,
  w: 11.0,
  h: 0.35,
  fontFace: FONT_BODY,
  fontSize: 11,
  bold: true,
  color: COLORS.accent,
});

s14.addTable(
  [
    [
      { text: "Scenario / Input", options: { bold: true, fill: "1E1B4B", color: "FFFFFF" } },
      { text: "Target %", options: { bold: true, fill: "1E1B4B", color: "FFFFFF" } },
      { text: "Calculated Attendance %", options: { bold: true, fill: "1E1B4B", color: "FFFFFF" } },
      { text: "Required Classes (x)", options: { bold: true, fill: "1E1B4B", color: "FFFFFF" } },
      { text: "Bunk Capacity (b)", options: { bold: true, fill: "1E1B4B", color: "FFFFFF" } },
      { text: "Proof Verification", options: { bold: true, fill: "1E1B4B", color: "FFFFFF" } },
    ],
    ["18 Attended / 25 Held", "75%", "72.00% (Shortage)", "3 classes", "0 bunks", "(18+3)/(25+3) = 21/28 = 75.0%"],
    ["22 Attended / 25 Held", "75%", "88.00% (Safe)", "0 classes (Met)", "4 bunks", "22/(25+4) = 22/29 = 75.86% >= 75%"],
    ["15 Attended / 20 Held", "75%", "75.00% (Warning)", "0 classes (Met)", "0 bunks (Edge)", "Next missed drops to 71.4%"],
    ["0 Attended / 10 Held", "75%", "0.00% (Shortage)", "30 classes", "0 bunks", "(0+30)/(10+30) = 30/40 = 75.0%"],
    ["9 Attended / 10 Held", "100%", "90.00%", "Impossible (100 - T = 0)", "0 bunks", "Absence makes 100% unattainable"],
  ],
  {
    x: 0.8,
    y: 1.9,
    w: 11.7,
    h: 4.5,
    fontFace: FONT_BODY,
    fontSize: 10,
    border: { color: "CBD5E1", pt: 1 },
    rowH: 0.6,
  }
);

// ==========================================
// SLIDE 15: TOOLS & TECHNOLOGIES
// ==========================================
const s15 = pres.addSlide();
s15.background = { color: COLORS.bgLight };
addSlideHeader(s15, "13. Tools & Technologies Used");

const techCards = [
  { name: "Next.js 14 (App Router)", role: "Full-Stack Framework", why: "File-system routing, automatic code splitting, and zero-config serverless API route handlers." },
  { name: "React 18", role: "UI Library", why: "Declarative component architecture, memoized custom hooks (useAttendanceData), and responsive state synchronization." },
  { name: "Tailwind CSS 3.4", role: "Styling & Dark Mode", why: "Utility-first responsive styles, dark mode class toggling, and clean animations with zero CSS bloat." },
  { name: "Recharts 2.13", role: "Data Visualization", why: "Responsive SVG bar and donut charts optimized for client-side dashboard performance." },
  { name: "Browser LocalStorage", role: "Data Persistence Layer", why: "100% client privacy, zero latency, offline persistence, and zero database server costs." },
  { name: "Google Gemini Flash API", role: "AI Reasoning Backend", why: "Sub-second inference speed, generous free quota, and structured context injection support." },
];

techCards.forEach((t, idx) => {
  const row = Math.floor(idx / 3);
  const col = idx % 3;
  const xPos = 0.8 + col * 4.0;
  const yPos = 1.7 + row * 2.5;

  s15.addShape(pres.ShapeType.rect, {
    x: xPos,
    y: yPos,
    w: 3.7,
    h: 2.2,
    fill: { color: "FFFFFF" },
    line: { color: "CBD5E1", width: 1 },
  });
  s15.addText(t.name, {
    x: xPos + 0.2,
    y: yPos + 0.15,
    w: 3.3,
    h: 0.35,
    fontFace: FONT_TITLE,
    fontSize: 12.5,
    bold: true,
    color: COLORS.primary,
  });
  s15.addText(`Role: ${t.role}`, {
    x: xPos + 0.2,
    y: yPos + 0.5,
    w: 3.3,
    h: 0.3,
    fontFace: FONT_BODY,
    fontSize: 10,
    bold: true,
    color: COLORS.accent,
  });
  s15.addText(t.why, {
    x: xPos + 0.2,
    y: yPos + 0.85,
    w: 3.3,
    h: 1.2,
    fontFace: FONT_BODY,
    fontSize: 10,
    lineSpacing: 14,
    color: COLORS.darkText,
  });
});

// ==========================================
// SLIDE 16: AI CHATBOT ARCHITECTURE & GUARDRAILS
// ==========================================
const s16 = pres.addSlide();
s16.background = { color: COLORS.bgLight };
addSlideHeader(s16, "14. AI Assistant Architecture & Guardrails");

s16.addText(
  "Prompt Engineering & Security Architecture:\n\n" +
  "• Context Injection: Every prompt injects the student's live JSON attendance data (subjects, attended, total, target %, bunk capacity, and recovery counts).\n\n" +
  "• Strict Role Definition: 'AttendX Assistant' is defined as a supportive, highly analytical academic attendance advisor specifically tailored for Indian engineering students.\n\n" +
  "• Formula Enforcement: Instructs the LLM to follow the verified formulas strictly and show step-by-step arithmetic so students can verify calculations.\n\n" +
  "• Scope Boundary & Polite Refusal: Automatically rejects off-topic queries (coding tasks, general essays, trivia) and redirects users back to academic attendance planning.\n\n" +
  "• Prompt Injection Resistance: Explicit system instructions immunize the model against prompt injection ('ignore previous instructions', 'pretend you are DAN').\n\n" +
  "• Rate Limiting & DoS Protection: Server enforces sliding-window IP rate limiting (15 requests/minute) and limits queries to 500 characters maximum.",
  {
    x: 1.0,
    y: 1.6,
    w: 11.2,
    h: 5.0,
    fontFace: FONT_BODY,
    fontSize: 12.5,
    lineSpacing: 21,
    color: COLORS.darkText,
  }
);

// ==========================================
// SLIDE 17: ROLES & RESPONSIBILITIES
// ==========================================
const s17 = pres.addSlide();
s17.background = { color: COLORS.bgLight };
addSlideHeader(s17, "15. Roles & Responsibilities of Team Members");

s17.addTable(
  [
    [
      { text: "Team Member", options: { bold: true, fill: "1E1B4B", color: "FFFFFF" } },
      { text: "Assigned Project Modules", options: { bold: true, fill: "1E1B4B", color: "FFFFFF" } },
      { text: "Key Technical Contributions", options: { bold: true, fill: "1E1B4B", color: "FFFFFF" } },
    ],
    [
      "Aryan Raj\n(Lead Developer)",
      "Next.js Architecture, AI Chatbot Backend, Core Formulas, LocalStorage Hook",
      "Engineered attendance calculation engine, serverless /api/chat route with Gemini Flash, custom useAttendanceData hook, and Vercel CI/CD.",
    ],
    [
      "Team Member 2\n[Name / Reg. No.]",
      "UI/UX Design, Dashboard, Tailwind Styling & Dark Mode",
      "Implemented responsive cards, navigation drawer, color palette, toast notification system, and theme switching.",
    ],
    [
      "Team Member 3\n[Name / Reg. No.]",
      "Calculators (Bunk & Required) & Prediction Engine",
      "Constructed interactive BunkCalculator, RequiredClassesCalculator with edge cases, and 3-scenario AttendancePredictor slider.",
    ],
    [
      "Team Member 4\n[Name / Reg. No.]",
      "Testing, Quality Assurance & Academic Documentation",
      "Formulated 22-case automated test suite, performed cross-browser testing, authored LaTeX documentation, and generated project report.",
    ],
  ],
  {
    x: 0.8,
    y: 1.8,
    w: 11.7,
    h: 4.8,
    fontFace: FONT_BODY,
    fontSize: 11,
    border: { color: "CBD5E1", pt: 1 },
    rowH: 1.0,
  }
);

// ==========================================
// SLIDE 18: IMPLEMENTATION MODULES
// ==========================================
const s18 = pres.addSlide();
s18.background = { color: COLORS.bgLight };
addSlideHeader(s18, "16. Implementation Modules Walkthrough");

const modules = [
  "1. Attendance Tracking Module (SubjectCard.jsx):\n   Provides 1-click Present (+1/+1), Absent (+0/+1), Cancelled (no count changes), and Undo actions with visual progress bars.",
  "2. Mathematical Engine (attendanceCalculations.js):\n   Pure functional module computing percentages, bunk allowances, consecutive recovery targets, and status classification (Safe, Warning, Shortage).",
  "3. Data Layer & Recovery (storage.js & useAttendanceData.js):\n   Manages browser LocalStorage persistence, corrupted data schema recovery, 1-click JSON backup export/import, and instant sample data demo loading.",
  "4. Predictive Analytics Module (AttendancePredictor.jsx):\n   Deterministic 3-scenario modeling tool (Attend All, Attend None, Custom Plan) with comparative spectrum visualizers.",
  "5. Conversational AI Assistant (/assistant & Chatbot.jsx):\n   Floating widget and dedicated full-screen page with quick question chips, typing animations, auto-scroll, and Google Gemini Flash integration.",
];

s18.addText(modules.join("\n\n"), {
  x: 1.0,
  y: 1.6,
  w: 11.2,
  h: 5.0,
  fontFace: FONT_BODY,
  fontSize: 12,
  lineSpacing: 18,
  color: COLORS.darkText,
});

// ==========================================
// SLIDE 19: TESTING METHODOLOGY & RESULTS
// ==========================================
const s19 = pres.addSlide();
s19.background = { color: COLORS.bgLight };
addSlideHeader(s19, "17. Testing Methodology & Verification");

s19.addText(
  "Automated Mathematical Unit Verification:\n" +
  "• A dedicated automated script (test-calculations.js) asserts 22 unit tests across normal inputs, edge cases, and division boundaries.\n" +
  "• Verification Results: 22 / 22 Tests Passed with 100% precision.\n\n" +
  "Comprehensive Test Suite Highlights:\n" +
  "• TC-01: 18/25 held at 75% target -> Correctly outputs 72.00% (Shortage) and requires exactly 3 consecutive classes.\n" +
  "• TC-02: 22/25 held at 75% target -> Correctly outputs 88.00% (Safe) with 4 safe bunks allowance.\n" +
  "• TC-03: Zero classes held (0/0) -> Safely returns 0.00% without triggering runtime NaN or division errors.\n" +
  "• TC-04: Target 100% with absences -> Automatically catches (100 - T) = 0 and returns 'Mathematically Impossible'.\n" +
  "• TC-05: Undo Last Action -> Decrements counters and restores previous attendance percentage perfectly.\n" +
  "• TC-06: Corrupted JSON Import -> Schema validator intercepts malformed text and alerts user via toast without crashing.\n" +
  "• TC-07: Rate Limiting Enforcement -> Server returns HTTP 429 after 15 requests in under 60 seconds.",
  {
    x: 1.0,
    y: 1.6,
    w: 11.2,
    h: 5.0,
    fontFace: FONT_BODY,
    fontSize: 11.5,
    lineSpacing: 18,
    color: COLORS.darkText,
  }
);

// ==========================================
// SLIDE 20: SYSTEM INTERFACE WALKTHROUGH
// ==========================================
const s20 = pres.addSlide();
s20.background = { color: COLORS.bgLight };
addSlideHeader(s20, "18. System Interface & User Experience");

const uiFeatures = [
  { name: "Executive Dashboard", desc: "4 summary KPI cards (Overall %, Safe, Warning, Shortage counts), Shortage Radar, subject cards, and Recharts analytics." },
  { name: "Subject Tracker", desc: "Tabular and card view with real-time search, category filtering (All, Safe, Warning, Shortage), and collapsible chronological logs." },
  { name: "Bunk Simulator", desc: "Interactive course selector with worked mathematical proofs and a skip-impact simulation table (+1 to +5 classes)." },
  { name: "Recovery Calculator", desc: "Shows exact consecutive lectures needed to clear shortages with step-by-step verification proofs." },
  { name: "Future Predictor", desc: "Models best-case (100%), worst-case (0%), and custom attendance targets with interactive sliders." },
  { name: "AttendX AI Assistant", desc: "Floating drawer and full-page interface with instant inquiry chips, conversational advice, and dual-engine fallback." },
];

uiFeatures.forEach((u, idx) => {
  const row = Math.floor(idx / 3);
  const col = idx % 3;
  const xPos = 0.8 + col * 4.0;
  const yPos = 1.7 + row * 2.5;

  s20.addShape(pres.ShapeType.rect, {
    x: xPos,
    y: yPos,
    w: 3.7,
    h: 2.2,
    fill: { color: "FFFFFF" },
    line: { color: "CBD5E1", width: 1 },
  });
  s20.addText(u.name, {
    x: xPos + 0.2,
    y: yPos + 0.2,
    w: 3.3,
    h: 0.35,
    fontFace: FONT_TITLE,
    fontSize: 13,
    bold: true,
    color: COLORS.primary,
  });
  s20.addText(u.desc, {
    x: xPos + 0.2,
    y: yPos + 0.65,
    w: 3.3,
    h: 1.4,
    fontFace: FONT_BODY,
    fontSize: 10.5,
    lineSpacing: 15,
    color: COLORS.darkText,
  });
});

// ==========================================
// SLIDE 21: PERFORMANCE & SECURITY AUDIT
// ==========================================
const s21 = pres.addSlide();
s21.background = { color: COLORS.bgLight };
addSlideHeader(s21, "19. Performance & Security Audit");

s21.addText(
  "Performance Metrics (Production Build Verification):\n" +
  "• Next.js Production Build: 12 static/dynamic routes compiled with 0 errors.\n" +
  "• First Load JS: Lightweight bundle size of only 87.4 kB shared across all pages.\n" +
  "• Zero Latency State Mutations: LocalStorage updates complete in <2 milliseconds.\n" +
  "• Sub-Second AI Response: Google Gemini Flash delivers streaming advice in ~800ms.\n\n" +
  "Security Guarantees:\n" +
  "• Complete API Key Isolation: process.env.GEMINI_API_KEY is read solely on the server in /api/chat.\n" +
  "• Zero Client Secret Leakage: API keys are never bundled into client-side JavaScript or Git commits.\n" +
  "• In-Memory IP Rate Limiting: Sliding-window limiter restricts abusive clients to 15 req/minute.\n" +
  "• Strict Input Sanitization: Payload validation truncates messages >500 characters to prevent DoS payloads.\n" +
  "• 100% Client-Side Privacy: Student attendance data is never permanently retained on external servers.",
  {
    x: 1.0,
    y: 1.6,
    w: 11.2,
    h: 5.0,
    fontFace: FONT_BODY,
    fontSize: 12,
    lineSpacing: 19,
    color: COLORS.darkText,
  }
);

// ==========================================
// SLIDE 22: CONCLUSION & ACHIEVEMENTS
// ==========================================
const s22 = pres.addSlide();
s22.background = { color: COLORS.bgLight };
addSlideHeader(s22, "20. Conclusion & Key Achievements");

s22.addText(
  "Summary of Major Achievements:\n" +
  "• Solved Real-World Student Debarment Problem: Replaced passive ERP percentages with proactive decision guidance.\n" +
  "• Formulated Rigorous Mathematical Logic: Centralized verified calculations for attendance %, bunk allowances, and recovery targets.\n" +
  "• Context-Aware AI Innovation: Successfully integrated Google Gemini Flash with live student attendance context injection.\n" +
  "• Dual-Engine Reliability: Integrated deterministic local fallback engine ensuring zero downtime during evaluations.\n" +
  "• Complete Open-Source Deployment: Live production repository on GitHub (Aaryan-Raj21/attendx-smart-planner) and Vercel.\n\n" +
  "Academic & Practical Takeaways:\n" +
  "AttendX bridges the gap between academic regulations and student lifestyles, empowering learners to manage attendance proactively with mathematical certainty.",
  {
    x: 1.0,
    y: 1.6,
    w: 11.2,
    h: 5.0,
    fontFace: FONT_BODY,
    fontSize: 12.5,
    lineSpacing: 21,
    color: COLORS.darkText,
  }
);

// ==========================================
// SLIDE 23: LIMITATIONS & FUTURE SCOPE
// ==========================================
const s23 = pres.addSlide();
s23.background = { color: COLORS.bgLight };
addSlideHeader(s23, "21. Limitations & Future Scope");

s23.addText(
  "Current System Limitations:\n" +
  "1. Manual Input Dependency: Requires the student to click Present, Absent, or Cancelled after lectures.\n" +
  "2. Device Local Storage Scope: Browser LocalStorage does not automatically sync across devices without manual JSON export/import.\n\n" +
  "Future Enhancements & Research Directions:\n" +
  "• Automatic Timetable Synchronization: Upload college semester schedules to automatically trigger attendance prompts after classes.\n" +
  "• Progressive Web App (PWA) Offline Notifications: Push alerts reminding students of morning classes when bordering the warning zone.\n" +
  "• Biometric / ERP Integration: OCR camera scanning or direct university portal scraping to import historical roll records automatically.\n" +
  "• Multi-Student Group Tracking: Peer study groups comparing collective attendance compliance.",
  {
    x: 1.0,
    y: 1.6,
    w: 11.2,
    h: 5.0,
    fontFace: FONT_BODY,
    fontSize: 12.5,
    lineSpacing: 21,
    color: COLORS.darkText,
  }
);

// ==========================================
// SLIDE 24: REFERENCES (IEEE STYLE)
// ==========================================
const s24 = pres.addSlide();
s24.background = { color: COLORS.bgLight };
addSlideHeader(s24, "22. References (IEEE Style)");

const refs = [
  "[1] Next.js Documentation, 'App Router Architecture and Server Components,' Vercel Inc., 2024. [Online]. Available: https://nextjs.org/docs",
  "[2] React Documentation, 'Custom Hooks and State Synchronization,' Meta Platforms Inc., 2024. [Online]. Available: https://react.dev",
  "[3] Google AI for Developers, 'Gemini API Documentation and Model Capabilities,' Google LLC, 2024. [Online]. Available: https://ai.google.dev/docs",
  "[4] W3C Web Applications Working Group, 'Web Storage (Second Edition),' World Wide Web Consortium, 2021. [Online]. Available: https://www.w3.org/TR/webstorage/",
  "[5] Tailwind Labs, 'Tailwind CSS: Utility-First CSS Framework Specification,' 2024. [Online]. Available: https://tailwindcss.com/docs",
  "[6] Recharts Community, 'Composable SVG Charting Library for React,' 2024. [Online]. Available: https://recharts.org",
  "[7] AICTE, 'Approval Process Handbook and Student Minimum Attendance Guidelines,' New Delhi, India, 2023.",
  "[8] JECRC University, 'Academic Regulations and Examination Ordinances for Undergraduate Engineering Programs,' Jaipur, India, 2024.",
  "[9] Vercel Inc., 'Serverless Functions and Edge Runtime Deployment Guide,' 2024. [Online]. Available: https://vercel.com/docs",
  "[10] I. Sommerville, 'Software Engineering,' 10th ed., London: Pearson Education, 2016.",
];

s24.addText(refs.join("\n\n"), {
  x: 1.0,
  y: 1.5,
  w: 11.2,
  h: 5.2,
  fontFace: FONT_BODY,
  fontSize: 10,
  lineSpacing: 14,
  color: COLORS.darkText,
});

// ==========================================
// SLIDE 25: THANK YOU & EVALUATOR Q&A
// ==========================================
const s25 = pres.addSlide();
s25.background = { color: COLORS.bgLight };

s25.addShape(pres.ShapeType.rect, {
  x: 0.8,
  y: 0.8,
  w: 11.7,
  h: 5.9,
  fill: { color: "FFFFFF" },
  line: { color: "E2E8F0", width: 1.5 },
});

s25.addText("THANK YOU!", {
  x: 1.2,
  y: 1.6,
  w: 10.9,
  h: 0.8,
  fontFace: FONT_TITLE,
  fontSize: 36,
  bold: true,
  align: "center",
  color: COLORS.primary,
});

s25.addText("AttendX: Smart Attendance Planner", {
  x: 1.2,
  y: 2.5,
  w: 10.9,
  h: 0.5,
  fontFace: FONT_TITLE,
  fontSize: 20,
  bold: true,
  align: "center",
  color: COLORS.accent,
});

s25.addText("Questions & Evaluator Discussion", {
  x: 1.2,
  y: 3.1,
  w: 10.9,
  h: 0.4,
  fontFace: FONT_BODY,
  fontSize: 14,
  italic: true,
  align: "center",
  color: COLORS.lightText,
});

s25.addShape(pres.ShapeType.line, {
  x: 4.2,
  y: 3.7,
  w: 4.9,
  h: 0,
  line: { color: COLORS.accent, width: 2 },
});

s25.addText(
  "Project Author: Aryan Raj\n" +
  "Department of Computer Science & Engineering\n" +
  "JECRC University, Jaipur (Session: 2025–26)\n" +
  "GitHub Repository: https://github.com/Aaryan-Raj21/attendx-smart-planner\n" +
  "Contact: aryannraj21@gmail.com",
  {
    x: 1.2,
    y: 4.1,
    w: 10.9,
    h: 1.8,
    fontFace: FONT_BODY,
    fontSize: 12,
    lineSpacing: 18,
    align: "center",
    color: COLORS.darkText,
  }
);

// Save Presentation
const outputPath = path.join(process.cwd(), "AttendX_Major_Project_Presentation.pptx");
pres.writeFile({ fileName: outputPath }).then(() => {
  console.log(`Presentation successfully written to: ${outputPath}`);
});
