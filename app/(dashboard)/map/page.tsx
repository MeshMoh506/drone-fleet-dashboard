import { Suspense } from 'react';
import { mockDb } from '@/lib/mockDb';
import MapClient from '././MapClient';
import { Skeleton } from '@/components/ui/LoadingSkeleton';

export const metadata = {
  title: 'Live Map | Drone Fleet Management',
  description: 'Real-time drone positions on interactive map',
};

export default function MapPage() {
  // Fetch initial drone data on server
  const initialDrones = mockDb.getDrones();

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="p-6 bg-white border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">Live Map View</h1>
        <p className="text-gray-600 mt-1">
          Real-time drone positions - {initialDrones.length} drones tracked
        </p>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <Suspense fallback={<MapSkeleton />}>
          <MapClient initialDrones={initialDrones} />
        </Suspense>
      </div>
    </div>
  );
}

function MapSkeleton() {
  return (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  );
}
