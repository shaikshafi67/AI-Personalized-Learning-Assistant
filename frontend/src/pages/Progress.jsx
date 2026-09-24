import React, { useEffect, useState } from 'react';
import { Flame, BookOpen, TrendingUp } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import { getDemoProgress } from '../services/api';

export default function ProgressPage() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDemoProgress()
      .then((res) => setProgress(res.progress))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Layout title="Progress">
        <LoadingSpinner label="Loading progress..." />
      </Layout>
    );
  }

  const maxScore = Math.max(...(progress?.quizScores?.map((q) => (q.score / q.total) * 100) || [1]));

  return (
    <Layout title="Progress">
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-4">
          <Card className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-500 flex items-center justify-center">
              <Flame size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Study Streak</p>
              <p className="text-xl font-bold">{progress.studyStreak} days</p>
            </div>
          </Card>
          <Card className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-brand-50 dark:bg-brand-900/20 text-brand-500 flex items-center justify-center">
              <BookOpen size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Topics Completed</p>
              <p className="text-xl font-bold">{progress.completedTopics.length}</p>
            </div>
          </Card>
          <Card className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 flex items-center justify-center">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Quizzes Attempted</p>
              <p className="text-xl font-bold">{progress.quizScores.length}</p>
            </div>
          </Card>
        </div>

        <Card>
          <h3 className="font-semibold mb-5">Quiz Scores Over Time</h3>
          <div className="flex items-end gap-4 h-48">
            {progress.quizScores.map((q, i) => {
              const pct = (q.score / q.total) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                  <span className="text-xs font-medium mb-1">{Math.round(pct)}%</span>
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-brand-600 to-brand-400"
                    style={{ height: `${(pct / maxScore) * 100}%`, minHeight: '8px' }}
                  />
                  <span className="text-[10px] text-gray-400 mt-2 text-center">{q.topic}</span>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="grid sm:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-semibold mb-3">Topics Studied</h3>
            <ul className="space-y-2">
              {progress.topicsStudied.map((t, i) => (
                <li key={i} className="text-sm px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                  {t}
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <h3 className="font-semibold mb-3">Completed Topics</h3>
            <ul className="space-y-2">
              {progress.completedTopics.map((t, i) => (
                <li key={i} className="text-sm px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300">
                  ✓ {t}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
