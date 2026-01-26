import { Suspense } from 'react';
import { mockDb } from '@/lib/mockDb';
import FleetClient from '././FleetClient';
import FleetStats from '././FleetStats';
import {
  DroneGridSkeleton,
  StatsCardSkeleton,
} from '@/components/ui/LoadingSkeleton';

export const metadata = {
  title: 'Fleet Overview | Drone Fleet Management',
  description: 'Monitor and manage your entire drone fleet in real-time',
};

export default function FleetPage() {
  // Fetch initial data on server (for SSR)
  const initialDrones = mockDb.getDrones();
  const stats = mockDb.getFlightStats();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Fleet Overview</h1>
        <p className="text-gray-600 mt-1">
          Monitor and manage all {initialDrones.length} drones in real-time
        </p>
      </div>

      {/* Stats Cards */}
      <Suspense fallback={<StatsCardsSkeleton />}>
        <FleetStats initialStats={stats} />
      </Suspense>

      {/* Main Fleet Grid with Filters */}
      <Suspense fallback={<DroneGridSkeleton count={9} />}>
        <FleetClient initialDrones={initialDrones} />
      </Suspense>
    </div>
  );
}

function StatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <StatsCardSkeleton key={i} />
      ))}
    </div>
  );
}
