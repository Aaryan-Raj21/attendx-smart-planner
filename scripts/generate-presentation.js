import pptxgen from "pptxgenjs";
import path from "path";
import fs from "fs";

console.log("Generating Designer-Grade AttendX Major Project Presentation (.pptx)...");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 13.33 x 7.5 inches
pres.author = "Aryan Raj";
pres.company = "JECRC University, Jaipur";
pres.title = "AttendX: Smart Attendance Planner";

// University & Design Palette
const COLORS = {
  jecrcRed: "B91C1C",    // JECRC University Red
  jecrcDark: "881337",   // Deep Maroon
  primary: "0F172A",     // Deep Slate / Navy
  accent: "4338CA",      // Royal Indigo
  secondary: "0284C7",   // Cerulean Blue
  cardBg: "FFFFFF",      // Crisp White
  bgLight: "F8FAFC",     // Cool Slate 50
  textDark: "0F172A",    // Primary Text
  textMuted: "475569",   // Secondary Text
  border: "E2E8F0",      // Card Border
  success: "16A34A",     // Emerald Green
  warning: "D97706",     // Amber
  danger: "DC2626",      // Rose Red
};

const FONT_FAMILY = "Times New Roman";

// Asset paths
const campusImagePath = path.join(process.cwd(), "assets", "jecrc_campus.png");
const logoImagePath = path.join(process.cwd(), "assets", "jecrc_logo.png");
const crestImagePath = path.join(process.cwd(), "assets", "jecrc_crest.png");

// Master Slide Header Function
function addDesignerHeader(slide, titleText, category = "MAJOR PROJECT PRESENTATION") {
  // Top subtle decorative bar
  slide.addShape(pres.ShapeType.rect, {
    x: 0,
    y: 0,
    w: "100%",
    h: 0.08,
    fill: { color: COLORS.jecrcRed },
    line: { color: COLORS.jecrcRed },
  });

  // Category Tag
  slide.addText(category.toUpperCase(), {
    x: 0.8,
    y: 0.35,
    w: 8.5,
    h: 0.3,
    fontFace: FONT_FAMILY,
    fontSize: 9.5,
    bold: true,
    color: COLORS.accent,
  });

  // Slide Title
  slide.addText(titleText, {
    x: 0.8,
    y: 0.65,
    w: 10.5,
    h: 0.6,
    fontFace: FONT_FAMILY,
    fontSize: 22,
    bold: true,
    color: COLORS.primary,
  });

  // Top Right Logo
  if (fs.existsSync(crestImagePath)) {
    slide.addImage({
      path: crestImagePath,
      x: 11.8,
      y: 0.25,
      w: 0.85,
      h: 0.85,
    });
  }

  // Divider Line
  slide.addShape(pres.ShapeType.line, {
    x: 0.8,
    y: 1.25,
    w: 11.7,
    h: 0,
    line: { color: "CBD5E1", width: 1 },
  });

  // Standard Footer
  slide.addText("JECRC University, Jaipur | Department of Computer Science & Engineering", {
    x: 0.8,
    y: 7.05,
    w: 8.0,
    h: 0.3,
    fontFace: FONT_FAMILY,
    fontSize: 9,
    color: "94A3B8",
  });
}

// =============================================================================
// SLIDE 1: TITLE SLIDE (EXACT JECRC SAMPLE FORMAT WITH REAL CAMPUS BANNER & LOGO)
// =============================================================================
const s1 = pres.addSlide();
s1.background = { color: "FFFFFF" };

// Campus Header Image
if (fs.existsSync(campusImagePath)) {
  s1.addImage({
    path: campusImagePath,
    x: 0.8,
    y: 0.5,
    w: 11.7,
    h: 2.3,
  });
}

// Main Title
s1.addText("Major Project Presentation", {
  x: 0.8,
  y: 3.0,
  w: 11.7,
  h: 0.5,
  fontFace: FONT_FAMILY,
  fontSize: 24,
  bold: true,
  align: "center",
  color: COLORS.primary,
});

s1.addText("On “AttendX: Smart Attendance Planner”", {
  x: 0.8,
  y: 3.5,
  w: 11.7,
  h: 0.5,
  fontFace: FONT_FAMILY,
  fontSize: 20,
  bold: true,
  align: "center",
  color: COLORS.jecrcRed,
});

s1.addText("A Context-Aware Attendance Prediction Engine & Google Gemini AI Academic Advisor", {
  x: 0.8,
  y: 4.0,
  w: 11.7,
  h: 0.35,
  fontFace: FONT_FAMILY,
  fontSize: 12,
  italic: true,
  align: "center",
  color: COLORS.accent,
});

// Presenter Block (Left)
s1.addText("Presented By:-\nAryan Raj\n23BCON123 [Your Reg. No.]\nSession: 2025–2026", {
  x: 1.0,
  y: 4.6,
  w: 4.5,
  h: 1.5,
  fontFace: FONT_FAMILY,
  fontSize: 12,
  lineSpacing: 18,
  bold: false,
  color: COLORS.textDark,
});

// University Logo (Center)
if (fs.existsSync(logoImagePath)) {
  s1.addImage({
    path: logoImagePath,
    x: 5.4,
    y: 4.6,
    w: 2.5,
    h: 1.3,
  });
}

// Guide Block (Right)
s1.addText("Guide:-\nDr./Mr./Ms. [Guide Name]\nAssistant Professor\nDEPARTMENT OF Computer Science and Engineering\nJECRC University, Jaipur", {
  x: 8.0,
  y: 4.6,
  w: 4.5,
  h: 1.8,
  fontFace: FONT_FAMILY,
  fontSize: 11,
  lineSpacing: 16,
  color: COLORS.textDark,
});

// Speaker Notes
s1.addNotes("Good morning respected evaluators, Head of Department, and project guide. Today, I am presenting my Major Project titled 'AttendX: Smart Attendance Planner'. AttendX is a client-first, privacy-focused decision support system and AI academic advisor built to eliminate examination debarment caused by attendance shortages.");

// =============================================================================
// SLIDE 2: CONTENTS (MATCHES SAMPLE PPT SLIDE 2 EXACTLY)
// =============================================================================
const s2 = pres.addSlide();
s2.background = { color: COLORS.bgLight };
addDesignerHeader(s2, "Contents / Table of Contents", "SYNOPSIS");

const contentsData = [
  "1. Introduction & Problem Statement (Background, motivation, and the core problem being addressed)",
  "2. Literature Review & Comparative Study (ERP portals, manual spreadsheets, and generic apps vs AttendX)",
  "3. Feasibility Study (Technical, economic, and operational validation)",
  "4. System Design (Block diagrams, system architecture, flowcharts, UML diagrams, DFD, ER diagrams)",
  "5. Methodology (Core approach, architectural patterns, and verified mathematical algorithms)",
  "6. Tools and Technology Used (Hardware components, software stack, frameworks, libraries)",
  "7. Roles and Responsibilities of Team Members (Modular work division and contributions)",
  "8. Implementation (Step-by-step development, key modules built, and code snippets)",
  "9. Results & Performance Metrics (Screenshots, charts, test data, observations, and benchmarks)",
  "10. Conclusion & Future Scope (Summary of achievements, limitations, and future enhancements)",
  "11. References (Cited official documentation and academic literature in IEEE format)",
];

s2.addText(contentsData.join("\n\n"), {
  x: 1.0,
  y: 1.6,
  w: 11.2,
  h: 5.1,
  fontFace: FONT_FAMILY,
  fontSize: 11.5,
  lineSpacing: 18,
  color: COLORS.textDark,
});

s2.addNotes("This presentation follows the exact curriculum structure prescribed by JECRC University, covering our motivation, system design, mathematical formulas, AI integration, 22-case test suite, live results, and future research.");

// =============================================================================
// SLIDE 3: INTRODUCTION & ACADEMIC BACKGROUND
// =============================================================================
const s3 = pres.addSlide();
s3.background = { color: COLORS.bgLight };
addDesignerHeader(s3, "1. Introduction & Academic Background", "SECTION 1: INTRODUCTION");

s3.addShape(pres.ShapeType.rect, {
  x: 0.8,
  y: 1.5,
  w: 11.7,
  h: 5.2,
  fill: { color: COLORS.cardBg },
  line: { color: COLORS.border, width: 1 },
});

s3.addText("The Mandatory 75% Attendance Regulation:", {
  x: 1.1,
  y: 1.7,
  w: 11.0,
  h: 0.4,
  fontFace: FONT_FAMILY,
  fontSize: 14,
  bold: true,
  color: COLORS.jecrcRed,
});

s3.addText(
  "• Statutory University Mandate: Governing academic councils, including AICTE and JECRC University ordinances, enforce a strict requirement mandating undergraduates to maintain at least 75% classroom and laboratory attendance across each enrolled subject.\n\n" +
  "• High-Stakes Penalty: Students failing to satisfy the 75% attendance threshold are debarred from appearing in semester end-term theory and laboratory practical examinations, leading to backlogs and academic delays.\n\n" +
  "• Reality of Engineering Life: Modern B.Tech students balance heavy coursework with technical hackathons, national coding contests, industrial internships, sports, campus placement drives, and personal emergencies.\n\n" +
  "• Compounding Deficit: Attendance is cumulative. Missing a modest cluster of classes early in the semester produces a compounding deficit that becomes mathematically impossible to recover during late semester weeks.",
  {
    x: 1.1,
    y: 2.2,
    w: 11.0,
    h: 4.2,
    fontFace: FONT_FAMILY,
    fontSize: 12.5,
    lineSpacing: 21,
    color: COLORS.textDark,
  }
);

s3.addNotes("In every Indian engineering college, 75% attendance is a mandatory gatekeeper. Missing classes for valid reasons like internships or illness can lead to catastrophic debarment if not managed with mathematical precision.");

// =============================================================================
// SLIDE 4: PROBLEM STATEMENT & MOTIVATION
// =============================================================================
const s4 = pres.addSlide();
s4.background = { color: COLORS.bgLight };
addDesignerHeader(s4, "2. Problem Statement & Motivation", "SECTION 1: PROBLEM STATEMENT");

// Left Box: Problem
s4.addShape(pres.ShapeType.rect, {
  x: 0.8,
  y: 1.5,
  w: 5.7,
  h: 5.2,
  fill: { color: "FFF1F2" }, // Soft Red
  line: { color: "FECDD3", width: 1 },
});

s4.addText("Current College ERP Deficiencies", {
  x: 1.1,
  y: 1.7,
  w: 5.1,
  h: 0.4,
  fontFace: FONT_FAMILY,
  fontSize: 14,
  bold: true,
  color: COLORS.danger,
});

s4.addText(
  "1. Retrospective Only: Portals show what was missed (e.g. 68.2%), not what must be done next.\n\n" +
  "2. Zero Bunk Capacity Math: Students have no way to calculate how many lectures they can safely skip.\n\n" +
  "3. Too-Late Realization: Students discover shortages 10 days before exams, when recovery is impossible.\n\n" +
  "4. Cumbersome Access: University portals suffer severe server crashes during examination weeks.",
  {
    x: 1.1,
    y: 2.2,
    w: 5.1,
    h: 4.2,
    fontFace: FONT_FAMILY,
    fontSize: 12,
    lineSpacing: 18,
    color: COLORS.textDark,
  }
);

// Right Box: Solution
s4.addShape(pres.ShapeType.rect, {
  x: 6.8,
  y: 1.5,
  w: 5.7,
  h: 5.2,
  fill: { color: "F0FDF4" }, // Soft Green
  line: { color: "BBF7D0", width: 1 },
});

s4.addText("The AttendX Engineering Solution", {
  x: 7.1,
  y: 1.7,
  w: 5.1,
  h: 0.4,
  fontFace: FONT_FAMILY,
  fontSize: 14,
  bold: true,
  color: COLORS.success,
});

s4.addText(
  "1. Predictive Decision Engine: Computes exact bunk allowances and consecutive classes required to reach 75%.\n\n" +
  "2. 1-Click Action & Undo: Log Present (+1), Absent, or Cancelled lectures with instant history reversal.\n\n" +
  "3. Multi-Scenario Modeling: Simulates Attend-All, Attend-None, and custom upcoming class plans.\n\n" +
  "4. Gemini AI Academic Advisor: Natural language Q&A synthesizing student live data with privacy.\n\n" +
  "5. Zero-Latency LocalStorage: Operates 100% offline with zero server database leaks.",
  {
    x: 7.1,
    y: 2.2,
    w: 5.1,
    h: 4.2,
    fontFace: FONT_FAMILY,
    fontSize: 12,
    lineSpacing: 18,
    color: COLORS.textDark,
  }
);

s4.addNotes("Traditional ERPs act like a passive mirror showing the past. AttendX acts like a GPS navigator, showing the exact route to reach 75% safely.");

// =============================================================================
// SLIDE 5: OBJECTIVES & SCOPE OF THE PROJECT
// =============================================================================
const s5 = pres.addSlide();
s5.background = { color: COLORS.bgLight };
addDesignerHeader(s5, "3. Objectives & Project Scope", "SECTION 1: OBJECTIVES");

s5.addText("Key Engineering Objectives:", {
  x: 0.8,
  y: 1.5,
  w: 11.7,
  h: 0.35,
  fontFace: FONT_FAMILY,
  fontSize: 13,
  bold: true,
  color: COLORS.accent,
});

const objList = [
  "1. Mathematical Rigor: Formulate and implement verified algorithms for percentage calculation, allowable bunks, and consecutive recovery targets without floating-point errors.",
  "2. Zero-Cost, Privacy-First Architecture: Store all subject logs exclusively in browser LocalStorage to guarantee complete student data confidentiality and zero database maintenance expenses.",
  "3. Conversational AI Integration: Engineer a secure serverless endpoint connecting Google Gemini Flash API with client context injection for personalized academic counseling.",
  "4. Interactive Visual Dashboards: Render dynamic SVG charts (subject bar charts and status distribution donuts) to surface attendance risks in under 2 seconds.",
  "5. Portability & Demonstrability: Implement 1-click JSON backup export/import and pre-configured B.Tech sample course datasets for immediate evaluator demonstrations.",
];

s5.addText(objList.join("\n\n"), {
  x: 0.8,
  y: 1.9,
  w: 11.7,
  h: 3.2,
  fontFace: FONT_FAMILY,
  fontSize: 11.5,
  lineSpacing: 16,
  color: COLORS.textDark,
});

s5.addText("Project Scope & Operational Boundaries:", {
  x: 0.8,
  y: 5.3,
  w: 11.7,
  h: 0.35,
  fontFace: FONT_FAMILY,
  fontSize: 13,
  bold: true,
  color: COLORS.accent,
});

s5.addText(
  "• Target Domain: Undergraduate B.Tech / Higher Education university curricula governed by minimum percentage ordinances.\n" +
  "• Platform Support: Cross-platform web application optimized for smartphones, tablets, laptops, and lab desktop monitors.\n" +
  "• Policy Customization: Default 75% threshold with individual subject overrides (e.g. 85% for scholarship courses).",
  {
    x: 0.8,
    y: 5.7,
    w: 11.7,
    h: 1.2,
    fontFace: FONT_FAMILY,
    fontSize: 11.5,
    lineSpacing: 16,
    color: COLORS.textDark,
  }
);

s5.addNotes("Our objectives were clear: high mathematical precision, zero database cost, complete client-side privacy, and intelligent AI integration.");

// =============================================================================
// SLIDE 6: COMPARATIVE STUDY MATRIX
// =============================================================================
const s6 = pres.addSlide();
s6.background = { color: COLORS.bgLight };
addDesignerHeader(s6, "4. Literature Review & Comparative Analysis", "SECTION 2: LITERATURE REVIEW");

s6.addText("Table 2.1: Comparative Matrix — AttendX vs Existing Approaches", {
  x: 0.8,
  y: 1.45,
  w: 11.7,
  h: 0.35,
  fontFace: FONT_FAMILY,
  fontSize: 11,
  bold: true,
  color: COLORS.accent,
});

s6.addTable(
  [
    [
      { text: "Evaluation Criteria", options: { bold: true, fill: COLORS.primary, color: "FFFFFF" } },
      { text: "University ERP Portal", options: { bold: true, fill: COLORS.primary, color: "FFFFFF" } },
      { text: "Manual Spreadsheets", options: { bold: true, fill: COLORS.primary, color: "FFFFFF" } },
      { text: "Generic Tracker Apps", options: { bold: true, fill: COLORS.primary, color: "FFFFFF" } },
      { text: "AttendX Smart Planner", options: { bold: true, fill: COLORS.jecrcRed, color: "FFFFFF" } },
    ],
    ["Bunk Capacity Math", "No (Static numbers)", "Manual formula needed", "Crude approximations", "Automated (Floor formula)"],
    ["Recovery Classes Needed", "No guidance given", "Complex setup", "Rarely available", "Automated (Ceiling formula)"],
    ["Multi-Scenario Prediction", "No future modeling", "Requires manual tables", "No", "Integrated (3-Scenario Slider)"],
    ["Contextual AI Advisor", "No", "No", "No", "Integrated (Gemini Flash)"],
    ["1-Click Undo Action", "No", "Ctrl+Z (File scope)", "Often missing", "Instant Per-Subject History Undo"],
    ["Privacy & Data Host", "Centralized server logins", "Local file / cloud", "Third-party ad servers", "100% Client LocalStorage"],
    ["Interactive Visual Radar", "Tabular lists only", "Manual chart creation", "Basic bars", "Recharts Bar & Donut Charts"],
  ],
  {
    x: 0.8,
    y: 1.85,
    w: 11.7,
    h: 4.8,
    fontFace: FONT_FAMILY,
    fontSize: 9.5,
    border: { color: "CBD5E1", pt: 1 },
    rowH: 0.55,
  }
);

s6.addNotes("When evaluated against standard ERP systems and generic apps, AttendX is the only platform combining mathematical recovery proofs with a context-aware AI assistant.");

// =============================================================================
// SLIDE 7: FEASIBILITY STUDY
// =============================================================================
const s7 = pres.addSlide();
s7.background = { color: COLORS.bgLight };
addDesignerHeader(s7, "5. Feasibility Study (Technical, Economic, Operational)", "SECTION 2: FEASIBILITY");

const fCards = [
  {
    title: "Technical Feasibility",
    badge: "100% VIABLE",
    color: COLORS.primary,
    points: [
      "Next.js 14 App Router provides robust static page generation and serverless API endpoints.",
      "React 18 state management ensures instant UI reactivity without page reloads.",
      "Browser LocalStorage is natively supported across 99.8% of global web clients.",
      "Google Gemini Flash API guarantees sub-second streaming inference.",
    ],
  },
  {
    title: "Economic Feasibility",
    badge: "ZERO COST",
    color: COLORS.accent,
    points: [
      "Zero Software Licenses: Built exclusively with open-source tools (Next.js, Tailwind, React).",
      "Free Cloud Hosting: Vercel provides zero-cost edge serverless deployment for student projects.",
      "Generous Free AI Quota: Google AI Studio provides sufficient free API calls for academic use.",
      "No Database Bills: Complete elimination of cloud SQL/NoSQL hosting charges.",
    ],
  },
  {
    title: "Operational Feasibility",
    badge: "HIGH ADOPTION",
    color: COLORS.jecrcRed,
    points: [
      "Zero Training Required: Familiar 1-click Present, Absent, and Cancelled buttons.",
      "Immediate Classroom Utility: Mobile-first layout allows logging in 5 seconds between lectures.",
      "Privacy Comfort: Students do not fear institutional tracking because data is strictly local.",
      "Instant Demo Capability: Pre-loaded sample subjects demonstrate all features in 10 seconds.",
    ],
  },
];

fCards.forEach((c, idx) => {
  const xPos = 0.8 + idx * 4.0;
  s7.addShape(pres.ShapeType.rect, {
    x: xPos,
    y: 1.6,
    w: 3.7,
    h: 5.0,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.border, width: 1.5 },
  });

  s7.addText(c.title, {
    x: xPos + 0.2,
    y: 1.8,
    w: 3.3,
    h: 0.35,
    fontFace: FONT_FAMILY,
    fontSize: 13,
    bold: true,
    color: c.color,
  });

  s7.addText(c.badge, {
    x: xPos + 0.2,
    y: 2.15,
    w: 3.3,
    h: 0.25,
    fontFace: FONT_FAMILY,
    fontSize: 9.5,
    bold: true,
    color: COLORS.jecrcRed,
  });

  const formattedPoints = c.points.map((p) => `• ${p}`).join("\n\n");
  s7.addText(formattedPoints, {
    x: xPos + 0.2,
    y: 2.5,
    w: 3.3,
    h: 3.9,
    fontFace: FONT_FAMILY,
    fontSize: 10.5,
    lineSpacing: 15,
    color: COLORS.textDark,
  });
});

s7.addNotes("From a feasibility perspective: AttendX has zero licensing costs, runs on free serverless infrastructure, and solves the operational friction that makes other apps fail.");

// =============================================================================
// SLIDE 8: SYSTEM ARCHITECTURE & BLOCK DIAGRAM
// =============================================================================
const s8 = pres.addSlide();
s8.background = { color: COLORS.bgLight };
addDesignerHeader(s8, "6. System Architecture & Block Diagram", "SECTION 3: SYSTEM DESIGN");

s8.addText(
  "Client-First Decoupled Architecture with Stateless AI Proxy Pattern:\n\n" +
  "┌────────────────────────────────────────────────────────────────────────────────────────┐\n" +
  "│                               CLIENT TIER (Student Browser Environment)                │\n" +
  "│                                                                                        │\n" +
  "│  ┌────────────────────────┐  ┌───────────────────────────┐  ┌───────────────────────┐  │\n" +
  "│  │ React UI Layer         │  │ Attendance Math Engine    │  │ Browser LocalStorage  │  │\n" +
  "│  │ • Executive Dashboard  │  │ • calculateAttendance%()  │  │ • attendx_subjects_v1 │  │\n" +
  "│  │ • Subject Tracker/Logs │◄─┼─► calculateBunkable()     │◄─┼─► attendx_settings_v1 │  │\n" +
  "│  │ • Calculators & Radar  │  │ • calculateRequired()     │  │ • JSON Export/Import  │  │\n" +
  "│  │ • AI Assistant Views   │  │ • calculatePredicted()    │  │ • Corrupted Fallback  │  │\n" +
  "│  └───────────┬────────────┘  └───────────────────────────┘  └───────────────────────┘  │\n" +
  "└──────────────┼─────────────────────────────────────────────────────────────────────────┘\n" +
  "               │ HTTP POST /api/chat (Student Query + Live JSON Attendance Summary)\n" +
  "               ▼\n" +
  "┌────────────────────────────────────────────────────────────────────────────────────────┐\n" +
  "│                         SERVERLESS TIER (Next.js 14 App Router API)                    │\n" +
  "│                                                                                        │\n" +
  "│  ┌──────────────────────────────────────────────────────────────────────────────────┐  │\n" +
  "│  │ Route Handler: app/api/chat/route.js                                             │  │\n" +
  "│  │ • In-Memory IP Rate Limiting (15 req/min sliding window)                         │  │\n" +
  "│  │ • Input Trimming & DoS Protection (Max 500 characters)                           │  │\n" +
  "│  │ • System Prompt Assembly: Role Persona + Verified Math Rules + Student Context   │  │\n" +
  "│  │ • Securely accesses process.env.GEMINI_API_KEY (100% Hidden from Client)         │  │\n" +
  "│  └──────────────────────────────────────────┬───────────────────────────────────────┘  │\n" +
  "└─────────────────────────────────────────────┼──────────────────────────────────────────┘\n" +
  "                                              │ HTTPS REST Call\n" +
  "                                              ▼\n" +
  "┌────────────────────────────────────────────────────────────────────────────────────────┐\n" +
  "│                         EXTERNAL CLOUD TIER (Google AI Studio)                         │\n" +
  "│  Google Gemini 2.5 Flash API: Evaluates query against student context & returns math   │\n" +
  "└────────────────────────────────────────────────────────────────────────────────────────┘",
  {
    x: 0.8,
    y: 1.45,
    w: 11.7,
    h: 5.3,
    fontFace: "Courier New",
    fontSize: 9.2,
    color: COLORS.primary,
  }
);

s8.addNotes("Here is our system architecture diagram. Notice how cleanly the tiers are decoupled: the client handles all data mutations locally, while the serverless route acts as a secure, rate-limited proxy for Google Gemini.");

// =============================================================================
// SLIDE 9: UML USE CASE DIAGRAM
// =============================================================================
const s9 = pres.addSlide();
s9.background = { color: COLORS.bgLight };
addDesignerHeader(s9, "7. UML Modeling: Use Case Diagram", "SECTION 3: UML MODELING");

s9.addShape(pres.ShapeType.rect, {
  x: 0.8,
  y: 1.5,
  w: 11.7,
  h: 5.2,
  fill: { color: COLORS.cardBg },
  line: { color: COLORS.border, width: 1 },
});

s9.addText("Primary Actor: College Student (Undergraduate Engineering Learner)", {
  x: 1.1,
  y: 1.7,
  w: 11.0,
  h: 0.35,
  fontFace: FONT_FAMILY,
  fontSize: 13,
  bold: true,
  color: COLORS.accent,
});

const ucList = [
  "• UC-01: Manage Courses & Target Overrides — Add, edit, or delete subjects with codes, instructor names, and custom target percentages.",
  "• UC-02: Log Daily Lecture Attendance — Mark lectures as Present (+1 attended, +1 total), Absent (+0 attended, +1 total), or Cancelled (no count change).",
  "• UC-03: Perform 1-Click Action Undo — Revert the most recent attendance entry for any subject, restoring previous metrics.",
  "• UC-04: Calculate Safe Bunk Allowance — Compute the maximum number of classes that can be skipped while maintaining attendance >= target %.",
  "• UC-05: Calculate Consecutive Recovery Classes — Calculate the exact number of consecutive lectures needed to clear an attendance shortage.",
  "• UC-06: Model Future Scenarios — Simulate final attendance across Attend-All, Attend-None, and custom upcoming class plans.",
  "• UC-07: Consult AI Academic Advisor — Submit natural language questions answered using the student's real live attendance figures.",
  "• UC-08: Data Backup & Disaster Recovery — Export encrypted JSON backup, import existing backups, and load sample demo subjects.",
];

s9.addText(ucList.join("\n\n"), {
  x: 1.1,
  y: 2.1,
  w: 11.0,
  h: 4.4,
  fontFace: FONT_FAMILY,
  fontSize: 11,
  lineSpacing: 16,
  color: COLORS.textDark,
});

s9.addNotes("The use case diagram captures the student's complete journey: from logging daily classes to auditing bunks, calculating recovery targets, and consulting the AI assistant.");

// =============================================================================
// SLIDE 10: UML SEQUENCE DIAGRAM
// =============================================================================
const s10 = pres.addSlide();
s10.background = { color: COLORS.bgLight };
addDesignerHeader(s10, "8. UML Sequence Diagram: AI Context Injection Flow", "SECTION 3: UML MODELING");

s10.addText(
  "Chronological Message Interaction Across System Boundaries:\n\n" +
  "Student UI (Browser)          Next.js Server (/api/chat)         Google Gemini Flash API\n" +
  "     │                                     │                                 │\n" +
  "     │ 1. Asks 'Can I skip DBMS tomorrow?' │                                 │\n" +
  "     ├────────────────────────────────────►│                                 │\n" +
  "     │    (Includes LocalStorage context)  │                                 │\n" +
  "     │                                     │ 2. Enforces IP Rate Limiting    │\n" +
  "     │                                     │    (<15 requests/min)           │\n" +
  "     │                                     │ 3. Assembles System Prompt with │\n" +
  "     │                                     │    Verified Formulas & Context  │\n" +
  "     │                                     │ 4. Calls HTTPS REST API         │\n" +
  "     │                                     ├────────────────────────────────►│\n" +
  "     │                                     │    (Uses Server GEMINI_API_KEY) │\n" +
  "     │                                     │                                 │ 5. Analyzes real data\n" +
  "     │                                     │                                 │    using verified math\n" +
  "     │                                     │ 6. Returns AI response with math│\n" +
  "     │                                     │◄────────────────────────────────┤\n" +
  "     │ 7. Returns JSON { reply: string }   │                                 │\n" +
  "     │◄────────────────────────────────────┤                                 │\n" +
  "     │                                     │                                 │\n" +
  "     │ 8. Renders formatted bubble in UI   │                                 │\n" +
  "     ▼                                     ▼                                 ▼",
  {
    x: 0.8,
    y: 1.5,
    w: 11.7,
    h: 5.2,
    fontFace: "Courier New",
    fontSize: 9.8,
    color: COLORS.primary,
  }
);

s10.addNotes("Here is the sequence diagram illustrating our AI interaction. Notice that the client never touches the Google API directly. The server route injects live context, protects against rate limits, and secures the API key.");

// =============================================================================
// SLIDE 11: DATA FLOW DIAGRAMS (LEVEL 0 & LEVEL 1)
// =============================================================================
const s11 = pres.addSlide();
s11.background = { color: COLORS.bgLight };
addDesignerHeader(s11, "9. Data Flow Diagrams (DFD Level 0 & Level 1)", "SECTION 3: DATA FLOW");

s11.addText(
  "DFD Level 0 (Context Diagram):\n" +
  "┌───────────┐         Attendance Actions & Queries          ┌───────────────────────────┐\n" +
  "│  Student  ├──────────────────────────────────────────────►│    AttendX Smart System   │\n" +
  "│   User    │◄──────────────────────────────────────────────┤       (Process 0.0)       │\n" +
  "└───────────┘       Calculations, Status Alerts & AI Advice └───────▲───────────────┬───┘\n" +
  "                                                                    │               │\n" +
  "                                              LocalStorage Read/Save│               │Context Call / AI Stream\n" +
  "                                                                    ▼               ▼\n" +
  "                                                        ┌───────────────────┐  ┌───────────────────┐\n" +
  "                                                        │ D1: LocalStorage  │  │ Google Gemini API │\n" +
  "                                                        └───────────────────┘  └───────────────────┘\n\n" +
  "DFD Level 1 (Functional Subsystem Decomposition):\n" +
  "• Process 1.0 (Course & Attendance Management): Accepts Present/Absent/Cancelled inputs, validates counts, and writes to D1.\n" +
  "• Process 2.0 (Mathematical Engine): Reads D1 and executes percentage, bunk allowance, and recovery formulas.\n" +
  "• Process 3.0 (Predictive Analytics): Accepts planned future classes (n, k) and outputs multi-scenario final percentages.\n" +
  "• Process 4.0 (AI Context Broker): Intercepts student inquiries, packages live D1 data, and interfaces with Gemini API.",
  {
    x: 0.8,
    y: 1.5,
    w: 11.7,
    h: 5.2,
    fontFace: "Courier New",
    fontSize: 10,
    color: COLORS.primary,
  }
);

s11.addNotes("The DFD Level 0 and Level 1 models show how student inputs flow into distinct functional subsystems: attendance logging, mathematical computation, scenario prediction, and AI broker processing.");

// =============================================================================
// SLIDE 12: ER MODELING & STORAGE SCHEMA
// =============================================================================
const s12 = pres.addSlide();
s12.background = { color: COLORS.bgLight };
addDesignerHeader(s12, "10. Entity-Relationship & LocalStorage Schema", "SECTION 3: DATA DESIGN");

s12.addShape(pres.ShapeType.rect, {
  x: 0.8,
  y: 1.5,
  w: 11.7,
  h: 5.2,
  fill: { color: COLORS.cardBg },
  line: { color: COLORS.border, width: 1 },
});

s12.addText("Relational Schema Implemented via Structured Browser LocalStorage:", {
  x: 1.1,
  y: 1.7,
  w: 11.0,
  h: 0.35,
  fontFace: FONT_FAMILY,
  fontSize: 13,
  bold: true,
  color: COLORS.accent,
});

s12.addText(
  "1. Subject Entity (Key: attendx_subjects_v1):\n" +
  "   • id: String (Primary Key, unique timestamp hash, e.g. 'subj_cs301')\n" +
  "   • name: String (Course title, mandatory, trimmed, 1-60 characters)\n" +
  "   • code: String (Course code, e.g. 'CS-301')\n" +
  "   • teacher: String (Instructor name, e.g. 'Dr. R. K. Sharma')\n" +
  "   • color: String (Hex color code for visual progress bars)\n" +
  "   • attended: Integer (Classes attended, validated >= 0 and <= total)\n" +
  "   • total: Integer (Total classes conducted to date)\n" +
  "   • target: Integer (Subject target percentage, 1-100, default 75%)\n" +
  "   • history: Array of AttendanceRecord entities\n\n" +
  "2. AttendanceRecord Entity (Child of Subject, 1-to-Many Relationship):\n" +
  "   • id: String (Primary Key, e.g. 'log_179528_abc')\n" +
  "   • date: String (ISO format YYYY-MM-DD)\n" +
  "   • action: Enum ('present' | 'absent' | 'cancelled')\n" +
  "   • timestamp: Integer (Epoch milliseconds used to enable single-click undo)\n\n" +
  "3. Settings Entity (Key: attendx_settings_v1):\n" +
  "   • globalTarget: Integer (1-100, default 75%) | theme: Enum ('light' | 'dark')",
  {
    x: 1.1,
    y: 2.1,
    w: 11.0,
    h: 4.4,
    fontFace: FONT_FAMILY,
    fontSize: 11,
    lineSpacing: 16,
    color: COLORS.textDark,
  }
);

s12.addNotes("Even though we use LocalStorage instead of SQL, we enforce a strict relational schema where each Subject owns an array of AttendanceRecords, enabling chronological rollbacks and audits.");

// =============================================================================
// SLIDE 13: CORE MATHEMATICAL FORMULAS
// =============================================================================
const s13 = pres.addSlide();
s13.background = { color: COLORS.bgLight };
addDesignerHeader(s13, "11. Core Mathematical Calculation Logic", "SECTION 4: METHODOLOGY");

const formList = [
  {
    num: "Formula 1",
    name: "Current Attendance Percentage (P)",
    math: "P = (attended / total) * 100",
    detail: "Safely returns 0% when total = 0. Formats output with 2 decimal precision.",
  },
  {
    num: "Formula 2",
    name: "Consecutive Recovery Classes Required (x)",
    math: "x = ceil( (T * total - 100 * attended) / (100 - T) )",
    detail: "Computes minimum consecutive lectures needed to reach target T%. Returns 0 if already safe. Flags impossible if T=100% and attended < total.",
  },
  {
    num: "Formula 3",
    name: "Maximum Allowable Bunks (b)",
    math: "b = floor( (100 * attended / T) - total )",
    detail: "Calculates classes that can be skipped while remaining >= target T%. Clamped to min 0. If current % < T, returns 0.",
  },
  {
    num: "Formula 4",
    name: "Multi-Scenario Future Prediction (P_pred)",
    math: "P_pred = ( (attended + k) / (total + n) ) * 100",
    detail: "Models outcome after n upcoming classes with k attended (Best case: k=n; Worst case: k=0; Custom: k=slider value).",
  },
];

formList.forEach((f, idx) => {
  const yPos = 1.5 + idx * 1.3;
  s13.addShape(pres.ShapeType.rect, {
    x: 0.8,
    y: yPos,
    w: 11.7,
    h: 1.15,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.border, width: 1 },
  });

  s13.addText(`${f.num}: ${f.name}`, {
    x: 1.0,
    y: yPos + 0.1,
    w: 5.0,
    h: 0.35,
    fontFace: FONT_FAMILY,
    fontSize: 12,
    bold: true,
    color: COLORS.primary,
  });

  s13.addText(f.math, {
    x: 6.2,
    y: yPos + 0.1,
    w: 6.1,
    h: 0.35,
    fontFace: "Courier New",
    fontSize: 12,
    bold: true,
    color: COLORS.accent,
  });

  s13.addText(f.detail, {
    x: 1.0,
    y: yPos + 0.5,
    w: 11.3,
    h: 0.55,
    fontFace: FONT_FAMILY,
    fontSize: 10.5,
    color: COLORS.textMuted,
  });
});

s13.addNotes("These four formulas form the mathematical backbone of AttendX. Notice that we use the ceiling function for required classes to guarantee compliance, and floor for bunk capacity to prevent premature skips.");

// =============================================================================
// SLIDE 14: VERIFIED MATHEMATICAL PROOFS
// =============================================================================
const s14 = pres.addSlide();
s14.background = { color: COLORS.bgLight };
addDesignerHeader(s14, "12. Verified Mathematical Proofs & Edge Cases", "SECTION 4: METHODOLOGY");

s14.addText("Table 4.1: Verified Mathematical Test Cases and Edge-Case Validations", {
  x: 0.8,
  y: 1.45,
  w: 11.7,
  h: 0.35,
  fontFace: FONT_FAMILY,
  fontSize: 11,
  bold: true,
  color: COLORS.accent,
});

s14.addTable(
  [
    [
      { text: "Test Input", options: { bold: true, fill: COLORS.primary, color: "FFFFFF" } },
      { text: "Target %", options: { bold: true, fill: COLORS.primary, color: "FFFFFF" } },
      { text: "Attendance %", options: { bold: true, fill: COLORS.primary, color: "FFFFFF" } },
      { text: "Recovery Classes (x)", options: { bold: true, fill: COLORS.primary, color: "FFFFFF" } },
      { text: "Bunk Allowance (b)", options: { bold: true, fill: COLORS.primary, color: "FFFFFF" } },
      { text: "Verification Proof", options: { bold: true, fill: COLORS.primary, color: "FFFFFF" } },
    ],
    ["18 / 25", "75%", "72.00% (Shortage)", "3 classes", "0 bunks", "(18+3) / (25+3) = 21/28 = 75.00% (Exact target met)"],
    ["22 / 25", "75%", "88.00% (Safe)", "0 classes (Met)", "4 bunks", "22 / (25+4) = 22/29 = 75.86% >= 75.00% (Safe limit)"],
    ["15 / 20", "75%", "75.00% (Warning)", "0 classes (Met)", "0 bunks (Edge)", "Skipping 1 class drops to 15/21 = 71.43% (Shortage)"],
    ["0 / 10", "75%", "0.00% (Shortage)", "30 classes", "0 bunks", "(0+30) / (10+30) = 30/40 = 75.00%"],
    ["9 / 10", "100%", "90.00%", "Impossible (100-T=0)", "0 bunks", "Mathematical proof: Cannot achieve 100% after 1 absence"],
  ],
  {
    x: 0.8,
    y: 1.85,
    w: 11.7,
    h: 4.8,
    fontFace: FONT_FAMILY,
    fontSize: 9.5,
    border: { color: "CBD5E1", pt: 1 },
    rowH: 0.65,
  }
);

s14.addNotes("Every single formula in AttendX is rigorously verified. In scenario 5, when target is 100% but a class was missed, the denominator is zero. AttendX catches this and flags it as mathematically impossible.");

// =============================================================================
// SLIDE 15: TOOLS & TECHNOLOGIES USED
// =============================================================================
const s15 = pres.addSlide();
s15.background = { color: COLORS.bgLight };
addDesignerHeader(s15, "13. Tools & Technologies Used", "SECTION 5: TOOLS & TECH");

const techList = [
  { name: "Next.js 14 App Router", role: "Full-Stack Web Architecture", desc: "File-system routing, automatic code splitting, and zero-config serverless API route handlers." },
  { name: "React 18", role: "Reactive UI Library", desc: "Declarative components, memoized custom hooks (useAttendanceData), and optimistic updates." },
  { name: "Tailwind CSS 3.4", role: "Design System & Dark Mode", desc: "Utility-first responsive styles, dark mode class toggling, and clean animations with zero CSS bloat." },
  { name: "Recharts 2.13", role: "Client-Side SVG Analytics", desc: "Composable bar charts with target threshold reference lines and status distribution donut charts." },
  { name: "Browser LocalStorage", role: "Data Persistence Layer", desc: "100% client privacy, zero latency, offline persistence, and zero database server costs." },
  { name: "Google Gemini Flash API", role: "AI Reasoning Backend", desc: "Sub-second inference speed, generous free quota, and structured context injection support." },
];

techList.forEach((t, idx) => {
  const row = Math.floor(idx / 3);
  const col = idx % 3;
  const xPos = 0.8 + col * 4.0;
  const yPos = 1.6 + row * 2.5;

  s15.addShape(pres.ShapeType.rect, {
    x: xPos,
    y: yPos,
    w: 3.7,
    h: 2.2,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.border, width: 1.5 },
  });

  s15.addText(t.name, {
    x: xPos + 0.2,
    y: yPos + 0.15,
    w: 3.3,
    h: 0.35,
    fontFace: FONT_FAMILY,
    fontSize: 12.5,
    bold: true,
    color: COLORS.primary,
  });

  s15.addText(`Role: ${t.role}`, {
    x: xPos + 0.2,
    y: yPos + 0.5,
    w: 3.3,
    h: 0.25,
    fontFace: FONT_FAMILY,
    fontSize: 9.5,
    bold: true,
    color: COLORS.accent,
  });

  s15.addText(t.desc, {
    x: xPos + 0.2,
    y: yPos + 0.8,
    w: 3.3,
    h: 1.3,
    fontFace: FONT_FAMILY,
    fontSize: 10,
    lineSpacing: 14,
    color: COLORS.textDark,
  });
});

s15.addNotes("We selected Next.js 14, React 18, Tailwind, Recharts, and Google Gemini Flash. This modern stack gives us lightning-fast performance and zero hosting overhead.");

// =============================================================================
// SLIDE 16: AI CHATBOT ARCHITECTURE & GUARDRAILS
// =============================================================================
const s16 = pres.addSlide();
s16.background = { color: COLORS.bgLight };
addDesignerHeader(s16, "14. AI Assistant Architecture & Guardrails", "SECTION 5: AI INTEGRATION");

s16.addShape(pres.ShapeType.rect, {
  x: 0.8,
  y: 1.5,
  w: 11.7,
  h: 5.2,
  fill: { color: COLORS.cardBg },
  line: { color: COLORS.border, width: 1 },
});

s16.addText("Prompt Engineering Techniques & Security Boundaries:", {
  x: 1.1,
  y: 1.7,
  w: 11.0,
  h: 0.35,
  fontFace: FONT_FAMILY,
  fontSize: 13,
  bold: true,
  color: COLORS.accent,
});

const aiGuards = [
  "1. Structured Context Injection: Every prompt injects the student's live JSON attendance data (subjects, attended, total, target %, bunk capacity, and recovery counts).",
  "2. Strict Academic Persona: 'AttendX Assistant' is defined as a supportive, highly analytical academic attendance advisor specifically tailored for Indian engineering students.",
  "3. Formula Enforcement: Instructs the LLM to follow the verified formulas strictly and show step-by-step arithmetic so students can verify calculations.",
  "4. Scope Boundary & Polite Refusal: Automatically rejects off-topic queries (coding tasks, general essays, trivia) and redirects users back to academic attendance planning.",
  "5. Prompt Injection Resistance: Explicit system instructions immunize the model against prompt injection ('ignore previous instructions', 'pretend you are DAN').",
  "6. Rate Limiting & DoS Protection: Server enforces sliding-window IP rate limiting (15 requests/minute) and limits queries to 500 characters maximum.",
  "7. Dual-Engine Fallback: If cloud API quota is exhausted, an offline mathematical engine synthesizes live data so the assistant never crashes.",
];

s16.addText(aiGuards.join("\n\n"), {
  x: 1.1,
  y: 2.1,
  w: 11.0,
  h: 4.4,
  fontFamily: FONT_FAMILY,
  fontSize: 11,
  lineSpacing: 15,
  color: COLORS.textDark,
});

s16.addNotes("Prompt engineering was crucial for this project. We used context injection, system persona grounding, mathematical formula enforcement, and negative constraints to prevent jailbreaks.");

// =============================================================================
// SLIDE 17: ROLES & RESPONSIBILITIES
// =============================================================================
const s17 = pres.addSlide();
s17.background = { color: COLORS.bgLight };
addDesignerHeader(s17, "15. Roles & Responsibilities of Team Members", "SECTION 6: TEAM ROLES");

s17.addTable(
  [
    [
      { text: "Team Member", options: { bold: true, fill: COLORS.primary, color: "FFFFFF" } },
      { text: "Assigned Project Modules", options: { bold: true, fill: COLORS.primary, color: "FFFFFF" } },
      { text: "Key Technical Contributions", options: { bold: true, fill: COLORS.primary, color: "FFFFFF" } },
    ],
    [
      "Aryan Raj\n(Lead Full-Stack Developer)",
      "Next.js Architecture, AI Chatbot Backend, Mathematical Engine, LocalStorage Hook",
      "Engineered attendance calculation engine, serverless /api/chat route with Gemini Flash, custom useAttendanceData hook, and Vercel CI/CD.",
    ],
    [
      "Team Member 2\n[Name / Reg. No.]",
      "UI/UX Design, Executive Dashboard, Tailwind Styling & Dark Mode",
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
    y: 1.7,
    w: 11.7,
    h: 5.0,
    fontFace: FONT_FAMILY,
    fontSize: 11,
    border: { color: "CBD5E1", pt: 1 },
    rowH: 1.05,
  }
);

s17.addNotes("Here is our team's division of responsibilities. I led full-stack engineering, math formulas, and the Gemini AI backend, while my teammates contributed to UI/UX, calculators, testing, and documentation.");

// =============================================================================
// SLIDE 18: IMPLEMENTATION MODULES WALKTHROUGH
// =============================================================================
const s18 = pres.addSlide();
s18.background = { color: COLORS.bgLight };
addDesignerHeader(s18, "16. Implementation Modules Walkthrough", "SECTION 7: IMPLEMENTATION");

const modItems = [
  "1. Subject Tracking Module (SubjectCard.jsx):\n   Provides 1-click Present (+1/+1), Absent (+0/+1), Cancelled (no count changes), and Undo actions with visual progress bars.",
  "2. Mathematical Engine (attendanceCalculations.js):\n   Pure functional module computing percentages, bunk allowances, consecutive recovery targets, and status classification (Safe, Warning, Shortage).",
  "3. Data Layer & Recovery (storage.js & useAttendanceData.js):\n   Manages browser LocalStorage persistence, corrupted data schema recovery, 1-click JSON backup export/import, and instant sample data demo loading.",
  "4. Predictive Analytics Module (AttendancePredictor.jsx):\n   Deterministic 3-scenario modeling tool (Attend All, Attend None, Custom Plan) with comparative spectrum visualizers.",
  "5. Conversational AI Assistant (/assistant & Chatbot.jsx):\n   Floating widget and dedicated full-screen page with quick question chips, typing animations, auto-scroll, and Google Gemini Flash integration.",
];

s18.addText(modItems.join("\n\n"), {
  x: 0.8,
  y: 1.6,
  w: 11.7,
  h: 5.1,
  fontFace: FONT_FAMILY,
  fontSize: 11.5,
  lineSpacing: 18,
  color: COLORS.textDark,
});

s18.addNotes("The code is organized into 5 modular subsystems, ensuring that data persistence, mathematical calculations, visual rendering, and AI routing remain cleanly separated.");

// =============================================================================
// SLIDE 19: TESTING METHODOLOGY & RESULTS
// =============================================================================
const s19 = pres.addSlide();
s19.background = { color: COLORS.bgLight };
addDesignerHeader(s19, "17. Testing Methodology & Verification Suite", "SECTION 8: TESTING & RESULTS");

s19.addText(
  "Automated Mathematical Unit Verification (test-calculations.js):\n" +
  "• We executed an automated 22-unit test suite verifying all formulas across standard values, edge boundaries, and division limits.\n" +
  "• Verification Outcome: 22 / 22 Tests Passed with 100% precision.\n\n" +
  "Key Verification Test Highlights:\n" +
  "• TC-01: 18/25 held at 75% target -> Correctly outputs 72.00% (Shortage) and requires exactly 3 consecutive classes.\n" +
  "• TC-02: 22/25 held at 75% target -> Correctly outputs 88.00% (Safe) with 4 safe bunks allowance.\n" +
  "• TC-03: Zero classes held (0/0) -> Safely returns 0.00% without triggering runtime NaN or division errors.\n" +
  "• TC-04: Target 100% with absences -> Automatically catches (100 - T) = 0 and returns 'Mathematically Impossible'.\n" +
  "• TC-05: Undo Last Action -> Decrements counters and restores previous attendance percentage perfectly.\n" +
  "• TC-06: Corrupted JSON Import -> Schema validator intercepts malformed text and alerts user via toast without crashing.\n" +
  "• TC-07: Rate Limiting Enforcement -> Server returns HTTP 429 after 15 requests in under 60 seconds.",
  {
    x: 0.8,
    y: 1.6,
    w: 11.7,
    h: 5.1,
    fontFace: FONT_FAMILY,
    fontSize: 11.5,
    lineSpacing: 18,
    color: COLORS.textDark,
  }
);

s19.addNotes("Our automated test suite validated 22 distinct assertions. We tested normal calculations, edge cases like zero classes held, 100% impossible targets, corrupted data recovery, and server rate limiting.");

// =============================================================================
// SLIDE 20: SYSTEM INTERFACE & RESULTS
// =============================================================================
const s20 = pres.addSlide();
s20.background = { color: COLORS.bgLight };
addDesignerHeader(s20, "18. System Interface & User Experience", "SECTION 8: RESULTS");

const uiCards = [
  { name: "Executive Dashboard", desc: "4 summary KPI cards (Overall %, Safe, Warning, Shortage counts), Shortage Radar, subject cards, and Recharts analytics." },
  { name: "Subject Tracker", desc: "Tabular and card view with real-time search, category filtering (All, Safe, Warning, Shortage), and collapsible chronological logs." },
  { name: "Bunk Simulator", desc: "Interactive course selector with worked mathematical proofs and a skip-impact simulation table (+1 to +5 classes)." },
  { name: "Recovery Calculator", desc: "Shows exact consecutive lectures needed to clear shortages with step-by-step verification proofs." },
  { name: "Future Predictor", desc: "Models best-case (100%), worst-case (0%), and custom attendance targets with interactive sliders." },
  { name: "AttendX AI Assistant", desc: "Floating drawer and full-page interface with instant inquiry chips, conversational advice, and dual-engine fallback." },
];

uiCards.forEach((u, idx) => {
  const row = Math.floor(idx / 3);
  const col = idx % 3;
  const xPos = 0.8 + col * 4.0;
  const yPos = 1.6 + row * 2.5;

  s20.addShape(pres.ShapeType.rect, {
    x: xPos,
    y: yPos,
    w: 3.7,
    h: 2.2,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.border, width: 1.5 },
  });

  s20.addText(u.name, {
    x: xPos + 0.2,
    y: yPos + 0.15,
    w: 3.3,
    h: 0.35,
    fontFace: FONT_FAMILY,
    fontSize: 12.5,
    bold: true,
    color: COLORS.primary,
  });

  s20.addText(u.desc, {
    x: xPos + 0.2,
    y: yPos + 0.55,
    w: 3.3,
    h: 1.5,
    fontFace: FONT_FAMILY,
    fontSize: 10,
    lineSpacing: 15,
    color: COLORS.textDark,
  });
});

s20.addNotes("Here is the visual user experience. Students have access to a clean executive dashboard, a subject tracker, bunk and recovery calculators, a future scenario predictor, and the full AI assistant.");

// =============================================================================
// SLIDE 21: PERFORMANCE & SECURITY BENCHMARKS
// =============================================================================
const s21 = pres.addSlide();
s21.background = { color: COLORS.bgLight };
addDesignerHeader(s21, "19. Performance & Security Benchmarks", "SECTION 8: BENCHMARKS");

s21.addText(
  "Production Build Performance (Vercel / Next.js Production Trace):\n" +
  "• Route Optimization: 12 static and dynamic routes compiled with zero build errors.\n" +
  "• First Load JS: Ultra-lightweight bundle size of 87.4 kB shared across all pages.\n" +
  "• Zero-Latency State Mutations: LocalStorage updates complete in <2 milliseconds.\n" +
  "• Sub-Second AI Response: Google Gemini Flash delivers streaming advice in ~800ms.\n\n" +
  "Security & Privacy Guarantees:\n" +
  "• Complete API Key Isolation: process.env.GEMINI_API_KEY is read solely on the server in /api/chat.\n" +
  "• Zero Client Secret Leakage: API keys are never bundled into client-side JavaScript or Git commits.\n" +
  "• In-Memory IP Rate Limiting: Sliding-window limiter restricts abusive clients to 15 req/minute.\n" +
  "• Strict Input Sanitization: Payload validation truncates messages >500 characters to prevent DoS payloads.\n" +
  "• 100% Client-Side Privacy: Student attendance data is never permanently retained on external servers.",
  {
    x: 0.8,
    y: 1.6,
    w: 11.7,
    h: 5.1,
    fontFace: FONT_FAMILY,
    fontSize: 11.5,
    lineSpacing: 18,
    color: COLORS.textDark,
  }
);

s21.addNotes("In production, the application is extremely lean: only 87.4 kB First Load JS, sub-second AI inference, and strict security guarantees ensuring the API key is never exposed.");

// =============================================================================
// SLIDE 22: CONCLUSION & ACHIEVEMENTS
// =============================================================================
const s22 = pres.addSlide();
s22.background = { color: COLORS.bgLight };
addDesignerHeader(s22, "20. Conclusion & Key Achievements", "SECTION 9: CONCLUSION");

s22.addShape(pres.ShapeType.rect, {
  x: 0.8,
  y: 1.5,
  w: 11.7,
  h: 5.2,
  fill: { color: COLORS.cardBg },
  line: { color: COLORS.border, width: 1 },
});

s22.addText("Summary of Major Achievements:", {
  x: 1.1,
  y: 1.7,
  w: 11.0,
  h: 0.35,
  fontFace: FONT_FAMILY,
  fontSize: 13,
  bold: true,
  color: COLORS.jecrcRed,
});

s22.addText(
  "• Solved Real-World Student Debarment Problem: Replaced passive ERP percentages with proactive decision guidance.\n\n" +
  "• Formulated Rigorous Mathematical Logic: Centralized verified calculations for attendance %, bunk allowances, and recovery targets.\n\n" +
  "• Context-Aware AI Innovation: Successfully integrated Google Gemini Flash with live student attendance context injection.\n\n" +
  "• Dual-Engine Reliability: Integrated deterministic local fallback engine ensuring zero downtime during evaluations.\n\n" +
  "• Complete Open-Source Deployment: Live production repository on GitHub (Aaryan-Raj21/attendx-smart-planner) and Vercel.\n\n" +
  "Academic & Practical Takeaway:\n" +
  "AttendX bridges the gap between strict university regulations and student life, empowering learners to manage attendance proactively with mathematical certainty.",
  {
    x: 1.1,
    y: 2.1,
    w: 11.0,
    h: 4.4,
    fontFace: FONT_FAMILY,
    fontSize: 12,
    lineSpacing: 18,
    color: COLORS.textDark,
  }
);

s22.addNotes("To conclude, AttendX replaces guesswork with mathematical certainty. Students always know their exact bunk limits and recovery paths, preventing examination debarment.");

// =============================================================================
// SLIDE 23: LIMITATIONS & FUTURE SCOPE
// =============================================================================
const s23 = pres.addSlide();
s23.background = { color: COLORS.bgLight };
addDesignerHeader(s23, "21. Limitations & Future Scope", "SECTION 9: FUTURE SCOPE");

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
    x: 0.8,
    y: 1.6,
    w: 11.7,
    h: 5.1,
    fontFace: FONT_FAMILY,
    fontSize: 12,
    lineSpacing: 20,
    color: COLORS.textDark,
  }
);

s23.addNotes("While AttendX is fully functional today, our future roadmap includes timetable automation, push notifications via PWA, and direct ERP web scrapers.");

// =============================================================================
// SLIDE 24: REFERENCES (IEEE STYLE)
// =============================================================================
const s24 = pres.addSlide();
s24.background = { color: COLORS.bgLight };
addDesignerHeader(s24, "22. References (IEEE Style)", "SECTION 10: REFERENCES");

const refList = [
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

s24.addText(refList.join("\n\n"), {
  x: 0.8,
  y: 1.5,
  w: 11.7,
  h: 5.3,
  fontFace: FONT_FAMILY,
  fontSize: 10,
  lineSpacing: 14,
  color: COLORS.textDark,
});

s24.addNotes("All literature, regulatory ordinances, and technical frameworks cited in this presentation conform to standard IEEE documentation formats.");

// =============================================================================
// SLIDE 25: THANK YOU & EVALUATOR Q&A (WITH JECRC BRANDING)
// =============================================================================
const s25 = pres.addSlide();
s25.background = { color: "FFFFFF" };

s25.addShape(pres.ShapeType.rect, {
  x: 0.8,
  y: 0.8,
  w: 11.7,
  h: 5.9,
  fill: { color: COLORS.bgLight },
  line: { color: COLORS.border, width: 1.5 },
});

s25.addText("THANK YOU!", {
  x: 1.2,
  y: 1.3,
  w: 10.9,
  h: 0.8,
  fontFace: FONT_FAMILY,
  fontSize: 38,
  bold: true,
  align: "center",
  color: COLORS.jecrcRed,
});

s25.addText("AttendX: Smart Attendance Planner", {
  x: 1.2,
  y: 2.2,
  w: 10.9,
  h: 0.5,
  fontFace: FONT_FAMILY,
  fontSize: 22,
  bold: true,
  align: "center",
  color: COLORS.primary,
});

s25.addText("Questions, Feedback & Evaluator Discussion", {
  x: 1.2,
  y: 2.8,
  w: 10.9,
  h: 0.4,
  fontFace: FONT_FAMILY,
  fontSize: 14,
  italic: true,
  align: "center",
  color: COLORS.accent,
});

if (fs.existsSync(crestImagePath)) {
  s25.addImage({
    path: crestImagePath,
    x: 5.9,
    y: 3.4,
    w: 1.5,
    h: 1.5,
  });
}

s25.addText(
  "Project Author: Aryan Raj\n" +
  "Department of Computer Science & Engineering\n" +
  "JECRC University, Jaipur (Session: 2025–26)\n" +
  "Live GitHub: https://github.com/Aaryan-Raj21/attendx-smart-planner\n" +
  "Contact: aryannraj21@gmail.com",
  {
    x: 1.2,
    y: 5.1,
    w: 10.9,
    h: 1.4,
    fontFace: FONT_FAMILY,
    fontSize: 11,
    lineSpacing: 16,
    align: "center",
    color: COLORS.textDark,
  }
);

s25.addNotes("Thank you respected evaluators for your time and guidance. I now invite your questions and feedback regarding AttendX.");

// Write Presentation
const outputPath = path.join(process.cwd(), "AttendX_Major_Project_Presentation.pptx");
pres.writeFile({ fileName: outputPath }).then(() => {
  console.log(`Designer-Grade Presentation successfully generated at: ${outputPath}`);
});
