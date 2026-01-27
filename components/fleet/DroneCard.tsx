import { memo } from 'react';
import Link from 'next/link';
import { Drone } from '@/lib/types';
import { Battery, MapPin, Clock, ChevronRight } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';

interface DroneCardProps {
  drone: Drone;
  viewMode: 'grid' | 'list';
}

const DroneCard = memo(function DroneCard({ drone, viewMode }: DroneCardProps) {
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    charging: 'bg-yellow-500',
    'in-mission': 'bg-blue-500',
  };

  const statusLabels = {
    online: 'Online',
    offline: 'Offline',
    charging: 'Charging',
    'in-mission': 'In Mission',
  };

  const batteryColor =
    drone.battery > 60
      ? 'text-green-600'
      : drone.battery > 30
        ? 'text-yellow-600'
        : 'text-red-600';

  if (viewMode === 'list') {
    return (
      <Link href={`/drones/${drone.id}`}>
        <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex items-center gap-4">
          <div className="flex-shrink-0">
            <div
              className={`w-3 h-3 rounded-full ${statusColors[drone.status]}`}
            />
          </div>

          <div className="flex-1 grid grid-cols-5 gap-4 items-center">
            <div>
              <p className="font-semibold text-gray-900">{drone.name}</p>
              <p className="text-sm text-gray-600">{drone.model}</p>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[drone.status]} text-white`}
              >
                {statusLabels[drone.status]}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Battery className={`w-4 h-4 ${batteryColor}`} />
              <span className={batteryColor}>{Math.round(drone.battery)}%</span>
            </div>

            <div className="text-sm text-gray-600">
              <Clock className="w-4 h-4 inline mr-1" />
              {formatRelativeTime(drone.lastMission)}
            </div>

            <div className="flex justify-end">
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/drones/${drone.id}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg text-gray-900">{drone.name}</h3>
            <p className="text-sm text-gray-600">{drone.model}</p>
          </div>
          <div className={`w-3 h-3 rounded-full ${statusColors[drone.status]}`}>
            <div
              className={`w-3 h-3 rounded-full ${statusColors[drone.status]} animate-ping absolute`}
            />
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[drone.status]} text-white`}
          >
            {statusLabels[drone.status]}
          </span>
        </div>

        {/* Stats */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 flex items-center gap-2">
              <Battery className="w-4 h-4" />
              Battery
            </span>
            <span className={`font-semibold ${batteryColor}`}>
              {Math.round(drone.battery)}%
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Altitude
            </span>
            <span className="font-semibold text-gray-900">
              {Math.round(drone.altitude)}m
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Last Mission
            </span>
            <span className="font-semibold text-gray-900">
              {formatRelativeTime(drone.lastMission)}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Flight Hours</span>
            <span className="font-semibold text-gray-900">
              {drone.flightHours}h
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
});

export default DroneCard;
