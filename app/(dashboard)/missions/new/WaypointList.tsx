'use client';

import { useState } from 'react';
import { Waypoint } from '@/lib/types';
import { GripVertical, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface WaypointListProps {
  waypoints: Waypoint[];
  onUpdate: (id: string, updates: Partial<Waypoint>) => void;
  onDelete: (id: string) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
}

export default function WaypointList({
  waypoints,
  onUpdate,
  onDelete,
  onReorder,
}: WaypointListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  if (waypoints.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-600">Click on the map to add waypoints</p>
        <p className="text-sm text-gray-500 mt-1">
          You need at least 5 waypoints to create a mission
        </p>
      </div>
    );
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== index) {
      onReorder(draggedIndex, index);
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Waypoints</h2>
        <span className="text-sm text-gray-600">
          {waypoints.length} waypoint{waypoints.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-2">
        {waypoints.map((waypoint, index) => (
          <div
            key={waypoint.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={`
              bg-white border-2 rounded-lg transition cursor-move
              ${draggedIndex === index ? 'border-blue-500 opacity-50' : 'border-gray-200'}
              hover:border-blue-300
            `}
          >
            {/* Waypoint Header */}
            <div className="flex items-center gap-2 p-3">
              <GripVertical className="w-5 h-5 text-gray-400 flex-shrink-0" />

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="font-medium text-gray-900">
                    Waypoint {index + 1}
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-mono mt-1">
                  {waypoint.lat.toFixed(6)}, {waypoint.lng.toFixed(6)}
                </p>
              </div>

              <button
                onClick={() =>
                  setExpandedId(expandedId === waypoint.id ? null : waypoint.id)
                }
                className="p-1 hover:bg-gray-100 rounded transition"
              >
                {expandedId === waypoint.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>

              <button
                onClick={() => onDelete(waypoint.id)}
                className="p-1 hover:bg-red-50 rounded transition"
              >
                <Trash2 className="w-5 h-5 text-red-600" />
              </button>
            </div>

            {/* Expanded Details */}
            {expandedId === waypoint.id && (
              <div className="px-3 pb-3 space-y-3 border-t border-gray-200 pt-3">
                {/* Altitude */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Altitude (meters)
                  </label>
                  <input
                    type="number"
                    value={waypoint.altitude}
                    onChange={(e) =>
                      onUpdate(waypoint.id, {
                        altitude: parseFloat(e.target.value),
                      })
                    }
                    min="0"
                    max="500"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Speed */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Speed (m/s)
                  </label>
                  <input
                    type="number"
                    value={waypoint.speed}
                    onChange={(e) =>
                      onUpdate(waypoint.id, {
                        speed: parseFloat(e.target.value),
                      })
                    }
                    min="0"
                    max="20"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Action */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Action
                  </label>
                  <select
                    value={waypoint.action}
                    onChange={(e) =>
                      onUpdate(waypoint.id, {
                        action: e.target.value as Waypoint['action'],
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="none">None</option>
                    <option value="hover">Hover</option>
                    <option value="capture">Capture Photo</option>
                    <option value="scan">Scan Area</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={() => {
            if (window.confirm('Clear all waypoints?')) {
              waypoints.forEach((wp) => onDelete(wp.id));
            }
          }}
          className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
        >
          Clear All Waypoints
        </button>
      </div>
    </div>
  );
}
