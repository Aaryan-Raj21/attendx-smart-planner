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
  BorderStyle,
  Header,
  Footer,
  PageNumber,
  NumberFormat,
} from "docx";

console.log("Generating AttendX Academic Major Project Report (.docx)...");

const doc = new Document({
  styles: {
    default: {
      document: {
        run: {
          font: "Times New Roman",
          size: 24, // 12pt (half-points)
          color: "000000",
        },
        paragraph: {
          spacing: {
            line: 360, // 1.5 line spacing (240 is 1.0)
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
    // ----------------------------------------------------
    // SECTION 1: FRONT MATTER (ROMAN NUMERALS)
    // ----------------------------------------------------
    {
      properties: {
        page: {
          pageNumbers: {
            start: 1,
            formatType: NumberFormat.LOWER_ROMAN,
          },
          margin: {
            top: 1440, // 1 inch
            bottom: 1440,
            left: 2160, // 1.5 inch
            right: 1440, // 1 inch
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
          spacing: { before: 200, after: 200 },
          children: [
            new TextRun({
              text: "A MAJOR PROJECT REPORT",
              bold: true,
              size: 36, // 18pt
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100, after: 300 },
          children: [
            new TextRun({ text: "ON", bold: true, size: 24 }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100, after: 400 },
          children: [
            new TextRun({
              text: '"ATTENDX: SMART ATTENDANCE PLANNER"',
              bold: true,
              size: 36,
              color: "1e1b4b",
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 400 },
          children: [
            new TextRun({
              text: "Submitted in partial fulfillment of the requirements for the award of the degree of\nBACHELOR OF TECHNOLOGY\nin\nCOMPUTER SCIENCE AND ENGINEERING",
              bold: true,
              size: 24,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 300, after: 300 },
          children: [
            new TextRun({
              text: "[ UNIVERSITY LOGO PLACEHOLDER ]",
              bold: true,
              italics: true,
              size: 24,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 300, after: 200 },
          children: [
            new TextRun({ text: "SUBMITTED BY:", bold: true, size: 24 }),
            new TextRun({
              text: "\n[Name 1 (Reg. No.)]\n[Name 2 (Reg. No.)]\n[Name 3 (Reg. No.)]\n[Name 4 (Reg. No.)]",
              size: 24,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 300 },
          children: [
            new TextRun({ text: "UNDER THE SUPERVISION OF:", bold: true, size: 24 }),
            new TextRun({
              text: "\n[Name, Designation]\nProject Guide, Department of CSE",
              size: 24,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 400, after: 100 },
          children: [
            new TextRun({
              text: "DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING\nJECRC UNIVERSITY, JAIPUR\nSESSION: 2025-26",
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
          children: [new TextRun({ text: "CANDIDATES' DECLARATION", bold: true })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "We hereby declare that the work presented in this Major Project Report entitled \"AttendX: Smart Attendance Planner\" submitted towards the partial fulfillment of the requirements for the award of the degree of Bachelor of Technology in Computer Science and Engineering at JECRC University, Jaipur, is an authentic record of our own original work carried out under the supervision of [Name, Designation].",
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "We have not submitted the matter embodied in this report for the award of any other degree or diploma to any other University or Institute. All sources of assistance, mathematical formulas, and literature cited have been acknowledged.",
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 400, after: 200 },
          children: [
            new TextRun({ text: "Date: __________________\nPlace: Jaipur\n\n" }),
            new TextRun({ text: "Signatures of Students:\n" }),
            new TextRun({ text: "1. ________________________ [Name 1 (Reg. No.)]\n" }),
            new TextRun({ text: "2. ________________________ [Name 2 (Reg. No.)]\n" }),
            new TextRun({ text: "3. ________________________ [Name 3 (Reg. No.)]\n" }),
            new TextRun({ text: "4. ________________________ [Name 4 (Reg. No.)]\n\n\n" }),
            new TextRun({ text: "Countersigned by Guide: ________________________\n[Name, Designation], Department of CSE, JECRC University" }),
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
              text: "This is to certify that the project entitled \"AttendX: Smart Attendance Planner\" submitted by [Name 1 (Reg. No.)], [Name 2 (Reg. No.)], [Name 3 (Reg. No.)], and [Name 4 (Reg. No.)] in partial fulfillment of the requirements for the award of the degree of Bachelor of Technology in Computer Science and Engineering (Semester [e.g., III], Session: 2025-26) to JECRC University, Jaipur, is a record of bonafide project work carried out under my supervision and guidance.",
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "To the best of my knowledge, the matter embodied in this report has not been submitted to any other University / Institute for the award of any degree.",
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 500, after: 200 },
          children: [
            new TextRun({
              text: "_________________________\t\t_________________________\n[Name, Designation]\t\t\tHead of Department (CSE)\nProject Guide, Dept. of CSE\t\tJECRC University, Jaipur\n\n\n_________________________\nDean, Faculty of Engineering\nJECRC University, Jaipur",
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
              text: "We express our sincere gratitude and profound indebtedness to our project supervisor, [Name, Designation], Department of Computer Science and Engineering, JECRC University, Jaipur, for providing constant guidance, constructive suggestions, and patient mentoring throughout the design and development of \"AttendX: Smart Attendance Planner\".",
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "We extend our heartiest thanks to the Head of Department, Computer Science and Engineering, and Dean, Faculty of Engineering, JECRC University, for providing excellent departmental computational facilities and an encouraging academic environment.",
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Lastly, we thank our parents, peers, and fellow classmates for their unwavering support, valuable testing feedback, and continuous motivation during the preparation of this major project report.",
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 300, after: 100 },
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({
              text: "[Name 1]\n[Name 2]\n[Name 3]\n[Name 4]\nB.Tech CSE, JECRC University",
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
          spacing: { before: 240, after: 180 },
          children: [
            new TextRun({
              italics: true,
              text: "Maintaining mandatory minimum lecture attendance (typically 75%) is a universal requirement across collegiate engineering curricula in India, failing which students face debarment from semester examinations. Despite this critical regulation, existing college Enterprise Resource Planning (ERP) portals merely display retrospective raw percentages without actionable decision guidance, leaving students unaware of how many lectures they must attend consecutively to recover from shortages or how many lectures they can safely skip without violating compliance. To solve this problem, this project develops AttendX: Smart Attendance Planner, a client-first web architecture engineered using Next.js (App Router), React, Tailwind CSS, Recharts, and browser localStorage for zero-latency local data management. AttendX integrates a rigorous mathematical calculation engine computing subject-wise bunk limits, exact consecutive recovery counts, and multi-scenario future attendance projections without external database dependencies. Furthermore, AttendX incorporates a secure serverless AI Chatbot (\"AttendX Assistant\") powered by Google Gemini Flash API, employing context injection to deliver personalized mathematical recovery roadmaps while strictly guarding student privacy and API security. The resulting deployment provides students with real-time risk classification, interactive simulation tables, and reliable exam readiness planning.",
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Keywords: ",
              bold: true,
            }),
            new TextRun({
              text: "Attendance Tracking, Bunk Calculator, Attendance Prediction, Next.js App Router, Google Gemini AI, LocalStorage Persistence.",
            }),
          ],
        }),

        // TABLE OF CONTENTS (STRUCTURE SUMMARY)
        new Paragraph({
          pageBreakBefore: true,
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "TABLE OF CONTENTS", bold: true })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Declaration .......................................................................................................... ii\nCertificate .......................................................................................................... iii\nAcknowledgement ............................................................................................ iv\nAbstract ............................................................................................................... v\nList of Tables ..................................................................................................... vii\nList of Figures .................................................................................................... viii\nList of Abbreviations ....................................................................................... ix\n\nChapter 1: Introduction .................................................................................... 1\n  1.1 Background of the Study ........................................................................ 1\n  1.2 Problem Statement ................................................................................ 2\n  1.3 Objectives of the Project ........................................................................ 3\n  1.4 Scope of the Project ............................................................................... 4\n\nChapter 2: Literature Review and Comparative Analysis ............................ 6\n  2.1 Related Work and Existing Systems ....................................................... 6\n  2.2 Comparative Study Matrix ...................................................................... 8\n  2.3 Feasibility Study (Technical, Economic, Operational) ............................ 10\n\nChapter 3: System Design and Modeling ...................................................... 12\n  3.1 System Architecture .............................................................................. 12\n  3.2 UML Diagrams (Use Case, Activity, Sequence) .................................... 14\n  3.3 Data Flow Diagrams (Level 0 and Level 1) ............................................ 17\n  3.4 Entity-Relationship (ER) Modeling ....................................................... 19\n  3.5 Database & Data Schema Design ........................................................... 21\n\nChapter 4: Implementation and AI Integration ........................................... 23\n  4.1 Tools and Technologies Used ............................................................... 23\n  4.2 Hardware and Software Requirements ................................................. 26\n  4.3 Module-Wise Functional Description .................................................... 27\n  4.4 Core Algorithms and Calculation Logic ............................................... 30\n\nChapter 5: Testing and Performance Analysis ............................................ 33\n  5.1 Test Plan and Methodology ................................................................... 33\n  5.2 Comprehensive Test Cases (Table 5.1) .................................................. 34\n  5.3 System Screenshots and Visual Outputs .............................................. 37\n  5.4 Performance and Security Audit ........................................................... 38\n\nChapter 6: Conclusion and Future Scope ..................................................... 40\n  6.1 Summary of Project Achievements ....................................................... 40\n  6.2 Limitations of the System .................................................................... 41\n  6.3 Future Enhancements ............................................................................ 42\n\nReferences (IEEE Style) .................................................................................. 43\nAppendices (A: User Manual, B: Screenshots, C: Code Excerpts) ............ 46",
            }),
          ],
        }),
      ],
    },

    // ----------------------------------------------------
    // SECTION 2: CHAPTERS 1 TO 6 & APPENDICES (ARABIC 1, 2, 3...)
    // ----------------------------------------------------
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
                  text: "AttendX: Smart Attendance Planner | JECRC University",
                  size: 18, // 9pt
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
              text: "In contemporary collegiate education, particularly within Bachelor of Technology (B.Tech) engineering programs governed by statutory bodies such as the All India Council for Technical Education (AICTE) and individual state university ordinances, mandatory classroom attendance forms an integral prerequisite for semester examination eligibility. Most higher technical institutions enforce a strict threshold requiring students to maintain at least 75% attendance in theory lectures and laboratory sessions across each registered subject course.",
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Regular attendance is correlated with academic excellence, experiential laboratory competency, and peer engagement. However, undergraduates frequently balance heavy coursework with competitive technical coding contests, industrial internships, illness, and extracurricular collegiate festivals. Because college attendance is cumulative, missing even a modest cluster of consecutive classes early in the semester causes a precipitous percentage drop that compounds as the final examination approaches.",
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
              text: "While institutional Enterprise Resource Planning (ERP) software and manual classroom roll registers record presence and absence, they suffer from significant usability and analytical limitations:",
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "1. Passive Retrospection: Traditional ERP portals merely present retrospective percentages (e.g., \"68.2%\") without indicating forward-looking remediation steps.\n2. Lack of Decision Guidance: Students are unable to quickly determine how many upcoming lectures they may safely skip (\"bunk capacity\") without breaching the 75% threshold.\n3. Delayed Awareness: Students typically realize attendance shortages at the semester's end when recovery is mathematically impossible, leading to debarment and academic distress.\n4. Cumbersome Accessibility: University portals frequently experience server downtime during exam weeks, require repetitive multi-factor logins, and do not provide predictive simulation capabilities.",
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
              text: "The primary objectives of \"AttendX: Smart Attendance Planner\" are:",
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "1. To formulate and implement a precise mathematical calculation engine that computes real-time attendance percentage, bunk allowance, consecutive recovery classes, and future scenario projections.\n2. To architect a zero-latency, privacy-centric user interface utilizing browser localStorage, eliminating mandatory cloud logins and third-party database vulnerabilities.\n3. To construct an intelligent academic conversational assistant (\"AttendX Assistant\") powered by Google Gemini AI that synthesizes the student's real attendance statistics and generates actionable recovery advice.\n4. To provide visual risk classification (Safe, Warning, Shortage) through interactive Recharts analytics and immediate notification banners.\n5. To facilitate complete data portability via JSON backup export and import mechanisms.",
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
              text: "The scope of AttendX encompasses all standard undergraduate academic programs where minimum attendance thresholds are enforced. It provides subject-wise customization, allowing students to set independent target percentages (e.g., 85% for scholarship courses or 75% standard). The system is fully responsive across desktop, tablet, and mobile browsers, ensuring immediate classroom utility.",
            }),
          ],
        }),

        // CHAPTER 2
        new Paragraph({
          pageBreakBefore: true,
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "CHAPTER 2\nLITERATURE REVIEW AND COMPARATIVE ANALYSIS", bold: true })],
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "2.1 Related Work and Existing Systems" })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Prior attendance tracking paradigms fall into three primary categories: Institutional ERP Systems, Generic Spreadsheet Templates, and Basic Mobile Trackers. Research in educational human-computer interaction demonstrates that while ERP platforms fulfill administrative auditing needs, they fail as personal decision-support systems due to lack of predictive algorithms.",
            }),
          ],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "2.2 Comparative Study Matrix" })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Table 2.1 summarizes the architectural and functional distinctions between AttendX and existing solutions:",
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 100, after: 100 },
          children: [
            new TextRun({
              text: "Table 2.1: Comparative Feature Evaluation Matrix",
              bold: true,
              font: "Garamond",
              size: 20,
            }),
          ],
        }),
        // TABLE COMPARISON
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Feature / Capability", bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "College ERP Portal", bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Excel / Sheets", bold: true })] })] }),
                new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "AttendX Planner", bold: true })] })] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "Bunk Capacity Calculator" })] }),
                new TableCell({ children: [new Paragraph({ text: "No (Static only)" })] }),
                new TableCell({ children: [new Paragraph({ text: "Requires manual formula" })] }),
                new TableCell({ children: [new Paragraph({ text: "Yes (Automatic exact math)" })] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "Consecutive Recovery Math" })] }),
                new TableCell({ children: [new Paragraph({ text: "No" })] }),
                new TableCell({ children: [new Paragraph({ text: "Complex formula setup" })] }),
                new TableCell({ children: [new Paragraph({ text: "Yes (With proof display)" })] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "AI Context-Aware Chatbot" })] }),
                new TableCell({ children: [new Paragraph({ text: "No" })] }),
                new TableCell({ children: [new Paragraph({ text: "No" })] }),
                new TableCell({ children: [new Paragraph({ text: "Yes (Google Gemini API)" })] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "Client Storage & Privacy" })] }),
                new TableCell({ children: [new Paragraph({ text: "Central Server Logins" })] }),
                new TableCell({ children: [new Paragraph({ text: "Cloud / Local File" })] }),
                new TableCell({ children: [new Paragraph({ text: "100% LocalStorage Private" })] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "Scenario Prediction" })] }),
                new TableCell({ children: [new Paragraph({ text: "No" })] }),
                new TableCell({ children: [new Paragraph({ text: "Manual table creation" })] }),
                new TableCell({ children: [new Paragraph({ text: "Yes (3-Scenario Engine)" })] }),
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
              text: "2.3.1 Technical Feasibility: The project utilizes Next.js 14 App Router, React 18, and modern CSS via Tailwind. Browser localStorage is universally supported across 99.8% of web browsers without requiring backend servers.\n\n2.3.2 Economic Feasibility: Zero software licensing costs. Next.js is open-source, Google Gemini Flash API provides a generous free tier for academic projects, and Vercel offers free static/serverless hosting.\n\n2.3.3 Operational Feasibility: Designed with an intuitive zero-training interface featuring 1-click attendance buttons (Present, Absent, Cancelled, Undo), ensuring immediate student adoption.",
            }),
          ],
        }),

        // CHAPTER 3
        new Paragraph({
          pageBreakBefore: true,
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "CHAPTER 3\nSYSTEM DESIGN AND MODELING", bold: true })],
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
          children: [new TextRun({ text: "3.2 UML Diagrams (Mermaid Code Representation)" })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Figure 3.1: Use Case Diagram for AttendX\n```mermaid\nflowchart TD\n    Student((Student))\n    UC1[Manage Subjects: Add/Edit/Delete]\n    UC2[Mark Daily Attendance: Present/Absent/Cancelled]\n    UC3[Perform Undo Last Action]\n    UC4[Calculate Bunk Capacity]\n    UC5[Calculate Recovery Classes Needed]\n    UC6[Simulate Future Attendance Scenarios]\n    UC7[Consult AI Assistant with Real Context]\n    UC8[Export / Import JSON Data]\n    \n    Student --> UC1\n    Student --> UC2\n    Student --> UC3\n    Student --> UC4\n    Student --> UC5\n    Student --> UC6\n    Student --> UC7\n    Student --> UC8\n```",
              font: "Consolas",
              size: 20,
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 100, after: 150 },
          children: [
            new TextRun({
              text: "Figure 3.1: UML Use Case Diagram illustrating the functional interactions available to the student.",
              bold: true,
              font: "Garamond",
              size: 20,
            }),
          ],
        }),

        new Paragraph({
          children: [
            new TextRun({
              text: "Figure 3.2: AI Chatbot Sequence Diagram\n```mermaid\nsequenceDiagram\n    autonumber\n    actor Student\n    participant Browser as Client UI (Chatbot.jsx)\n    participant Storage as Browser LocalStorage\n    participant Route as Next.js API (/api/chat)\n    participant Gemini as Google Gemini 2.5 Flash API\n\n    Student->>Browser: Enters question e.g. 'Can I skip DBMS?'\n    Browser->>Storage: Retrieve current subject metrics\n    Storage-->>Browser: Subject records (attended, total, target)\n    Browser->>Route: POST /api/chat (message, history, attendanceSummary)\n    Note over Route: Validate input (<500 chars), rate limit IP\n    Route->>Route: Build System Prompt (Role + Context + Rules)\n    Route->>Gemini: POST generateContent (REST payload + Server API Key)\n    Gemini-->>Route: Generated AI Advice with step math\n    Route-->>Browser: JSON response { reply: string }\n    Browser-->>Student: Renders formatted message bubble\n```",
              font: "Consolas",
              size: 20,
            }),
          ],
        }),
        new Paragraph({
          spacing: { before: 100, after: 150 },
          children: [
            new TextRun({
              text: "Figure 3.2: UML Sequence Diagram depicting the secure token handling and context injection flow of AttendX Assistant.",
              bold: true,
              font: "Garamond",
              size: 20,
            }),
          ],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "3.4 Entity-Relationship (ER) Modeling and Data Schema" })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Although AttendX operates without an SQL relational database, the data layer follows a structured schema stored under distinct localStorage keys:",
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "1. Subject Entity: id (String, PK), name (String, Required), code (String), teacher (String), color (Hex string), attended (Integer >= 0), total (Integer >= attended), target (Integer 1-100), history (Array of AttendanceRecord).\n2. AttendanceRecord Entity: id (String, PK), date (YYYY-MM-DD), action (Enum: present | absent | cancelled), timestamp (Integer Unix ms).\n3. Settings Entity: globalTarget (Integer, default 75), theme (Enum: light | dark), notificationsEnabled (Boolean).\n4. ChatMessage Entity: id (String), role (user | assistant), content (String <= 500 chars), isError (Boolean).",
            }),
          ],
        }),

        // CHAPTER 4
        new Paragraph({
          pageBreakBefore: true,
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "CHAPTER 4\nIMPLEMENTATION AND AI INTEGRATION", bold: true })],
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "4.1 Tools and Technologies Used" })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "The AttendX software stack was selected for maximum execution performance, rapid responsiveness, and clean pedagogical code structure:\n- Next.js 14 (App Router): Provides file-system routing, fast server rendering, and zero-configuration API endpoints.\n- React 18: Enables declarative state-driven UI updates with custom hooks.\n- Tailwind CSS: Modern utility-first responsive styling with dark-mode class toggling.\n- Recharts: High-performance SVG charts for subject bar charts and status donut distributions.\n- Lucide React: Accessible, lightweight SVG icon library.\n- Google Gemini API: Industry-leading low-latency Flash model providing academic advisory synthesis.",
            }),
          ],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "4.4 Core Algorithms and Calculation Logic" })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "All calculations in AttendX are centralized in lib/attendanceCalculations.js. The key formulas include:\n\n1. Attendance Percentage P:\n   P = (attended / total) * 100, where P = 0 when total = 0.\n\n2. Consecutive Required Classes x to Reach Target T%:\n   x = ceil((T * total - 100 * attended) / (100 - T)), clamped to min 0.\n   When T = 100 and attended < total, the system detects division by zero and flags 100% as mathematically impossible.\n\n3. Maximum Classes that can be Bunked b at Target T%:\n   b = floor((100 * attended / T) - total), clamped to min 0.\n\n4. Predicted Percentage after n Future Classes with k Attended:\n   P_pred = ((attended + k) / (total + n)) * 100.",
            }),
          ],
        }),

        // CHAPTER 5
        new Paragraph({
          pageBreakBefore: true,
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "CHAPTER 5\nTESTING AND RESULTS", bold: true })],
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "5.1 Test Plan and Methodology" })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "A rigorous test plan was formulated combining automated mathematical unit test assertions, manual user-interface verification, edge-case validation (such as 0 classes held, 100% target after absence, and negative numbers), and server-side rate limiting checks.",
            }),
          ],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "5.2 Test Cases Table" })],
        }),
        new Paragraph({
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
                new TableCell({ children: [new Paragraph({ text: "Zero Classes Initial State" })] }),
                new TableCell({ children: [new Paragraph({ text: "0 attended, 0 held" })] }),
                new TableCell({ children: [new Paragraph({ text: "0.00%, no crash" })] }),
                new TableCell({ children: [new Paragraph({ text: "0.00%, no crash" })] }),
                new TableCell({ children: [new Paragraph({ text: "PASS" })] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "TC-06" })] }),
                new TableCell({ children: [new Paragraph({ text: "Undo Attendance Action" })] }),
                new TableCell({ children: [new Paragraph({ text: "Undo last Present (+1)" })] }),
                new TableCell({ children: [new Paragraph({ text: "Attended & Total -1" })] }),
                new TableCell({ children: [new Paragraph({ text: "Reverted correctly" })] }),
                new TableCell({ children: [new Paragraph({ text: "PASS" })] }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({ children: [new Paragraph({ text: "TC-07" })] }),
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
          children: [new TextRun({ text: "CHAPTER 6\nCONCLUSION AND FUTURE SCOPE", bold: true })],
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "6.1 Summary of Project Achievements" })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "The development of \"AttendX: Smart Attendance Planner\" successfully demonstrates that client-first architectures combined with secure serverless AI integrations can solve the perennial problem of college attendance debarment. By replacing passive retrospective statistics with exact mathematical bunk calculations, consecutive recovery targets, multi-scenario predictions, and context-aware Gemini AI advisory, AttendX empowers undergraduate students to maintain strict compliance with institutional examination ordinances.",
            }),
          ],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "6.2 Limitations of the System" })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "1. Device LocalStorage Scope: Because data resides in the browser, students must use the JSON Export/Import feature when moving between a desktop laptop and a personal mobile phone.\n2. Manual Logging: Daily lecture attendance is logged via manual button clicks rather than automated timetable biometric sync.",
            }),
          ],
        }),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "6.3 Future Scope" })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "Future iterations may incorporate:\n1. Timetable Automation: Uploading semester class routines to automatically prompt attendance logging after each scheduled lecture.\n2. Progressive Web App (PWA) Offline Notifications: Push alerts reminding students of early morning lectures when attendance is bordering the warning zone.\n3. University ERP Importer: One-click scraper importing existing historical roll records directly into AttendX.",
            }),
          ],
        }),

        // REFERENCES (IEEE STYLE)
        new Paragraph({
          pageBreakBefore: true,
          alignment: AlignmentType.CENTER,
          heading: HeadingLevel.HEADING_1,
          children: [new TextRun({ text: "REFERENCES (IEEE STYLE)", bold: true })],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: "[1] Next.js Documentation, \"App Router Architecture and Server Components,\" Vercel Inc., 2024. [Online]. Available: https://nextjs.org/docs\n\n[2] React Documentation, \"Custom Hooks and State Synchronization,\" Meta Platforms Inc., 2024. [Online]. Available: https://react.dev\n\n[3] Google AI for Developers, \"Gemini API Documentation and Model Capabilities,\" Google LLC, 2024. [Online]. Available: https://ai.google.dev/docs\n\n[4] W3C Web Applications Working Group, \"Web Storage (Second Edition),\" World Wide Web Consortium, Recommendation, 2021. [Online]. Available: https://www.w3.org/TR/webstorage/\n\n[5] M. Fowler, \"Refactoring: Improving the Design of Existing Code,\" 2nd ed., Boston, MA: Addison-Wesley, 2018.\n\n[6] Tailwind Labs, \"Tailwind CSS: Utility-First CSS Framework Specification,\" 2024. [Online]. Available: https://tailwindcss.com/docs\n\n[7] Recharts Community, \"Composable SVG Charting Library for React,\" 2024. [Online]. Available: https://recharts.org\n\n[8] All India Council for Technical Education (AICTE), \"Approval Process Handbook and Student Minimum Attendance Guidelines,\" New Delhi, India, 2023.\n\n[9] JECRC University, \"Academic Regulations and Examination Ordinances for Undergraduate Engineering Programs,\" Jaipur, Rajasthan, 2024.\n\n[10] Vercel Inc., \"Serverless Functions and Edge Runtime Deployment Guide,\" 2024. [Online]. Available: https://vercel.com/docs\n\n[11] GitHub Documentation, \"Git Version Control and Collaborative Workflow Guide,\" GitHub Inc., 2024. [Online]. Available: https://docs.github.com\n\n[12] I. Sommerville, \"Software Engineering,\" 10th ed., London: Pearson Education, 2016.",
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
              text: "1. Getting Started: Open the AttendX website. On initial launch, 5 pre-configured engineering subjects (DSA, DBMS, OS, Computer Networks, and Discrete Mathematics) are pre-loaded to demonstrate all features immediately.\n2. Tracking Attendance: Click 'Present' (+1 attended, +1 total), 'Absent' (+0 attended, +1 total), or 'Off' (Cancelled) on any subject card. Click 'Undo' to reverse the last action.\n3. Using the Bunk Calculator: Navigate to 'Bunk Calc', select your subject or enter custom values, and review the safe bunk allowance and skip impact simulation table.\n4. Using the Required Classes Calculator: Navigate to 'Required Calc' to see the exact consecutive classes needed to recover from a shortage.\n5. Consulting AttendX Assistant: Click the floating 'Ask AttendX AI' button at the bottom-right corner of any page. Ask questions like \"Can I skip tomorrow's class?\" or \"Make a plan to reach 75%\". The AI will answer using your real data!\n6. Backup & Export: Navigate to 'Settings' and click 'Export JSON Backup' to download your attendance file.",
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
  console.log(`Report successfully written to: ${outputPath}`);
});
