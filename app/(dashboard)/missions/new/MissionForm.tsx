import { Drone } from '@/lib/types';
import { Save, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

interface MissionFormProps {
  missionName: string;
  setMissionName: (name: string) => void;
  selectedDrone: string;
  setSelectedDrone: (droneId: string) => void;
  availableDrones: Drone[];
  waypointCount: number;
  onSave: () => void;
  isSaving: boolean;
  error: string;
}

export default function MissionForm({
  missionName,
  setMissionName,
  selectedDrone,
  setSelectedDrone,
  availableDrones,
  waypointCount,
  onSave,
  isSaving,
  error,
}: MissionFormProps) {
  const isValid = missionName.trim() && selectedDrone && waypointCount >= 5;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Mission Details</h2>

      {/* Mission Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mission Name *
        </label>
        <input
          type="text"
          value={missionName}
          onChange={(e) => setMissionName(e.target.value)}
          placeholder="e.g., Perimeter Survey"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Drone Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Drone *
        </label>
        <select
          value={selectedDrone}
          onChange={(e) => setSelectedDrone(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Choose a drone...</option>
          {availableDrones.map((drone) => (
            <option key={drone.id} value={drone.id}>
              {drone.name} - {drone.model} ({Math.round(drone.battery)}%
              battery)
            </option>
          ))}
        </select>
        {availableDrones.length === 0 && (
          <p className="text-sm text-red-600 mt-1">
            No drones available. All drones are offline or in mission.
          </p>
        )}
      </div>

      {/* Waypoint Count Indicator */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Waypoints</span>
          <span
            className={`text-lg font-bold ${waypointCount >= 5 ? 'text-green-600' : 'text-red-600'}`}
          >
            {waypointCount}/5 minimum
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              waypointCount >= 5 ? 'bg-green-500' : 'bg-red-500'
            }`}
            style={{ width: `${Math.min((waypointCount / 5) * 100, 100)}%` }}
          />
        </div>
        {waypointCount < 5 && (
          <p className="text-xs text-gray-600 mt-2">
            Add {5 - waypointCount} more waypoint
            {5 - waypointCount !== 1 ? 's' : ''} by clicking on the map
          </p>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Success Indicator */}
      {isValid && !error && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-green-800">
            Mission ready to save! Click the button below.
          </p>
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={onSave}
        disabled={!isValid || isSaving}
        className={`
          w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg
          font-semibold transition
          ${
            isValid && !isSaving
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }
        `}
      >
        {isSaving ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Saving Mission...
          </>
        ) : (
          <>
            <Save className="w-5 h-5" />
            Save Mission
          </>
        )}
      </button>

      {/* Validation Checklist */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-sm font-medium text-gray-700 mb-2">Requirements:</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            {missionName.trim() ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : (
              <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
            )}
            <span
              className={
                missionName.trim() ? 'text-green-700' : 'text-gray-600'
              }
            >
              Mission name
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            {selectedDrone ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : (
              <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
            )}
            <span
              className={selectedDrone ? 'text-green-700' : 'text-gray-600'}
            >
              Drone selected
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            {waypointCount >= 5 ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : (
              <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
            )}
            <span
              className={
                waypointCount >= 5 ? 'text-green-700' : 'text-gray-600'
              }
            >
              Minimum 5 waypoints
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
