'use client';

import { FlightStats } from '@/lib/types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';

interface DroneStatusChartProps {
  stats: FlightStats;
}

export default function DroneStatusChart({ stats }: DroneStatusChartProps) {
  const data = [
    {
      status: 'Active',
      count: stats.activeDrones,
      color: '#22c55e',
    },
    {
      status: 'Inactive',
      count: stats.inactiveDrones,
      color: '#6b7280',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Active vs Inactive Drones
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" name="Number of Drones" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">
            {stats.activeDrones}
          </p>
          <p className="text-sm text-gray-600">Active Drones</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-600">
            {stats.inactiveDrones}
          </p>
          <p className="text-sm text-gray-600">Inactive Drones</p>
        </div>
      </div>
    </div>
  );
}
