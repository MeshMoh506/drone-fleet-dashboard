import { SkeletonLoader, DroneLoader } from '@/components/ui/AnimatedLoaders';

export default function DroneDetailLoading() {
  return (
    <div className="p-6 space-y-6">
      {/* Back button skeleton */}
      <SkeletonLoader className="h-8 w-32" />

      {/* Header skeleton */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <SkeletonLoader className="w-16 h-16 rounded-xl" />
            <div className="space-y-2">
              <SkeletonLoader className="h-8 w-48" />
              <SkeletonLoader className="h-4 w-32" />
              <SkeletonLoader className="h-6 w-24 rounded-full" />
            </div>
          </div>
          <div className="space-y-2 text-right">
            <SkeletonLoader className="h-10 w-20" />
            <SkeletonLoader className="h-4 w-24" />
            <SkeletonLoader className="h-2 w-48" />
          </div>
        </div>
      </div>

      {/* Health status cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg border-2 p-4">
            <div className="flex items-center gap-3">
              <SkeletonLoader className="w-5 h-5 rounded" />
              <div className="space-y-2 flex-1">
                <SkeletonLoader className="h-3 w-20" />
                <SkeletonLoader className="h-5 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Telemetry & Mission History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Telemetry skeleton */}
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <div className="flex items-center justify-between">
              <SkeletonLoader className="h-6 w-32" />
              <SkeletonLoader className="h-4 w-24" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <SkeletonLoader className="h-4 w-20" />
                  <SkeletonLoader className="h-6 w-24" />
                </div>
              ))}
            </div>
          </div>

          {/* Mission history skeleton */}
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <SkeletonLoader className="h-6 w-40" />
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonLoader key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Command panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-6 space-y-3">
            <SkeletonLoader className="h-6 w-32" />
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonLoader key={i} className="h-12 w-full rounded-lg" />
            ))}
            <div className="pt-6 border-t border-gray-200">
              <SkeletonLoader className="h-12 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
