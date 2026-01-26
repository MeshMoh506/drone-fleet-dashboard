'use client';

import { useEffect } from 'react';
import { ErrorDisplay } from '@/components/ui/ErrorBoundary';

export default function FleetError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Fleet page error:', error);
  }, [error]);

  return (
    <ErrorDisplay
      error={error}
      reset={reset}
      title="Failed to load fleet data"
    />
  );
}
