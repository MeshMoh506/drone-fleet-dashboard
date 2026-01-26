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
      ? 'text-green-600'
      : drone.battery > 30
        ? 'text-yellow-600'
        : 'text-red-600';

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          {/* Drone Icon */}
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Plane className="w-8 h-8 text-white" />
          </div>

          {/* Drone Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{drone.name}</h1>
            <p className="text-gray-600 mt-1">{drone.model}</p>
            <div className="flex items-center gap-3 mt-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[drone.status]} text-white flex items-center gap-2`}
              >
                <div
                  className={`w-2 h-2 rounded-full bg-white animate-pulse`}
                />
                {statusLabels[drone.status]}
              </span>
              <span className="text-sm text-gray-500">ID: {drone.id}</span>
            </div>
          </div>
        </div>

        {/* Battery Indicator */}
        <div className="text-right">
          <div className="flex items-center gap-2 justify-end mb-1">
            <Battery className={`w-5 h-5 ${batteryColor}`} />
            <span className={`text-3xl font-bold ${batteryColor}`}>
              {Math.round(drone.battery)}%
            </span>
          </div>
          <p className="text-sm text-gray-600">Battery Level</p>

          {/* Battery Bar */}
          <div className="mt-3 w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                drone.battery > 60
                  ? 'bg-green-500'
                  : drone.battery > 30
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                // simulate real color based on battery percentage
              }`}
              style={{ width: `${drone.battery}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
