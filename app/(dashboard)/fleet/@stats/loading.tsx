import { SkeletonLoader } from '@/components/ui/AnimatedLoaders';

export default function StatsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-3"
        >
          <SkeletonLoader className="h-4 w-24" />
          <SkeletonLoader className="h-10 w-20" />
          <SkeletonLoader className="h-3 w-32" />
        </div>
      ))}
    </div>
  );
}
