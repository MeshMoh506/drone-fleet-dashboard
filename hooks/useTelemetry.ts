import { useQuery } from '@tanstack/react-query';
import { Telemetry } from '@/lib/types';

// Fetch telemetry for all drones
export function useAllTelemetry() {
  return useQuery({
    queryKey: ['telemetry', 'all'],
    queryFn: async () => {
      const res = await fetch('/api/telemetry');

      if (!res.ok) {
        throw new Error('Failed to fetch telemetry');
      }

      const data = await res.json();
      return data.data as Telemetry[];
    },
    // Very fast refresh for telemetry (every second)
    refetchInterval: 1000,
  });
}

// Fetch telemetry for specific drone
export function useTelemetry(droneId: string) {
  return useQuery({
    queryKey: ['telemetry', droneId],
    queryFn: async () => {
      const res = await fetch(`/api/telemetry?droneId=${droneId}`);

      if (!res.ok) {
        throw new Error('Failed to fetch telemetry');
      }

      const data = await res.json();
      return data.data as Telemetry;
    },
    refetchInterval: 1000,
    enabled: !!droneId,
  });
}
