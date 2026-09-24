import React from 'react';
import { Sparkles, Wifi, WifiOff } from 'lucide-react';
import { useDemoMode } from '../hooks/useDemoMode';

export default function DemoBadge({ inline = false }) {
  const { demoMode, backendOnline } = useDemoMode();

  if (demoMode === null) return null;

  if (!backendOnline) {
    return (
      <div
        className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 ${
          inline ? '' : 'shadow-sm'
        }`}
      >
        <WifiOff size={14} /> Backend Offline
      </div>
    );
  }

  if (!demoMode) {
    return (
      <div className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
        <Wifi size={14} /> Live AI Connected
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 animate-fade-in">
      <Sparkles size={14} /> Demo Mode Active
    </div>
  );
}
