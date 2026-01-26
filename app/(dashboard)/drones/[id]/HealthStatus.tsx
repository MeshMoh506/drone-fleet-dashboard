import { Drone } from '@/lib/types';
import { CheckCircle, AlertCircle, Clock, Gauge } from 'lucide-react';

interface HealthStatusProps {
  drone: Drone;
}

type StatusType = 'success' | 'warning' | 'error';

interface StatItem {
  label: string;
  value: string;
  icon: typeof CheckCircle;
  status: StatusType;
}

export default function HealthStatus({ drone }: HealthStatusProps) {
  const stats: StatItem[] = [
    {
      label: 'Battery Health',
      value:
        drone.battery > 60 ? 'Excellent' : drone.battery > 30 ? 'Good' : 'Low',
      icon: CheckCircle,
      status:
        drone.battery > 60
          ? 'success'
          : drone.battery > 30
            ? 'warning'
            : 'error',
    },
    {
      label: 'Flight Hours',
      value: `${drone.flightHours}h`,
      icon: Clock,
      status: 'success',
    },
    {
      label: 'Current Speed',
      value:
        drone.status === 'in-mission'
          ? `${Math.round(drone.speed)} m/s`
          : '0 m/s',
      icon: Gauge,
      status: 'success',
    },
    {
      label: 'System Status',
      value: drone.status === 'offline' ? 'Offline' : 'Operational',
      icon: drone.status === 'offline' ? AlertCircle : CheckCircle,
      status: drone.status === 'offline' ? 'error' : 'success',
    },
  ];

  const statusColors: Record<StatusType, string> = {
    success: 'bg-green-50 text-green-700 border-green-200',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    error: 'bg-red-50 text-red-700 border-red-200',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`rounded-lg border-2 p-4 ${statusColors[stat.status]}`}
          >
            <div className="flex items-center gap-3">
              <Icon className="w-5 h-5" />
              <div>
                <p className="text-sm font-medium">{stat.label}</p>
                <p className="text-lg font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
