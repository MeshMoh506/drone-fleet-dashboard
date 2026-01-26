import { useQuery } from '@tanstack/react-query';
import { Drone, DroneFilters } from '@/lib/types';

// Fetch all drones
export function useDrones(filters?: DroneFilters) {
  return useQuery({
    queryKey: ['drones', filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (filters?.status) params.append('status', filters.status);
      if (filters?.search) params.append('search', filters.search);
      if (filters?.minBattery)
        params.append('minBattery', filters.minBattery.toString());
      if (filters?.maxBattery)
        params.append('maxBattery', filters.maxBattery.toString());

      const url = `/api/drones${params.toString() ? `?${params.toString()}` : ''}`;
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error('Failed to fetch drones');
      }

      const data = await res.json();
      return data.data as Drone[];
    },
    // Refetch every 2 seconds for live updates
    refetchInterval: 2000,
  });
}

// Fetch single drone
export function useDrone(id: string) {
  return useQuery({
    queryKey: ['drone', id],
    queryFn: async () => {
      const res = await fetch(`/api/drones/${id}`);

      if (!res.ok) {
        throw new Error('Failed to fetch drone');
      }

      const data = await res.json();
      return data.data as Drone;
    },
    // Refetch every 1 second for real-time telemetry
    refetchInterval: 1000,
    enabled: !!id, // Only fetch if id exists
  });
}
