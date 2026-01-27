'use client';

import { useState } from 'react';
import { Drone, Mission, FlightStats } from '@/lib/types';
import FlightHoursChart from '././FlightHoursChart';
import BatteryHealthChart from '././BatteryHealthChart';
import MissionSuccessChart from '././MissionSuccessChart';
import DroneStatusChart from '././DroneStatusChart';

interface AnalyticsClientProps {
  initialStats: FlightStats;
  initialDrones: Drone[];
  initialMissions: Mission[];
}

export default function AnalyticsClient({
  initialStats,
  initialDrones,
  initialMissions,
}: AnalyticsClientProps) {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d');

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-end">
        <div className="inline-flex rounded-lg border border-gray-300 bg-white">
          <button
            onClick={() => setTimeRange('24h')}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg transition ${
              timeRange === '24h'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            24 Hours
          </button>
          <button
            onClick={() => setTimeRange('7d')}
            className={`px-4 py-2 text-sm font-medium border-x border-gray-300 transition ${
              timeRange === '7d'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setTimeRange('30d')}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg transition ${
              timeRange === '30d'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            30 Days
          </button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Flight Hours Chart */}
        <FlightHoursChart drones={initialDrones} timeRange={timeRange} />

        {/* Battery Health Chart */}
        <BatteryHealthChart drones={initialDrones} />

        {/* Mission Success Chart */}
        <MissionSuccessChart missions={initialMissions} timeRange={timeRange} />

        {/* Drone Status Chart */}
        <DroneStatusChart stats={initialStats} />
      </div>
    </div>
  );
}
