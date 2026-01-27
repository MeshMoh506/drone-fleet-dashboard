'use client';

import { Mission } from '@/lib/types';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

interface MissionSuccessChartProps {
  missions: Mission[];
  timeRange: '24h' | '7d' | '30d';
}

export default function MissionSuccessChart({
  missions,
  timeRange,
}: MissionSuccessChartProps) {
  // Filter missions by time range
  const now = new Date();
  const cutoffDate = new Date();

  if (timeRange === '24h') {
    cutoffDate.setHours(cutoffDate.getHours() - 24);
  } else if (timeRange === '7d') {
    cutoffDate.setDate(cutoffDate.getDate() - 7);
  } else {
    cutoffDate.setDate(cutoffDate.getDate() - 30);
  }

  const filteredMissions = missions.filter(
    (m) => new Date(m.createdAt) >= cutoffDate
  );

  // Count by status
  const statusCounts = {
    completed: filteredMissions.filter((m) => m.status === 'completed').length,
    'in-progress': filteredMissions.filter((m) => m.status === 'in-progress')
      .length,
    failed: filteredMissions.filter((m) => m.status === 'failed').length,
    pending: filteredMissions.filter((m) => m.status === 'pending').length,
  };

  const data = [
    { name: 'Completed', value: statusCounts.completed, color: '#22c55e' },
    {
      name: 'In Progress',
      value: statusCounts['in-progress'],
      color: '#3b82f6',
    },
    { name: 'Failed', value: statusCounts.failed, color: '#ef4444' },
    { name: 'Pending', value: statusCounts.pending, color: '#eab308' },
  ].filter((d) => d.value > 0); // Only show non-zero values

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = (props: {
    cx?: number;
    cy?: number;
    midAngle?: number;
    innerRadius?: number;
    outerRadius?: number;
    percent?: number;
  }) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;

    // Return null if any required value is missing
    if (
      cx === undefined ||
      cy === undefined ||
      midAngle === undefined ||
      innerRadius === undefined ||
      outerRadius === undefined ||
      percent === undefined
    ) {
      return null;
    }

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={14}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Mission Status Distribution
      </h3>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[300px] flex items-center justify-center text-gray-500">
          No missions in selected time range
        </div>
      )}
    </div>
  );
}
