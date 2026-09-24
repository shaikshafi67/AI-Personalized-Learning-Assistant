import React from 'react';
import { Menu, LogOut } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import GoogleLoginButton from './GoogleLoginButton';
import { useUser } from '../context/UserContext';

export default function Navbar({ onMenuClick, title }) {
  const { user, logout } = useUser();
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
          <ThemeToggle />
          {user.authenticated ? (
            <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-gray-200 dark:border-gray-700">
              {user.picture ? (
                <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 flex items-center justify-center text-sm font-semibold">
                  {user.name?.charAt(0) || 'S'}
                </div>
              )}
              <span className="text-sm font-medium">{user.name}</span>
              <button
                onClick={logout}
                title="Sign out"
                className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="hidden sm:block">
              <GoogleLoginButton size="medium" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
