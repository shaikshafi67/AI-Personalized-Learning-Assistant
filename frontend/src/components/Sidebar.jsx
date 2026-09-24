import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  BookOpen,
  FileText,
  Layers,
  CalendarDays,
  BarChart3,
  Settings,
  GraduationCap,
  Info,
  X,
} from 'lucide-react';
import Logo from './Logo';
import { useUser } from '../context/UserContext';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/assistant', label: 'AI Assistant', icon: MessageSquare },
  { to: '/subjects', label: 'Subjects', icon: BookOpen },
  { to: '/quiz-generator', label: 'Quiz Generator', icon: Layers },
  { to: '/summarizer', label: 'Summarizer', icon: FileText },
  { to: '/flashcards', label: 'Flashcards', icon: Layers },
  { to: '/study-planner', label: 'Study Planner', icon: CalendarDays },
  { to: '/exam-answers', label: 'Exam Answers', icon: GraduationCap },
  { to: '/progress', label: 'Progress', icon: BarChart3 },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/about', label: 'About Project', icon: Info },
];

export default function Sidebar({ open, onClose }) {
  const { user } = useUser();
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 z-40
        transform transition-transform duration-200 flex flex-col
        ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Logo size={36} />
            <span className="font-bold text-lg">Study With AI</span>
          </div>
          <button className="lg:hidden p-1" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2.5 px-5 py-4 border-t border-gray-100 dark:border-gray-800">
          {user.picture ? (
            <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 flex items-center justify-center text-sm font-semibold">
              {user.name?.charAt(0) || 'U'}
            </div>
          )}
          <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">{user.name}</p>
        </div>
      </aside>
    </>
  );
}
