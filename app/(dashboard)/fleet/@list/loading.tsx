import { DroneGridSkeleton } from '@/components/ui/AnimatedLoaders';

export default function ListLoading() {
  return (
    <div>
      <DroneGridSkeleton count={9} />
    </div>
  );
}
