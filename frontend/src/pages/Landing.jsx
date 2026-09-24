import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';
import HeroIllustration from '../components/HeroIllustration';
import Logo from '../components/Logo';
import GoogleLoginButton from '../components/GoogleLoginButton';
import { useUser } from '../context/UserContext';

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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' },
  }),
};

export default function Landing() {
  const { user } = useUser();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const illustrationY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-x-hidden">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-950/80 backdrop-blur border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-4">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Logo size={36} />
            <span className="font-bold text-lg">Study With AI</span>
          </motion.div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {user.authenticated ? (
              <Link to="/dashboard" className="btn-primary !px-4 !py-2 text-sm">
                Dashboard <ArrowRight size={16} />
              </Link>
            ) : (
              <div className="hidden sm:block">
                <GoogleLoginButton size="medium" />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-accent-50 dark:from-brand-950 dark:via-gray-950 dark:to-accent-950 bg-200% animate-gradient-shift" />
        <motion.div
          className="absolute -top-24 -right-24 w-96 h-96 bg-brand-300/30 dark:bg-brand-700/20 rounded-full blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, 15, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent-300/30 dark:bg-accent-700/20 rounded-full blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 left-1/2 w-64 h-64 bg-brand-400/20 dark:bg-accent-500/10 rounded-full blur-3xl"
          animate={{ x: [0, 30, -20, 0], y: [0, -20, 10, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative max-w-7xl mx-auto px-5 pt-20 pb-24 grid lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div style={{ y: heroTextY }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 text-sm font-medium mb-6">
              <Sparkles size={14} /> Powered by Generative AI &amp; LLMs
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-semibold tracking-tight leading-tight">
              Your Personal{' '}
              <span className="bg-gradient-to-r from-brand-600 via-accent-500 to-brand-600 bg-200% animate-gradient-shift bg-clip-text text-transparent">
                AI Learning
              </span>{' '}
              Assistant
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0">
              Personalized explanations, instant quizzes, smart summaries, study plans, flashcards, and exam-ready
              answers — all tailored to your subject and learning level using Gemini AI.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              {user.authenticated ? (
                <>
                  <Link to="/dashboard" className="btn-primary text-base">
                    Go to Dashboard <ArrowRight size={18} />
                  </Link>
                  <Link to="/assistant" className="btn-secondary text-base">
                    <MessageSquare size={18} /> Ask AI
                  </Link>
                </>
              ) : (
                <GoogleLoginButton size="large" />
              )}
            </div>
            {!user.authenticated && (
              <p className="mt-6 text-xs text-gray-400">Free to use · No credit card required</p>
            )}
          </motion.div>
          </motion.div>

          <motion.div style={{ y: illustrationY }} className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            >
              <HeroIllustration />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-5 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-semibold">Everything you need to learn smarter</h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400">Seven powerful AI-driven tools in one platform.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="card p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="w-11 h-11 rounded-xl bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-300 flex items-center justify-center mb-4">
                <Icon size={22} />
              </div>
              <h3 className="font-semibold text-lg mb-1.5">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 dark:bg-gray-900/40 py-20">
        <div className="max-w-6xl mx-auto px-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-display font-semibold">How It Works</h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400">From question to mastery in four simple steps.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                className="relative card p-6"
              >
                <span className="text-4xl font-extrabold text-brand-100 dark:text-brand-900/60">{s.n}</span>
                <h3 className="font-semibold text-lg mt-2 mb-1.5">{s.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-6xl mx-auto px-5 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6">Built for real academic outcomes</h2>
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
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="card p-8 bg-gradient-to-br from-brand-600 to-accent-500 text-white"
          >
            <BarChart3 size={32} className="mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-2">Track your growth</h3>
            <p className="text-brand-100 mb-6">
              Study streaks, quiz performance, and completed topics — all visualized on your personal dashboard.
            </p>
            <Link to="/progress" className="inline-flex items-center gap-2 bg-white text-brand-700 px-4 py-2 rounded-xl font-medium text-sm hover:bg-gray-100 transition-colors">
              View Progress <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Logo size={34} />
            <span className="font-bold text-lg">Study With AI</span>
          </div>

          <div className="flex items-center gap-3">
            {[
              { icon: Facebook, href: '#', label: 'Facebook', hover: 'hover:bg-[#1877F2]' },
              { icon: Twitter, href: '#', label: 'Twitter', hover: 'hover:bg-[#1DA1F2]' },
              { icon: Instagram, href: '#', label: 'Instagram', hover: 'hover:bg-gradient-to-br hover:from-[#feda75] hover:via-[#d62976] hover:to-[#4f5bd5]' },
              { icon: Linkedin, href: '#', label: 'LinkedIn', hover: 'hover:bg-[#0A66C2]' },
              { icon: Youtube, href: '#', label: 'YouTube', hover: 'hover:bg-[#FF0000]' },
            ].map(({ icon: Icon, href, label, hover }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className={`w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-white flex items-center justify-center transition-colors ${hover}`}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          <a
            href="mailto:contact@shafisolutions.in"
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            <Mail size={15} /> contact@shafisolutions.in
          </a>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 py-4 text-center text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Study With AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
