import {
  DroneGridSkeleton,
  StatsCardSkeleton,
  Skeleton,
} from '@/components/ui/LoadingSkeleton';

export default function FleetLoading() {
  return (
    <div className="p-6 space-y-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Stats cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <StatsCardSkeleton key={i} />
        ))}
      </div>

      {/* Filter bar skeleton */}
      <div className="flex gap-4 items-center">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Drone grid skeleton */}
      <DroneGridSkeleton count={9} />
    </div>
  );
}
