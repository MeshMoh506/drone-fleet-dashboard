'use client';

import { useMemo, CSSProperties } from 'react';
import { FixedSizeList } from 'react-window';
import { Drone } from '@/lib/types';
import DroneCard from './DroneCard';

interface VirtualizedDroneGridProps {
  drones: Drone[];
  viewMode: 'grid' | 'list';
}

interface RowProps {
  index: number;
  style: CSSProperties;
}

export default function VirtualizedDroneGrid({
  drones,
  viewMode,
}: VirtualizedDroneGridProps) {
  // ALWAYS call hooks at the top, before any conditionals
  // useMemo returns the component function
  const Row = useMemo(
    () =>
      function RowComponent({ index, style }: RowProps) {
        const drone = drones[index];

        // Return empty div if drone doesn't exist
        if (!drone) {
          return <div style={style} />;
        }

        return (
          <div style={style} className="px-2">
            <DroneCard drone={drone} viewMode={viewMode} />
          </div>
        );
      },
    [drones, viewMode]
  );

  // NOW we can do conditionals
  // For small lists (< 20), use regular rendering (better UX)
  if (drones.length < 20) {
    return (
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
            : 'space-y-4'
        }
      >
        {drones.map((drone) => (
          <DroneCard key={drone.id} drone={drone} viewMode={viewMode} />
        ))}
      </div>
    );
  }

  // For large lists (20+), use virtualization
  return (
    <div className="w-full">
      <FixedSizeList
        height={800}
        itemCount={drones.length}
        itemSize={viewMode === 'grid' ? 280 : 150}
        width="100%"
      >
        {Row}
      </FixedSizeList>
    </div>
  );
}
