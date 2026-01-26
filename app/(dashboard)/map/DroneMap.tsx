'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { Drone } from '@/lib/types';
import { useDrones } from '@/hooks/useDrones';
import Link from 'next/link';
import { Battery, Navigation, ExternalLink } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

interface DroneMapProps {
  initialDrones: Drone[];
}

// Custom drone icons based on status
const createDroneIcon = (status: string) => {
  const colors = {
    online: '#10b981',
    offline: '#6b7280',
    charging: '#f59e0b',
    'in-mission': '#3b82f6',
  };

  const color = colors[status as keyof typeof colors] || '#6b7280';

  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
        <circle cx="12" cy="12" r="10" fill="${color}" stroke="white" stroke-width="2"/>
        <path d="M12 6 L12 18 M6 12 L18 12" stroke="white" stroke-width="2"/>
      </svg>
    `)}`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  });
};

// Component to recenter map when drones update
function MapController({ drones }: { drones: Drone[] }) {
  const map = useMap();

  useEffect(() => {
    if (drones.length > 0) {
      // Calculate bounds to fit all drones
      const bounds: [number, number][] = drones.map((d) => [
        d.position.lat,
        d.position.lng,
      ]);
      if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [drones, map]);

  return null;
}

export default function DroneMap({ initialDrones }: DroneMapProps) {
  // Get live drone data
  const { data: drones } = useDrones();
  const currentDrones = drones || initialDrones;

  // San Francisco center
  const center: LatLngExpression = [37.7749, -122.4194];

  // Filter stats
  const stats = {
    total: currentDrones.length,
    online: currentDrones.filter((d) => d.status === 'online').length,
    'in-mission': currentDrones.filter((d) => d.status === 'in-mission').length,
    charging: currentDrones.filter((d) => d.status === 'charging').length,
    offline: currentDrones.filter((d) => d.status === 'offline').length,
  };

  return (
    <div className="relative w-full h-full">
      {/* Map */}
      <MapContainer
        center={center}
        zoom={13}
        className="w-full h-full"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Drone Markers */}
        {currentDrones.map((drone) => (
          <Marker
            key={drone.id}
            position={[drone.position.lat, drone.position.lng]}
            icon={createDroneIcon(drone.status)}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-bold text-lg mb-2">{drone.name}</h3>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        drone.status === 'online'
                          ? 'bg-green-100 text-green-800'
                          : drone.status === 'in-mission'
                            ? 'bg-blue-100 text-blue-800'
                            : drone.status === 'charging'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {drone.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center gap-1">
                      <Battery className="w-3 h-3" />
                      Battery:
                    </span>
                    <span className="font-semibold">
                      {Math.round(drone.battery)}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 flex items-center gap-1">
                      <Navigation className="w-3 h-3" />
                      Altitude:
                    </span>
                    <span className="font-semibold">
                      {Math.round(drone.altitude)}m
                    </span>
                  </div>

                  <div className="text-xs text-gray-500 font-mono mt-2 pt-2 border-t">
                    {drone.position.lat.toFixed(6)},{' '}
                    {drone.position.lng.toFixed(6)}
                  </div>
                </div>

                <Link
                  href={`/drones/${drone.id}`}
                  className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium"
                >
                  View Details
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Auto-center controller */}
        <MapController drones={currentDrones} />
      </MapContainer>

      {/* Stats Overlay */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 z-[1000]">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Live Fleet Status
        </h3>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between gap-8">
            <span className="text-gray-600">Total:</span>
            <span className="font-semibold">{stats.total}</span>
          </div>
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-gray-600">Online:</span>
            </div>
            <span className="font-semibold">{stats.online}</span>
          </div>
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-gray-600">In Mission:</span>
            </div>
            <span className="font-semibold">{stats['in-mission']}</span>
          </div>
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-gray-600">Charging:</span>
            </div>
            <span className="font-semibold">{stats.charging}</span>
          </div>
          <div className="flex items-center justify-between gap-8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-500" />
              <span className="text-gray-600">Offline:</span>
            </div>
            <span className="font-semibold">{stats.offline}</span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 z-[1000]">
        <p className="text-xs font-semibold text-gray-700 mb-2">Legend</p>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>Online</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>In Mission</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span>Charging</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-500" />
            <span>Offline</span>
          </div>
        </div>
      </div>
    </div>
  );
}
