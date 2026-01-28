import { mockDb } from '@/lib/mockDb';
import FleetStats from '../FleetStats';

export default async function StatsSection() {
  // Simulate some loading time
  await new Promise((resolve) => setTimeout(resolve, 500));

  const stats = mockDb.getFlightStats();

  return <FleetStats initialStats={stats} />;
}
