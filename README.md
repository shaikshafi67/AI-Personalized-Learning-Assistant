# AI-Powered Personalized Learning Assistant Using Generative AI and Large Language Models (LLMs)

A full-stack web application that acts as a personal academic tutor — powered by Anthropic's Claude LLM — offering
personalized explanations, Q&A, summaries, quizzes, study plans, flashcards, and exam-answer generation.

**Student:** Shaik Shafi
**Roll Number:** 92410133016
**Batch:** 7EK2

---

## 1. Project Overview

This project demonstrates the practical application of Generative AI / LLMs in education. Students interact with an
AI tutor that adapts its tone, depth, and structure based on the subject, the student's learning level
(Beginner/Intermediate/Advanced), and a chosen response style (Simple, Detailed, Exam Prep, With Examples,
Step-by-Step, Interview Prep).

### Architecture

```
Browser (React SPA)  --->  Express REST API  --->  Anthropic Claude API
      |                          |
   localStorage              MongoDB (optional, graceful fallback)
```

- The **frontend** (React + Vite + Tailwind) never talks to Claude directly — all AI calls go through the backend.
- The **backend** (Node.js + Express) owns the `ANTHROPIC_API_KEY` and Mongo connection. It exposes a clean REST API
  under `/api/*`.
- If `ANTHROPIC_API_KEY` is missing, the backend automatically serves realistic **Demo Mode** content so the whole
  app remains fully functional and demoable.
- If `MONGO_URI` is missing or unreachable, the backend logs a warning and keeps running using in-memory/demo data —
  it never crashes.

---

## 2. Folder Structure

```
AI-Personalized-Learning-Assistant/
├── frontend/                 React + Vite + Tailwind SPA
│   ├── src/
│   │   ├── components/       Sidebar, Navbar, ChatBubble, Card, LoadingSpinner, ThemeToggle, DemoBadge, MarkdownRenderer, Layout
│   │   ├── pages/             Landing, Dashboard, AIAssistant, Summarizer, QuizGenerator, StudyPlanner, Flashcards,
│   │   │                      ExamAnswerGenerator, Progress, Settings, AboutProject, Subjects
│   │   ├── services/           api.js — axios wrapper for all backend calls
│   │   ├── hooks/                useDemoMode.js — polls /api/health
│   │   ├── context/               ThemeContext, UserContext
│   │   └── App.jsx, main.jsx, index.css
│   └── package.json
├── backend/                  Node.js + Express API
│   ├── controllers/          aiController, chatController, quizController, userController, progressController
│   ├── routes/                 Route files matching each controller
│   ├── services/                 claudeService.js (Anthropic SDK wrapper), demoContent.js (fallback content),
│   │                              promptTemplates.js (per-feature prompts)
│   ├── models/                    User, ChatHistory, Quiz, Progress (Mongoose schemas)
│   ├── middleware/                errorHandler, rateLimiter, validateInput
│   └── server.js
├── .env.example               Documents every environment variable used in the project
└── README.md
```

---

## 3. Features

1. **AI Assistant (Chat)** — subject/level/style-aware Q&A with chat history, copy, regenerate, and clear.
2. **Explain Topic** — structured deep-dive: Definition, Working, Types, Example, Diagram explanation, Pros/Cons, Exam points.
3. **Summarizer** — paste study material, get a short summary, key points, definitions, formulas, and exam points.
4. **Quiz Generator** — auto-generated MCQs with difficulty control, interactive quiz-taking, instant scoring, and explanations.
5. **Study Plan Generator** — day-by-day plan based on subject, topics, available hours, days, exam date, and level.
6. **Flashcards** — flip-card UI with Next/Previous navigation and "Mark as difficult / learned" (persisted in localStorage).
7. **Exam Answer Generator** — model answers scaled to marks (2/4/6/8/10).
8. **Dashboard** — welcome banner, quick actions, study streak, quiz performance, recent topics, recommendations.
9. **Progress** — CSS bar-chart visualization of quiz scores, topics studied, streak, completed topics.
10. **Settings** — theme toggle, editable student profile, live system/demo-mode status.
11. **About Project** — objectives, technologies, and applications for evaluators.

All pages are fully responsive and support **light/dark mode** (persisted to `localStorage`).

---

## 4. Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- (Optional) MongoDB running locally or a MongoDB Atlas connection string
- (Optional) An Anthropic API key for live AI responses — the app works fully without one (Demo Mode)

### 4.1 Backend Setup

```bash
cd backend
npm install
cp .env.example .env    # then edit backend/.env as needed
npm run dev              # starts on http://localhost:5000 (nodemon)
# or: npm start
```

### 4.2 Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env    # optional — defaults already point to localhost:5000
npm run dev               # starts on http://localhost:5173
```

Open **http://localhost:5173** in your browser. The Navbar/Landing page will show a **"Demo Mode Active"** badge if
no Anthropic API key is configured, or **"Live AI Connected"** if it is.

---

## 5. Environment Variables

See the root [`.env.example`](./.env.example) for the full documented list. Summary:

| Variable | Location | Purpose |
|---|---|---|
| `ANTHROPIC_API_KEY` | `backend/.env` | Claude API key. Empty → Demo Mode. |
| `MONGO_URI` | `backend/.env` | MongoDB connection string. Empty/unreachable → runs without DB. |
| `PORT` | `backend/.env` | Backend port (default 5000). |
| `CLIENT_ORIGIN` | `backend/.env` | Allowed CORS origin (default `http://localhost:5173`). |
| `VITE_API_BASE_URL` | `frontend/.env` | Backend API base URL used by the frontend (default `http://localhost:5000/api`). |

### How to get an Anthropic API key
1. Go to https://console.anthropic.com/
2. Sign up / log in, and create an API key under **API Keys**.
3. Paste it into `backend/.env` as `ANTHROPIC_API_KEY=sk-ant-...`
4. Restart the backend (`npm run dev`). The health badge will switch to "Live AI Connected".

> The app was built and verified **without** a real API key — every AI feature works end-to-end via Demo Mode.

### MongoDB Setup (optional)
The app runs perfectly without MongoDB using in-memory/demo data. To persist chat history, quizzes, and progress:
1. Install MongoDB locally or create a free cluster on MongoDB Atlas.
2. Set `MONGO_URI` in `backend/.env` (e.g. `mongodb://localhost:27017/ai-learning-assistant`).
3. Restart the backend — you'll see `[DB] MongoDB connected successfully.` in the logs.

---

## 6. Sample Test Inputs (great for a live demo)

- **AI Assistant:** "What is a candidate key in DBMS?"
- **AI Assistant:** "Explain Deadlock in Operating System"
- **Explain Topic:** "Normalization" (Subject: DBMS)
- **Summarizer** sample paragraph:
  > "A relational database organizes data into tables consisting of rows and columns. Each table represents an
  > entity, and each row represents a record. Primary keys uniquely identify each row, while foreign keys create
  > relationships between tables. Normalization is used to reduce redundancy by splitting large tables into smaller
  > related ones."
- **Quiz Generator:** Subject = DBMS, Topic = Normalization, Difficulty = Medium, Questions = 5
- **Study Planner:** Subject = DBMS, Topics = "Normalization, Transactions, Indexing", Hours/day = 2, Days = 7
- **Flashcards:** Subject = Operating Systems, Topic = Deadlock, Count = 6
- **Exam Answer Generator:** "Explain the concept of Deadlock in Operating Systems", Marks = 8

The Demo Mode content for **DBMS Normalization** and **OS Deadlock** is hand-written and fully fleshed out — use
these two topics to show the richest possible offline demo.

---

## 7. Security Notes

- The Anthropic API key lives only in `backend/.env` and is **never** sent to the frontend or exposed in any API
  response.
- `.env` files are excluded via `.gitignore`.
- `express-rate-limit` protects all `/api/ai/*` endpoints (20 requests/minute/IP) and general routes (100/minute/IP).
- All POST bodies are validated (`middleware/validateInput.js`) — empty/invalid required fields return a clean `400`
  JSON error.
- A centralized error handler (`middleware/errorHandler.js`) returns clean JSON errors and never leaks stack traces.

---

## 8. Viva / Demo Talking Points

Use these points when presenting to evaluators:

1. **Prompt Engineering:** `backend/services/promptTemplates.js` shows per-feature prompt templates that inject
   subject, learning level, response style, topic, and marks into the system/user prompt — demonstrating structured
   prompt design rather than naive question-passing.
2. **System Prompt / Persona Design:** `backend/services/claudeService.js` defines a consistent tutor persona
   (`SYSTEM_PROMPT`) that adapts tone and depth to the learner — a core GenAI personalization technique.
3. **LLM API Integration:** Real integration with Anthropic's Messages API via `@anthropic-ai/sdk`, including
   structured JSON output requests (for quizzes, flashcards, study plans) and safe JSON parsing with fallback.
4. **Personalization:** Subject + learning level + response style selectors directly change the prompt sent to the
   LLM, producing genuinely different outputs for the same question.
5. **Graceful Degradation / Demo Mode:** The system is designed to **never fail** — if the API key or DB is missing,
   it falls back to curated realistic content, which is itself a resilience/production-readiness pattern.
6. **RAG-readiness:** The Summarizer feature (paste-your-own-material) is structurally the first step toward
   Retrieval-Augmented Generation — the next iteration would embed/retrieve chunks and feed them into the same
   prompt pipeline used here.
7. **Security by Design:** API key never reaches the client; rate limiting and input validation protect the AI
   endpoints from abuse/cost overruns — an important real-world LLM-app concern.
8. **Full-Stack Engineering:** Clean separation of concerns (controllers/services/routes/models), RESTful API
   design, and a component-driven, accessible, responsive UI with dark mode.

---

## 9. Known Limitations

- The project was built and tested **without a real Anthropic API key** — live Claude responses have not been
  verified end-to-end (only Demo Mode responses have been tested). Once a valid key is added to `backend/.env`, live
  mode should work as designed, but please test it before a live evaluator demo if possible.
- MongoDB is optional and was not required to be running during development; the app was verified end-to-end with
  no database connected (all endpoints functional using demo/session data).
- Quiz/flashcard/study-plan JSON parsing from the live LLM includes a fallback to demo content if the model ever
  returns malformed JSON — this adds robustness but means a live response could occasionally fall back to demo
  content in rare edge cases.

---

## 10. Running Both Servers

```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

Then visit **http://localhost:5173**.
