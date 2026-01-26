'use client';

import { useState } from 'react';
import { Drone, Mission, Telemetry } from '@/lib/types';
import { useDrone } from '@/hooks/useDrones';
import { useMissions } from '@/hooks/useMissions';
import { useTelemetry } from '@/hooks/useTelemetry';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import DroneHeader from '././DroneHeader';
import TelemetryPanel from '././TelemetryPanel';
import CommandPanel from '././CommandPanel';
import MissionHistory from '././MissionHistory';
import HealthStatus from '././HealthStatus';

interface DroneDetailClientProps {
  initialDrone: Drone;
  initialMissions: Mission[];
  initialTelemetry?: Telemetry;
}

export default function DroneDetailClient({
  initialDrone,
  initialMissions,
  initialTelemetry,
}: DroneDetailClientProps) {
  // Real-time data with React Query
  const { data: drone } = useDrone(initialDrone.id);
  const { data: missions } = useMissions(initialDrone.id);
  const { data: telemetry } = useTelemetry(initialDrone.id);

  // Use initial data as fallback
  const currentDrone = drone || initialDrone;
  const currentMissions = missions || initialMissions;
  const currentTelemetry = telemetry || initialTelemetry;

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <Link
        href="/fleet"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Fleet
      </Link>

      {/* Header */}
      <DroneHeader drone={currentDrone} />

      {/* Health Status */}
      <HealthStatus drone={currentDrone} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Telemetry (2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          <TelemetryPanel drone={currentDrone} telemetry={currentTelemetry} />

          {/* Mission History */}
          <MissionHistory missions={currentMissions} />
        </div>

        {/* Right: Commands (1 column) */}
        <div className="lg:col-span-1">
          <CommandPanel drone={currentDrone} />
        </div>
      </div>
    </div>
  );
}
