import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ label = 'Thinking...', size = 20 }) {
  return (
    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm py-4">
      <Loader2 size={size} className="animate-spin text-brand-600" />
      <span>{label}</span>
    </div>
  );
}
