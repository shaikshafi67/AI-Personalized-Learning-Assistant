import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, CheckCircle2 } from 'lucide-react';

export default function HeroIllustration() {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-square">
      <motion.div
        className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-brand-500 via-brand-600 to-accent-500 shadow-2xl"
        animate={{ rotate: [0, 1.5, 0, -1.5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur rounded-2xl shadow-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-brand-100 dark:bg-brand-900/50 flex items-center justify-center text-brand-600 dark:text-brand-300">
              <Sparkles size={16} />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900 dark:text-white">AI Assistant</p>
              <p className="text-[10px] text-gray-400">DBMS · Beginner</p>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="h-2.5 rounded-full bg-gray-100 dark:bg-gray-800 w-full" />
            <div className="h-2.5 rounded-full bg-gray-100 dark:bg-gray-800 w-4/5" />
            <div className="h-2.5 rounded-full bg-gray-100 dark:bg-gray-800 w-3/5" />
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <CheckCircle2 size={14} /> Answer generated
          </div>
        </div>
      </div>

      <motion.div
        className="absolute -top-4 -left-6 bg-white dark:bg-gray-900 shadow-lg rounded-xl px-3.5 py-2.5 flex items-center gap-2"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <BookOpen size={16} className="text-brand-600 dark:text-brand-400" />
        <span className="text-xs font-semibold">Quiz: 9/10</span>
      </motion.div>

      <motion.div
        className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-900 shadow-lg rounded-xl px-3.5 py-2.5"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <p className="text-xs font-semibold text-gray-900 dark:text-white">🔥 7-day streak</p>
      </motion.div>

      <motion.div
        className="absolute top-1/3 -right-8 w-16 h-16 rounded-2xl bg-yellow-300/80 dark:bg-yellow-500/30 blur-xl"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
