import React from 'react';
import {
  GraduationCap, Target, Cpu, Rocket,
  Sparkles, ShieldCheck, Layers, MessageSquareText, BookOpen,
  ClipboardList, Brain, FileClock, GaugeCircle,
} from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';

const objectives = [
  { icon: Sparkles, text: "Deliver personalized academic explanations adapted to a student's subject and learning level" },
  { icon: Brain, text: 'Demonstrate practical integration of a Large Language Model (Claude) into a full-stack web app' },
  { icon: ClipboardList, text: 'Automate study aids: summaries, quizzes, flashcards, study plans, and exam-ready answers' },
  { icon: MessageSquareText, text: 'Showcase prompt engineering techniques for structured, reliable AI output' },
  { icon: ShieldCheck, text: 'Build a system that degrades gracefully (demo mode) when AI/DB services are unavailable' },
];

const techGroups = [
  {
    label: 'Frontend',
    icon: Layers,
    items: ['React 18', 'Vite', 'Tailwind CSS', 'React Router'],
  },
  {
    label: 'Backend',
    icon: GaugeCircle,
    items: ['Node.js', 'Express.js', 'express-rate-limit', 'Input Validation'],
  },
  {
    label: 'AI / GenAI',
    icon: Brain,
    items: ['Google Gemini API', '@google/generative-ai', 'Prompt Templates', 'Demo Mode Fallback'],
  },
  {
    label: 'Data',
    icon: FileClock,
    items: ['MongoDB', 'Mongoose ODM', 'Graceful No-DB Fallback'],
  },
];

const applications = [
  { icon: BookOpen, text: 'Self-paced exam preparation for university students' },
  { icon: MessageSquareText, text: 'Quick concept clarification during revision' },
  { icon: ClipboardList, text: 'Automated quiz generation for practice tests' },
  { icon: Target, text: 'Study plan generation ahead of exams' },
  { icon: Layers, text: 'Flashcard-based spaced repetition learning' },
];

export default function AboutProject() {
  return (
    <Layout title="About Project">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Hero */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-indigo-600 to-purple-600 text-white text-center py-14 px-6">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
          <div className="relative">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm mb-5">
              <GraduationCap size={30} />
            </div>
            <p className="text-xs font-semibold tracking-widest uppercase text-brand-100/90 mb-2">
              Academic GenAI Project
            </p>
            <h1 className="text-2xl md:text-4xl font-bold leading-tight max-w-3xl mx-auto">
              AI-Powered Personalized Learning Assistant
            </h1>
            <p className="mt-2 text-base md:text-lg text-brand-100 font-medium">
              Using Generative AI and Large Language Models (LLMs)
            </p>
            <p className="mt-4 text-sm text-brand-100/80 max-w-xl mx-auto">
              A full-stack application demonstrating applied Generative AI — personalized tutoring,
              automated study tools, and production-style prompt engineering.
            </p>
          </div>
        </Card>

        {/* Purpose & Objectives */}
        <Card>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400">
              <Target size={16} />
            </div>
            <h3 className="font-semibold text-lg">Purpose &amp; Objectives</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {objectives.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60"
              >
                <Icon size={16} className="mt-0.5 shrink-0 text-brand-600 dark:text-brand-400" />
                <p className="text-sm text-gray-600 dark:text-gray-300">{text}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Technology Stack */}
        <Card>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400">
              <Cpu size={16} />
            </div>
            <h3 className="font-semibold text-lg">Technology Stack</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {techGroups.map(({ label, icon: Icon, items }) => (
              <div key={label} className="p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2 mb-3">
                  <Icon size={15} className="text-brand-600 dark:text-brand-400" />
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    {label}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Applications */}
        <Card>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400">
              <Rocket size={16} />
            </div>
            <h3 className="font-semibold text-lg">Applications</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {applications.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60"
              >
                <Icon size={16} className="mt-0.5 shrink-0 text-brand-600 dark:text-brand-400" />
                <p className="text-sm text-gray-600 dark:text-gray-300">{text}</p>
              </div>
            ))}
          </div>
        </Card>

        <p className="text-center text-xs text-gray-400 pb-4">
          Built as an academic submission demonstrating applied Generative AI &amp; full-stack engineering.
        </p>
      </div>
    </Layout>
  );
}
