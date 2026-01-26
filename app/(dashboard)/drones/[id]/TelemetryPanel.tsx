import { Drone, Telemetry } from '@/lib/types';
import { MapPin, Gauge, Navigation, Signal, Compass } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

interface TelemetryPanelProps {
  drone: Drone;
  telemetry?: Telemetry;
}

export default function TelemetryPanel({
  drone,
  telemetry,
}: TelemetryPanelProps) {
  const telemetryData = [
    {
      label: 'Latitude',
      value: drone.position.lat.toFixed(6),
      icon: MapPin,
    },
    {
      label: 'Longitude',
      value: drone.position.lng.toFixed(6),
      icon: MapPin,
    },
    {
      label: 'Altitude',
      value: `${Math.round(drone.altitude)} m`,
      icon: Navigation,
    },
    {
      label: 'Speed',
      value: `${Math.round(drone.speed)} m/s`,
      icon: Gauge,
    },
    {
      label: 'GPS Signal',
      value: telemetry ? `${telemetry.gpsSignal}%` : 'N/A',
      icon: Signal,
    },
    {
      label: 'Heading',
      value: telemetry ? `${telemetry.heading}°` : 'N/A',
      icon: Compass,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Live Telemetry</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Real-time
        </div>
      </div>

      {/* Telemetry Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {telemetryData.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition"
            >
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <p className="text-xl font-bold text-gray-900">{item.value}</p>
            </div>
          );
        })}
      </div>

      {/* Last Update */}
      {telemetry && (
        <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600">
          Last updated: {formatDateTime(telemetry.timestamp)}
        </div>
      )}

      {/* Coordinates Display */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm font-medium text-blue-900 mb-1">
          Current Coordinates
        </p>
        <p className="font-mono text-sm text-blue-700">
          {drone.position.lat.toFixed(6)}, {drone.position.lng.toFixed(6)}
        </p>
      </div>
    </div>
  );
}
