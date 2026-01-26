'use client';

import { useMemo, useState } from 'react';
import { Drone } from '@/lib/types';
import { useDrones } from '@/hooks/useDrones';
import { Search, Filter, Grid3x3, List } from 'lucide-react';
import DroneCard from '@/components/fleet/DroneCard';
import { DroneGridSkeleton } from '@/components/ui/LoadingSkeleton';
import { InlineError } from '@/components/ui/ErrorBoundary';

interface FleetClientProps {
  initialDrones: Drone[];
}

export default function FleetClient({ initialDrones }: FleetClientProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Use React Query with initial data from server
  const { data: drones, isLoading, error, refetch } = useDrones();

  // Client-side filtering and sorting
  const filteredDrones = useMemo(() => {
    if (!drones) return initialDrones;

    let filtered = [...drones];

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (drone) =>
          drone.name.toLowerCase().includes(searchLower) ||
          drone.model.toLowerCase().includes(searchLower) ||
          drone.id.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((drone) => drone.status === statusFilter);
    }

    return filtered;
  }, [drones, search, statusFilter, initialDrones]);

  if (error) {
    return <InlineError error={error as Error} reset={() => refetch()} />;
  }

  return (
    <div className="space-y-4">
      {/* Filters Bar */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search drones by name, model, or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400 w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="charging">Charging</option>
              <option value="in-mission">In Mission</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-3 text-sm text-gray-600">
          Showing {filteredDrones.length} of{' '}
          {drones?.length || initialDrones.length} drones
        </div>
      </div>

      {/* Drone Grid/List */}
      {isLoading ? (
        <DroneGridSkeleton count={9} />
      ) : filteredDrones.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 text-lg">
            No drones found matching your filters
          </p>
          <button
            onClick={() => {
              setSearch('');
              setStatusFilter('all');
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
              : 'space-y-4'
          }
        >
          {filteredDrones.map((drone) => (
            <DroneCard key={drone.id} drone={drone} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  );
}
