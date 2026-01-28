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
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      label: 'Active Drones',
      value: initialStats.activeDrones,
      icon: Activity,
      color: 'text-green-600 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      label: 'Avg Battery',
      value: `${Math.round(initialStats.averageBattery)}%`,
      icon: Battery,
      color: 'text-yellow-600 dark:text-yellow-400',
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    {
      label: 'Success Rate',
      value: `${Math.round(initialStats.missionSuccessRate)}%`,
      icon: CheckCircle,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-900/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-xl p-6 hover:shadow-lg dark:hover:shadow-2xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
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
