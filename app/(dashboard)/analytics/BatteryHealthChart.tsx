'use client';

import { Drone } from '@/lib/types';
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

interface BatteryHealthChartProps {
  drones: Drone[];
}

export default function BatteryHealthChart({
  drones,
}: BatteryHealthChartProps) {
  // Group drones by battery level ranges
  const ranges = {
    'Critical (0-20%)': drones.filter((d) => d.battery <= 20).length,
    'Low (21-40%)': drones.filter((d) => d.battery > 20 && d.battery <= 40)
      .length,
    'Medium (41-60%)': drones.filter((d) => d.battery > 40 && d.battery <= 60)
      .length,
    'Good (61-80%)': drones.filter((d) => d.battery > 60 && d.battery <= 80)
      .length,
    'Excellent (81-100%)': drones.filter((d) => d.battery > 80).length,
  };

  const data = Object.entries(ranges).map(([range, count]) => ({
    range,
    count,
  }));

  const colors = ['#ef4444', '#f59e0b', '#eab308', '#84cc16', '#22c55e'];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Battery Health Distribution
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="range"
            tick={{ fontSize: 10 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" name="Number of Drones" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
