import React from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  FileText,
  Layers,
  CalendarDays,
  GraduationCap,
  BarChart3,
  BookOpen,
  Sparkles,
  ArrowRight,
  Check,
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import DemoBadge from '../components/DemoBadge';

const features = [
  { icon: MessageSquare, title: 'AI Assistant', desc: 'Ask any academic question and get personalized, adaptive explanations instantly.' },
  { icon: BookOpen, title: 'Explain Topic', desc: 'Deep-dive explanations covering definitions, working, types, and exam points.' },
  { icon: FileText, title: 'Summarizer', desc: 'Paste study material and get concise summaries with key points and definitions.' },
  { icon: Layers, title: 'Quiz Generator', desc: 'Auto-generate MCQ quizzes with instant scoring and detailed explanations.' },
  { icon: CalendarDays, title: 'Study Planner', desc: 'Get a day-by-day personalized study plan built around your exam date.' },
  { icon: GraduationCap, title: 'Exam Answer Generator', desc: 'Generate model answers scaled precisely to the marks allotted.' },
];

const steps = [
  { n: '01', title: 'Choose Your Feature', desc: 'Pick from Chat, Summarizer, Quiz, Study Plan, Flashcards, or Exam Answers.' },
  { n: '02', title: 'Personalize It', desc: 'Select your subject, learning level, and preferred response style.' },
  { n: '03', title: 'Let AI Generate', desc: 'Gemini LLM crafts a tailored, structured academic response in seconds.' },
  { n: '04', title: 'Track Your Progress', desc: 'Review your streak, quiz scores, and completed topics on your dashboard.' },
];

const techStack = ['React 18', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Gemini AI (Google)'];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-950/80 backdrop-blur border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-white font-bold">
              AI
            </div>
            <span className="font-bold text-lg">LearnAI</span>
          </div>
          <div className="flex items-center gap-3">
            <DemoBadge />
            <ThemeToggle />
            <Link to="/dashboard" className="btn-primary !px-4 !py-2 text-sm">
              Launch App <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-purple-50 dark:from-brand-950 dark:via-gray-950 dark:to-purple-950" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-300/30 dark:bg-brand-700/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-300/30 dark:bg-purple-700/20 rounded-full blur-3xl" />
        <div className="relative max-w-5xl mx-auto px-5 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 text-sm font-medium mb-6">
            <Sparkles size={14} /> Powered by Generative AI &amp; LLMs
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Your Personal <span className="bg-gradient-to-r from-brand-600 to-purple-600 bg-clip-text text-transparent">AI Learning</span> Assistant
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Personalized explanations, instant quizzes, smart summaries, study plans, flashcards, and exam-ready
            answers — all tailored to your subject and learning level using Gemini AI.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard" className="btn-primary text-base">
              Start Learning <ArrowRight size={18} />
            </Link>
            <Link to="/assistant" className="btn-secondary text-base">
              <MessageSquare size={18} /> Ask AI
            </Link>
          </div>
          <p className="mt-6 text-xs text-gray-400">No sign-up required · Fully demoable without an API key</p>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Everything you need to learn smarter</h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400">Seven powerful AI-driven tools in one platform.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="card p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-300 flex items-center justify-center mb-4">
                <Icon size={22} />
              </div>
              <h3 className="font-semibold text-lg mb-1.5">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 dark:bg-gray-900/40 py-20">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400">From question to mastery in four simple steps.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="relative card p-6">
                <span className="text-4xl font-extrabold text-brand-100 dark:text-brand-900/60">{s.n}</span>
                <h3 className="font-semibold text-lg mt-2 mb-1.5">{s.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Built for real academic outcomes</h2>
            <ul className="space-y-4">
              {[
                'Personalized to your subject, level, and preferred learning style',
                'Exam-oriented answers structured exactly how evaluators expect',
                'Instant feedback via auto-graded quizzes and explanations',
                'Structured study plans that adapt to your available time',
                'Works fully offline from real AI cost — built-in Demo Mode',
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Check size={13} />
                  </div>
                  <span className="text-gray-600 dark:text-gray-300">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-8 bg-gradient-to-br from-brand-600 to-purple-600 text-white">
            <BarChart3 size={32} className="mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-2">Track your growth</h3>
            <p className="text-brand-100 mb-6">
              Study streaks, quiz performance, and completed topics — all visualized on your personal dashboard.
            </p>
            <Link to="/progress" className="inline-flex items-center gap-2 bg-white text-brand-700 px-4 py-2 rounded-xl font-medium text-sm hover:bg-gray-100 transition-colors">
              View Progress <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="bg-gray-50 dark:bg-gray-900/40 py-16">
        <div className="max-w-5xl mx-auto px-5 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Built With Modern Technology</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((t) => (
              <span
                key={t}
                className="px-4 py-2 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm font-medium shadow-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Student info */}
      <section className="max-w-4xl mx-auto px-5 py-20 text-center">
        <div className="card p-8 md:p-10">
          <h2 className="text-2xl font-bold mb-2">Academic Project</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            AI-Powered Personalized Learning Assistant Using Generative AI and Large Language Models (LLMs)
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Student</p>
              <p className="font-semibold">Shaik Shafi</p>
            </div>
            <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Roll Number</p>
              <p className="font-semibold">92410133016</p>
            </div>
            <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Batch</p>
              <p className="font-semibold">7EK2</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 dark:border-gray-800 py-10">
        <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
              AI
            </div>
            <span className="font-semibold">LearnAI</span>
          </div>
          <p className="text-sm text-gray-400">
            Built for academic demonstration purposes · GenAI &amp; LLM coursework project
          </p>
          <Link to="/about" className="text-sm text-brand-600 dark:text-brand-400 hover:underline">
            About this project →
          </Link>
        </div>
      </footer>
    </div>
  );
}
