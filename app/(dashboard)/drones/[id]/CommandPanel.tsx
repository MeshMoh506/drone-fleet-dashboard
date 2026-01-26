'use client';

import { useState } from 'react';
import { Drone } from '@/lib/types';
import { sendDroneCommand, emergencyStop } from '@/app/actions/drones';
import {
  Power,
  ArrowUp,
  ArrowDown,
  Home,
  AlertTriangle,
  Loader2,
} from 'lucide-react';

interface CommandPanelProps {
  drone: Drone;
}

export default function CommandPanel({ drone }: CommandPanelProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const handleCommand = async (command: 'ARM' | 'TAKEOFF' | 'LAND' | 'RTL') => {
    setLoading(true);
    setMessage(null);

    const result = await sendDroneCommand(drone.id, command);

    setLoading(false);

    if (result.success) {
      setMessage({ type: 'success', text: result.message || 'Command sent!' });
    } else {
      setMessage({ type: 'error', text: result.error || 'Command failed' });
    }

    // Clear message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  const handleEmergencyStop = async () => {
    if (!confirm('⚠️ Are you sure you want to perform an emergency stop?')) {
      return;
    }

    setLoading(true);
    setMessage(null);

    const result = await emergencyStop(drone.id);

    setLoading(false);

    if (result.success) {
      setMessage({
        type: 'success',
        text: result.message || 'Emergency stop activated!',
      });
    } else {
      setMessage({
        type: 'error',
        text: result.error || 'Emergency stop failed',
      });
    }

    setTimeout(() => setMessage(null), 3000);
  };

  const commands = [
    {
      id: 'ARM' as const,
      label: 'ARM',
      icon: Power,
      color: 'bg-green-600 hover:bg-green-700',
      disabled: drone.status === 'offline',
    },
    {
      id: 'TAKEOFF' as const,
      label: 'TAKEOFF',
      icon: ArrowUp,
      color: 'bg-blue-600 hover:bg-blue-700',
      disabled: drone.status === 'offline' || drone.battery < 20,
    },
    {
      id: 'LAND' as const,
      label: 'LAND',
      icon: ArrowDown,
      color: 'bg-yellow-600 hover:bg-yellow-700',
      disabled: drone.status !== 'in-mission',
    },
    {
      id: 'RTL' as const,
      label: 'RETURN TO LAUNCH',
      icon: Home,
      color: 'bg-purple-600 hover:bg-purple-700',
      disabled: drone.status !== 'in-mission',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6 sticky top-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Drone Control</h2>

      {/* Status Message */}
      {message && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm font-medium ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Command Buttons */}
      <div className="space-y-3 mb-6">
        {commands.map((command) => {
          const Icon = command.icon;
          return (
            <button
              key={command.id}
              onClick={() => handleCommand(command.id)}
              disabled={loading || command.disabled}
              className={`
                w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg
                text-white font-semibold transition
                ${command.color}
                disabled:bg-gray-300 disabled:cursor-not-allowed
              `}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Icon className="w-5 h-5" />
              )}
              {command.label}
            </button>
          );
        })}
      </div>

      {/* Emergency Stop */}
      <div className="pt-6 border-t border-gray-200">
        <button
          onClick={handleEmergencyStop}
          disabled={loading || drone.status === 'offline'}
          className="
            w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg
            bg-red-600 hover:bg-red-700 text-white font-semibold transition
            disabled:bg-gray-300 disabled:cursor-not-allowed
          "
        >
          <AlertTriangle className="w-5 h-5" />
          EMERGENCY STOP
        </button>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Immediately stops all drone operations
        </p>
      </div>

      {/* Battery Warning */}
      {drone.battery < 20 && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800 font-medium">
            ⚠️ Low Battery Warning
          </p>
          <p className="text-xs text-yellow-700 mt-1">
            Battery level is below 20%. TAKEOFF is disabled.
          </p>
        </div>
      )}

      {/* Offline Warning */}
      {drone.status === 'offline' && (
        <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-800 font-medium">🔌 Drone Offline</p>
          <p className="text-xs text-gray-600 mt-1">
            Cannot send commands while drone is offline.
          </p>
        </div>
      )}
    </div>
  );
}
