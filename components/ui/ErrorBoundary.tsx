'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorDisplayProps {
  error: Error;
  reset?: () => void;
  title?: string;
}

export function ErrorDisplay({
  error,
  reset,
  title = 'Something went wrong',
}: ErrorDisplayProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>

        <p className="text-gray-600 mb-1">
          {error.message || 'An unexpected error occurred'}
        </p>

        {process.env.NODE_ENV === 'development' && (
          <details className="mt-4 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Error details
            </summary>
            <pre className="mt-2 text-xs bg-gray-50 p-3 rounded overflow-auto max-h-40 text-red-600">
              {error.stack}
            </pre>
          </details>
        )}

        {reset && (
          <button
            onClick={reset}
            className="mt-6 flex items-center gap-2 mx-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <RefreshCw className="w-4 h-4" />
            Try again
          </button>
        )}
      </div>
    </div>
  );
}

// Compact error for inline use
export function InlineError({ error, reset }: ErrorDisplayProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h3 className="font-semibold text-red-900 mb-1">Error</h3>
        <p className="text-sm text-red-700">{error.message}</p>
        {reset && (
          <button
            onClick={reset}
            className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
