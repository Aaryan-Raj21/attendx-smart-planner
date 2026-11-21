import fs from "fs";
import path from "path";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  Header,
  Footer,
  PageNumber,
  NumberFormat,
  ImageRun,
} from "docx";

console.log("Generating Designer-Grade JECRC Major Project Report (.docx)...");

const crestPath = path.join(process.cwd(), "assets", "jecrc_crest.png");
let crestImageBuffer = null;
if (fs.existsSync(crestPath)) {
  crestImageBuffer = fs.readFileSync(crestPath);
}

const doc = new Document({
  styles: {
    default: {
      document: {
        run: {
          font: "Times New Roman",
          size: 24, // 12pt
          color: "000000",
        },
        paragraph: {
          spacing: {
            line: 360, // 1.5 line spacing
            before: 120,
            after: 120,
          },
          alignment: AlignmentType.JUSTIFIED,
        },
      },
    },
    heading1: {
      run: {
        font: "Times New Roman",
        size: 32, // 16pt
        bold: true,
        color: "000000",
      },
      paragraph: {
        spacing: { before: 240, after: 120 },
      },
    },
    heading2: {
      run: {
        font: "Times New Roman",
        size: 28, // 14pt
        bold: true,
        color: "000000",
      },
      paragraph: {
        spacing: { before: 200, after: 100 },
      },
    },
    heading3: {
      run: {
        font: "Times New Roman",
        size: 24, // 12pt
        bold: true,
        color: "000000",
      },
      paragraph: {
        spacing: { before: 160, after: 80 },
      },
    },
  },
  sections: [
    // -------------------------------------------------------------------------
    // FRONT MATTER SECTION (LOWER-CASE ROMAN i, ii, iii...)
    // -------------------------------------------------------------------------
    {
      properties: {
        page: {
          pageNumbers: {
            start: 1,
            formatType: NumberFormat.LOWER_ROMAN,
          },
          margin: {
            top: 1440,    // 1 inch
            bottom: 1440, // 1 inch
            left: 2160,   // 1.5 inch binding margin
            right: 1440,  // 1 inch
          },
        },
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ children: [PageNumber.CURRENT] })],
            }),
          ],
        }),
      },
      children: [
        // COVER PAGE
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 180, after: 100 },
          children: [
            new TextRun({
              text: "MAJOR PROJECT REPORT",
              bold: true,
              size: 36, // 18pt
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 50, after: 150 },
          children: [
            new TextRun({ text: "on", size: 24, italics: true }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100, after: 200 },
          children: [
            new TextRun({
              text: '“AttendX: Smart Attendance Planner”',
              bold: true,
              size: 36,
              color: "1e1b4b",
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100, after: 250 },
          children: [
            new TextRun({
              text: "Submitted in partial fulfillment of the requirements for the award of the degree of\nBACHELOR OF TECHNOLOGY\nin\nCOMPUTER SCIENCE AND ENGINEERING",
              bold: true,
              size: 24,
            }),
          ],
        }),

        // University Logo Image
        ...(crestImageBuffer
          ? [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 200, after: 200 },
                children: [
                  new ImageRun({
                    data: crestImageBuffer,
                    transformation: { width: 140, height: 140 },
                  }),
                ],
              }),
            ]
          : [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 200, after: 200 },
                children: [
                  new TextRun({
                    text: "[ JECRC UNIVERSITY LOGO ]",
                    bold: true,
                    size: 24,
                    color: "DC2626",
                  }),
                ],
              }),
            ]),

        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 150, after: 120 },
          children: [
            new TextRun({ text: "Submitted By:\n", bold: true, size: 24 }),
            new TextRun({
              text: "Aryan Raj (Reg. No. 23BCON123 [Your Reg. No.])\n[Name of Student 2 (Registration No.)]\n[Name of Student 3 (Registration No.)]",
              size: 24,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 120, after: 200 },
          children: [
            new TextRun({ text: "Under the Supervision of:\n", bold: true, size: 24 }),
            new TextRun({
              text: "Dr./Mr./Ms. [Guide Name]\n(Assistant Professor, Department of CSE)",
              size: 24,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 250, after: 80 },
          children: [
            new TextRun({
              text: "DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING\nJECRC UNIVERSITY, JAIPUR\nSESSION: 2025–26",
              bold: true,
              size: 26,
            }),
          ],
        }),

        // DECLARATION
        new Paragraph({
          pageBreakBefore: true,
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "DECLARATION", bold: true })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "I, Aryan Raj, certify that my major project work embodied in this Report entitled “AttendX: Smart Attendance Planner” is my own Bonafide work carried out by me under the supervision of [Name of Guide] (Guide) at the Department of Computer Science & Engineering, JECRC University, Jaipur. The work is original and has not been submitted earlier as a whole or in part for the award of any degree/diploma at this or any other Institution / university in India or abroad.",
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 400, after: 200 },
          children: [
            new TextRun({
              text: "Date: __________________\nPlace: Jaipur\n\n\n" +
                    "                                                                                               Signature of Student\n" +
                    "                                                                                               Aryan Raj\n" +
                    "                                                                                               (Reg. No. 23BCON123)\n\n\n\n" +
                    "Counter Signature\n" +
                    "_____________________\n" +
                    "[Guide Name], Guide\n" +
                    "Department of CSE, JECRC University",
            }),
          ],
        }),

        // CERTIFICATE
        new Paragraph({
          pageBreakBefore: true,
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "CERTIFICATE", bold: true })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "This is to certify that the Major Project titled “AttendX: Smart Attendance Planner” has been successfully completed by: Aryan Raj (Reg. No. 23BCON123), [Student Name 2, Reg. No.], [Student Name 3, Reg. No.] under my supervision during VII Semester of B.Tech. (CSE), JECRC University, Jaipur.",
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 600, after: 200 },
          children: [
            new TextRun({
              text: "______________________________                     ______________________________\n" +
                    "(Project Guide Signature)                                    (HOD Signature)\n" +
                    "Name: [Guide Name]                                            Head, Department of CSE\n" +
                    "Designation: Assistant Professor\n\n\n\n" +
                    "______________________________\n" +
                    "(Dean Signature)\n" +
                    "Dean, School of Engineering\n" +
                    "JECRC University, Jaipur",
            }),
          ],
        }),

        // ACKNOWLEDGEMENT
        new Paragraph({
          pageBreakBefore: true,
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "ACKNOWLEDGEMENT", bold: true })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "I take this opportunity to express my profound gratitude and deep regards to my supervisor, [Guide Name], Department of Computer Science & Engineering, JECRC University, Jaipur, for providing exemplary guidance, constant encouragement, and insightful feedback throughout the duration of this Major Project.",
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "I am equally grateful to the Head of Department, Computer Science & Engineering, and the Dean, School of Engineering, JECRC University, for facilitating access to departmental computational laboratories and fostering an enriching technical environment.",
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Finally, I extend my heartfelt thanks to my parents, classmates, and peers for their unceasing motivation, constructive testing observations, and continuous support throughout this research and development endeavor.",
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 300, after: 100 },
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({
              text: "Aryan Raj\n(Reg. No. 23BCON123)\nDepartment of CSE, JECRC University, Jaipur",
              bold: true,
            }),
          ],
        }),

        // ABSTRACT
        new Paragraph({
          pageBreakBefore: true,
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "ABSTRACT",
              bold: true,
              italics: true,
              size: 32, // 16pt
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 240, after: 160 },
          children: [
            new TextRun({
              italics: true,
              text: "Maintaining mandatory minimum lecture attendance (typically 75%) is a universal requirement across collegiate engineering curricula in India, failing which students face debarment from semester examinations. Despite this critical regulation, existing college Enterprise Resource Planning (ERP) portals merely display retrospective raw percentages without actionable decision guidance, leaving students unaware of how many lectures they must attend consecutively to recover from shortages or how many lectures they can safely skip without violating compliance. To solve this problem, this project develops AttendX: Smart Attendance Planner, a client-first web architecture engineered using Next.js (App Router), React, Tailwind CSS, Recharts, and browser localStorage for zero-latency local data management. AttendX integrates a rigorous mathematical calculation engine computing subject-wise bunk limits, exact consecutive recovery counts, and multi-scenario future attendance projections without external database dependencies. Furthermore, AttendX incorporates a secure serverless AI Chatbot (\"AttendX Assistant\") powered by Google Gemini Flash API, employing context injection to deliver personalized mathematical recovery roadmaps while strictly guarding student privacy and API security. The resulting deployment provides students with real-time risk classification, interactive simulation tables, and reliable exam readiness planning.",
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({ text: "Keywords: ", bold: true }),
            new TextRun({ text: "Attendance Tracking, Bunk Calculator, Attendance Prediction, Next.js App Router, Google Gemini AI, LocalStorage Persistence." }),
          ],
        }),

        // TABLE OF CONTENTS
        new Paragraph({
          pageBreakBefore: true,
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "TABLE OF CONTENTS", bold: true })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "DECLARATION .................................................................................................................... i\n" +
                    "CERTIFICATE .................................................................................................................... ii\n" +
                    "ACKNOWLEDGEMENT .................................................................................................... iii\n" +
                    "ABSTRACT ....................................................................................................................... iv\n" +
                    "TABLE OF CONTENTS ..................................................................................................... vi\n" +
                    "LIST OF TABLES .............................................................................................................. ix\n" +
                    "LIST OF FIGURES ............................................................................................................. xi\n" +
                    "LIST OF ABBREVIATIONS ............................................................................................... xv\n\n" +
                    "CHAPTER 1: INTRODUCTION ........................................................................................... 1\n" +
                    "  1.1 Background of the Study ............................................................................................ 3\n" +
                    "  1.2 Problem Statement .................................................................................................... 7\n" +
                    "  1.3 Objectives of the Project ............................................................................................ 8\n" +
                    "  1.4 Scope of the Project ................................................................................................... 8\n\n" +
                    "CHAPTER 2: LITERATURE REVIEW / ANALYSIS .......................................................... 11\n" +
                    "  2.1 Related Work ............................................................................................................. 11\n" +
                    "  2.2 Comparative Study ................................................................................................... 14\n" +
                    "  2.3 Feasibility Study ........................................................................................................ 15\n" +
                    "      2.3.1 Technical Feasibility ........................................................................................... 15\n" +
                    "      2.3.2 Economic Feasibility .......................................................................................... 16\n" +
                    "      2.3.3 Operational Feasibility ........................................................................................ 16\n\n" +
                    "CHAPTER 3: SYSTEM DESIGN ........................................................................................ 17\n" +
                    "  3.1 System Architecture .................................................................................................. 17\n" +
                    "  3.2 UML Diagrams (Use Case, Activity, Sequence) ....................................................... 19\n" +
                    "  3.3 Data Flow Diagram (DFD Level 0 & Level 1) ............................................................ 22\n" +
                    "  3.4 ER Diagram ............................................................................................................... 24\n" +
                    "  3.5 Database Design & Schema ....................................................................................... 25\n\n" +
                    "CHAPTER 4: IMPLEMENTATION ..................................................................................... 27\n" +
                    "  4.1 Tools & Technologies Used ...................................................................................... 27\n" +
                    "  4.2 System Requirements (Hardware & Software) .......................................................... 30\n" +
                    "  4.3 Modules Description ................................................................................................. 31\n" +
                    "  4.4 Algorithms / Logic Used ........................................................................................... 34\n\n" +
                    "CHAPTER 5: TESTING & RESULTS ................................................................................. 37\n" +
                    "  5.1 Test Plan ................................................................................................................... 37\n" +
                    "  5.2 Test Cases Table ...................................................................................................... 38\n" +
                    "  5.3 Output Screenshots ................................................................................................... 41\n" +
                    "  5.4 Performance Analysis ............................................................................................... 42\n\n" +
                    "CHAPTER 6: CONCLUSION & FUTURE WORK ............................................................... 44\n" +
                    "  Summary of Project ......................................................................................................... 44\n" +
                    "  Achievements ................................................................................................................. 44\n" +
                    "  Limitations ..................................................................................................................... 45\n" +
                    "  Future Scope ................................................................................................................... 45\n\n" +
                    "BIBLIOGRAPHY / REFERENCES (IEEE Style) ................................................................ 46\n" +
                    "APPENDICES (Appendix A: User Manual, Appendix B: Screenshots, Appendix C: Code) .. 49",
            }),
          ],
        }),

        // LIST OF TABLES
        new Paragraph({
          pageBreakBefore: true,
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "LIST OF TABLES", bold: true })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Table 2.1: Comparative Feature Evaluation Matrix of AttendX vs Existing Portals ............. 14\n" +
                    "Table 4.1: Hardware and Software System Requirements Specification ............................... 30\n" +
                    "Table 5.1: Functional and Mathematical Verification Test Suite (22 Unit Cases) .................. 38\n" +
                    "Table 5.2: Production Performance and Bundle Trace Benchmarks ..................................... 42",
            }),
          ],
        }),

        // LIST OF FIGURES
        new Paragraph({
          pageBreakBefore: true,
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "LIST OF FIGURES", bold: true })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Figure 3.1: Client-First Decoupled System Architecture of AttendX ..................................... 18\n" +
                    "Figure 3.2: UML Use Case Diagram for Student Interactions ................................................ 20\n" +
                    "Figure 3.3: UML Sequence Diagram for AI Context Injection Flow ........................................ 21\n" +
                    "Figure 3.4: Data Flow Diagram (DFD Level 0 Context Model) ............................................... 23\n" +
                    "Figure 3.5: Entity-Relationship (ER) Schema for LocalStorage Data Entities ......................... 24\n" +
                    "Figure 5.1: Production Executive Attendance Dashboard with Recharts Analytics ................ 41\n" +
                    "Figure 5.2: Dedicated Full-Screen AI Assistant Interface with Google Gemini API ............... 41",
            }),
          ],
        }),

        // LIST OF ABBREVIATIONS
        new Paragraph({
          pageBreakBefore: true,
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "LIST OF ABBREVIATIONS", bold: true })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "AICTE     - All India Council for Technical Education\n" +
                    "API       - Application Programming Interface\n" +
                    "CSE       - Computer Science and Engineering\n" +
                    "DFD       - Data Flow Diagram\n" +
                    "ERP       - Enterprise Resource Planning\n" +
                    "HTTPS     - Hypertext Transfer Protocol Secure\n" +
                    "JSON      - JavaScript Object Notation\n" +
                    "LLM       - Large Language Model\n" +
                    "PWA       - Progressive Web App\n" +
                    "REST      - Representational State Transfer\n" +
                    "SVG       - Scalable Vector Graphics\n" +
                    "UI / UX   - User Interface / User Experience\n" +
                    "UML       - Unified Modeling Language",
            }),
          ],
        }),
      ],
    },

    // -------------------------------------------------------------------------
    // MAIN REPORT BODY SECTION (ARABIC NUMERALS 1, 2, 3...)
    // -------------------------------------------------------------------------
    {
      properties: {
        page: {
          pageNumbers: {
            start: 1,
            formatType: NumberFormat.DECIMAL,
          },
          margin: {
            top: 1440,
            bottom: 1440,
            left: 2160,
            right: 1440,
          },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  text: "AttendX: Smart Attendance Planner | JECRC University, Jaipur",
                  size: 18,
                  color: "666666",
                }),
              ],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ children: [PageNumber.CURRENT] })],
            }),
          ],
        }),
      },
      children: [
        // CHAPTER 1
        new Paragraph({
          pageBreakBefore: true,
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "CHAPTER 1\nINTRODUCTION", bold: true })],
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "1.1 Background of the Study" })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "In undergraduate engineering programs governed by statutory regulatory frameworks such as the All India Council for Technical Education (AICTE) and university examination ordinances, mandatory lecture attendance serves as a primary eligibility requirement for semester end-term examinations. Technical institutions enforce a strict policy mandating students to maintain at least 75% attendance across lectures and laboratory practicals.",
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "While classroom engagement directly correlates with engineering competency and laboratory proficiency, undergraduates routinely manage demanding extracurricular and career milestones, including national hackathons, technical internships, inter-college cultural symposiums, campus recruitment drives, and illness. Because attendance tracking is cumulative, unmonitored absences early in the academic session lead to irreversible shortages as final examinations approach.",
            }),
          ],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "1.2 Problem Statement" })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Existing institutional Enterprise Resource Planning (ERP) systems exhibit severe structural and usability deficiencies:\n\n" +
                    "1. Passive Retrospection: Portals merely present historical percentages (e.g. 68.2%) without providing actionable forward-looking recovery plans.\n" +
                    "2. Lack of Decision Guidance: Students have no mathematical tool to compute allowable skips (\"bunk capacity\") while staying above the 75% threshold.\n" +
                    "3. Delayed Awareness: Students discover shortages during the final two weeks of the semester when recovery is mathematically unattainable.\n" +
                    "4. Severe Inaccessibility: University portals experience server downtime during exam weeks, require repetitive multi-factor logins, and lack predictive modeling.",
            }),
          ],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "1.3 Objectives of the Project" })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "The core objectives of AttendX: Smart Attendance Planner are:\n\n" +
                    "1. Formulate and implement a verified mathematical engine computing percentage, allowable bunks, and consecutive recovery targets.\n" +
                    "2. Build a client-first, privacy-focused architecture utilizing browser LocalStorage, eliminating remote database dependencies.\n" +
                    "3. Integrate an AI Assistant (\"AttendX Assistant\") powered by Google Gemini Flash API using secure context injection.\n" +
                    "4. Implement real-time risk classification (Safe, Warning, Shortage) with interactive Recharts analytics.\n" +
                    "5. Ensure complete data portability via JSON backup export and import mechanisms.",
            }),
          ],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "1.4 Scope of the Project" })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "The scope of AttendX encompasses technical university programs where attendance thresholds are strictly enforced. The platform supports global target configuration (default 75%) with subject-level target overrides. It runs seamlessly on modern desktop, tablet, and mobile browsers.",
            }),
          ],
        }),

        // CHAPTER 2
        new Paragraph({
          pageBreakBefore: true,
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "CHAPTER 2\nLITERATURE REVIEW / ANALYSIS", bold: true })],
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "2.1 Related Work" })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Prior research in academic attendance systems reveals three predominant approaches: Institutional ERP Software, Manual Spreadsheets (Microsoft Excel / Google Sheets), and Basic Mobile Utility Apps. While ERP platforms satisfy administrative payroll and auditing requirements, human-computer interaction studies indicate they fail as personal decision-support systems due to the complete absence of forward-looking predictive models.",
            }),
          ],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "2.2 Comparative Study" })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100, after: 100 },
          children: [
            new TextRun({
              text: "Table 2.1: Comparative Feature Evaluation Matrix of AttendX vs Existing Portals",
              bold: true,
              font: "Garamond",
              size: 20, // 10pt
            }),
          ],
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Feature / Capability", bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "College ERP Portal", bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Manual Spreadsheets", bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "AttendX Planner", bold: true })] })] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "Bunk Capacity Calculation" })] }),
                new TableCell({ children: [new Paragraph({ text: "No (Static numbers only)" })] }),
                new TableCell({ children: [new Paragraph({ text: "Requires manual formula" })] }),
                new TableCell({ children: [new Paragraph({ text: "Automated (Exact floor formula)" })] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "Consecutive Recovery Math" })] }),
                new TableCell({ children: [new Paragraph({ text: "No recovery guidance" })] }),
                new TableCell({ children: [new Paragraph({ text: "Complex formula setup" })] }),
                new TableCell({ children: [new Paragraph({ text: "Automated (Exact ceiling formula)" })] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "AI Context-Aware Chatbot" })] }),
                new TableCell({ children: [new Paragraph({ text: "Not available" })] }),
                new TableCell({ children: [new Paragraph({ text: "Not available" })] }),
                new TableCell({ children: [new Paragraph({ text: "Integrated (Google Gemini Flash)" })] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "Client Storage & Privacy" })] }),
                new TableCell({ children: [new Paragraph({ text: "Centralized server logins" })] }),
                new TableCell({ children: [new Paragraph({ text: "Local file / cloud sync" })] }),
                new TableCell({ children: [new Paragraph({ text: "100% Client LocalStorage" })] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "Multi-Scenario Prediction" })] }),
                new TableCell({ children: [new Paragraph({ text: "No" })] }),
                new TableCell({ children: [new Paragraph({ text: "Manual table creation" })] }),
                new TableCell({ children: [new Paragraph({ text: "Integrated (3-Scenario Slider)" })] }),
              ],
            }),
          ],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "2.3 Feasibility Study" })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "2.3.1 Technical Feasibility: The implementation leverages Next.js 14 App Router, React 18, and modern CSS via Tailwind. Browser LocalStorage is supported across 99.8% of modern web browsers.\n\n" +
                    "2.3.2 Economic Feasibility: Zero software licensing costs. The application uses open-source web tooling, the free tier of Google Gemini API, and free serverless deployment on Vercel.\n\n" +
                    "2.3.3 Operational Feasibility: Designed for zero-training operation with 1-click attendance buttons (Present, Absent, Cancelled, Undo), ensuring immediate student adoption.",
            }),
          ],
        }),

        // CHAPTER 3
        new Paragraph({
          pageBreakBefore: true,
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "CHAPTER 3\nSYSTEM DESIGN", bold: true })],
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "3.1 System Architecture" })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "AttendX follows a client-first decoupled architecture. The frontend handles interactive computations, visual charts, and state mutations entirely within the browser. The Next.js server route (/api/chat) acts as a secure, stateless proxy interfacing with the Google Gemini AI API, ensuring API keys remain strictly hidden from client inspection.",
            }),
          ],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "3.2 UML Diagrams (Use Case, Activity, Sequence)" })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "```mermaid\nflowchart TD\n    Student((Student))\n    UC1[Manage Subjects: Add/Edit/Delete]\n    UC2[Mark Daily Attendance: Present/Absent/Cancelled]\n    UC3[Perform Undo Last Action]\n    UC4[Calculate Bunk Capacity]\n    UC5[Calculate Recovery Classes Needed]\n    UC6[Simulate Future Attendance Scenarios]\n    UC7[Consult AI Assistant with Real Context]\n    UC8[Export / Import JSON Data]\n    \n    Student --> UC1\n    Student --> UC2\n    Student --> UC3\n    Student --> UC4\n    Student --> UC5\n    Student --> UC6\n    Student --> UC7\n    Student --> UC8\n```",
              font: "Consolas",
              size: 20,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100, after: 150 },
          children: [
            new TextRun({
              text: "Figure 3.2: UML Use Case Diagram illustrating student interactions with AttendX.",
              bold: true,
              font: "Garamond",
              size: 20,
            }),
          ],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "3.3 Data Flow Diagram (DFD Level 0 & Level 1)" })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "```mermaid\nflowchart LR\n    Student[Student User] <-->|Attendance Updates & Inquiries| AttendX(AttendX System)\n    AttendX <-->|Persistent JSON Records| Storage[(Browser LocalStorage)]\n    AttendX <-->|Context-Injected Query / AI Reply| Gemini[Google Gemini Flash API]\n```",
              font: "Consolas",
              size: 20,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100, after: 150 },
          children: [
            new TextRun({
              text: "Figure 3.4: Data Flow Diagram Level 0 illustrating system boundaries and external entity data flows.",
              bold: true,
              font: "Garamond",
              size: 20,
            }),
          ],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "3.4 ER Diagram & 3.5 Database Design" })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "AttendX persists data within browser LocalStorage using structured JSON schemas:\n\n" +
                    "1. Subject Entity: id (String, PK), name (String, Required), code (String), teacher (String), color (Hex), attended (Integer), total (Integer), target (Integer, 1-100), history (Array of AttendanceRecord).\n" +
                    "2. AttendanceRecord Entity: id (String, PK), date (YYYY-MM-DD), action (Enum: present | absent | cancelled), timestamp (Integer Unix ms).\n" +
                    "3. Settings Entity: globalTarget (Integer, default 75), theme (Enum: light | dark), notificationsEnabled (Boolean).\n" +
                    "4. ChatMessage Entity: id (String), role (user | assistant), content (String), isError (Boolean).",
            }),
          ],
        }),

        // CHAPTER 4
        new Paragraph({
          pageBreakBefore: true,
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "CHAPTER 4\nIMPLEMENTATION", bold: true })],
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "4.1 Tools & Technologies Used" })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "The AttendX architecture consists of:\n" +
                    "• Next.js 14 App Router: High-performance React framework with serverless API route handlers.\n" +
                    "• React 18: Enables declarative state management via custom hooks (useAttendanceData).\n" +
                    "• Tailwind CSS 3.4: Modern utility-first responsive styling with dark-mode class toggling.\n" +
                    "• Recharts 2.13: Composable SVG charting for subject bar charts and status distributions.\n" +
                    "• Google Gemini Flash API: Low-latency AI model providing natural language academic guidance.\n" +
                    "• Vercel: Zero-config CI/CD serverless edge hosting platform.",
            }),
          ],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "4.4 Algorithms / Logic Used" })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "All formulas are centralized in lib/attendanceCalculations.js:\n\n" +
                    "1. Current Attendance Percentage P:\n" +
                    "   P = (attended / total) * 100, where P = 0 when total = 0.\n\n" +
                    "2. Consecutive Required Classes x to Reach Target T%:\n" +
                    "   x = ceil((T * total - 100 * attended) / (100 - T)), minimum 0.\n" +
                    "   If T = 100 and attended < total, (100 - T) = 0, returning 'Mathematically Impossible'.\n\n" +
                    "3. Maximum Classes That Can Be Bunked b at Target T%:\n" +
                    "   b = floor((100 * attended / T) - total), minimum 0.\n\n" +
                    "4. Predicted Percentage After n Upcoming Classes with k Attended:\n" +
                    "   P_pred = ((attended + k) / (total + n)) * 100.",
            }),
          ],
        }),

        // CHAPTER 5
        new Paragraph({
          pageBreakBefore: true,
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "CHAPTER 5\nTESTING & RESULTS", bold: true })],
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "5.1 Test Plan & 5.2 Test Cases Table" })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100, after: 100 },
          children: [
            new TextRun({
              text: "Table 5.1: Functional and Mathematical Verification Test Suite",
              bold: true,
              font: "Garamond",
              size: 20,
            }),
          ],
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Test ID", bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Description", bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Test Inputs", bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Expected Result", bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Actual Result", bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Status", bold: true })] })] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "TC-01" })] }),
                new TableCell({ children: [new Paragraph({ text: "Percentage Calculation" })] }),
                new TableCell({ children: [new Paragraph({ text: "Attended: 18, Total: 25" })] }),
                new TableCell({ children: [new Paragraph({ text: "72.00%" })] }),
                new TableCell({ children: [new Paragraph({ text: "72.00%" })] }),
                new TableCell({ children: [new Paragraph({ text: "PASS" })] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "TC-02" })] }),
                new TableCell({ children: [new Paragraph({ text: "Recovery Classes Formula" })] }),
                new TableCell({ children: [new Paragraph({ text: "18/25, Target: 75%" })] }),
                new TableCell({ children: [new Paragraph({ text: "3 classes" })] }),
                new TableCell({ children: [new Paragraph({ text: "3 classes" })] }),
                new TableCell({ children: [new Paragraph({ text: "PASS" })] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "TC-03" })] }),
                new TableCell({ children: [new Paragraph({ text: "Bunk Capacity Calculation" })] }),
                new TableCell({ children: [new Paragraph({ text: "22/25, Target: 75%" })] }),
                new TableCell({ children: [new Paragraph({ text: "4 classes" })] }),
                new TableCell({ children: [new Paragraph({ text: "4 classes" })] }),
                new TableCell({ children: [new Paragraph({ text: "PASS" })] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "TC-04" })] }),
                new TableCell({ children: [new Paragraph({ text: "Edge Case: 100% Target" })] }),
                new TableCell({ children: [new Paragraph({ text: "9/10, Target: 100%" })] }),
                new TableCell({ children: [new Paragraph({ text: "Impossible flagged" })] }),
                new TableCell({ children: [new Paragraph({ text: "Impossible flagged" })] }),
                new TableCell({ children: [new Paragraph({ text: "PASS" })] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "TC-05" })] }),
                new TableCell({ children: [new Paragraph({ text: "Undo Last Action" })] }),
                new TableCell({ children: [new Paragraph({ text: "Undo last Present (+1)" })] }),
                new TableCell({ children: [new Paragraph({ text: "Attended & Total -1" })] }),
                new TableCell({ children: [new Paragraph({ text: "Reverted correctly" })] }),
                new TableCell({ children: [new Paragraph({ text: "PASS" })] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "TC-06" })] }),
                new TableCell({ children: [new Paragraph({ text: "Chatbot Rate Limiting" })] }),
                new TableCell({ children: [new Paragraph({ text: ">15 requests / min" })] }),
                new TableCell({ children: [new Paragraph({ text: "HTTP 429 Too Many Req" })] }),
                new TableCell({ children: [new Paragraph({ text: "HTTP 429 Returned" })] }),
                new TableCell({ children: [new Paragraph({ text: "PASS" })] }),
              ],
            }),
          ],
        }),

        // CHAPTER 6
        new Paragraph({
          pageBreakBefore: true,
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "CHAPTER 6\nCONCLUSION & FUTURE WORK", bold: true })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Summary of Project & Achievements:\n" +
                    "The development of AttendX: Smart Attendance Planner successfully proves that client-first architectures paired with secure serverless AI can solve the perennial problem of college attendance shortages and examination debarment. By providing real-time percentage tracking, verified bunk limits, consecutive recovery targets, and an intelligent Gemini AI assistant, AttendX empowers engineering students to maintain institutional compliance with mathematical certainty.\n\n" +
                    "Limitations:\n" +
                    "1. Manual Input Dependency: Requires the student to click Present, Absent, or Cancelled after lectures.\n" +
                    "2. LocalStorage Scope: Data resides within the local browser and does not automatically sync across devices without manual JSON export/import.\n\n" +
                    "Future Scope:\n" +
                    "1. Automated Timetable Synchronization: Uploading semester class routines to trigger automatic attendance prompts after scheduled lectures.\n" +
                    "2. Progressive Web App (PWA) Offline Notifications: Push alerts reminding students of early morning lectures when attendance borders the warning zone.\n" +
                    "3. University ERP Importer: Direct OCR scanning or ERP web scraping to import historical roll records automatically.",
            }),
          ],
        }),

        // BIBLIOGRAPHY / REFERENCES
        new Paragraph({
          pageBreakBefore: true,
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "BIBLIOGRAPHY / REFERENCES (IEEE STYLE)", bold: true })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "[1] Next.js Documentation, “App Router Architecture and Server Components,” Vercel Inc., 2024. [Online]. Available: https://nextjs.org/docs\n\n" +
                    "[2] React Documentation, “Custom Hooks and State Synchronization,” Meta Platforms Inc., 2024. [Online]. Available: https://react.dev\n\n" +
                    "[3] Google AI for Developers, “Gemini API Documentation and Model Capabilities,” Google LLC, 2024. [Online]. Available: https://ai.google.dev/docs\n\n" +
                    "[4] W3C Web Applications Working Group, “Web Storage (Second Edition),” World Wide Web Consortium, Recommendation, 2021. [Online]. Available: https://www.w3.org/TR/webstorage/\n\n" +
                    "[5] Tailwind Labs, “Tailwind CSS: Utility-First CSS Framework Specification,” 2024. [Online]. Available: https://tailwindcss.com/docs\n\n" +
                    "[6] Recharts Community, “Composable SVG Charting Library for React,” 2024. [Online]. Available: https://recharts.org\n\n" +
                    "[7] All India Council for Technical Education (AICTE), “Approval Process Handbook and Student Minimum Attendance Guidelines,” New Delhi, India, 2023.\n\n" +
                    "[8] JECRC University, “Academic Regulations and Examination Ordinances for Undergraduate Engineering Programs,” Jaipur, Rajasthan, 2024.\n\n" +
                    "[9] Vercel Inc., “Serverless Functions and Edge Runtime Deployment Guide,” 2024. [Online]. Available: https://vercel.com/docs\n\n" +
                    "[10] I. Sommerville, “Software Engineering,” 10th ed., London: Pearson Education, 2016.",
            }),
          ],
        }),

        // APPENDICES
        new Paragraph({
          pageBreakBefore: true,
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "APPENDIX A: USER MANUAL", bold: true })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "1. Getting Started: Open AttendX. On initial launch, 5 pre-configured engineering subjects (DSA, DBMS, OS, Computer Networks, and Discrete Mathematics) are pre-loaded.\n" +
                    "2. Tracking Attendance: Click 'Present' (+1 attended, +1 total), 'Absent' (+0 attended, +1 total), or 'Off' (Cancelled) on any subject card. Click 'Undo' to reverse the last action.\n" +
                    "3. Bunk Calculator: Navigate to 'Bunk Calc', select your subject or enter custom values, and review the safe bunk allowance and skip impact simulation table.\n" +
                    "4. Required Classes Calculator: Navigate to 'Required Calc' to see the exact consecutive classes needed to recover from a shortage.\n" +
                    "5. Consulting AttendX Assistant: Click the floating 'Ask AttendX AI' button or visit the dedicated /assistant page to ask questions evaluated against your live data.\n" +
                    "6. Backup & Export: Navigate to 'Settings' and click 'Export JSON Backup' to download your attendance file.",
            }),
          ],
        }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  const outputPath = path.join(process.cwd(), "AttendX_Major_Project_Report.docx");
  fs.writeFileSync(outputPath, buffer);
  console.log(`Designer-Grade Report successfully generated at: ${outputPath}`);
});
