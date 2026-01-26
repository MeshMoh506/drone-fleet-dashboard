import { mockDb } from '@/lib/mockDb';
import MissionPlanningClient from './MissionPlanningClient';

export const metadata = {
  title: 'Create Mission | Drone Fleet Management',
  description: 'Plan and create new drone missions with waypoint mapping',
};

export default function NewMissionPage() {
  // Fetch available drones
  const drones = mockDb.getDrones();

  // Filter only online drones for mission assignment
  const availableDrones = drones.filter(
    (d) => d.status === 'online' || d.status === 'charging'
  );

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="p-6 bg-white border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">Create New Mission</h1>
        <p className="text-gray-600 mt-1">
          Plan your mission by clicking on the map to add waypoints (minimum 5
          required)
        </p>
      </div>

      {/* Mission Planning Interface */}
      <div className="flex-1 overflow-hidden">
        <MissionPlanningClient availableDrones={availableDrones} />
      </div>
    </div>
  );
}
