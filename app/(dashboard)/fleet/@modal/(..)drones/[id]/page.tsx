import DroneModal from '@/components/drones/DroneModal';
import { mockDb } from '@/lib/mockDb';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DroneModalPage({ params }: PageProps) {
  const { id } = await params;
  const drone = mockDb.getDrone(id);

  if (!drone) {
    notFound();
  }

  return <DroneModal drone={drone} />;
}
