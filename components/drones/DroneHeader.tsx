import { Drone } from '@/lib/types';
import { Battery, Plane } from 'lucide-react';

interface DroneHeaderProps {
  drone: Drone;
}

export default function DroneHeader({ drone }: DroneHeaderProps) {
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
      ? 'text-green-600 dark:text-green-400'
      : drone.battery > 30
        ? 'text-yellow-600 dark:text-yellow-400'
        : 'text-red-600 dark:text-red-400';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-6">
      {/* Mobile: Stack vertically, Desktop: Side by side */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        {/* Left side: Drone info */}
        <div className="flex items-start gap-4">
          {/* Drone Icon */}
          <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
            <Plane className="w-7 h-7 md:w-8 md:h-8 text-white" />
          </div>

          {/* Drone Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white truncate">
              {drone.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm md:text-base">
              {drone.model}
            </p>
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mt-3">
              <span
                className={`px-3 py-1 rounded-full text-xs md:text-sm font-medium ${statusColors[drone.status]} text-white flex items-center gap-2`}
              >
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                {statusLabels[drone.status]}
              </span>
              <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                ID: {drone.id}
              </span>
            </div>
          </div>
        </div>

        {/* Right side: Battery - Responsive layout */}
        <div className="flex md:flex-col items-center md:items-end gap-3 md:gap-0 md:text-right">
          <div className="flex items-center gap-2 md:justify-end md:mb-1">
            <Battery className={`w-5 h-5 ${batteryColor}`} />
            <span className={`text-2xl md:text-3xl font-bold ${batteryColor}`}>
              {Math.round(drone.battery)}%
            </span>
          </div>

          {/* Battery Bar - Adjust width for mobile */}
          <div className="flex-1 md:flex-none md:mt-3">
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-2 md:mb-1">
              Battery Level
            </p>
            <div className="w-full md:w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  drone.battery > 60
                    ? 'bg-green-500'
                    : drone.battery > 30
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                }`}
                style={{ width: `${drone.battery}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
