import React, { useState } from 'react';
import { Save, User, Moon, Sun, Info } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import DemoBadge from '../components/DemoBadge';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { useDemoMode } from '../hooks/useDemoMode';

export default function Settings() {
  const { user, setUser } = useUser();
  const { theme, toggleTheme } = useTheme();
  const { demoMode, dbConnected, backendOnline } = useDemoMode();
  const [form, setForm] = useState(user);
  const [saved, setSaved] = useState(false);

  const save = () => {
    setUser(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

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
            <h3 className="font-semibold">Student Profile</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
              <input className="input-field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Roll Number</label>
              <input className="input-field" value={form.rollNumber} onChange={(e) => setForm({ ...form, rollNumber: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Batch</label>
              <input className="input-field" value={form.batch} onChange={(e) => setForm({ ...form, batch: e.target.value })} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
              <input className="input-field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-500 mb-1">Learning Level</label>
              <select className="input-field" value={form.learningLevel} onChange={(e) => setForm({ ...form, learningLevel: e.target.value })}>
                {['Beginner', 'Intermediate', 'Advanced'].map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>
          <button onClick={save} className="btn-primary mt-4">
            <Save size={16} /> {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Info size={18} className="text-brand-500" />
            <h3 className="font-semibold">System Status</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">AI Mode</span>
              <DemoBadge inline />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Backend Connection</span>
              <span className={backendOnline ? 'text-emerald-600' : 'text-red-600'}>
                {backendOnline ? 'Connected' : 'Offline'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Database</span>
              <span className={dbConnected ? 'text-emerald-600' : 'text-amber-600'}>
                {dbConnected ? 'Connected (MongoDB)' : 'Not connected (using demo/session data)'}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
