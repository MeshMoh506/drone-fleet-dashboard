'use client';

import { FlightStats } from '@/lib/types';
import { Activity, Battery, CheckCircle, Plane } from 'lucide-react';

interface FleetStatsProps {
  initialStats: FlightStats;
}

export default function FleetStats({ initialStats }: FleetStatsProps) {
  const stats = [
    {
      label: 'Total Drones',
      value: initialStats.activeDrones + initialStats.inactiveDrones,
      icon: Plane,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Active Drones',
      value: initialStats.activeDrones,
      icon: Activity,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: 'Avg Battery',
      value: `${Math.round(initialStats.averageBattery)}%`,
      icon: Battery,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
    },
    {
      label: 'Success Rate',
      value: `${Math.round(initialStats.missionSuccessRate)}%`,
      icon: CheckCircle,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.bg} p-3 rounded-lg`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
