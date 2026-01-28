import { SkeletonLoader } from '@/components/ui/AnimatedLoaders';

export default function AnalyticsLoading() {
  return (
    <div className="p-6 space-y-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <SkeletonLoader className="h-8 w-64" />
        <SkeletonLoader className="h-4 w-96" />
      </div>

      {/* Stats cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 space-y-3">
            <SkeletonLoader className="h-4 w-24" />
            <SkeletonLoader className="h-10 w-20" />
          </div>
        ))}
      </div>

      {/* Time range selector skeleton */}
      <div className="flex justify-end">
        <SkeletonLoader className="h-10 w-64 rounded-lg" />
      </div>

      {/* Charts grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 space-y-4">
            <SkeletonLoader className="h-6 w-48" />
            {/* Chart area - fixed heights instead of dynamic */}
            <div className="space-y-2">
              <div className="flex items-end gap-2 h-64">
                <SkeletonLoader className="flex-1 h-32" />
                <SkeletonLoader className="flex-1 h-48" />
                <SkeletonLoader className="flex-1 h-40" />
                <SkeletonLoader className="flex-1 h-56" />
                <SkeletonLoader className="flex-1 h-44" />
                <SkeletonLoader className="flex-1 h-52" />
                <SkeletonLoader className="flex-1 h-36" />
                <SkeletonLoader className="flex-1 h-60" />
                <SkeletonLoader className="flex-1 h-42" />
                <SkeletonLoader className="flex-1 h-50" />
                <SkeletonLoader className="flex-1 h-38" />
                <SkeletonLoader className="flex-1 h-54" />
              </div>
              <div className="flex justify-between">
                {Array.from({ length: 6 }).map((_, j) => (
                  <SkeletonLoader key={j} className="h-4 w-12" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
