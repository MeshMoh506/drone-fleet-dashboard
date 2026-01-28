import { Suspense } from 'react';
import { mockDb } from '@/lib/mockDb';
import AnalyticsClient from '././AnalyticsClient';
import {
  ChartSkeleton,
  StatsCardSkeleton,
} from '@/components/ui/LoadingSkeleton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Analytics Dashboard | Drone Fleet Management',
  description: 'Fleet analytics and performance metrics',
};

export default function AnalyticsPage() {
  // Fetch initial data on server
  const stats = mockDb.getFlightStats();
  const drones = mockDb.getDrones();
  const missions = mockDb.getMissions();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Fleet performance metrics and trends
        </p>
      </div>

      {/* Stats Cards */}
      <Suspense fallback={<StatsCardsSkeleton />}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            label="Total Flight Hours"
            value={Math.round(stats.totalFlightHours).toLocaleString()}
            suffix="hrs"
          />
          <StatCard
            label="Average Battery"
            value={Math.round(stats.averageBattery)}
            suffix="%"
          />
          <StatCard
            label="Mission Success Rate"
            value={Math.round(stats.missionSuccessRate)}
            suffix="%"
          />
          <StatCard
            label="Active Drones"
            value={stats.activeDrones}
            suffix={`/ ${stats.activeDrones + stats.inactiveDrones}`}
          />
        </div>
      </Suspense>

      {/* Charts */}
      <Suspense fallback={<ChartsSkeleton />}>
        <AnalyticsClient
          initialStats={stats}
          initialDrones={drones}
          initialMissions={missions}
        />
      </Suspense>
    </div>
  );
}

function StatCard({
  label,
  value,
  suffix,
}: {
  label: string;
  value: number | string;
  suffix?: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        {suffix && <span className="text-gray-500">{suffix}</span>}
      </div>
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

function ChartsSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow p-6">
          <ChartSkeleton />
        </div>
      ))}
    </div>
  );
}
