import { create } from 'zustand';
import { DroneStatus } from '@/lib/types';

interface FilterState {
  // Fleet filters
  search: string;
  status: DroneStatus | 'all';
  minBattery: number;
  maxBattery: number;
  sortBy: 'name' | 'battery' | 'status' | 'flightHours';
  sortOrder: 'asc' | 'desc';
  viewMode: 'grid' | 'list';

  // Actions
  setSearch: (search: string) => void;
  setStatus: (status: DroneStatus | 'all') => void;
  setBatteryRange: (min: number, max: number) => void;
  setSortBy: (sortBy: FilterState['sortBy']) => void;
  setSortOrder: (sortOrder: 'asc' | 'desc') => void;
  setViewMode: (viewMode: 'grid' | 'list') => void;
  resetFilters: () => void;
}

const initialState = {
  search: '',
  status: 'all' as const,
  minBattery: 0,
  maxBattery: 100,
  sortBy: 'name' as const,
  sortOrder: 'asc' as const,
  viewMode: 'grid' as const,
};

export const useFilterStore = create<FilterState>((set) => ({
  ...initialState,

  setSearch: (search) => set({ search }),
  setStatus: (status) => set({ status }),
  setBatteryRange: (minBattery, maxBattery) => set({ minBattery, maxBattery }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setViewMode: (viewMode) => set({ viewMode }),
  resetFilters: () => set(initialState),
}));
