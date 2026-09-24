import React from 'react';
import { Moon, Sun, User } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

export default function Settings() {
  const { user } = useUser();
  const { theme, toggleTheme } = useTheme();

  return (
    <Layout title="Settings">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <div className="flex items-center gap-2 mb-4">
            {theme === 'dark' ? <Moon size={18} className="text-brand-500" /> : <Sun size={18} className="text-amber-500" />}
            <h3 className="font-semibold">Appearance</h3>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Toggle between light and dark mode</p>
            <button onClick={toggleTheme} className="btn-secondary">
              Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
            </button>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <User size={18} className="text-brand-500" />
            <h3 className="font-semibold">Account</h3>
          </div>
          <div className="flex items-center gap-4">
            {user.picture ? (
              <img src={user.picture} alt={user.name} className="w-14 h-14 rounded-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-14 h-14 rounded-full bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 flex items-center justify-center text-xl font-semibold">
                {user.name?.charAt(0) || 'U'}
              </div>
            )}
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
