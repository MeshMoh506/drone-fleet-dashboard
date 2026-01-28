import {
  DroneGridSkeleton,
  SkeletonLoader,
} from '@/components/ui/AnimatedLoaders';

export default function FleetLoading() {
  return (
    <div className="p-6 space-y-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <SkeletonLoader className="h-8 w-48" />
        <SkeletonLoader className="h-4 w-96" />
      </div>

      {/* Stats cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 space-y-3">
            <SkeletonLoader className="h-4 w-20" />
            <SkeletonLoader className="h-8 w-16" />
            <SkeletonLoader className="h-3 w-24" />
          </div>
        ))}
      </div>

      {/* Filter bar skeleton */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex gap-4 items-center">
          <SkeletonLoader className="h-10 flex-1" />
          <SkeletonLoader className="h-10 w-32" />
          <SkeletonLoader className="h-10 w-24" />
        </div>
      </div>

      {/* Drone grid skeleton with stagger animation */}
      <DroneGridSkeleton count={9} />
    </div>
  );
}
