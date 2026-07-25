import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ErrorBannerProps {
  message: string;
  onClose: () => void;
}

export function ErrorBanner({ message, onClose }: ErrorBannerProps) {
  if (!message) return null;

  return (
    <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start sm:items-center justify-between text-red-800 shadow-sm animate-in fade-in slide-in-from-top-2">
      <div className="flex items-center gap-3">
        <div className="p-1.5 bg-red-100 rounded-full text-red-600">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <p className="font-medium text-sm">{message}</p>
      </div>
      <button 
        onClick={onClose}
        className="p-1 hover:bg-red-100 rounded-lg text-red-600 transition-colors ml-4"
        aria-label="Dismiss error"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
