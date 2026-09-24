import React from 'react';
import {
  GraduationCap, MessageSquare, BookOpen, FileText,
  Layers, CalendarDays, PenLine,
} from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';

const whatItDoes = [
  { icon: MessageSquare, title: 'Answers your questions', text: 'Ask anything about your subject and get an explanation that matches how well you already know the topic.' },
  { icon: BookOpen, title: 'Explains topics clearly', text: 'Type in any topic and get a clear, well-organized explanation — no need to dig through long textbooks.' },
  { icon: FileText, title: 'Summarizes your notes', text: 'Paste your study material and instantly get a short summary with the key points highlighted.' },
  { icon: Layers, title: 'Creates practice quizzes', text: 'Generate quizzes on any topic to test yourself, with instant scoring and explanations.' },
  { icon: CalendarDays, title: 'Plans your study time', text: 'Tell it your exam date and available hours, and it builds a day-by-day study schedule for you.' },
  { icon: PenLine, title: 'Writes exam-style answers', text: 'Get model answers written to match exactly how many marks a question is worth.' },
];

export default function AboutProject() {
  return (
    <Layout title="About Project">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Hero */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-accent-600 text-white text-center py-14 px-6">
          <div className="relative">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm mb-5">
              <GraduationCap size={30} />
            </div>
            <h1 className="text-2xl md:text-4xl font-bold leading-tight max-w-2xl mx-auto">
              A study companion that adapts to you
            </h1>
            <p className="mt-4 text-base text-brand-100 max-w-xl mx-auto">
              Study With AI is a personal AI tutor that explains topics, answers questions, and helps you prepare
              for exams — all tailored to your subject and how much you already know.
            </p>
          </div>
        </Card>

        {/* What it does */}
        <Card>
          <h3 className="font-semibold text-lg mb-5">What can it help you with?</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {whatItDoes.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60"
              >
                <div className="w-9 h-9 rounded-lg bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-300 flex items-center justify-center shrink-0">
                  <Icon size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">{title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Who it's for */}
        <Card>
          <h3 className="font-semibold text-lg mb-3">Who is it for?</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            Any student who wants a faster, more personal way to study — whether you're revising the night
            before an exam, trying to understand a tricky topic, or just want a study buddy that's available
            any time of day.
          </p>
        </Card>

        <p className="text-center text-xs text-gray-400 pb-4">
          Built as a student project to make learning more personal.
        </p>
      </div>
    </Layout>
  );
}
