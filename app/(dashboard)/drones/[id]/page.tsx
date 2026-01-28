import { notFound } from 'next/navigation';
import { mockDb } from '@/lib/mockDb';
import DroneDetailClient from '././DroneDetailClient';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const drone = mockDb.getDrone(id);

  if (!drone) {
    notFound();
  }

  return {
    title: `${drone.name} - Drone Details`,
    description: `View telemetry and control ${drone.name} (${drone.model})`,
  };
}

export default async function DronePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Fetch initial data on server
  const drone = mockDb.getDrone(id);

  if (!drone) {
    notFound();
  }

  // Get missions for this drone
  const missions = mockDb.getMissions(id);

  // Get telemetry
  const telemetry = mockDb.getTelemetry(id);

  return (
    <DroneDetailClient
      initialDrone={drone}
      initialMissions={missions}
      initialTelemetry={telemetry}
    />
  );
}
