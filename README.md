# AttendX: Smart Attendance Planner

> **Live Demo:** [https://attendx-smart-planner.vercel.app](https://attendx-smart-planner.vercel.app) *(Deploy link placeholder)*  
> **GitHub Repository:** [https://github.com/Aaryan-Raj21/attendx-smart-planner](https://github.com/Aaryan-Raj21/attendx-smart-planner) *(Repo link placeholder)*  
> **Academic Session:** B.Tech Computer Science & Engineering (2025-26) | JECRC University, Jaipur  

---

## 1. Project Overview & Problem Statement

In collegiate engineering education across India, university ordinances enforce a strict mandatory attendance rule requiring students to maintain at least **75% lecture and laboratory attendance** in each subject to be eligible to sit for semester end-term examinations.

### The Real-World Dilemma
1. **Passive ERP Portals:** University portals merely display historical, retrospective percentages (e.g. `68.2%`) without providing forward-looking recovery plans.
2. **Shortage Blindspots:** Students usually realize they have fallen below the mandatory 75% threshold in the last 2 weeks of the semester, when mathematical recovery is already impossible.
3. **Guesswork in Bunking:** Students have no easy way to compute their exact "bunk capacity" (how many classes can safely be skipped without violating compliance).

### The AttendX Solution
**AttendX: Smart Attendance Planner** is a high-performance, privacy-first web application built with **Next.js 14 App Router, React, Tailwind CSS, Recharts, and Google Gemini AI**. AttendX tracks subject-wise attendance, calculates exact allowable bunks, computes consecutive recovery lectures needed to fix shortages, models future attendance scenarios, and features an integrated AI Assistant ("AttendX Assistant") that provides personalized academic counsel using the student's real live data.

---

## 2. Key Features

- **Subject-Wise Tracking:** Add, edit, and delete courses with subject codes, instructor names, and custom color tags.
- **1-Click Attendance Buttons:** Interactive `Present (+1)`, `Absent (+0)`, `Class Cancelled (Off)`, and `Undo` actions.
- **Attendance Log History:** Chronological audit trail of all attendance events with dates and timestamps.
- **Bunk Capacity Calculator:** Computes the exact number of lectures a student can skip while staying at or above target percentage, with an interactive skip-impact simulation table.
- **Required Classes Calculator:** Formulates the minimum consecutive classes needed to recover from a shortage to reach 75%, automatically flagging impossible targets (e.g. 100% after absences).
- **Multi-Scenario Future Predictor (Pure Logic):** Models final semester attendance across three scenarios:
  - *Scenario A:* Attend 100% of remaining classes.
  - *Scenario B:* Attend 0% of remaining classes.
  - *Scenario C:* Custom planned attendance via an interactive slider.
- **Visual Analytics:** Subject-wise Recharts bar chart with a red target threshold reference line, plus a status distribution donut chart (Safe, Warning, Shortage).
- **AttendX Assistant (AI Chatbot):** Floating AI advisor powered by Google Gemini Flash API (`gemini-2.5-flash`), injected with real structured student attendance context via secure serverless API routes (`/api/chat`).
- **100% Client Privacy:** All attendance logs and records reside strictly within the browser's `localStorage`—no remote database, no passwords, zero personal data tracking.
- **Data Portability:** 1-click JSON backup export and import, plus instant "Load Sample Data" for immediate viva demonstrations.
- **Dark & Light Mode:** Seamless theme toggling with zero flash on reload.

---

## 3. Mathematical Formulas Explained

All calculations are encapsulated in `lib/attendanceCalculations.js` with zero floating-point approximation glitches:

### 1. Current Attendance Percentage
$$\text{Attendance } \% = \left(\frac{\text{attended}}{\text{total}}\right) \times 100 \quad (\text{returns } 0\% \text{ if total } = 0)$$

### 2. Consecutive Classes Needed $x$ to Reach Target $T\%$
$$x = \left\lceil \frac{T \times \text{total} - 100 \times \text{attended}}{100 - T} \right\rceil, \quad \min(0)$$
- **Edge Cases Handled:**
  - If current attendance $\% \ge T$, $x = 0$ (Target already satisfied).
  - If $T = 100$ and $\text{attended} < \text{total}$, the denominator $(100 - T) = 0$, making 100% mathematically impossible forever. The system flags this condition clearly.

### 3. Maximum Classes That Can Be Bunked $b$ at Target $T\%$
$$b = \left\lfloor \frac{100 \times \text{attended}}{T} - \text{total} \right\rfloor, \quad \min(0)$$
- If current attendance $\% < T$, $b = 0$ (Zero bunk capacity; student must attend upcoming classes).

### 4. Predicted Percentage After $n$ Future Classes With $k$ Attended
$$\text{Predicted } \% = \left(\frac{\text{attended} + k}{\text{total} + n}\right) \times 100$$

---

## 4. Technology Stack & Architectural Rationale

| Layer | Technology | Engineering Rationale |
|---|---|---|
| **Framework** | Next.js 14 (App Router) | File-based routing, instant static optimization, and zero-config serverless API routes. |
| **Language** | Modern JavaScript (ES2023) | Clean, readable, standard vanilla syntax easily explained in college viva examinations. |
| **Styling** | Tailwind CSS 3.4 | Rapid utility-first responsive styling, built-in dark mode (`class`), and smooth CSS transitions. |
| **Data Visualizations** | Recharts 2.13 | Composable SVG bar and donut charts optimized for responsive client dashboards. |
| **Icons** | Lucide React | Accessible, crisp feather-style SVG iconography. |
| **Data Storage** | Browser `localStorage` | Zero latency, offline accessibility, 100% privacy, and zero database maintenance costs. |
| **AI Integration** | Google Gemini API (`gemini-2.5-flash`) | Industry-leading sub-second inference speed, generous free tier, and strong reasoning capabilities. |
| **Deployment** | Vercel Serverless Platform | Native Next.js edge support, automatic HTTPS, and instant Git continuous deployment. |

---

## 5. AI Chatbot Integration Architecture

The chatbot is architected following the **Stateless Proxy with Context Injection** pattern:

```
[Student in Browser]
       │  (1) Asks question: "Can I skip tomorrow's DBMS class?"
       ▼
[Chatbot.jsx Client Component]
       │  (2) Extracts live subject records from LocalStorage
       ▼
[POST /api/chat] (Next.js Serverless Route)
       │  (3) Server-side Validation:
       │      - Validates and trims message (max 500 chars)
       │      - Enforces sliding-window IP rate limiting (15 req/min)
       │      - Injects student data into structured System Prompt
       │      - Enforces strict behavioral rules (accurate math, refuse off-topic)
       ▼
[Google Gemini 2.5 Flash REST API]
       │  (4) Evaluates question against real data and formula rules
       │  (5) Returns step-by-step arithmetic response
       ▼
[Next.js Server /api/chat]
       │  (6) Formats JSON payload: { reply: string }
       ▼
[Chatbot.jsx Client Bubble]
```

### Security & Privacy Highlights:
1. **API Key Isolation:** `process.env.GEMINI_API_KEY` is referenced solely on the server inside `app/api/chat/route.js`. The key is never bundled into client JavaScript.
2. **Rate Limiting:** Protects against abuse and quota exhaustion via an in-memory IP sliding-window mechanism.
3. **Prompt Injection Shield:** The system prompt contains explicit guardrails rejecting attempts to override formulas or engage in off-topic discussions.

---

## 6. Local Setup and Installation

### Prerequisites
- Node.js version 18.17+ or 20+ (Node v26 verified compatible)
- npm version 9+
- A free Google Gemini API Key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Aaryan-Raj21/attendx-smart-planner.git
   cd attendx-smart-planner
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

4. **Run the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Run the automated mathematical formula test suite:**
   ```bash
   node test-calculations.js
   ```

---

## 7. Vercel Deployment Guide

Deploying AttendX to Vercel takes under 3 minutes:

1. Push your repository to GitHub (`main` branch).
2. Log in to [Vercel](https://vercel.com) using your GitHub account.
3. Click **"Add New..."** → **"Project"** and import `attendx-smart-planner`.
4. Under **Framework Preset**, select **Next.js**.
5. Expand **Environment Variables** and add:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** `your_gemini_api_key`
6. Click **Deploy**. Vercel will build and assign a production URL (e.g., `https://attendx-smart-planner.vercel.app`).
7. Every future `git push origin main` triggers an automatic zero-downtime redeploy!

---

## 8. Troubleshooting

| Issue | Cause | Solution |
|---|---|---|
| Chatbot returns 503 error | `GEMINI_API_KEY` missing | Add your API key to `.env.local` locally or to Vercel Environment Variables. |
| Chatbot returns 429 error | Gemini API free quota exhausted or rate limit hit | Wait 30 seconds and retry; rate limiter permits 15 requests per minute. |
| Attendance data reset after incognito | LocalStorage is session-scoped in private tabs | Use regular browser windows or export your JSON backup from Settings. |
| Build error on custom Node version | Dependency cache desync | Delete `.next` and `node_modules`, then re-run `npm install && npm run build`. |

---

## 9. Academic Project Submission

- **Institution:** JECRC University, Jaipur (Department of Computer Science & Engineering)
- **Course:** B.Tech CSE (Session 2025-26)
- **Project Report:** Full IEEE-compliant Word document generated at `AttendX_Major_Project_Report.docx`.
- **License:** Open Source under the MIT License.
