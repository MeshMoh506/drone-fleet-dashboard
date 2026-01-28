import { mockDb } from '@/lib/mockDb';
import FleetClient from '../FleetClient';

export default async function DronesList() {
  // Simulate some loading time
  await new Promise((resolve) => setTimeout(resolve, 300));

  const drones = mockDb.getDrones();

  return <FleetClient initialDrones={drones} />;
}
