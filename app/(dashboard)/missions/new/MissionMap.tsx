'use client';

import { useState, useOptimistic } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents,
} from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { Drone, Waypoint } from '@/lib/types';
import { createMissionFromJson } from '@/app/actions/missions';
import { useRouter } from 'next/navigation';
import MissionForm from './MissionForm';
import WaypointList from './WaypointList';
import 'leaflet/dist/leaflet.css';

interface MissionMapProps {
  availableDrones: Drone[];
}

// Waypoint marker icon
const waypointIcon = new Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
      <circle cx="12" cy="12" r="10" fill="#ef4444" stroke="white" stroke-width="2"/>
      <text x="12" y="16" text-anchor="middle" fill="white" font-size="12" font-weight="bold">?</text>
    </svg>
  `)}`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// Component to handle map clicks
function MapClickHandler({
  onMapClick,
}: {
  onMapClick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function MissionMap({ availableDrones }: MissionMapProps) {
  const router = useRouter();
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
  const [missionName, setMissionName] = useState('');
  const [selectedDrone, setSelectedDrone] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  // Riyadh center
  const center: LatLngExpression = [24.7136, 46.6753];

  // Add waypoint when map is clicked
  const handleMapClick = (lat: number, lng: number) => {
    const newWaypoint: Waypoint = {
      id: `waypoint-${Date.now()}`,
      order: waypoints.length,
      lat,
      lng,
      altitude: 50,
      speed: 10,
      action: 'none',
    };
    setWaypoints([...waypoints, newWaypoint]);
  };

  // Update waypoint
  const handleWaypointUpdate = (id: string, updates: Partial<Waypoint>) => {
    setWaypoints(
      waypoints.map((wp) => (wp.id === id ? { ...wp, ...updates } : wp))
    );
  };

  // Delete waypoint
  const handleWaypointDelete = (id: string) => {
    const filtered = waypoints.filter((wp) => wp.id !== id);
    // Reorder remaining waypoints
    const reordered = filtered.map((wp, index) => ({ ...wp, order: index }));
    setWaypoints(reordered);
  };

  // Reorder waypoints
  const handleWaypointReorder = (fromIndex: number, toIndex: number) => {
    const newWaypoints = [...waypoints];
    const [removed] = newWaypoints.splice(fromIndex, 1);

    if (!removed) return; // Safety check

    newWaypoints.splice(toIndex, 0, removed);
    // Update order
    const reordered = newWaypoints.map((wp, index) => ({
      ...wp,
      order: index,
    }));
    setWaypoints(reordered);
  };

  // Save mission
  const handleSaveMission = async () => {
    setError('');

    // Validation
    if (!missionName.trim()) {
      setError('Mission name is required');
      return;
    }

    if (!selectedDrone) {
      setError('Please select a drone');
      return;
    }

    if (waypoints.length < 5) {
      setError('At least 5 waypoints are required');
      return;
    }

    setIsSaving(true);

    const result = await createMissionFromJson({
      name: missionName,
      droneId: selectedDrone,
      waypoints,
    });

    setIsSaving(false);

    if (result.success) {
      // Redirect to missions list or show success
      router.push('/fleet');
      router.refresh();
    } else {
      setError(result.error || 'Failed to create mission');
    }
  };

  // Get polyline path for visualization
  const pathCoordinates: [number, number][] = waypoints.map((wp) => [
    wp.lat,
    wp.lng,
  ]);

  return (
    <div className="h-full flex">
      {/* Left: Map */}
      <div className="flex-1 relative">
        <MapContainer center={center} zoom={13} className="w-full h-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Waypoint Markers */}
          {waypoints.map((waypoint, index) => (
            <Marker
              key={waypoint.id}
              position={[waypoint.lat, waypoint.lng]}
              icon={
                new Icon({
                  iconUrl: `data:image/svg+xml;base64,${btoa(`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                      <circle cx="12" cy="12" r="10" fill="#ef4444" stroke="white" stroke-width="2"/>
                      <text x="12" y="16" text-anchor="middle" fill="white" font-size="12" font-weight="bold">${
                        index + 1
                      }</text>
                    </svg>
                  `)}`,
                  iconSize: [32, 32],
                  iconAnchor: [16, 32],
                })
              }
            />
          ))}

          {/* Path Line */}
          {pathCoordinates.length > 1 && (
            <Polyline
              positions={pathCoordinates}
              color="#3b82f6"
              weight={3}
              opacity={0.7}
              dashArray="10, 10"
            />
          )}

          {/* Map Click Handler */}
          <MapClickHandler onMapClick={handleMapClick} />
        </MapContainer>

        {/* Instructions Overlay */}
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 z-[1000] max-w-sm">
          <h3 className="font-bold text-gray-900 mb-2">📍 How to Plan</h3>
          <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
            <li>Click on the map to add waypoints</li>
            <li>Add at least 5 waypoints</li>
            <li>Edit waypoint details on the right</li>
            <li>Drag to reorder waypoints</li>
            <li>Save your mission</li>
          </ol>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-900">
              Waypoints: {waypoints.length}/5 minimum
            </p>
          </div>
        </div>
      </div>

      {/* Right: Form & Waypoint List */}
      <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Mission Form */}
          <MissionForm
            missionName={missionName}
            setMissionName={setMissionName}
            selectedDrone={selectedDrone}
            setSelectedDrone={setSelectedDrone}
            availableDrones={availableDrones}
            waypointCount={waypoints.length}
            onSave={handleSaveMission}
            isSaving={isSaving}
            error={error}
          />

          {/* Waypoint List */}
          <WaypointList
            waypoints={waypoints}
            onUpdate={handleWaypointUpdate}
            onDelete={handleWaypointDelete}
            onReorder={handleWaypointReorder}
          />
        </div>
      </div>
    </div>
  );
}
