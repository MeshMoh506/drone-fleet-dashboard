'use client';

import { Drone } from '@/lib/types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface FlightHoursChartProps {
  drones: Drone[];
  timeRange: '24h' | '7d' | '30d';
}

export default function FlightHoursChart({
  drones,
  timeRange,
}: FlightHoursChartProps) {
  // Generate deterministic data based on time range
  const days = timeRange === '24h' ? 1 : timeRange === '7d' ? 7 : 30;

  // Use deterministic values instead of random
  const data = Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - i));

    // Deterministic calculation based on index and drones
    const baseHours =
      drones.reduce((sum, d) => sum + d.flightHours, 0) / drones.length;
    const variation = (i % 7) * 10 - 30; // Creates a pattern
    const hours = Math.round(baseHours / days + variation);

    return {
      date: date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      hours: Math.max(50, hours), // Ensure minimum 50 hours
    };
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Total Flight Hours
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="hours"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            name="Flight Hours"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
