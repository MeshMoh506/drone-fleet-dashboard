'use client';

import dynamic from 'next/dynamic';
import { Drone } from '@/lib/types';
import { Skeleton } from '@/components/ui/LoadingSkeleton';

interface MapClientProps {
  initialDrones: Drone[];
}

// Dynamic import to avoid SSR issues with Leaflet and make it false SSR
const DroneMap = dynamic(() => import('././DroneMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  ),
});

export default function MapClient({ initialDrones }: MapClientProps) {
  return <DroneMap initialDrones={initialDrones} />;
}
