import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageSquare,
  FileText,
  Layers,
  CalendarDays,
  Flame,
  BookOpen,
  Target,
  TrendingUp,
} from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import { useUser } from '../context/UserContext';
import { getDemoProgress } from '../services/api';

const quickActions = [
  { to: '/assistant', label: 'Ask AI', icon: MessageSquare, color: 'from-brand-500 to-brand-600' },
  { to: '/summarizer', label: 'Generate Summary', icon: FileText, color: 'from-purple-500 to-purple-600' },
  { to: '/quiz-generator', label: 'Generate Quiz', icon: Layers, color: 'from-emerald-500 to-emerald-600' },
  { to: '/study-planner', label: 'Create Study Plan', icon: CalendarDays, color: 'from-amber-500 to-amber-600' },
  { to: '/assistant?mode=explain', label: 'Explain Topic', icon: BookOpen, color: 'from-pink-500 to-pink-600' },
];

export default function Dashboard() {
  const { user } = useUser();
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDemoProgress()
      .then((res) => setProgress(res.progress))
      .catch(() => setProgress(null))
      .finally(() => setLoading(false));
  }, []);

  const avgScore =
    progress?.quizScores?.length > 0
      ? Math.round(
          (progress.quizScores.reduce((a, q) => a + q.score / q.total, 0) / progress.quizScores.length) * 100
        )
      : 0;

  return (
    <Layout title="Dashboard">
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-brand-600 to-purple-600 text-white">
          <h2 className="text-2xl font-bold">Welcome back, {user.name.split(' ')[0]} 👋</h2>
          <p className="text-brand-100 mt-1">Ready to continue your learning journey today?</p>
          <div className="mt-5 w-full bg-white/20 rounded-full h-2.5">
            <div className="bg-white h-2.5 rounded-full" style={{ width: '62%' }} />
          </div>
          <p className="text-xs text-brand-100 mt-2">62% of your weekly learning goal completed</p>
        </Card>

        <div>
          <h3 className="font-semibold mb-3 text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wide">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {quickActions.map(({ to, label, icon: Icon, color }) => (
              <Link
                key={label}
                to={to}
                className="card p-4 flex flex-col items-center text-center gap-2 hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} text-white flex items-center justify-center`}>
                  <Icon size={18} />
                </div>
                <span className="text-xs font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </div>

        {loading ? (
          <LoadingSpinner label="Loading your progress..." />
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={Flame} label="Study Streak" value={`${progress?.studyStreak ?? 0} days`} color="text-orange-500" bg="bg-orange-50 dark:bg-orange-900/20" />
              <StatCard icon={BookOpen} label="Topics Studied" value={progress?.topicsStudied?.length ?? 0} color="text-brand-500" bg="bg-brand-50 dark:bg-brand-900/20" />
              <StatCard icon={Target} label="Quizzes Taken" value={progress?.quizScores?.length ?? 0} color="text-emerald-500" bg="bg-emerald-50 dark:bg-emerald-900/20" />
              <StatCard icon={TrendingUp} label="Avg Quiz Score" value={`${avgScore}%`} color="text-purple-500" bg="bg-purple-50 dark:bg-purple-900/20" />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <h3 className="font-semibold mb-4">Recent Topics</h3>
                <ul className="space-y-2">
                  {progress?.topicsStudied?.map((t, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm py-2 px-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <BookOpen size={14} className="text-brand-500 shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </Card>
              <Card>
                <h3 className="font-semibold mb-4">Quiz Performance Summary</h3>
                <ul className="space-y-3">
                  {progress?.quizScores?.map((q, i) => (
                    <li key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{q.subject} — {q.topic}</span>
                        <span className="font-medium">{q.score}/{q.total}</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                        <div
                          className="bg-brand-500 h-2 rounded-full"
                          style={{ width: `${(q.score / q.total) * 100}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <Card>
              <h3 className="font-semibold mb-3">Recommended Topics</h3>
              <div className="flex flex-wrap gap-2">
                {['Data Structures - Graphs', 'DBMS - Indexing', 'OS - Memory Management', 'CN - TCP/IP Model', 'AI - Search Algorithms'].map((t) => (
                  <Link
                    key={t}
                    to="/assistant"
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 hover:bg-brand-100 dark:hover:bg-brand-900/50 transition-colors"
                  >
                    {t}
                  </Link>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>
    </Layout>
  );
}

function StatCard({ icon: Icon, label, value, color, bg }) {
  return (
    <Card className="flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl ${bg} ${color} flex items-center justify-center`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </Card>
  );
}
