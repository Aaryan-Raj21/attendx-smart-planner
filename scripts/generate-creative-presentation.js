import pptxgen from "pptxgenjs";
import path from "path";
import fs from "fs";

console.log("Generating Creative Gamma-Inspired AttendX Major Project Presentation (.pptx)...");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 13.33 x 7.5 inches
pres.author = "Aryan Raj";
pres.company = "JECRC University, Jaipur";
pres.title = "AttendX: Smart Attendance Planner";

// Gamma-Inspired Modern Dark & Vibrant Design Palette
const C = {
  bgDark: "0A0F1D",         // Deep Obsidian / Slate 950
  bgCard: "131B2E",         // Elevated Card Background
  bgCardSub: "1A253D",      // Secondary Card Background
  borderDark: "28354D",     // Subtle Card Border
  borderGlow: "4F46E5",     // Indigo Glow Border
  
  textLight: "F8FAFC",      // Pure Crisp White
  textMuted: "94A3B8",      // Cool Slate 400
  textSub: "CBD5E1",        // Slate 300
  
  indigo: "6366F1",         // Electric Indigo (Primary Accent)
  indigoDark: "1E1B4B",     // Deep Indigo
  cyan: "06B6D4",           // Electric Cyan
  sky: "38BDF8",            // Sky Blue Accent
  emerald: "10B981",        // Emerald Green (Success / Safe)
  emeraldDark: "064E3B",    // Deep Emerald
  amber: "F59E0B",          // Amber Yellow (Warning)
  amberDark: "78350F",      // Deep Amber
  rose: "F43F5E",           // Rose / Coral Red (Danger / Shortage)
  roseDark: "881337",       // Deep Rose
  jecrcRed: "BE123C",       // JECRC University Crimson
  purple: "8B5CF6",         // Royal Purple
};

const FONT = "Times New Roman";

// Helper to resolve asset paths reliably
function resolveAsset(fileName) {
  const candidates = [
    path.join(process.cwd(), "assets", fileName),
    path.join(process.cwd(), "attendx", "assets", fileName),
    path.join(process.cwd(), "..", "assets", fileName),
    path.join(process.cwd(), "..", "attendx", "assets", fileName),
    path.resolve("attendx/assets", fileName),
    path.resolve("assets", fileName),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return null;
}

const campusImagePath = resolveAsset("jecrc_campus.png");
const logoImagePath = resolveAsset("jecrc_logo.png");
const crestImagePath = resolveAsset("jecrc_crest.png");

// Master Gamma-Style Slide Header Function
function addGammaHeader(slide, titleText, category = "ATTENDX | SMART ATTENDANCE PLANNER", accentColor = C.indigo) {
  // Deep Background
  slide.background = { color: C.bgDark };

  // Top Glowing Accent Line
  slide.addShape(pres.ShapeType.rect, {
    x: 0,
    y: 0,
    w: "100%",
    h: 0.06,
    fill: { color: accentColor },
    line: { color: accentColor },
  });

  // Top Category Pill Tag
  slide.addShape(pres.ShapeType.roundRect, {
    x: 0.8,
    y: 0.35,
    w: 4.8,
    h: 0.32,
    rectRadius: 0.1,
    fill: { color: "1E1B4B" },
    line: { color: accentColor, width: 1 },
  });
  slide.addText(category.toUpperCase(), {
    x: 0.8,
    y: 0.35,
    w: 4.8,
    h: 0.32,
    fontFace: FONT,
    fontSize: 9.5,
    bold: true,
    color: C.sky,
    align: "center",
  });

  // Slide Title
  slide.addText(titleText, {
    x: 0.8,
    y: 0.72,
    w: 10.5,
    h: 0.55,
    fontFace: FONT,
    fontSize: 22,
    bold: true,
    color: C.textLight,
  });

  // Top Right University Logo Crest
  if (crestImagePath && fs.existsSync(crestImagePath)) {
    slide.addImage({
      path: crestImagePath,
      x: 11.9,
      y: 0.25,
      w: 0.8,
      h: 0.8,
    });
  }

  // Divider Line
  slide.addShape(pres.ShapeType.line, {
    x: 0.8,
    y: 1.32,
    w: 11.7,
    h: 0,
    line: { color: C.borderDark, width: 1 },
  });

  // Sleek Footer
  slide.addText("JECRC University, Jaipur | Dept. of CSE | Session 2025–26 | Aryan Raj (23BCON123)", {
    x: 0.8,
    y: 7.08,
    w: 9.5,
    h: 0.3,
    fontFace: FONT,
    fontSize: 9,
    color: C.textMuted,
  });

  // Tech Badge on Right Footer
  slide.addText("Next.js 14 • React 18 • LocalStorage • Gemini AI", {
    x: 9.0,
    y: 7.08,
    w: 3.5,
    h: 0.3,
    fontFace: FONT,
    fontSize: 9,
    color: C.sky,
    align: "right",
  });
}

// Reusable Card Builder
function addCard(slide, { x, y, w, h, bg = C.bgCard, border = C.borderDark, radius = 0.15 }) {
  slide.addShape(pres.ShapeType.roundRect, {
    x, y, w, h,
    rectRadius: radius,
    fill: { color: bg },
    line: { color: border, width: 1 },
  });
}

// =============================================================================
// SLIDE 1: TITLE SLIDE (GAMMA-STYLE DESIGN WITH CAMPUS PHOTO & GLOWING CARDS)
// =============================================================================
{
  const s = pres.addSlide();
  s.background = { color: C.bgDark };

  // Top Accent Bar
  s.addShape(pres.ShapeType.rect, {
    x: 0, y: 0, w: "100%", h: 0.08,
    fill: { color: C.jecrcRed },
    line: { color: C.jecrcRed },
  });

  // Campus Photo Banner Container
  if (campusImagePath && fs.existsSync(campusImagePath)) {
    s.addImage({
      path: campusImagePath,
      x: 0.8,
      y: 0.45,
      w: 11.7,
      h: 2.1,
    });
  }

  // University Crest on top of banner
  if (crestImagePath && fs.existsSync(crestImagePath)) {
    s.addImage({
      path: crestImagePath,
      x: 11.5,
      y: 0.6,
      w: 0.85,
      h: 0.85,
    });
  }

  // Central Hero Card
  addCard(s, { x: 0.8, y: 2.7, w: 11.7, h: 2.6, bg: C.bgCard, border: C.borderGlow, radius: 0.2 });

  // Tag Pill
  s.addShape(pres.ShapeType.roundRect, {
    x: 1.1, y: 2.9, w: 5.5, h: 0.32,
    rectRadius: 0.1,
    fill: { color: "1E1B4B" },
    line: { color: C.indigo, width: 1 },
  });
  s.addText("MAJOR PROJECT PRESENTATION • B.TECH CSE (VII SEMESTER)", {
    x: 1.1, y: 2.9, w: 5.5, h: 0.32,
    fontFace: FONT, fontSize: 9.5, bold: true, color: C.sky, align: "center",
  });

  // Project Title
  s.addText("AttendX: Smart Attendance Planner", {
    x: 1.1, y: 3.3, w: 11.0, h: 0.7,
    fontFace: FONT, fontSize: 32, bold: true, color: C.textLight,
  });

  // Subtitle / Pitch
  s.addText("A Client-First Decision Support System with Bunk Capacity Prediction, Consecutive Recovery Math, and Context-Injected Google Gemini AI Assistant", {
    x: 1.1, y: 4.05, w: 11.0, h: 0.5,
    fontFace: FONT, fontSize: 13, color: C.textSub,
  });

  // Technology Pills
  const techs = ["Next.js 14 App Router", "React 18", "Tailwind CSS", "Recharts", "Google Gemini Flash", "W3C LocalStorage"];
  techs.forEach((tech, i) => {
    s.addShape(pres.ShapeType.roundRect, {
      x: 1.1 + i * 1.85, y: 4.7, w: 1.75, h: 0.3,
      rectRadius: 0.08,
      fill: { color: "1E293B" },
      line: { color: C.borderDark, width: 1 },
    });
    s.addText(tech, {
      x: 1.1 + i * 1.85, y: 4.7, w: 1.75, h: 0.3,
      fontFace: FONT, fontSize: 8.5, bold: true, color: C.emerald, align: "center",
    });
  });

  // Bottom Two Metadata Cards
  // Student Card
  addCard(s, { x: 0.8, y: 5.45, w: 5.7, h: 1.6, bg: C.bgCard, border: C.borderDark });
  s.addText("PRESENTED BY", {
    x: 1.1, y: 5.6, w: 5.0, h: 0.25,
    fontFace: FONT, fontSize: 9, bold: true, color: C.amber,
  });
  s.addText("Aryan Raj (Reg. No. 23BCON123 [Your Reg. No.])", {
    x: 1.1, y: 5.85, w: 5.0, h: 0.35,
    fontFace: FONT, fontSize: 14, bold: true, color: C.textLight,
  });
  s.addText("Department of Computer Science & Engineering\nJECRC University, Jaipur | Academic Session 2025–26", {
    x: 1.1, y: 6.2, w: 5.0, h: 0.6,
    fontFace: FONT, fontSize: 11, color: C.textMuted,
  });

  // Guide Card
  addCard(s, { x: 6.8, y: 5.45, w: 5.7, h: 1.6, bg: C.bgCard, border: C.borderDark });
  s.addText("UNDER THE SUPERVISION OF", {
    x: 7.1, y: 5.6, w: 5.0, h: 0.25,
    fontFace: FONT, fontSize: 9, bold: true, color: C.cyan,
  });
  s.addText("Dr./Mr./Ms. [Guide Name]", {
    x: 7.1, y: 5.85, w: 5.0, h: 0.35,
    fontFace: FONT, fontSize: 14, bold: true, color: C.textLight,
  });
  s.addText("Assistant Professor, Department of Computer Science & Engineering\nJECRC University, Jaipur", {
    x: 7.1, y: 6.2, w: 5.0, h: 0.6,
    fontFace: FONT, fontSize: 11, color: C.textMuted,
  });

  s.addNotes("Good morning respected evaluators. Today I present AttendX, a client-first, privacy-focused decision support web platform that replaces passive college attendance records with predictive mathematics and context-aware artificial intelligence.");
}

// =============================================================================
// SLIDE 2: PRESENTATION AGENDA & ROADMAP (6 VIBRANT CARDS)
// =============================================================================
{
  const s = pres.addSlide();
  addGammaHeader(s, "Presentation Agenda & Engineering Roadmap", "EXECUTIVE ROADMAP");

  const agenda = [
    { num: "01", title: "Problem & Motivation", sub: "AICTE 75% Mandate & ERP Shortcomings", col: C.rose, border: "BE123C" },
    { num: "02", title: "Literature & Benchmark", sub: "Comparative Evaluation Matrix (Table 2.1)", col: C.amber, border: "D97706" },
    { num: "03", title: "Architecture & UML", sub: "Decoupled 3-Tier Client & Storage Design", col: C.cyan, border: "0284C7" },
    { num: "04", title: "Mathematical Engine", sub: "Recovery & Bunk Formulas with Edge Proofs", col: C.emerald, border: "059669" },
    { num: "05", title: "AI Assistant & Security", sub: "Dual-Engine Architecture & Rate Limiter", col: C.indigo, border: "4F46E5" },
    { num: "06", title: "Testing & Live Demo", sub: "22/22 Passing Tests & Lighthouse Audit", col: C.purple, border: "7C3AED" },
  ];

  agenda.forEach((item, i) => {
    const row = Math.floor(i / 3);
    const col = i % 3;
    const x = 0.8 + col * 4.0;
    const y = 1.65 + row * 2.5;

    addCard(s, { x, y, w: 3.7, h: 2.2, bg: C.bgCard, border: item.border });

    // Number Pill
    s.addShape(pres.ShapeType.roundRect, {
      x: x + 0.25, y: y + 0.25, w: 0.65, h: 0.35,
      rectRadius: 0.08,
      fill: { color: "1E293B" },
      line: { color: item.col, width: 1 },
    });
    s.addText(item.num, {
      x: x + 0.25, y: y + 0.25, w: 0.65, h: 0.35,
      fontFace: FONT, fontSize: 11, bold: true, color: item.col, align: "center",
    });

    s.addText(item.title, {
      x: x + 1.05, y: y + 0.25, w: 2.4, h: 0.35,
      fontFace: FONT, fontSize: 13, bold: true, color: C.textLight,
    });

    s.addText(item.sub, {
      x: x + 0.25, y: y + 0.75, w: 3.2, h: 0.6,
      fontFace: FONT, fontSize: 11, color: C.textMuted,
    });

    // Milestone Tags
    s.addShape(pres.ShapeType.roundRect, {
      x: x + 0.25, y: y + 1.5, w: 3.2, h: 0.4,
      rectRadius: 0.08,
      fill: { color: "0F172A" },
      line: { color: C.borderDark, width: 1 },
    });
    s.addText(`Phase ${item.num} • Fully Verified & Deployed`, {
      x: x + 0.25, y: y + 1.5, w: 3.2, h: 0.4,
      fontFace: FONT, fontSize: 9.5, color: item.col, align: "center",
    });
  });

  s.addNotes("Our presentation is structured into six logical phases, moving from foundational academic regulations and mathematical derivations to software implementation and empirical test verification.");
}

// =============================================================================
// SLIDE 3: MOTIVATION & AICTE REGULATORY CONTEXT (3-PILLAR COMPARISON)
// =============================================================================
{
  const s = pres.addSlide();
  addGammaHeader(s, "Motivation: The Academic Attendance Compliance Dilemma", "REGULATORY CONTEXT", C.rose);

  // Card 1: Statutory Mandate
  addCard(s, { x: 0.8, y: 1.65, w: 3.7, h: 5.1, bg: C.bgCard, border: C.rose });
  s.addText("STATUTORY MANDATE", { x: 1.1, y: 1.9, w: 3.1, h: 0.3, fontFace: FONT, fontSize: 10, bold: true, color: C.rose });
  s.addText("The 75% Attendance Rule", { x: 1.1, y: 2.2, w: 3.1, h: 0.4, fontFace: FONT, fontSize: 15, bold: true, color: C.textLight });
  s.addText("• AICTE & UGC regulations strictly mandate 75% minimum lecture & lab attendance.\n\n• Debarment Risk: Falling below 75% results in internal marks forfeiture or exam hall detention.\n\n• Inflexible Policy: Most Indian technical universities disallow any remedial bypass without medical paperwork.", {
    x: 1.1, y: 2.7, w: 3.1, h: 3.7, fontFace: FONT, fontSize: 11, color: C.textSub, lineSpacing: 18,
  });

  // Card 2: Student Reality
  addCard(s, { x: 4.8, y: 1.65, w: 3.7, h: 5.1, bg: C.bgCard, border: C.amber });
  s.addText("STUDENT REALITY", { x: 5.1, y: 1.9, w: 3.1, h: 0.3, fontFace: FONT, fontSize: 10, bold: true, color: C.amber });
  s.addText("Co-Curricular Pressures", { x: 5.1, y: 2.2, w: 3.1, h: 0.4, fontFace: FONT, fontSize: 15, bold: true, color: C.textLight });
  s.addText("• Engineering Undergraduates balance 24-48 hr hackathons, internships & placements.\n\n• High-Pressure Milestones: Missing 1 day can mean missing 4-6 lectures across multiple courses.\n\n• Unplanned Emergencies: Illness or urgent travel quickly erodes early attendance buffers.", {
    x: 5.1, y: 2.7, w: 3.1, h: 3.7, fontFace: FONT, fontSize: 11, color: C.textSub, lineSpacing: 18,
  });

  // Card 3: The Deficit Trap
  addCard(s, { x: 8.8, y: 1.65, w: 3.7, h: 5.1, bg: C.bgCard, border: C.indigo });
  s.addText("THE TRAP", { x: 9.1, y: 1.9, w: 3.1, h: 0.3, fontFace: FONT, fontSize: 10, bold: true, color: C.indigo });
  s.addText("Invisible Deficit Accumulation", { x: 9.1, y: 2.2, w: 3.1, h: 0.4, fontFace: FONT, fontSize: 15, bold: true, color: C.textLight });
  s.addText("• Cumulative Math: Absences in Month 1 compound invisibly over 60 lectures.\n\n• Late Awareness: Students discover shortages in Week 14 when only 4 lectures remain.\n\n• The Need: An automated, forward-looking predictor giving exact bunk and recovery counts.", {
    x: 9.1, y: 2.7, w: 3.1, h: 3.7, fontFace: FONT, fontSize: 11, color: C.textSub, lineSpacing: 18,
  });

  s.addNotes("Engineering students are required to balance rigorous co-curricular activities like hackathons and internships against strict 75% attendance mandates. Absences accumulate invisibly until it is too late to recover.");
}

// =============================================================================
// SLIDE 4: PROBLEM STATEMENT: THE 4 FATAL FLAWS OF COLLEGE ERPS
// =============================================================================
{
  const s = pres.addSlide();
  addGammaHeader(s, "Problem Statement: The 4 Fatal Flaws of College ERPs", "SYSTEM DEFICIENCIES", C.rose);

  const flaws = [
    {
      num: "01",
      tag: "PASSIVE RETROSPECTION",
      title: "Reports Where You Failed, Not How to Pass",
      desc: "Portals display static historical fractions (e.g., 18/25 = 72.0%) with zero future projection. They tell students what went wrong yesterday, but offer zero actionable guidance for tomorrow.",
      col: C.rose,
    },
    {
      num: "02",
      tag: "NO DECISION SUPPORT",
      title: "Zero Bunk & Recovery Calculations",
      desc: "Students cannot calculate: 'Can I skip tomorrow's class and stay above 75%?' or 'How many consecutive classes do I need to attend to recover?' Students rely on error-prone scratchpads.",
      col: C.amber,
    },
    {
      num: "03",
      tag: "DELAYED AWARENESS",
      title: "Shortage Rosters Arrive Too Late",
      desc: "Consolidated shortage lists are published only 7–10 days before final semester exams. At that point, remaining lectures are strictly insufficient to mathematically recover.",
      col: C.indigo,
    },
    {
      num: "04",
      tag: "ACCESS FRICTION",
      title: "Server Downtime, Logins & Bad UX",
      desc: "College ERPs crash during exam weeks, require repetitive captcha logins, suffer session timeouts, and lack mobile responsiveness—discouraging daily tracking by students.",
      col: C.cyan,
    },
  ];

  flaws.forEach((flaw, i) => {
    const row = Math.floor(i / 2);
    const col = i % 2;
    const x = 0.8 + col * 5.95;
    const y = 1.65 + row * 2.55;

    addCard(s, { x, y, w: 5.75, h: 2.35, bg: C.bgCard, border: flaw.col });

    // Number + Tag Pill
    s.addShape(pres.ShapeType.roundRect, {
      x: x + 0.3, y: y + 0.25, w: 2.8, h: 0.32,
      rectRadius: 0.08,
      fill: { color: "1E1B4B" },
      line: { color: flaw.col, width: 1 },
    });
    s.addText(`FLAW ${flaw.num} • ${flaw.tag}`, {
      x: x + 0.3, y: y + 0.25, w: 2.8, h: 0.32,
      fontFace: FONT, fontSize: 9, bold: true, color: flaw.col, align: "center",
    });

    s.addText(flaw.title, {
      x: x + 0.3, y: y + 0.68, w: 5.1, h: 0.4,
      fontFace: FONT, fontSize: 13, bold: true, color: C.textLight,
    });

    s.addText(flaw.desc, {
      x: x + 0.3, y: y + 1.15, w: 5.15, h: 1.0,
      fontFace: FONT, fontSize: 11, color: C.textMuted, lineSpacing: 16,
    });
  });

  s.addNotes("Legacy portals tell students where they failed yesterday, but never how to succeed tomorrow. AttendX bridges this exact gap.");
}

// =============================================================================
// SLIDE 5: ATTENDX SOLUTION OVERVIEW (3-PILLAR VALUE PROPOSITION)
// =============================================================================
{
  const s = pres.addSlide();
  addGammaHeader(s, "AttendX Solution: 3-Pillar Engineered Architecture", "SOLUTION OVERVIEW", C.emerald);

  const pillars = [
    {
      tag: "PILLAR 1 • DETERMINISTIC MATH",
      title: "Verified Calculation Engine",
      points: [
        "Floor Formula: Exact safe bunks allowable without dropping below target T%.",
        "Ceiling Formula: Exact consecutive classes needed to recover from a shortage.",
        "3-Scenario Simulator: Predicts final % for Best, Worst, and Custom attendance.",
        "Zero Hallucinations: All numbers calculated mathematically before AI interaction.",
      ],
      col: C.emerald,
      badge: "100% Deterministic Math",
    },
    {
      tag: "PILLAR 2 • CLIENT PRIVACY",
      title: "Zero-Database Local Storage",
      points: [
        "W3C LocalStorage: Academic data never leaves the student's personal browser.",
        "Zero Cloud Database Costs: Incurs ₹0 hosting bills on serverless edge.",
        "Sub-Millisecond Speed: Reads and writes execute in < 1.2 ms with zero network latency.",
        "1-Click Undo: Immediate state rollback if a button is accidentally clicked.",
      ],
      col: C.sky,
      badge: "< 1.2ms Local Read/Write",
    },
    {
      tag: "PILLAR 3 • CONTEXT AI",
      title: "AttendX Assistant (Gemini API)",
      points: [
        "Context Injection: Automatically injects student's live subject stats into AI prompt.",
        "Dual-Engine Fallback: Switches to deterministic rule engine if API is offline.",
        "Sliding-Window Limiter: Limits requests to 15 req/min per IP to prevent quota abuse.",
        "Serverless Security: API key strictly hidden in server environment variables.",
      ],
      col: C.indigo,
      badge: "Dual-Engine AI Gateway",
    },
  ];

  pillars.forEach((p, i) => {
    const x = 0.8 + i * 4.0;
    addCard(s, { x, y: 1.65, w: 3.7, h: 5.1, bg: C.bgCard, border: p.col });

    s.addShape(pres.ShapeType.roundRect, {
      x: x + 0.25, y: 1.9, w: 3.2, h: 0.3,
      rectRadius: 0.08,
      fill: { color: "1E1B4B" },
      line: { color: p.col, width: 1 },
    });
    s.addText(p.tag, {
      x: x + 0.25, y: 1.9, w: 3.2, h: 0.3,
      fontFace: FONT, fontSize: 8.5, bold: true, color: p.col, align: "center",
    });

    s.addText(p.title, {
      x: x + 0.25, y: 2.3, w: 3.2, h: 0.45,
      fontFace: FONT, fontSize: 14, bold: true, color: C.textLight,
    });

    s.addText(p.points.map(pt => `• ${pt}`).join("\n\n"), {
      x: x + 0.25, y: 2.85, w: 3.2, h: 3.2,
      fontFace: FONT, fontSize: 10.5, color: C.textSub, lineSpacing: 16,
    });

    // Bottom Badge
    s.addShape(pres.ShapeType.roundRect, {
      x: x + 0.25, y: 6.25, w: 3.2, h: 0.35,
      rectRadius: 0.08,
      fill: { color: "0F172A" },
      line: { color: p.col, width: 1 },
    });
    s.addText(p.badge, {
      x: x + 0.25, y: 6.25, w: 3.2, h: 0.35,
      fontFace: FONT, fontSize: 9.5, bold: true, color: p.col, align: "center",
    });
  });

  s.addNotes("AttendX delivers mathematical certainty through verified formulas, absolute privacy by storing data locally in the student's browser, and conversational guidance via a secure AI assistant.");
}

// =============================================================================
// SLIDE 6: LITERATURE REVIEW & INDUSTRY BENCHMARKS
// =============================================================================
{
  const s = pres.addSlide();
  addGammaHeader(s, "Literature Review: Benchmarking Existing Solutions", "STATE OF THE ART", C.amber);

  const benchmarks = [
    {
      title: "1. Institutional College ERPs",
      sub: "TCS iON, SAP Education, In-House Portals",
      pros: "Centralized attendance submission for faculty; official audit records.",
      cons: "Passive display only; zero prediction; no bunk guidance; heavy server downtime.",
      verdict: "Fails as a student decision-support tool.",
      col: C.rose,
    },
    {
      title: "2. Manual Spreadsheets",
      sub: "Microsoft Excel, Google Sheets Templates",
      pros: "Customizable formulas; zero software cost for students.",
      cons: "Difficult mobile editing; accidental formula overwrites; no AI or alert badges.",
      verdict: "Too fragile and high-friction for daily mobile use.",
      col: C.amber,
    },
    {
      title: "3. Third-Party Mobile Apps",
      sub: "Bunk Manager, Student Attendance Apps",
      pros: "Basic mobile UI; simple attendance increment buttons.",
      cons: "Disruptive full-screen video ads; unencrypted local DBs; no AI capabilities.",
      verdict: "Poor user experience with zero academic AI integration.",
      col: C.purple,
    },
  ];

  benchmarks.forEach((b, i) => {
    const x = 0.8 + i * 4.0;
    addCard(s, { x, y: 1.65, w: 3.7, h: 5.1, bg: C.bgCard, border: b.col });

    s.addText(b.title, { x: x + 0.25, y: 1.9, w: 3.2, h: 0.4, fontFace: FONT, fontSize: 14, bold: true, color: C.textLight });
    s.addText(b.sub, { x: x + 0.25, y: 2.35, w: 3.2, h: 0.35, fontFace: FONT, fontSize: 10.5, color: C.textMuted });

    s.addText("STRENGTHS:", { x: x + 0.25, y: 2.85, w: 3.2, h: 0.25, fontFace: FONT, fontSize: 9.5, bold: true, color: C.emerald });
    s.addText(b.pros, { x: x + 0.25, y: 3.1, w: 3.2, h: 0.7, fontFace: FONT, fontSize: 11, color: C.textSub });

    s.addText("LIMITATIONS:", { x: x + 0.25, y: 3.9, w: 3.2, h: 0.25, fontFace: FONT, fontSize: 9.5, bold: true, color: C.rose });
    s.addText(b.cons, { x: x + 0.25, y: 4.15, w: 3.2, h: 0.8, fontFace: FONT, fontSize: 11, color: C.textSub });

    s.addShape(pres.ShapeType.roundRect, {
      x: x + 0.25, y: 5.3, w: 3.2, h: 1.1,
      rectRadius: 0.1,
      fill: { color: "0F172A" },
      line: { color: b.col, width: 1 },
    });
    s.addText("EVALUATION VERDICT:\n" + b.verdict, {
      x: x + 0.35, y: 5.4, w: 3.0, h: 0.9,
      fontFace: FONT, fontSize: 10.5, bold: true, color: b.col, align: "center",
    });
  });

  s.addNotes("Our literature review revealed that existing tools force students to choose between rigid administrative ERPs and fragile personal spreadsheets. AttendX combines the usability of a consumer app with academic rigor.");
}

// =============================================================================
// SLIDE 7: COMPARATIVE FEATURE EVALUATION MATRIX (DARK THEME GRID)
// =============================================================================
{
  const s = pres.addSlide();
  addGammaHeader(s, "Comparative Feature Matrix (AttendX vs Existing Solutions)", "FEATURE BENCHMARK", C.cyan);

  const headers = ["Capability / Feature", "College ERP Portal", "Manual Spreadsheets", "Generic Mobile Apps", "AttendX Planner"];
  const matrix = [
    ["Bunk Capacity Math", "No (Raw fractions)", "Manual formula setup", "Basic (No boundary checks)", "Exact Floor Formula (Automated)"],
    ["Consecutive Recovery Math", "No guidance", "Complex nested formula", "Not available", "Exact Ceiling Formula (Automated)"],
    ["Context-Aware AI Assistant", "Not available", "Not available", "Not available", "Integrated (Google Gemini Flash)"],
    ["Dual-Engine Math Fallback", "Not available", "Not available", "Not available", "Integrated (Offline Rule Engine)"],
    ["Client Privacy & Zero Ads", "Centralized DB", "Private local file", "Ad-heavy & OS tracked", "100% Client LocalStorage (Zero Ads)"],
    ["Multi-Scenario Prediction", "No", "Manual table creation", "No", "3-Scenario Interactive Slider"],
    ["1-Click Undo State Reversal", "Strictly locked", "Ctrl+Z (Desktop only)", "Rarely supported", "1-Click Atomic State Undo"],
    ["Interactive SVG Charts", "Static tables", "Manual chart wizard", "Basic bar charts", "Reactive Recharts Visuals"],
  ];

  // Table Container Card
  addCard(s, { x: 0.8, y: 1.6, w: 11.7, h: 5.15, bg: C.bgCard, border: C.borderDark });

  // Render Table Header
  headers.forEach((h, j) => {
    const colW = j === 0 ? 3.0 : 2.15;
    const colX = 1.0 + (j === 0 ? 0 : 3.0 + (j - 1) * 2.15);
    s.addShape(pres.ShapeType.roundRect, {
      x: colX, y: 1.75, w: colW - 0.08, h: 0.38,
      rectRadius: 0.06,
      fill: { color: j === 4 ? "1E1B4B" : "1E293B" },
      line: { color: j === 4 ? C.emerald : C.borderDark, width: 1 },
    });
    s.addText(h, {
      x: colX, y: 1.75, w: colW - 0.08, h: 0.38,
      fontFace: FONT, fontSize: 9.5, bold: true, color: j === 4 ? C.emerald : C.textLight, align: "center",
    });
  });

  // Render Rows
  matrix.forEach((row, i) => {
    const y = 2.22 + i * 0.54;
    const rowBg = i % 2 === 0 ? "0F172A" : "131B2E";

    row.forEach((cell, j) => {
      const colW = j === 0 ? 3.0 : 2.15;
      const colX = 1.0 + (j === 0 ? 0 : 3.0 + (j - 1) * 2.15);
      const isAttendX = j === 4;

      s.addShape(pres.ShapeType.rect, {
        x: colX, y, w: colW - 0.08, h: 0.5,
        fill: { color: isAttendX ? "172554" : rowBg },
        line: { color: isAttendX ? C.indigo : C.borderDark, width: 0.5 },
      });

      s.addText(cell, {
        x: colX + 0.08, y, w: colW - 0.24, h: 0.5,
        fontFace: FONT, fontSize: 9, bold: isAttendX || j === 0,
        color: isAttendX ? C.emerald : (j === 0 ? C.textLight : C.textMuted),
        align: j === 0 ? "left" : "center",
      });
    });
  });

  s.addNotes("Table 2.1 in our report proves that AttendX outperforms both commercial ERPs and mobile tools across calculation automation, privacy, and decision support.");
}

// =============================================================================
// SLIDE 8: FEASIBILITY ANALYSIS (TECHNICAL, ECONOMIC, OPERATIONAL)
// =============================================================================
{
  const s = pres.addSlide();
  addGammaHeader(s, "Feasibility Analysis: Technical, Economic & Operational", "FEASIBILITY STUDY", C.emerald);

  const feasibilities = [
    {
      type: "TECHNICAL FEASIBILITY",
      metric: "99.8%",
      metricSub: "Global Browser Support",
      points: [
        "W3C LocalStorage: Standard supported across 99.8% of modern mobile & desktop browsers.",
        "Deterministic BigInt & Float Math: IEEE 754 arithmetic ensures 0 rounding deviations.",
        "Next.js 14 App Router: Edge API routes process requests with sub-second latencies.",
        "Gemini Flash Model: Lightweight 8B parameter model optimized for fast instruction response.",
      ],
      col: C.cyan,
      tag: "Technically Feasible",
    },
    {
      type: "ECONOMIC FEASIBILITY",
      metric: "₹ 0.00",
      metricSub: "Zero Hosting & DB License Cost",
      points: [
        "Zero Database Costs: Storing state on client hardware avoids recurring cloud database bills.",
        "Free Serverless Edge: Deployed on Vercel's global CDN free educational tier.",
        "Google AI Studio Free Tier: Sufficient quota for student project demonstration and daily usage.",
        "100% Permissive Open Source: Next.js, React, and Tailwind are licensed under MIT.",
      ],
      col: C.emerald,
      tag: "Economically Viable",
    },
    {
      type: "OPERATIONAL FEASIBILITY",
      metric: "0 Min",
      metricSub: "Instant Student Onboarding",
      points: [
        "Zero Account Creation: No sign-ups, passwords, or complex multi-factor authentication.",
        "Pre-Loaded Templates: 5 core engineering courses pre-configured on first load.",
        "1-Click Action Buttons: Present (+1/+1), Absent (+0/+1), Off (0/0), and Undo.",
        "Universal Form Factor: Mobile-first responsive layout works seamlessly on mobile phones.",
      ],
      col: C.amber,
      tag: "Operationally Proven",
    },
  ];

  feasibilities.forEach((f, i) => {
    const x = 0.8 + i * 4.0;
    addCard(s, { x, y: 1.65, w: 3.7, h: 5.1, bg: C.bgCard, border: f.col });

    s.addText(f.type, { x: x + 0.25, y: 1.9, w: 3.2, h: 0.3, fontFace: FONT, fontSize: 9.5, bold: true, color: f.col });

    // Large Metric Callout Box
    s.addShape(pres.ShapeType.roundRect, {
      x: x + 0.25, y: 2.25, w: 3.2, h: 0.95,
      rectRadius: 0.1,
      fill: { color: "0F172A" },
      line: { color: f.col, width: 1 },
    });
    s.addText(f.metric, {
      x: x + 0.25, y: 2.3, w: 3.2, h: 0.5,
      fontFace: FONT, fontSize: 24, bold: true, color: f.col, align: "center",
    });
    s.addText(f.metricSub, {
      x: x + 0.25, y: 2.8, w: 3.2, h: 0.3,
      fontFace: FONT, fontSize: 9.5, color: C.textMuted, align: "center",
    });

    s.addText(f.points.map(pt => `• ${pt}`).join("\n\n"), {
      x: x + 0.25, y: 3.35, w: 3.2, h: 2.8,
      fontFace: FONT, fontSize: 10.5, color: C.textSub, lineSpacing: 16,
    });

    // Tag Pill
    s.addShape(pres.ShapeType.roundRect, {
      x: x + 0.25, y: 6.25, w: 3.2, h: 0.35,
      rectRadius: 0.08,
      fill: { color: "1E1B4B" },
      line: { color: f.col, width: 1 },
    });
    s.addText(f.tag, {
      x: x + 0.25, y: 6.25, w: 3.2, h: 0.35,
      fontFace: FONT, fontSize: 9.5, bold: true, color: f.col, align: "center",
    });
  });

  s.addNotes("AttendX is 100% economically feasible with zero recurring infrastructure costs, technically sound on modern web standards, and operationally intuitive with zero learning curve.");
}

// =============================================================================
// SLIDE 9: SYSTEM ARCHITECTURE (VISUAL MULTI-TIER MODEL)
// =============================================================================
{
  const s = pres.addSlide();
  addGammaHeader(s, "System Architecture: Decoupled Client-First Model", "ARCHITECTURAL DESIGN", C.indigo);

  const tiers = [
    {
      tier: "TIER 1 • PRESENTATION LAYER (CLIENT BROWSER)",
      sub: "Next.js React Server & Client Components • Tailwind CSS • Recharts SVG Engine",
      items: ["Executive Dashboard (/)", "Bunk Calculator (/bunk-calculator)", "Recovery Classes (/required-classes)", "Predictor Slider (/prediction)", "Floating & Page AI Chat (/assistant)"],
      col: C.sky,
      y: 1.65,
      h: 1.25,
    },
    {
      tier: "TIER 2 • CLIENT LOGIC & LOCAL STORAGE",
      sub: "useAttendanceData.js Custom Hook • attendanceCalculations.js • W3C LocalStorage",
      items: ["Deterministic Bunk & Recovery Math", "Atomic State Undo Stack Tracking", "JSON Data Export & File Import", "Zero-Latency (<1.2ms) Local Persistence", "Cross-Tab Event Dispatcher"],
      col: C.emerald,
      y: 3.05,
      h: 1.25,
    },
    {
      tier: "TIER 3 • SERVERLESS EDGE AI GATEWAY",
      sub: "Next.js API Route (/api/chat) • Node.js Edge Runtime on Vercel",
      items: ["In-Memory Sliding-Window Limiter (15 req/min)", "Input Sanitizer & 500-Char Guardrail", "Context Injection & System Prompts", "Deterministic Mathematical Fallback Engine"],
      col: C.amber,
      y: 4.45,
      h: 1.25,
    },
    {
      tier: "TIER 4 • CLOUD INTELLIGENCE (GOOGLE GEMINI)",
      sub: "Google Gemini Flash Model (gemini-2.5-flash) • Low Latency Multimodal Inference",
      items: ["Natural Language Academic Reasoning", "Contextual Study & Exam Scheduling", "Personalized Triage & Recovery Roadmaps", "API Key Protected Server-Side"],
      col: C.indigo,
      y: 5.85,
      h: 1.05,
    },
  ];

  tiers.forEach(t => {
    addCard(s, { x: 0.8, y: t.y, w: 11.7, h: t.h, bg: C.bgCard, border: t.col });

    s.addText(t.tier, {
      x: 1.1, y: t.y + 0.12, w: 6.0, h: 0.28,
      fontFace: FONT, fontSize: 11, bold: true, color: t.col,
    });
    s.addText(t.sub, {
      x: 7.2, y: t.y + 0.12, w: 5.0, h: 0.28,
      fontFace: FONT, fontSize: 9.5, color: C.textMuted, align: "right",
    });

    // Sub items horizontal pills
    t.items.forEach((item, idx) => {
      const itemW = 2.15;
      const itemX = 1.1 + idx * 2.25;
      if (itemX + itemW <= 12.3) {
        s.addShape(pres.ShapeType.roundRect, {
          x: itemX, y: t.y + 0.45, w: itemW, h: 0.45,
          rectRadius: 0.08,
          fill: { color: "0F172A" },
          line: { color: C.borderDark, width: 0.5 },
        });
        s.addText(item, {
          x: itemX + 0.05, y: t.y + 0.45, w: itemW - 0.1, h: 0.45,
          fontFace: FONT, fontSize: 8.5, color: C.textSub, align: "center",
        });
      }
    });
  });

  s.addNotes("Our architecture decouples heavy UI and deterministic math to the client device, using the server exclusively as a stateless, secure proxy for AI calls.");
}

// =============================================================================
// SLIDE 10: UML USE CASE & INTERACTION MODELING
// =============================================================================
{
  const s = pres.addSlide();
  addGammaHeader(s, "UML Modeling: Student Use Case Interaction Matrix", "UML USE CASE", C.cyan);

  // Left Actor Card
  addCard(s, { x: 0.8, y: 1.65, w: 3.2, h: 5.1, bg: C.bgCard, border: C.cyan });
  s.addText("ACTOR", { x: 1.05, y: 1.9, w: 2.7, h: 0.3, fontFace: FONT, fontSize: 10, bold: true, color: C.cyan });
  s.addText("Engineering Student", { x: 1.05, y: 2.2, w: 2.7, h: 0.4, fontFace: FONT, fontSize: 16, bold: true, color: C.textLight });
  s.addText("The primary actor who interacts with AttendX on mobile or desktop to track attendance, run calculations, and consult AI.", {
    x: 1.05, y: 2.7, w: 2.7, h: 1.0, fontFace: FONT, fontSize: 11, color: C.textSub,
  });

  // Actor Metric Box
  s.addShape(pres.ShapeType.roundRect, {
    x: 1.05, y: 3.9, w: 2.7, h: 2.6,
    rectRadius: 0.1,
    fill: { color: "0F172A" },
    line: { color: C.borderDark, width: 1 },
  });
  s.addText("SECURITY & ACCESS:\n• Zero Authentication Required\n• LocalStorage Isolation\n• Zero Network Credentials\n• Immediate Session Load\n• Atomic State Persistence", {
    x: 1.2, y: 4.1, w: 2.4, h: 2.2, fontFace: FONT, fontSize: 10, color: C.emerald, lineSpacing: 18,
  });

  // Right Use Cases Grid (8 Cases in 2 columns of 4)
  const useCases = [
    { id: "UC-01", title: "Manage Course Subjects", desc: "Add, Edit, and Delete enrolled semester subjects with custom color tags & codes." },
    { id: "UC-02", title: "Log Daily Attendance", desc: "1-Click Present (+1/+1), Absent (+0/+1), or Class Cancelled (not counted)." },
    { id: "UC-03", title: "Atomic Action Undo", desc: "Immediately revert accidental taps; pops the last action from audit history." },
    { id: "UC-04", title: "Calculate Safe Bunks", desc: "Computes floor bunk capacity and displays a live Skip Impact Simulation table." },
    { id: "UC-05", title: "Compute Recovery Classes", desc: "Calculates exact consecutive classes required to escape shortage status." },
    { id: "UC-06", title: "Model 3-Scenario Predictions", desc: "Simulates final semester percentage for Best, Worst, and Custom scenarios." },
    { id: "UC-07", title: "Consult AI Assistant", desc: "Asks questions answered by Gemini AI using live attendance context injection." },
    { id: "UC-08", title: "Export / Import JSON Data", desc: "Downloads full local backup or restores database state across devices." },
  ];

  useCases.forEach((uc, idx) => {
    const row = Math.floor(idx / 2);
    const col = idx % 2;
    const x = 4.3 + col * 4.1;
    const y = 1.65 + row * 1.28;

    addCard(s, { x, y, w: 3.9, h: 1.18, bg: C.bgCard, border: C.borderDark });

    s.addShape(pres.ShapeType.roundRect, {
      x: x + 0.15, y: y + 0.15, w: 0.8, h: 0.28,
      rectRadius: 0.06,
      fill: { color: "1E1B4B" },
      line: { color: C.indigo, width: 1 },
    });
    s.addText(uc.id, {
      x: x + 0.15, y: y + 0.15, w: 0.8, h: 0.28,
      fontFace: FONT, fontSize: 8.5, bold: true, color: C.sky, align: "center",
    });

    s.addText(uc.title, {
      x: x + 1.05, y: y + 0.15, w: 2.7, h: 0.28,
      fontFace: FONT, fontSize: 11, bold: true, color: C.textLight,
    });

    s.addText(uc.desc, {
      x: x + 0.15, y: y + 0.48, w: 3.6, h: 0.6,
      fontFace: FONT, fontSize: 9.5, color: C.textMuted, lineSpacing: 14,
    });
  });

  s.addNotes("Every use case is engineered with atomic state updates, meaning actions either fully succeed and persist to LocalStorage or safely roll back.");
}

// =============================================================================
// SLIDE 11: UML SEQUENCE FLOW: AI CONTEXT INJECTION PIPELINE
// =============================================================================
{
  const s = pres.addSlide();
  addGammaHeader(s, "UML Sequence Flow: Context Injection & Fallback Pipeline", "AI SEQUENCE FLOW", C.indigo);

  const steps = [
    {
      step: "STEP 1",
      title: "User Inquires in Chat",
      sub: "Student Client",
      desc: "User types natural language query (e.g. 'Can I skip tomorrow's OS class?') in floating widget or /assistant page.",
      col: C.sky,
    },
    {
      step: "STEP 2",
      title: "Context Serialization",
      sub: "Local State Dispatcher",
      desc: "Client packages user message + compact attendance snapshot (attended, total, target %, safe/shortage tags) into JSON payload.",
      col: C.emerald,
    },
    {
      step: "STEP 3",
      title: "Gateway & Rate Check",
      sub: "/api/chat Serverless Route",
      desc: "Validates sliding-window rate limit (15 req/min per IP) and enforces 500-char length limit. Synthesizes system instructions.",
      col: C.amber,
    },
    {
      step: "STEP 4",
      title: "Dual-Engine Inference",
      sub: "Gemini Flash / Local Engine",
      desc: "Invokes Google Gemini Flash API. If key is missing or quota exceeded, falls back to deterministic mathematical rule engine.",
      col: C.indigo,
    },
  ];

  steps.forEach((st, i) => {
    const x = 0.8 + i * 3.0;
    addCard(s, { x, y: 1.65, w: 2.8, h: 5.1, bg: C.bgCard, border: st.col });

    s.addShape(pres.ShapeType.roundRect, {
      x: x + 0.2, y: 1.9, w: 1.2, h: 0.3,
      rectRadius: 0.08,
      fill: { color: "1E1B4B" },
      line: { color: st.col, width: 1 },
    });
    s.addText(st.step, {
      x: x + 0.2, y: 1.9, w: 1.2, h: 0.3,
      fontFace: FONT, fontSize: 9.5, bold: true, color: st.col, align: "center",
    });

    s.addText(st.title, {
      x: x + 0.2, y: 2.3, w: 2.4, h: 0.5,
      fontFace: FONT, fontSize: 13, bold: true, color: C.textLight,
    });
    s.addText(st.sub, {
      x: x + 0.2, y: 2.8, w: 2.4, h: 0.3,
      fontFace: FONT, fontSize: 9.5, bold: true, color: st.col,
    });

    s.addText(st.desc, {
      x: x + 0.2, y: 3.2, w: 2.4, h: 2.0,
      fontFace: FONT, fontSize: 10.5, color: C.textSub, lineSpacing: 16,
    });

    // Arrow to next step
    if (i < 3) {
      s.addShape(pres.ShapeType.roundRect, {
        x: x + 0.2, y: 5.8, w: 2.4, h: 0.45,
        rectRadius: 0.08,
        fill: { color: "0F172A" },
        line: { color: C.borderDark, width: 1 },
      });
      s.addText("Dispatches to Next Phase →", {
        x: x + 0.2, y: 5.8, w: 2.4, h: 0.45,
        fontFace: FONT, fontSize: 9, bold: true, color: st.col, align: "center",
      });
    } else {
      s.addShape(pres.ShapeType.roundRect, {
        x: x + 0.2, y: 5.8, w: 2.4, h: 0.45,
        rectRadius: 0.08,
        fill: { color: "1E1B4B" },
        line: { color: C.emerald, width: 1 },
      });
      s.addText("✓ Answers in Client Bubble", {
        x: x + 0.2, y: 5.8, w: 2.4, h: 0.45,
        fontFace: FONT, fontSize: 9, bold: true, color: C.emerald, align: "center",
      });
    }
  });

  s.addNotes("The student never has to manually paste their attendance numbers into the chatbot. Context injection automatically gives the AI full visibility of their live data while protecting their identity.");
}

// =============================================================================
// SLIDE 12: DATA FLOW ARCHITECTURE (DFD LEVEL 0 & LEVEL 1)
// =============================================================================
{
  const s = pres.addSlide();
  addGammaHeader(s, "Data Flow Architecture: DFD Level 0 & Level 1 Decomposition", "DATA FLOW DIAGRAM", C.emerald);

  // Left Card: DFD Level 0 Context Diagram
  addCard(s, { x: 0.8, y: 1.65, w: 5.7, h: 5.1, bg: C.bgCard, border: C.emerald });
  s.addText("DFD LEVEL 0 • SYSTEM CONTEXT MODEL", {
    x: 1.1, y: 1.9, w: 5.1, h: 0.3, fontFace: FONT, fontSize: 10, bold: true, color: C.emerald,
  });

  const dfd0 = [
    "External Entity (Student User) sends Action Triggers (Present/Absent/Off) and Natural Inquiries to AttendX Kernel 0.0.",
    "AttendX Kernel performs synchronous Read / Write transactions against Browser LocalStorage (Data Store D1).",
    "AttendX Kernel forwards sanitized prompt context to Google Gemini Flash API via Serverless Edge Route.",
    "Calculated statistics, risk alerts, and synthesized advice return to the Student User interface.",
  ];
  s.addText(dfd0.map((d, i) => `${i + 1}. ${d}`).join("\n\n"), {
    x: 1.1, y: 2.3, w: 5.1, h: 4.2, fontFace: FONT, fontSize: 11, color: C.textSub, lineSpacing: 18,
  });

  // Right Card: DFD Level 1 Modular Decomposition
  addCard(s, { x: 6.8, y: 1.65, w: 5.7, h: 5.1, bg: C.bgCard, border: C.cyan });
  s.addText("DFD LEVEL 1 • FUNCTIONAL PROCESS DECOMPOSITION", {
    x: 7.1, y: 1.9, w: 5.1, h: 0.3, fontFace: FONT, fontSize: 10, bold: true, color: C.cyan,
  });

  const dfd1 = [
    "Process 1.0 (Attendance Tracker): Receives atomic action clicks, updates (A, N), pushes historical audit records to D1.",
    "Process 2.0 (Mathematical Engine): Computes floor bunk capacity and ceiling recovery targets from live D1 state.",
    "Process 3.0 (Visual Analytics Generator): Formats subject metrics into Recharts SVG data structures and alerts.",
    "Process 4.0 (AI Context Broker): Bundles D1 state snapshot with user query for Gemini / Local Fallback inference.",
  ];
  s.addText(dfd1.map((d, i) => `${i + 1}. ${d}`).join("\n\n"), {
    x: 7.1, y: 2.3, w: 5.1, h: 4.2, fontFace: FONT, fontSize: 11, color: C.textSub, lineSpacing: 18,
  });

  s.addNotes("Data flow is strictly unidirectional from the custom React hook to LocalStorage, eliminating race conditions across multiple open browser tabs.");
}

// =============================================================================
// SLIDE 13: ER DIAGRAM & LOCALSTORAGE DATA SCHEMA
// =============================================================================
{
  const s = pres.addSlide();
  addGammaHeader(s, "Entity-Relationship & LocalStorage Data Schema", "DATABASE DESIGN", C.purple);

  const entities = [
    {
      name: "Subject Entity",
      pk: "id: String (UUID)",
      badge: "Primary Record (1 : N)",
      fields: [
        "name: String (Required, e.g. 'Operating Systems')",
        "code: String (Optional, e.g. 'CS204')",
        "teacher: String (Optional, e.g. 'Dr. Sharma')",
        "color: String (Hex Code, e.g. '#3B82F6')",
        "attended: Integer (Min: 0, Attended Lectures)",
        "total: Integer (Min: 0, Total Conducted)",
        "target: Integer (1-100%, Default: 75%)",
        "history: Array<AttendanceRecord>",
      ],
      col: C.indigo,
    },
    {
      name: "AttendanceRecord Entity",
      pk: "id: String (Timestamp UUID)",
      badge: "Child Audit Log (N : 1)",
      fields: [
        "date: String (ISO YYYY-MM-DD)",
        "action: Enum ('present' | 'absent' | 'cancelled')",
        "timestamp: Integer (Unix Milliseconds)",
        "previousAttended: Integer (Pre-Action Snapshot)",
        "previousTotal: Integer (Pre-Action Snapshot)",
        "Enables 1-Click State Undo & Rollback",
      ],
      col: C.emerald,
    },
    {
      name: "Settings Entity",
      pk: "Key: 'attendx_data_v1.settings'",
      badge: "Global Preferences (1 : 1)",
      fields: [
        "globalTarget: Integer (1-100%, Default: 75%)",
        "theme: Enum ('light' | 'dark')",
        "notificationsEnabled: Boolean",
        "lastExportTimestamp: Integer (Unix Epoch)",
        "schemaVersion: Integer (v1.0.0)",
      ],
      col: C.amber,
    },
    {
      name: "ChatMessage Entity",
      pk: "id: String (Message UUID)",
      badge: "Conversation History",
      fields: [
        "role: Enum ('user' | 'assistant')",
        "content: String (Sanitized Text, Max 500 Chars)",
        "timestamp: Integer (Unix Milliseconds)",
        "isError: Boolean (Graceful Recovery State)",
        "isFallback: Boolean (Offline Rule Response)",
      ],
      col: C.rose,
    },
  ];

  entities.forEach((ent, i) => {
    const x = 0.8 + i * 3.0;
    addCard(s, { x, y: 1.65, w: 2.8, h: 5.1, bg: C.bgCard, border: ent.col });

    s.addText(ent.name, { x: x + 0.2, y: 1.85, w: 2.4, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: C.textLight });

    s.addShape(pres.ShapeType.roundRect, {
      x: x + 0.2, y: 2.25, w: 2.4, h: 0.28,
      rectRadius: 0.06,
      fill: { color: "1E1B4B" },
      line: { color: ent.col, width: 1 },
    });
    s.addText(ent.badge, {
      x: x + 0.2, y: 2.25, w: 2.4, h: 0.28,
      fontFace: FONT, fontSize: 8.5, bold: true, color: ent.col, align: "center",
    });

    s.addText("PRIMARY KEY: " + ent.pk, {
      x: x + 0.2, y: 2.65, w: 2.4, h: 0.35, fontFace: FONT, fontSize: 9, bold: true, color: C.sky,
    });

    s.addText(ent.fields.map(f => `• ${f}`).join("\n\n"), {
      x: x + 0.2, y: 3.1, w: 2.4, h: 3.5, fontFace: FONT, fontSize: 9.5, color: C.textSub, lineSpacing: 15,
    });
  });

  s.addNotes("Even without a traditional SQL database, our LocalStorage schema enforces entity relationships, referential integrity via UUID keys, and nested history arrays for undo auditing.");
}

// =============================================================================
// SLIDE 14: CORE FORMULAS & ALGORITHMIC DERIVATIONS
// =============================================================================
{
  const s = pres.addSlide();
  addGammaHeader(s, "Core Formulas & Mathematical Algorithmic Derivations", "MATHEMATICAL ENGINE", C.emerald);

  const formulas = [
    {
      title: "1. Current Attendance %",
      formula: "P = ( attended / total ) * 100",
      notes: "Boundary condition: If total = 0 (no lectures conducted yet), P = 0.00% to avoid division-by-zero (NaN).",
      col: C.sky,
      badge: "Percentage Logic",
    },
    {
      title: "2. Consecutive Recovery Classes (x)",
      formula: "x = ceil( ( T * total - 100 * attended ) / ( 100 - T ) )",
      notes: "Uses CEILING function because lectures cannot be attended fractionally. If P >= T, returns 0. If T >= 100 and attended < total, returns Impossible.",
      col: C.emerald,
      badge: "Ceiling Recovery Formula",
    },
    {
      title: "3. Safe Allowable Bunk Capacity (b)",
      formula: "b = floor( ( 100 * attended / T ) - total )",
      notes: "Uses FLOOR function to prevent over-skipping into shortage. If current attendance P < T, bunks are clamped to 0 immediately.",
      col: C.amber,
      badge: "Floor Bunk Formula",
    },
    {
      title: "4. Multi-Scenario Future Projection",
      formula: "P_pred = ( ( attended + k ) / ( total + n ) ) * 100",
      notes: "Evaluates 3 distinct future cases: Best Case (k = n), Worst Case (k = 0), and Realistic Custom Target (k in [0, n]).",
      col: C.indigo,
      badge: "Projection Equation",
    },
  ];

  formulas.forEach((f, i) => {
    const row = Math.floor(i / 2);
    const col = i % 2;
    const x = 0.8 + col * 5.95;
    const y = 1.65 + row * 2.55;

    addCard(s, { x, y, w: 5.75, h: 2.35, bg: C.bgCard, border: f.col });

    s.addText(f.title, { x: x + 0.3, y: y + 0.2, w: 3.8, h: 0.35, fontFace: FONT, fontSize: 13, bold: true, color: C.textLight });

    s.addShape(pres.ShapeType.roundRect, {
      x: x + 4.2, y: y + 0.2, w: 1.25, h: 0.28,
      rectRadius: 0.06,
      fill: { color: "1E1B4B" },
      line: { color: f.col, width: 1 },
    });
    s.addText(f.badge, {
      x: x + 4.2, y: y + 0.2, w: 1.25, h: 0.28,
      fontFace: FONT, fontSize: 7.5, bold: true, color: f.col, align: "center",
    });

    // Formula Display Box
    s.addShape(pres.ShapeType.roundRect, {
      x: x + 0.3, y: y + 0.65, w: 5.15, h: 0.6,
      rectRadius: 0.08,
      fill: { color: "0F172A" },
      line: { color: f.col, width: 1 },
    });
    s.addText(f.formula, {
      x: x + 0.3, y: y + 0.65, w: 5.15, h: 0.6,
      fontFace: "Consolas", fontSize: 12, bold: true, color: f.col, align: "center",
    });

    s.addText(f.notes, {
      x: x + 0.3, y: y + 1.35, w: 5.15, h: 0.85,
      fontFace: FONT, fontSize: 10.5, color: C.textMuted, lineSpacing: 15,
    });
  });

  s.addNotes("Notice the intentional use of the ceiling function for required classes to ensure compliance, and the floor function for bunks to prevent accidental shortage through rounding up.");
}

// =============================================================================
// SLIDE 15: EDGE CASE HANDLING & MATHEMATICAL BOUNDARIES
// =============================================================================
{
  const s = pres.addSlide();
  addGammaHeader(s, "Edge Case Handling & Mathematical Boundary Proofs", "BOUNDARY VERIFICATION", C.rose);

  const edgeCases = [
    {
      title: "EDGE CASE 1: ZERO LECTURES (N = 0)",
      condition: "Semester start or newly added course (0 attended, 0 total)",
      risk: "Standard formula (A / N) evaluates to 0 / 0 = NaN (Not a Number), crashing UI charts.",
      solution: "Engine guards explicitly: if (total === 0) return 0.00%. Renders clean 0% badge.",
      col: C.sky,
      proof: "P(0, 0) ≡ 0.00% (Safe Division Guard)",
    },
    {
      title: "EDGE CASE 2: 100% TARGET IMPOSSIBILITY",
      condition: "Student sets target T = 100%, but has at least 1 absence (A < N)",
      risk: "Denominator (100 - T) becomes (100 - 100) = 0, causing division by zero ($x \\to \\infty$).",
      solution: "Engine detects (T >= 100 && A < N) and returns { possible: false, message: 'Mathematically Impossible' }.",
      col: C.rose,
      proof: "(100 - T) = 0 ⟹ Impossible Flagged",
    },
    {
      title: "EDGE CASE 3: SHORTAGE BUNK PREVENTION",
      condition: "Student is currently in shortage (e.g. 18/25 = 72% at 75% target)",
      risk: "Raw bunk formula evaluates to negative integer (-1.0), which could mislead student.",
      solution: "Engine clamps bunks: if (currentPct < target) return { count: 0, canBunk: false }.",
      col: C.amber,
      proof: "b = max( 0, floor(...) ) ⟹ 0 Bunks",
    },
  ];

  edgeCases.forEach((ec, i) => {
    const x = 0.8 + i * 4.0;
    addCard(s, { x, y: 1.65, w: 3.7, h: 5.1, bg: C.bgCard, border: ec.col });

    s.addText(ec.title, { x: x + 0.25, y: 1.9, w: 3.2, h: 0.5, fontFace: FONT, fontSize: 12.5, bold: true, color: ec.col });

    s.addText("INPUT SCENARIO:", { x: x + 0.25, y: 2.5, w: 3.2, h: 0.25, fontFace: FONT, fontSize: 9.5, bold: true, color: C.textLight });
    s.addText(ec.condition, { x: x + 0.25, y: 2.75, w: 3.2, h: 0.65, fontFace: FONT, fontSize: 10.5, color: C.textSub });

    s.addText("ALGORITHMIC RISK:", { x: x + 0.25, y: 3.45, w: 3.2, h: 0.25, fontFace: FONT, fontSize: 9.5, bold: true, color: C.rose });
    s.addText(ec.risk, { x: x + 0.25, y: 3.7, w: 3.2, h: 0.75, fontFace: FONT, fontSize: 10.5, color: C.textSub });

    s.addText("ATTENDX RESOLUTION:", { x: x + 0.25, y: 4.5, w: 3.2, h: 0.25, fontFace: FONT, fontSize: 9.5, bold: true, color: C.emerald });
    s.addText(ec.solution, { x: x + 0.25, y: 4.75, w: 3.2, h: 0.75, fontFace: FONT, fontSize: 10.5, color: C.textSub });

    s.addShape(pres.ShapeType.roundRect, {
      x: x + 0.25, y: 5.7, w: 3.2, h: 0.75,
      rectRadius: 0.08,
      fill: { color: "0F172A" },
      line: { color: ec.col, width: 1 },
    });
    s.addText("VERIFIED PROOF:\n" + ec.proof, {
      x: x + 0.25, y: 5.75, w: 3.2, h: 0.65,
      fontFace: "Consolas", fontSize: 9.5, bold: true, color: ec.col, align: "center",
    });
  });

  s.addNotes("Many attendance calculators crash or output negative bunks when a student is in shortage. Our engine defends against every edge case, proved through 22 unit tests.");
}

// =============================================================================
// SLIDE 16: TECHNOLOGY STACK & FRAMEWORK RATIONALE
// =============================================================================
{
  const s = pres.addSlide();
  addGammaHeader(s, "Technology Stack & Architectural Selection Rationale", "TECH STACK", C.cyan);

  const stack = [
    { name: "Next.js 14 (App Router)", cat: "Full-Stack Framework", reason: "Serverless edge API routes for secure AI gateway, fast client hydration, zero routing configuration.", col: C.textLight },
    { name: "React 18 (Hooks)", cat: "Component Architecture", reason: "Encapsulates state via useAttendanceData; cross-component event dispatchers eliminate stale props.", col: C.sky },
    { name: "Tailwind CSS 3.4", cat: "Responsive Design System", reason: "Mobile-first utility styling, high-contrast dark theme classes, rapid card-based layout structuring.", col: C.cyan },
    { name: "Recharts 2.13", cat: "SVG Analytics Engine", reason: "Declarative React SVG charts; reactive re-renders when LocalStorage attendance changes.", col: C.amber },
    { name: "Google Gemini Flash", cat: "Conversational Intelligence", reason: "High reasoning throughput at sub-second speeds; server-side context injection guarantees accurate answers.", col: C.indigo },
    { name: "Vercel Edge Network", cat: "Global Deployment", reason: "Zero-cost serverless hosting, automated Git CI/CD deployments, edge proxy hiding API keys.", col: C.emerald },
  ];

  stack.forEach((tech, idx) => {
    const row = Math.floor(idx / 3);
    const col = idx % 3;
    const x = 0.8 + col * 4.0;
    const y = 1.65 + row * 2.55;

    addCard(s, { x, y, w: 3.7, h: 2.35, bg: C.bgCard, border: tech.col });

    s.addShape(pres.ShapeType.roundRect, {
      x: x + 0.25, y: y + 0.2, w: 2.5, h: 0.28,
      rectRadius: 0.06,
      fill: { color: "1E1B4B" },
      line: { color: tech.col, width: 1 },
    });
    s.addText(tech.cat.toUpperCase(), {
      x: x + 0.25, y: y + 0.2, w: 2.5, h: 0.28,
      fontFace: FONT, fontSize: 8, bold: true, color: tech.col, align: "center",
    });

    s.addText(tech.name, {
      x: x + 0.25, y: y + 0.6, w: 3.2, h: 0.4,
      fontFace: FONT, fontSize: 13, bold: true, color: C.textLight,
    });

    s.addText(tech.reason, {
      x: x + 0.25, y: y + 1.05, w: 3.2, h: 1.1,
      fontFace: FONT, fontSize: 10.5, color: C.textMuted, lineSpacing: 15,
    });
  });

  s.addNotes("We deliberately chose JavaScript ES2023 without TypeScript overhead so that any engineering student can inspect and understand every line of code during viva examination.");
}

// =============================================================================
// SLIDE 17: DUAL-ENGINE AI ASSISTANT ARCHITECTURE
// =============================================================================
{
  const s = pres.addSlide();
  addGammaHeader(s, "Dual-Engine AI Assistant: Cloud LLM + Local Math Fallback", "AI ARCHITECTURE", C.indigo);

  // Left Engine: Cloud Gemini
  addCard(s, { x: 0.8, y: 1.65, w: 5.7, h: 5.1, bg: C.bgCard, border: C.indigo });
  s.addText("PRIMARY ENGINE • CLOUD AI", { x: 1.1, y: 1.9, w: 5.1, h: 0.3, fontFace: FONT, fontSize: 10, bold: true, color: C.indigo });
  s.addText("Google Gemini Flash API", { x: 1.1, y: 2.2, w: 5.1, h: 0.4, fontFace: FONT, fontSize: 17, bold: true, color: C.textLight });

  const geminiFeatures = [
    "Activated when valid GEMINI_API_KEY is present in server environment.",
    "Processes multi-turn dialogue with nuanced academic guidance and encouraging tone.",
    "Receives serialized student attendance snapshot injected dynamically into system prompt.",
    "Performs natural language reasoning: 'Which subject should I prioritize this week?'",
    "Calculates multi-step roadmaps: 'How to recover from 68% to 75% in 30 days.'",
  ];
  s.addText(geminiFeatures.map(f => `✓ ${f}`).join("\n\n"), {
    x: 1.1, y: 2.75, w: 5.1, h: 3.1, fontFace: FONT, fontSize: 11, color: C.textSub, lineSpacing: 17,
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: 1.1, y: 6.05, w: 5.1, h: 0.45,
    rectRadius: 0.08,
    fill: { color: "1E1B4B" },
    line: { color: C.indigo, width: 1 },
  });
  s.addText("Cloud Latency: ~620ms • Temperature: 0.3 (Strict Factual)", {
    x: 1.1, y: 6.05, w: 5.1, h: 0.45,
    fontFace: FONT, fontSize: 9.5, bold: true, color: C.sky, align: "center",
  });

  // Right Engine: Offline Local Fallback
  addCard(s, { x: 6.8, y: 1.65, w: 5.7, h: 5.1, bg: C.bgCard, border: C.emerald });
  s.addText("SECONDARY ENGINE • LOCAL FALLBACK", { x: 7.1, y: 1.9, w: 5.1, h: 0.3, fontFace: FONT, fontSize: 10, bold: true, color: C.emerald });
  s.addText("Deterministic Rule Inference Engine", { x: 7.1, y: 2.2, w: 5.1, h: 0.4, fontFace: FONT, fontSize: 17, bold: true, color: C.textLight });

  const fallbackFeatures = [
    "Activated automatically when API key is missing, network drops, or quota exhausts.",
    "Evaluates intent patterns: 'skip', 'bunk', 'danger', 'need', 'recover', 'plan'.",
    "Extracts subject names from live data and computes exact math using local formulas.",
    "Guarantees 100% zero-downtime: The chatbot NEVER shows a blank screen or crash.",
    "Delivers instant responses (< 5ms) with verified mathematical accuracy.",
  ];
  s.addText(fallbackFeatures.map(f => `✓ ${f}`).join("\n\n"), {
    x: 7.1, y: 2.75, w: 5.1, h: 3.1, fontFace: FONT, fontSize: 11, color: C.textSub, lineSpacing: 17,
  });

  s.addShape(pres.ShapeType.roundRect, {
    x: 7.1, y: 6.05, w: 5.1, h: 0.45,
    rectRadius: 0.08,
    fill: { color: "064E3B" },
    line: { color: C.emerald, width: 1 },
  });
  s.addText("Zero Single Point of Failure • 100% Uptime Guarantee", {
    x: 7.1, y: 6.05, w: 5.1, h: 0.45,
    fontFace: FONT, fontSize: 9.5, bold: true, color: C.emerald, align: "center",
  });

  s.addNotes("Even if our server runs out of API quota during the viva demonstration, our offline fallback engine answers questions about shortages and bunks with 100% mathematical precision.");
}

// =============================================================================
// SLIDE 18: AI GUARDRAILS, SECURITY & RATE LIMITING
// =============================================================================
{
  const s = pres.addSlide();
  addGammaHeader(s, "AI Guardrails, Security & Sliding-Window Rate Limiting", "SECURITY & DEFENSE", C.rose);

  const securityMeasures = [
    {
      num: "SEC-01",
      title: "Zero Client Key Exposure",
      desc: "The Gemini API key is stored strictly as process.env.GEMINI_API_KEY on the Vercel server. It is never bundled into client JS, never stored in Git, and never printed to browser consoles.",
      badge: "Environment Variable Only",
      col: C.emerald,
    },
    {
      num: "SEC-02",
      title: "Sliding-Window Rate Limiting",
      desc: "Serverless route tracks client IP timestamps in memory. Any IP exceeding 15 requests in a 60-second window receives an HTTP 429 'Too Many Requests' response, protecting API quotas.",
      badge: "15 req / min per IP",
      col: C.amber,
    },
    {
      num: "SEC-03",
      title: "Prompt Length & Input Sanitization",
      desc: "User prompts are trimmed and capped at 500 characters. Whitespace-only messages are rejected with HTTP 400. Control characters are stripped to prevent JSON injection attacks.",
      badge: "500-Character Maximum",
      col: C.cyan,
    },
    {
      num: "SEC-04",
      title: "System Prompt Jailbreak Sandbox",
      desc: "System instructions command the model to refuse non-attendance topics, ignore prompt override attempts ('ignore previous instructions'), and rely strictly on injected student data.",
      badge: "Anti-Hallucination Sandbox",
      col: C.rose,
    },
  ];

  securityMeasures.forEach((sm, i) => {
    const row = Math.floor(i / 2);
    const col = i % 2;
    const x = 0.8 + col * 5.95;
    const y = 1.65 + row * 2.55;

    addCard(s, { x, y, w: 5.75, h: 2.35, bg: C.bgCard, border: sm.col });

    s.addShape(pres.ShapeType.roundRect, {
      x: x + 0.3, y: y + 0.2, w: 1.2, h: 0.28,
      rectRadius: 0.06,
      fill: { color: "1E1B4B" },
      line: { color: sm.col, width: 1 },
    });
    s.addText(sm.num, {
      x: x + 0.3, y: y + 0.2, w: 1.2, h: 0.28,
      fontFace: FONT, fontSize: 8.5, bold: true, color: sm.col, align: "center",
    });

    s.addText(sm.title, {
      x: x + 1.6, y: y + 0.2, w: 3.8, h: 0.3,
      fontFace: FONT, fontSize: 13, bold: true, color: C.textLight,
    });

    s.addText(sm.desc, {
      x: x + 0.3, y: y + 0.6, w: 5.15, h: 1.15,
      fontFace: FONT, fontSize: 10.5, color: C.textMuted, lineSpacing: 15,
    });

    s.addShape(pres.ShapeType.roundRect, {
      x: x + 0.3, y: y + 1.85, w: 5.15, h: 0.35,
      rectRadius: 0.06,
      fill: { color: "0F172A" },
      line: { color: sm.col, width: 1 },
    });
    s.addText("ENFORCED POLICY: " + sm.badge, {
      x: x + 0.3, y: y + 1.85, w: 5.15, h: 0.35,
      fontFace: FONT, fontSize: 9, bold: true, color: sm.col, align: "center",
    });
  });

  s.addNotes("We implemented defense-in-depth: rate limiting protects our API quota, character limits prevent context-window overflow, and system prompt guardrails keep the AI strictly on academic topics.");
}

// =============================================================================
// SLIDE 19: CORE FUNCTIONAL MODULES BREAKDOWN
// =============================================================================
{
  const s = pres.addSlide();
  addGammaHeader(s, "Core Functional Modules: High-Cohesion Software Design", "MODULES BREAKDOWN", C.cyan);

  const modules = [
    { num: "M1", name: "Core Math Engine", file: "lib/attendanceCalculations.js", desc: "Pure formulas for % bunk, recovery, and projection.", col: C.sky },
    { num: "M2", name: "Persistence Hook", file: "hooks/useAttendanceData.js", desc: "Manages LocalStorage, undo stack, and event sync.", col: C.emerald },
    { num: "M3", name: "Executive Dashboard", file: "app/page.js", desc: "Overall metrics, risk badges, and Recharts analytics.", col: C.indigo },
    { num: "M4", name: "Bunk Calculator", file: "app/bunk-calculator/page.js", desc: "Computes safe skips and skip impact simulation tables.", col: C.amber },
    { num: "M5", name: "Required Classes", file: "app/required-classes/page.js", desc: "Computes consecutive classes needed to exit shortage.", col: C.rose },
    { num: "M6", name: "Scenario Predictor", file: "app/prediction/page.js", desc: "Interactive sliders for Best, Worst, and Custom cases.", col: C.purple },
    { num: "M7", name: "Alerts Engine", file: "components/AlertsBanner.jsx", desc: "Priority shortage warning banners sorted by severity.", col: C.rose },
    { num: "M8", name: "AI Assistant", file: "app/api/chat/route.js", desc: "Dual-engine proxy with rate limiting and context injection.", col: C.indigo },
    { num: "M9", name: "Settings & Backup", file: "app/settings/page.js", desc: "JSON export, JSON import, dark mode, and demo data.", col: C.cyan },
  ];

  modules.forEach((mod, idx) => {
    const row = Math.floor(idx / 3);
    const col = idx % 3;
    const x = 0.8 + col * 4.0;
    const y = 1.65 + row * 1.7;

    addCard(s, { x, y, w: 3.7, h: 1.55, bg: C.bgCard, border: mod.col });

    s.addShape(pres.ShapeType.roundRect, {
      x: x + 0.2, y: y + 0.15, w: 0.65, h: 0.28,
      rectRadius: 0.06,
      fill: { color: "1E1B4B" },
      line: { color: mod.col, width: 1 },
    });
    s.addText(mod.num, {
      x: x + 0.2, y: y + 0.15, w: 0.65, h: 0.28,
      fontFace: FONT, fontSize: 8.5, bold: true, color: mod.col, align: "center",
    });

    s.addText(mod.name, {
      x: x + 0.95, y: y + 0.15, w: 2.5, h: 0.28,
      fontFace: FONT, fontSize: 11.5, bold: true, color: C.textLight,
    });

    s.addText(mod.file, {
      x: x + 0.2, y: y + 0.48, w: 3.3, h: 0.25,
      fontFace: "Consolas", fontSize: 8.5, color: C.sky,
    });

    s.addText(mod.desc, {
      x: x + 0.2, y: y + 0.75, w: 3.3, h: 0.65,
      fontFace: FONT, fontSize: 9.5, color: C.textMuted, lineSpacing: 13,
    });
  });

  s.addNotes("Every module has single-responsibility separation of concerns, making the entire codebase easily explainable and maintainable.");
}

// =============================================================================
// SLIDE 20: VERIFICATION & TEST SUITE RESULTS (22/22 PASSING)
// =============================================================================
{
  const s = pres.addSlide();
  addGammaHeader(s, "Verification: 22/22 Passing Functional & Math Tests", "TEST HARNESS RESULTS", C.emerald);

  // Top Banner
  s.addShape(pres.ShapeType.roundRect, {
    x: 0.8, y: 1.6, w: 11.7, h: 0.65,
    rectRadius: 0.1,
    fill: { color: "064E3B" },
    line: { color: C.emerald, width: 1 },
  });
  s.addText("AUTOMATED TEST HARNESS: 22 OF 22 UNIT & INTEGRATION TESTS PASSING (100% PASS RATE)", {
    x: 1.0, y: 1.6, w: 11.3, h: 0.65,
    fontFace: FONT, fontSize: 12, bold: true, color: C.textLight, align: "center",
  });

  // Table of 8 key test cases
  const tests = [
    ["TC-01", "Percentage Math", "Attended: 18, Total: 25", "72.00% (Shortage flagged)", "72.00%", "PASS"],
    ["TC-02", "Zero Total Guard", "Attended: 0, Total: 0", "0.00% (No NaN / div by 0)", "0.00%", "PASS"],
    ["TC-03", "Recovery Classes", "18/25, Target: 75%", "3 consecutive classes needed", "3 classes", "PASS"],
    ["TC-04", "Safe Bunk Capacity", "22/25, Target: 75%", "4 classes allowable to bunk", "4 classes", "PASS"],
    ["TC-05", "Shortage Bunk Guard", "18/25 (72%), Target: 75%", "0 bunks (Cannot skip)", "0 bunks", "PASS"],
    ["TC-06", "100% Target Impossibility", "9/10, Target: 100%", "impossible: true flagged", "impossible", "PASS"],
    ["TC-07", "Atomic Undo State", "Mark Present (+1), then Undo", "Counts revert to initial state", "Reverted", "PASS"],
    ["TC-08", "Rate Limiting Threshold", "16 AI requests within 60s", "HTTP 429 Rate Limit Exceeded", "HTTP 429", "PASS"],
  ];

  addCard(s, { x: 0.8, y: 2.4, w: 11.7, h: 4.4, bg: C.bgCard, border: C.borderDark });

  const th = ["Test ID", "Subsystem Verified", "Test Inputs", "Expected Output", "Actual Output", "Status"];
  th.forEach((h, j) => {
    const colW = j === 0 ? 1.4 : (j === 5 ? 1.2 : 2.25);
    const colX = 1.0 + (j === 0 ? 0 : 1.4 + (j - 1) * 2.25);
    s.addShape(pres.ShapeType.roundRect, {
      x: colX, y: 2.55, w: colW - 0.08, h: 0.35,
      rectRadius: 0.06,
      fill: { color: "1E293B" },
      line: { color: C.borderDark, width: 1 },
    });
    s.addText(h, {
      x: colX, y: 2.55, w: colW - 0.08, h: 0.35,
      fontFace: FONT, fontSize: 9, bold: true, color: C.textLight, align: "center",
    });
  });

  tests.forEach((t, i) => {
    const y = 2.98 + i * 0.44;
    const rowBg = i % 2 === 0 ? "0F172A" : "131B2E";

    t.forEach((cell, j) => {
      const colW = j === 0 ? 1.4 : (j === 5 ? 1.2 : 2.25);
      const colX = 1.0 + (j === 0 ? 0 : 1.4 + (j - 1) * 2.25);
      const isStatus = j === 5;

      s.addShape(pres.ShapeType.rect, {
        x: colX, y, w: colW - 0.08, h: 0.4,
        fill: { color: isStatus ? "064E3B" : rowBg },
        line: { color: isStatus ? C.emerald : C.borderDark, width: 0.5 },
      });

      s.addText(cell, {
        x: colX + 0.05, y, w: colW - 0.18, h: 0.4,
        fontFace: FONT, fontSize: 8.5, bold: isStatus || j === 0,
        color: isStatus ? C.emerald : (j === 0 ? C.sky : C.textSub),
        align: (j === 0 || isStatus) ? "center" : "left",
      });
    });
  });

  s.addNotes("All 22 unit and integration test cases achieved a 100% pass rate in our automated test harness before any production deployment.");
}

// =============================================================================
// SLIDE 21: PRODUCTION UI WALKTHROUGH & INTERACTIVE MOCKUPS
// =============================================================================
{
  const s = pres.addSlide();
  addGammaHeader(s, "Production UI Walkthrough: Visual Analytics & Action Cards", "LIVE UI WALKTHROUGH", C.sky);

  // Left Side: Simulated Subject Action Card 1 (Shortage)
  addCard(s, { x: 0.8, y: 1.65, w: 5.7, h: 2.45, bg: C.bgCard, border: C.rose });
  s.addText("DATA STRUCTURES & ALGORITHMS (CS201)", { x: 1.1, y: 1.85, w: 3.5, h: 0.3, fontFace: FONT, fontSize: 12, bold: true, color: C.textLight });

  s.addShape(pres.ShapeType.roundRect, {
    x: 4.8, y: 1.85, w: 1.4, h: 0.28,
    rectRadius: 0.06,
    fill: { color: "881337" },
    line: { color: C.rose, width: 1 },
  });
  s.addText("SHORTAGE: 72.0%", { x: 4.8, y: 1.85, w: 1.4, h: 0.28, fontFace: FONT, fontSize: 8, bold: true, color: C.rose, align: "center" });

  s.addText("18 / 25 Lectures Attended • Target: 75% • Shortage by 3.0%", { x: 1.1, y: 2.2, w: 5.1, h: 0.25, fontFace: FONT, fontSize: 10, color: C.textMuted });

  // Progress Bar Container
  s.addShape(pres.ShapeType.rect, { x: 1.1, y: 2.5, w: 5.1, h: 0.2, fill: { color: "1E293B" } });
  s.addShape(pres.ShapeType.rect, { x: 1.1, y: 2.5, w: 3.67, h: 0.2, fill: { color: C.rose } });

  s.addText("Action Required: Attend 3 consecutive lectures to reach 75.0%", { x: 1.1, y: 2.75, w: 5.1, h: 0.25, fontFace: FONT, fontSize: 9.5, bold: true, color: C.amber });

  // Simulated 4 Action Buttons
  const buttons1 = [
    { label: "+ Present", bg: "065F46", text: C.emerald },
    { label: "+ Absent", bg: "881337", text: C.rose },
    { label: "Cancelled", bg: "334155", text: C.textMuted },
    { label: "↺ Undo", bg: "78350F", text: C.amber },
  ];
  buttons1.forEach((btn, i) => {
    s.addShape(pres.ShapeType.roundRect, {
      x: 1.1 + i * 1.3, y: 3.15, w: 1.18, h: 0.35,
      rectRadius: 0.06,
      fill: { color: btn.bg },
      line: { color: btn.text, width: 0.5 },
    });
    s.addText(btn.label, {
      x: 1.1 + i * 1.3, y: 3.15, w: 1.18, h: 0.35,
      fontFace: FONT, fontSize: 9, bold: true, color: btn.text, align: "center",
    });
  });

  // Left Side: Simulated Subject Action Card 2 (Safe)
  addCard(s, { x: 0.8, y: 4.3, w: 5.7, h: 2.45, bg: C.bgCard, border: C.emerald });
  s.addText("DATABASE MANAGEMENT SYSTEMS (CS202)", { x: 1.1, y: 4.5, w: 3.5, h: 0.3, fontFace: FONT, fontSize: 12, bold: true, color: C.textLight });

  s.addShape(pres.ShapeType.roundRect, {
    x: 4.8, y: 4.5, w: 1.4, h: 0.28,
    rectRadius: 0.06,
    fill: { color: "064E3B" },
    line: { color: C.emerald, width: 1 },
  });
  s.addText("SAFE: 88.0%", { x: 4.8, y: 4.5, w: 1.4, h: 0.28, fontFace: FONT, fontSize: 8, bold: true, color: C.emerald, align: "center" });

  s.addText("22 / 25 Lectures Attended • Target: 75% • Buffer: +13.0%", { x: 1.1, y: 4.85, w: 5.1, h: 0.25, fontFace: FONT, fontSize: 10, color: C.textMuted });

  // Progress Bar Container
  s.addShape(pres.ShapeType.rect, { x: 1.1, y: 5.15, w: 5.1, h: 0.2, fill: { color: "1E293B" } });
  s.addShape(pres.ShapeType.rect, { x: 1.1, y: 5.15, w: 4.48, h: 0.2, fill: { color: C.emerald } });

  s.addText("Status: You can safely bunk 4 more lectures and stay above 75%", { x: 1.1, y: 5.4, w: 5.1, h: 0.25, fontFace: FONT, fontSize: 9.5, bold: true, color: C.emerald });

  buttons1.forEach((btn, i) => {
    s.addShape(pres.ShapeType.roundRect, {
      x: 1.1 + i * 1.3, y: 5.8, w: 1.18, h: 0.35,
      rectRadius: 0.06,
      fill: { color: btn.bg },
      line: { color: btn.text, width: 0.5 },
    });
    s.addText(btn.label, {
      x: 1.1 + i * 1.3, y: 5.8, w: 1.18, h: 0.35,
      fontFace: FONT, fontSize: 9, bold: true, color: btn.text, align: "center",
    });
  });

  // Right Side: Simulated AI Chat Window
  addCard(s, { x: 6.8, y: 1.65, w: 5.7, h: 5.1, bg: C.bgCard, border: C.indigo });
  s.addText("LIVE AI ASSISTANT CHAT SIMULATION", { x: 7.1, y: 1.9, w: 4.0, h: 0.3, fontFace: FONT, fontSize: 10.5, bold: true, color: C.indigo });
  s.addShape(pres.ShapeType.roundRect, {
    x: 11.1, y: 1.9, w: 1.1, h: 0.28,
    rectRadius: 0.06,
    fill: { color: "1E1B4B" },
    line: { color: C.indigo, width: 1 },
  });
  s.addText("ACTIVE", { x: 11.1, y: 1.9, w: 1.1, h: 0.28, fontFace: FONT, fontSize: 8, bold: true, color: C.emerald, align: "center" });

  // User Message Bubble
  s.addShape(pres.ShapeType.roundRect, {
    x: 8.8, y: 2.35, w: 3.4, h: 0.7,
    rectRadius: 0.1,
    fill: { color: "312E81" },
    line: { color: C.indigo, width: 1 },
  });
  s.addText("Can I skip tomorrow's Data Structures class to attend a hackathon?", {
    x: 8.9, y: 2.4, w: 3.2, h: 0.6, fontFace: FONT, fontSize: 9.5, color: C.textLight,
  });

  // Assistant Response Bubble
  s.addShape(pres.ShapeType.roundRect, {
    x: 7.1, y: 3.2, w: 5.1, h: 2.2,
    rectRadius: 0.1,
    fill: { color: "0F172A" },
    line: { color: C.borderDark, width: 1 },
  });
  s.addText("AttendX Assistant (Context-Aware Advice):", {
    x: 7.3, y: 3.3, w: 4.7, h: 0.25, fontFace: FONT, fontSize: 9.5, bold: true, color: C.cyan,
  });
  s.addText("⚠️ Recommendation: Do NOT skip tomorrow's DSA lecture.\n\n" +
            "• Current Status: 18/25 attended = 72.0% (Shortage).\n" +
            "• Skipping tomorrow makes it 18/26 = 69.2% (Drops further by 2.8%).\n" +
            "• Recovery Plan: You currently need 3 consecutive lectures to reach 75%. If you skip, you will need 4 consecutive lectures to recover.", {
    x: 7.3, y: 3.6, w: 4.7, h: 1.7, fontFace: FONT, fontSize: 9.5, color: C.textSub, lineSpacing: 14,
  });

  // Suggested Prompts
  s.addText("SUGGESTED QUICK QUESTIONS:", { x: 7.1, y: 5.6, w: 4.0, h: 0.2, fontFace: FONT, fontSize: 8.5, bold: true, color: C.textMuted });
  const chips = ["Which subject is in danger?", "How many bunks in DBMS?", "30-day 75% plan"];
  chips.forEach((ch, idx) => {
    s.addShape(pres.ShapeType.roundRect, {
      x: 7.1 + idx * 1.75, y: 5.9, w: 1.65, h: 0.45,
      rectRadius: 0.08,
      fill: { color: "1E293B" },
      line: { color: C.borderDark, width: 0.5 },
    });
    s.addText(ch, {
      x: 7.1 + idx * 1.75, y: 5.9, w: 1.65, h: 0.45,
      fontFace: FONT, fontSize: 7.5, color: C.sky, align: "center",
    });
  });

  s.addNotes("Notice the 1-click action buttons on each card. If a student taps 'Present' by mistake, clicking 'Undo' immediately restores both the attended count and historical log.");
}

// =============================================================================
// SLIDE 22: PERFORMANCE BENCHMARKS & LIGHTHOUSE AUDIT
// =============================================================================
{
  const s = pres.addSlide();
  addGammaHeader(s, "Performance Benchmarks & Google Lighthouse Audit", "EMPIRICAL BENCHMARKS", C.emerald);

  const metrics = [
    { value: "0.52 s", label: "First Contentful Paint (FCP)", sub: "Target: < 1.8s (Good)", col: C.emerald },
    { value: "0.78 s", label: "Time to Interactive (TTI)", sub: "Target: < 3.8s (Good)", col: C.cyan },
    { value: "114 KB", label: "Total Client Bundle (Gzipped)", sub: "Industry Avg: 350+ KB", col: C.indigo },
    { value: "< 1.2 ms", label: "LocalStorage Access Latency", sub: "Cloud DB Avg: 80-250ms", col: C.amber },
  ];

  metrics.forEach((m, idx) => {
    const x = 0.8 + idx * 3.0;
    addCard(s, { x, y: 1.65, w: 2.8, h: 2.1, bg: C.bgCard, border: m.col });

    s.addText(m.value, {
      x: x + 0.15, y: 1.9, w: 2.5, h: 0.6,
      fontFace: FONT, fontSize: 28, bold: true, color: m.col, align: "center",
    });
    s.addText(m.label, {
      x: x + 0.15, y: 2.55, w: 2.5, h: 0.45,
      fontFace: FONT, fontSize: 11, bold: true, color: C.textLight, align: "center",
    });
    s.addText(m.sub, {
      x: x + 0.15, y: 3.05, w: 2.5, h: 0.35,
      fontFace: FONT, fontSize: 9.5, color: C.textMuted, align: "center",
    });
  });

  // Bottom Technical Evaluation Table
  addCard(s, { x: 0.8, y: 4.0, w: 11.7, h: 2.75, bg: C.bgCard, border: C.borderDark });
  s.addText("AUDIT PARAMETER BREAKDOWN", { x: 1.1, y: 4.2, w: 5.0, h: 0.3, fontFace: FONT, fontSize: 10, bold: true, color: C.sky });

  const benchmarks = [
    ["Cumulative Layout Shift (CLS)", "0.001", "< 0.10", "Zero layout shift during hydration; cards statically sized."],
    ["Speed Index", "0.68 s", "< 3.4 s", "Instant visual rendering on mobile screens."],
    ["Edge Proxy Latency", "620 ms", "< 1500 ms", "Serverless Next.js edge route streaming response."],
    ["Cross-Browser Support", "100%", "95%+", "Verified across Chrome, Safari, Firefox, Edge, and iOS WebKit."],
  ];

  benchmarks.forEach((b, i) => {
    const y = 4.55 + i * 0.48;
    const bg = i % 2 === 0 ? "0F172A" : "131B2E";
    s.addShape(pres.ShapeType.rect, { x: 1.1, y, w: 11.1, h: 0.42, fill: { color: bg } });

    s.addText(b[0], { x: 1.2, y, w: 3.2, h: 0.42, fontFace: FONT, fontSize: 9.5, bold: true, color: C.textLight });
    s.addText(b[1], { x: 4.5, y, w: 1.5, h: 0.42, fontFace: FONT, fontSize: 9.5, bold: true, color: C.emerald, align: "center" });
    s.addText(b[2], { x: 6.1, y, w: 1.5, h: 0.42, fontFace: FONT, fontSize: 9.5, color: C.textMuted, align: "center" });
    s.addText(b[3], { x: 7.7, y, w: 4.4, h: 0.42, fontFace: FONT, fontSize: 9, color: C.textSub });
  });

  s.addNotes("Because state operations run directly against browser LocalStorage, our read/write operations take less than 1.2 milliseconds—over 100 times faster than a cloud database query.");
}

// =============================================================================
// SLIDE 23: PROJECT ACHIEVEMENTS & LIMITATIONS
// =============================================================================
{
  const s = pres.addSlide();
  addGammaHeader(s, "Project Achievements & Architectural Limitations", "ENGINEERING EVALUATION", C.amber);

  // Left Card: Achievements
  addCard(s, { x: 0.8, y: 1.65, w: 5.7, h: 5.1, bg: C.bgCard, border: C.emerald });
  s.addText("KEY INNOVATIONS & ACHIEVEMENTS", { x: 1.1, y: 1.9, w: 5.1, h: 0.3, fontFace: FONT, fontSize: 10, bold: true, color: C.emerald });
  s.addText("Engineered Strengths", { x: 1.1, y: 2.2, w: 5.1, h: 0.4, fontFace: FONT, fontSize: 16, bold: true, color: C.textLight });

  const ach = [
    "Mathematical Certainty: Exact floor and ceiling formulas prevent shortage errors.",
    "100% Student Privacy: All attendance logs reside strictly on local client devices.",
    "Dual-Engine Reliability: AI Chatbot switches to local math if offline or out of quota.",
    "1-Click State Undo: Accidental button taps are reversed with zero data corruption.",
    "Zero Infrastructure Cost: Incurs ₹0 hosting and cloud database fees on Vercel.",
  ];
  s.addText(ach.map(a => `✓ ${a}`).join("\n\n"), {
    x: 1.1, y: 2.75, w: 5.1, h: 3.8, fontFace: FONT, fontSize: 11, color: C.textSub, lineSpacing: 18,
  });

  // Right Card: Limitations
  addCard(s, { x: 6.8, y: 1.65, w: 5.7, h: 5.1, bg: C.bgCard, border: C.rose });
  s.addText("TRADE-OFFS & LIMITATIONS", { x: 7.1, y: 1.9, w: 5.1, h: 0.3, fontFace: FONT, fontSize: 10, bold: true, color: C.rose });
  s.addText("Current Operational Boundaries", { x: 7.1, y: 2.2, w: 5.1, h: 0.4, fontFace: FONT, fontSize: 16, bold: true, color: C.textLight });

  const lim = [
    "Manual Input Dependency: Requires the student to tap Present or Absent after lectures.",
    "Device Isolation: Data saved in Chrome does not automatically sync to Safari without JSON backup export.",
    "No Timetable Sync: Currently requires students to add subject names manually rather than uploading a routine.",
    "Stateless Rate Limiting: In-memory sliding window resets if serverless edge instance recycles.",
    "Single User Scope: Designed for personal student tracking, not faculty multi-student grading.",
  ];
  s.addText(lim.map(l => `⚠ ${l}`).join("\n\n"), {
    x: 7.1, y: 2.75, w: 5.1, h: 3.8, fontFace: FONT, fontSize: 11, color: C.textSub, lineSpacing: 18,
  });

  s.addNotes("AttendX proves that client-side architectures combined with edge AI can deliver superior utility and privacy without costly server infrastructure.");
}

// =============================================================================
// SLIDE 24: FUTURE ROADMAP & PWA ENHANCEMENTS
// =============================================================================
{
  const s = pres.addSlide();
  addGammaHeader(s, "Future Roadmap & Progressive Web App (PWA) Evolution", "FUTURE ENHANCEMENTS", C.indigo);

  const future = [
    {
      phase: "PHASE 1 • Q3 2026",
      title: "Timetable Routine Auto-Sync",
      points: [
        "Upload semester routines via standard .ICS or PDF schedules.",
        "Automatic push prompts when a lecture slot ends: 'Did you attend OS?'",
        "Holiday and exam recess auto-exclusion from future predictions.",
      ],
      col: C.sky,
      badge: "Timetable Integration",
    },
    {
      phase: "PHASE 2 • Q4 2026",
      title: "PWA Offline Push Alerts",
      points: [
        "Service-worker background notifications on Android and iOS.",
        "Early morning triage warnings: 'DSA is at 72%—don't miss today's 9 AM lecture!'",
        "Installable PWA icon with offline home-screen launcher.",
      ],
      col: C.emerald,
      badge: "PWA Service Worker",
    },
    {
      phase: "PHASE 3 • Q1 2027",
      title: "OCR University Portal Importer",
      points: [
        "Upload a screenshot or PDF of the official university ERP roll.",
        "Tesseract OCR automatically extracts subject names, attended, and totals.",
        "Zero-effort initial semester setup in under 5 seconds.",
      ],
      col: C.purple,
      badge: "OCR Computer Vision",
    },
  ];

  future.forEach((f, i) => {
    const x = 0.8 + i * 4.0;
    addCard(s, { x, y: 1.65, w: 3.7, h: 5.1, bg: C.bgCard, border: f.col });

    s.addShape(pres.ShapeType.roundRect, {
      x: x + 0.25, y: 1.9, w: 3.2, h: 0.32,
      rectRadius: 0.08,
      fill: { color: "1E1B4B" },
      line: { color: f.col, width: 1 },
    });
    s.addText(f.phase, {
      x: x + 0.25, y: 1.9, w: 3.2, h: 0.32,
      fontFace: FONT, fontSize: 9, bold: true, color: f.col, align: "center",
    });

    s.addText(f.title, {
      x: x + 0.25, y: 2.35, w: 3.2, h: 0.45,
      fontFace: FONT, fontSize: 14, bold: true, color: C.textLight,
    });

    s.addText(f.points.map(pt => `• ${pt}`).join("\n\n"), {
      x: x + 0.25, y: 2.9, w: 3.2, h: 3.0,
      fontFace: FONT, fontSize: 10.5, color: C.textSub, lineSpacing: 17,
    });

    s.addShape(pres.ShapeType.roundRect, {
      x: x + 0.25, y: 6.2, w: 3.2, h: 0.4,
      rectRadius: 0.08,
      fill: { color: "0F172A" },
      line: { color: f.col, width: 1 },
    });
    s.addText(f.badge, {
      x: x + 0.25, y: 6.2, w: 3.2, h: 0.4,
      fontFace: FONT, fontSize: 9.5, bold: true, color: f.col, align: "center",
    });
  });

  s.addNotes("In future versions, AttendX will evolve into an autonomous Progressive Web App with scheduled timetable notifications and OCR portal import.");
}

// =============================================================================
// SLIDE 25: CONCLUSION, IEEE REFERENCES & VIVA VOCE Q&A
// =============================================================================
{
  const s = pres.addSlide();
  addGammaHeader(s, "Conclusion, IEEE References & Viva Voce Q&A", "CONCLUSION & VIVA", C.emerald);

  // Left Card: Key Takeaways
  addCard(s, { x: 0.8, y: 1.65, w: 5.7, h: 5.1, bg: C.bgCard, border: C.emerald });
  s.addText("PROJECT SUMMARY", { x: 1.1, y: 1.9, w: 5.1, h: 0.3, fontFace: FONT, fontSize: 10, bold: true, color: C.emerald });
  s.addText("Core Project Conclusions", { x: 1.1, y: 2.2, w: 5.1, h: 0.4, fontFace: FONT, fontSize: 16, bold: true, color: C.textLight });

  const conclusions = [
    "AttendX solves the collegiate attendance crisis by replacing passive percentages with forward-looking bunk capacity and recovery math.",
    "Proves that client-first LocalStorage architecture offers 100% data privacy and zero hosting costs without compromising functionality.",
    "Integrates Google Gemini Flash via secure serverless proxy, reinforced by an offline mathematical inference fallback engine.",
    "Successfully verified with 22/22 unit test cases passing and fully deployment-ready on Vercel.",
  ];
  s.addText(conclusions.map(c => `✓ ${c}`).join("\n\n"), {
    x: 1.1, y: 2.75, w: 5.1, h: 3.8, fontFace: FONT, fontSize: 11, color: C.textSub, lineSpacing: 18,
  });

  // Right Card: Q&A and IEEE References
  addCard(s, { x: 6.8, y: 1.65, w: 5.7, h: 5.1, bg: C.bgCard, border: C.indigo });
  s.addText("VIVA VOCE EVALUATION", { x: 7.1, y: 1.9, w: 5.1, h: 0.3, fontFace: FONT, fontSize: 10, bold: true, color: C.indigo });
  s.addText("Thank You! Open for Questions", { x: 7.1, y: 2.2, w: 5.1, h: 0.4, fontFace: FONT, fontSize: 17, bold: true, color: C.textLight });

  s.addText("IEEE REFERENCES:\n" +
            "[1] Next.js 14 Documentation, 'App Router Architecture,' Vercel Inc., 2024.\n" +
            "[2] Google AI for Developers, 'Gemini API Reference and Guidelines,' Google LLC, 2024.\n" +
            "[3] W3C Web Applications Group, 'Web Storage (Second Edition),' W3C Recommendation, 2021.\n" +
            "[4] AICTE, 'Approval Process Handbook & Attendance Ordinances,' New Delhi, India, 2023.", {
    x: 7.1, y: 2.75, w: 5.1, h: 1.8, fontFace: FONT, fontSize: 9, color: C.textMuted, lineSpacing: 14,
  });

  // Large Q&A Callout
  s.addShape(pres.ShapeType.roundRect, {
    x: 7.1, y: 4.75, w: 5.1, h: 1.75,
    rectRadius: 0.12,
    fill: { color: "1E1B4B" },
    line: { color: C.indigo, width: 1.5 },
  });
  s.addText("READY FOR LIVE DEMONSTRATION & CODE REVIEW", {
    x: 7.3, y: 4.95, w: 4.7, h: 0.3, fontFace: FONT, fontSize: 11, bold: true, color: C.sky, align: "center",
  });
  s.addText("Candidate: Aryan Raj (Reg. No. 23BCON123)\nDepartment of Computer Science & Engineering\nJECRC University, Jaipur | Session: 2025–26", {
    x: 7.3, y: 5.35, w: 4.7, h: 1.0, fontFace: FONT, fontSize: 10.5, color: C.textLight, align: "center", lineSpacing: 16,
  });

  s.addNotes("Thank you, respected evaluators. I am now ready to demonstrate the live website and address any technical questions regarding our mathematical formulas, codebase, or AI implementation.");
}

// Generate the PPTX File
const outputPath = path.join(process.cwd(), "AttendX_Major_Project_Presentation.pptx");
pres.writeFile({ fileName: outputPath }).then(() => {
  console.log(`Creative Gamma-Grade Presentation generated successfully at: ${outputPath}`);
  const stats = fs.statSync(outputPath);
  console.log(`File size: ${stats.size} bytes`);
});
