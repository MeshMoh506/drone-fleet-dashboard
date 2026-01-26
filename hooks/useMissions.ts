import { useQuery } from '@tanstack/react-query';
import { Mission } from '@/lib/types';

// Fetch all missions
export function useMissions(droneId?: string) {
  return useQuery({
    queryKey: ['missions', droneId],
    queryFn: async () => {
      const url = droneId
        ? `/api/missions?droneId=${droneId}`
        : '/api/missions';
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error('Failed to fetch missions');
      }

      const data = await res.json();
      return data.data as Mission[];
    },
    // Refetch every 5 seconds
    refetchInterval: 5000,
  });
}

// Fetch single mission
export function useMission(id: string) {
  return useQuery({
    queryKey: ['mission', id],
    queryFn: async () => {
      const missions = await fetch('/api/missions').then((r) => r.json());
      const mission = missions.data.find((m: Mission) => m.id === id);

      if (!mission) {
        throw new Error('Mission not found');
      }

      return mission as Mission;
    },
    enabled: !!id,
  });
}
