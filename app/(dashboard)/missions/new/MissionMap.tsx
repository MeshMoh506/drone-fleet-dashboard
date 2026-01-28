'use client';

import { useState } from 'react';
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
import { X, Menu } from 'lucide-react';
import { toast } from 'sonner';
import 'leaflet/dist/leaflet.css';

interface MissionMapProps {
  availableDrones: Drone[];
}

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
  const [sidebarOpen, setSidebarOpen] = useState(true); // ✅ Start open

  const center: LatLngExpression = [24.7136, 46.6753];

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
    toast.info('Waypoint added', {
      description: `Added waypoint ${waypoints.length + 1}`,
    });
  };

  const handleWaypointUpdate = (id: string, updates: Partial<Waypoint>) => {
    setWaypoints(
      waypoints.map((wp) => (wp.id === id ? { ...wp, ...updates } : wp))
    );
    toast.info('Waypoint updated');
  };

  const handleWaypointDelete = (id: string) => {
    setWaypoints(waypoints.filter((wp) => wp.id !== id));
    toast.info('Waypoint deleted');
  };

  const handleWaypointReorder = (oldIndex: number, newIndex: number) => {
    const newWaypoints = [...waypoints];
    const moved = newWaypoints.splice(oldIndex, 1)[0];

    if (!moved) return;

    newWaypoints.splice(newIndex, 0, moved);

    newWaypoints.forEach((wp, index) => {
      wp.order = index;
    });

    setWaypoints(newWaypoints);
  };

  const handleSaveMission = async () => {
    if (!missionName.trim()) {
      setError('Mission name is required');
      toast.error('Mission name is required');
      return;
    }

    if (!selectedDrone) {
      setError('Please select a drone');
      toast.error('Please select a drone');
      return;
    }

    if (waypoints.length < 5) {
      setError('At least 5 waypoints are required');
      toast.error('At least 5 waypoints are required');
      return;
    }

    setIsSaving(true);
    const loadingToast = toast.loading('Creating mission...');

    try {
      const result = await createMissionFromJson({
        name: missionName,
        droneId: selectedDrone,
        waypoints,
      });

      setIsSaving(false);
      toast.dismiss(loadingToast);

      if (result.success) {
        toast.success('Mission created!', {
          description: `${waypoints.length} waypoints saved`,
        });
        router.push('/fleet');
        router.refresh();
      } else {
        toast.error('Failed to create mission', {
          description: result.error,
        });
        setError(result.error || 'Failed to create mission');
      }
    } catch {
      toast.dismiss(loadingToast);
      toast.error('Unexpected error');
      setIsSaving(false);
    }
  };

  const pathCoordinates: [number, number][] = waypoints.map((wp) => [
    wp.lat,
    wp.lng,
  ]);

  return (
    <div className="h-full flex flex-col md:flex-row relative">
      {/* Map Container */}
      <div className="flex-1 relative h-[50vh] md:h-full">
        <MapContainer center={center} zoom={13} className="w-full h-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Waypoint Markers - Blue color */}
          {waypoints.map((waypoint, index) => (
            <Marker
              key={waypoint.id}
              position={[waypoint.lat, waypoint.lng]}
              icon={
                new Icon({
                  iconUrl: `data:image/svg+xml;base64,${btoa(`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                      <circle cx="12" cy="12" r="10" fill="#3b82f6" stroke="white" stroke-width="2"/>
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

          {/* Path Line - Blue */}
          {pathCoordinates.length > 1 && (
            <Polyline
              positions={pathCoordinates}
              color="#3b82f6"
              weight={3}
              opacity={0.7}
              dashArray="10, 10"
            />
          )}

          <MapClickHandler onMapClick={handleMapClick} />
        </MapContainer>

        {/* Instructions Overlay - Better colors */}
        <div
          className={`absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 z-[1000] max-w-xs md:max-w-sm border-2 border-blue-500 dark:border-blue-600 ${sidebarOpen ? 'hidden md:block' : 'block'}`}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">📍</span>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base">
              Mission Planning
            </h3>
          </div>
          <ol className="text-sm text-gray-700 dark:text-gray-300 space-y-2 list-decimal list-inside">
            <li>Click map to add waypoints</li>
            <li>Add minimum 5 waypoints</li>
            <li>Edit details in sidebar →</li>
            <li>Save your mission</li>
          </ol>
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Waypoints:
              </span>
              <span
                className={`text-sm font-bold ${waypoints.length >= 5 ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}
              >
                {waypoints.length}/5 minimum
              </span>
            </div>
          </div>
        </div>

        {/* Toggle Sidebar Button - Better styling */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute bottom-4 right-4 z-[1000] p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl transition-all hover:scale-105 active:scale-95"
          aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {sidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sidebar - Better colors and closeable */}
      <div
        className={`
          ${sidebarOpen ? 'block' : 'hidden'}
          w-full md:w-96
          bg-white dark:bg-gray-800
          md:border-l border-gray-200 dark:border-gray-700
          overflow-y-auto
          h-[50vh] md:h-full
          absolute md:relative
          bottom-0 md:bottom-auto
          left-0
          z-[1001]
          md:z-auto
          shadow-2xl md:shadow-none
        `}
      >
        {/* Sidebar Header - Always visible */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Mission Details
          </h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
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
