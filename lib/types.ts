// Drone Types
export type DroneStatus = 'online' | 'offline' | 'charging' | 'in-mission';

export interface Position {
  lat: number;
  lng: number;
}

export interface Drone {
  id: string;
  name: string;
  model: string;
  status: DroneStatus;
  battery: number;
  position: Position;
  altitude: number;
  speed: number;
  flightHours: number;
  lastMission: Date;
  imageUrl?: string;
}

// Mission Types
export type MissionStatus = 'completed' | 'in-progress' | 'failed' | 'pending';
export type WaypointAction = 'hover' | 'capture' | 'scan' | 'none';

export interface Waypoint {
  id: string;
  order: number;
  lat: number;
  lng: number;
  altitude: number;
  speed: number;
  action: WaypointAction;
}

export interface Mission {
  id: string;
  name: string;
  droneId: string;
  status: MissionStatus;
  waypoints: Waypoint[];
  createdAt: Date;
  completedAt: Date | null;
  duration?: number;
}

// Telemetry Types
export interface Telemetry {
  droneId: string;
  position: Position;
  altitude: number;
  speed: number;
  battery: number;
  gpsSignal: number;
  heading: number;
  timestamp: Date;
}

// Analytics Types
export interface FlightStats {
  totalFlightHours: number;
  averageBattery: number;
  missionSuccessRate: number;
  activeDrones: number;
  inactiveDrones: number;
  totalMissions: number;
}

export interface ChartData {
  date: string;
  hours?: number;
  battery?: number;
  missions?: number;
  successRate?: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Filter Types
export interface DroneFilters {
  status?: DroneStatus;
  search?: string;
  minBattery?: number;
  maxBattery?: number;
}

export interface MissionFilters {
  status?: MissionStatus;
  droneId?: string;
  startDate?: Date;
  endDate?: Date;
}
