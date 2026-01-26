'use client';

import dynamic from 'next/dynamic';
import { Drone } from '@/lib/types';
import { Skeleton } from '@/components/ui/LoadingSkeleton';

interface MissionPlanningClientProps {
  availableDrones: Drone[];
}

// Dynamic import for map to avoid SSR issues
const MissionMap = dynamic(() => import('./MissionMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
        <p className="text-gray-600">Loading mission planner...</p>
      </div>
    </div>
  ),
});

export default function MissionPlanningClient({
  availableDrones,
}: MissionPlanningClientProps) {
  return <MissionMap availableDrones={availableDrones} />;
}
