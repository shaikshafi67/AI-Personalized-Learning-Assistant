import React from 'react';
import { Menu } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import DemoBadge from './DemoBadge';
import { useUser } from '../context/UserContext';

export default function Navbar({ onMenuClick, title }) {
  const { user } = useUser();
  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-950/80 backdrop-blur border-b border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-between px-4 md:px-6 py-3.5">
        <div className="flex items-center gap-3">
          <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" onClick={onMenuClick}>
            <Menu size={20} />
          </button>
          <h1 className="text-lg md:text-xl font-semibold">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <DemoBadge />
          <ThemeToggle />
          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-gray-200 dark:border-gray-700">
            <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 flex items-center justify-center text-sm font-semibold">
              {user.name?.charAt(0) || 'S'}
            </div>
            <span className="text-sm font-medium">{user.name}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
