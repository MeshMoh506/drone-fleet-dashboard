import {
  Drone,
  Mission,
  Telemetry,
  Waypoint,
  DroneStatus,
  MissionStatus,
  WaypointAction,
  DroneFilters,
  FlightStats,
} from './types';
import { randomInRange, randomInt, randomChoice, generateId } from './utils';

class MockDatabase {
  private drones: Drone[] = [];
  private missions: Mission[] = [];
  private telemetryCache: Map<string, Telemetry> = new Map();
  private updateInterval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.initializeDrones();
    this.initializeMissions();
    this.startLiveSimulation();
  }

  // Initialize 25 drones with varied states
  private initializeDrones(): void {
    const statuses = ['online', 'offline', 'charging', 'in-mission'] as const;
    const models = [
      'DJI Phantom 4',
      'DJI Mavic 3',
      'Skydio 2+',
      'Autel EVO II',
      'Parrot Anafi',
    ] as const;

    // San Francisco coordinates as base
    const baseLat = 37.7749;
    const baseLng = -122.4194;
    // Create 25 drones as mock data
    for (let i = 1; i <= 25; i++) {
      const status = randomChoice(statuses);
      const drone: Drone = {
        id: `drone-${i}`,
        name: `Drone ${String(i).padStart(2, '0')}`,
        model: randomChoice(models),
        status,
        battery: status === 'charging' ? randomInt(20, 60) : randomInt(10, 100),
        position: {
          lat: baseLat + randomInRange(-0.05, 0.05),
          lng: baseLng + randomInRange(-0.05, 0.05),
        },
        altitude: status === 'in-mission' ? randomInRange(20, 100) : 0,
        speed: status === 'in-mission' ? randomInRange(5, 20) : 0,
        flightHours: randomInt(10, 500),
        lastMission: new Date(
          Date.now() - randomInt(0, 7 * 24 * 60 * 60 * 1000)
        ),
      };

      this.drones.push(drone);
      this.initializeTelemetry(drone);
    }
  }

  // Initialize 50+ missions
  private initializeMissions(): void {
    const missionStatuses = [
      'completed',
      'in-progress',
      'failed',
      'pending',
    ] as const;
    const missionNames = [
      'Perimeter Survey',
      'Building Inspection',
      'Agricultural Scan',
      'Search and Rescue',
      'Package Delivery',
      'Thermal Imaging',
      'Power Line Inspection',
      'Construction Progress',
      'Mapping Mission',
      'Security Patrol',
    ] as const;

    for (let i = 1; i <= 55; i++) {
      const status = randomChoice(missionStatuses);
      const createdAt = new Date(
        Date.now() - randomInt(0, 30 * 24 * 60 * 60 * 1000)
      );
      const duration = randomInt(300, 3600); // 5 min to 1 hour

      const mission: Mission = {
        id: `mission-${i}`,
        name: `${randomChoice(missionNames)} ${i}`,
        droneId: `drone-${randomInt(1, 25)}`,
        status,
        waypoints: this.generateWaypoints(randomInt(5, 12)),
        createdAt,
        completedAt:
          status === 'completed'
            ? new Date(createdAt.getTime() + duration * 1000)
            : null,
        duration: status === 'completed' ? duration : undefined,
      };

      this.missions.push(mission);
    }

    // Sort by creation date (newest first)
    this.missions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  // Generate random waypoints for a mission
  private generateWaypoints(count: number): Waypoint[] {
    const baseLat = 37.7749;
    const baseLng = -122.4194;
    const actions = ['hover', 'capture', 'scan', 'none'] as const;

    return Array.from({ length: count }, (_, i) => ({
      id: `waypoint-${i}`,
      order: i,
      lat: baseLat + randomInRange(-0.02, 0.02),
      lng: baseLng + randomInRange(-0.02, 0.02),
      altitude: randomInRange(30, 100),
      speed: randomInRange(5, 15),
      action: randomChoice(actions),
    }));
  }

  // Initialize telemetry for a drone
  private initializeTelemetry(drone: Drone): void {
    this.telemetryCache.set(drone.id, {
      droneId: drone.id,
      position: drone.position,
      altitude: drone.altitude,
      speed: drone.speed,
      battery: drone.battery,
      gpsSignal: randomInt(70, 100),
      heading: randomInt(0, 360),
      timestamp: new Date(),
    });
  }

  // Start live simulation (updates every second)
  private startLiveSimulation(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }

    this.updateInterval = setInterval(() => {
      this.drones.forEach((drone) => {
        // Update drones that are online or in-mission
        if (drone.status === 'online' || drone.status === 'in-mission') {
          // Simulate movement (small random changes)
          drone.position.lat += randomInRange(-0.0005, 0.0005);
          drone.position.lng += randomInRange(-0.0005, 0.0005);

          // Decrease battery slowly
          if (drone.battery > 0) {
            drone.battery = Math.max(
              0,
              drone.battery - randomInRange(0.05, 0.15)
            );
          }

          // Update speed and altitude for in-mission drones
          if (drone.status === 'in-mission') {
            drone.speed = randomInRange(5, 20);
            drone.altitude = randomInRange(20, 100);
          }

          // Update telemetry
          const telemetry = this.telemetryCache.get(drone.id);
          if (telemetry) {
            telemetry.position = { ...drone.position };
            telemetry.altitude = drone.altitude;
            telemetry.speed = drone.speed;
            telemetry.battery = drone.battery;
            telemetry.timestamp = new Date();
          }
        }

        // Random status changes (5% chance every second)
        if (Math.random() < 0.05) {
          const possibleStatuses = ['online', 'offline'] as const;
          drone.status = randomChoice(possibleStatuses);

          // Reset speed and altitude if going offline
          if (drone.status === 'offline') {
            drone.speed = 0;
            drone.altitude = 0;
          }
        }

        // Auto-charge if battery is low
        if (drone.battery < 10 && drone.status !== 'charging') {
          drone.status = 'charging';
          drone.speed = 0;
          drone.altitude = 0;
        }

        // Stop charging when battery reaches 100%
        if (drone.status === 'charging') {
          drone.battery = Math.min(100, drone.battery + 0.5);
          if (drone.battery >= 100) {
            drone.status = 'online';
          }
        }
      });
    }, 1000); // Update every second
  }

  // CRUD Operations for Drones
  public getDrones(filters?: DroneFilters): Drone[] {
    let result = [...this.drones];

    if (filters?.status) {
      result = result.filter((d) => d.status === filters.status);
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(searchLower) ||
          d.model.toLowerCase().includes(searchLower) ||
          d.id.toLowerCase().includes(searchLower)
      );
    }

    if (filters?.minBattery !== undefined) {
      result = result.filter((d) => d.battery >= filters.minBattery!);
    }

    if (filters?.maxBattery !== undefined) {
      result = result.filter((d) => d.battery <= filters.maxBattery!);
    }

    return result;
  }

  public getDrone(id: string): Drone | undefined {
    return this.drones.find((d) => d.id === id);
  }

  public updateDroneStatus(id: string, status: DroneStatus): Drone | null {
    const drone = this.drones.find((d) => d.id === id);
    if (drone) {
      drone.status = status;
      return drone;
    }
    return null;
  }

  // CRUD Operations for Missions
  public getMissions(droneId?: string): Mission[] {
    if (droneId) {
      return this.missions.filter((m) => m.droneId === droneId);
    }
    return [...this.missions];
  }

  public getMission(id: string): Mission | undefined {
    return this.missions.find((m) => m.id === id);
  }

  public createMission(
    missionData: Omit<Mission, 'id' | 'createdAt'>
  ): Mission {
    const newMission: Mission = {
      ...missionData,
      id: generateId('mission'),
      createdAt: new Date(),
    };
    this.missions.unshift(newMission); // Add to beginning
    return newMission;
  }

  public updateMission(
    id: string,
    updates: Partial<Omit<Mission, 'id' | 'createdAt'>>
  ): Mission | null {
    const mission = this.missions.find((m) => m.id === id);
    if (!mission) {
      return null;
    }

    const updatedMission = { ...mission, ...updates };
    const index = this.missions.findIndex((m) => m.id === id);
    this.missions[index] = updatedMission;
    return updatedMission;
  }

  public deleteMission(id: string): boolean {
    const index = this.missions.findIndex((m) => m.id === id);
    if (index !== -1) {
      this.missions.splice(index, 1);
      return true;
    }
    return false;
  }

  // Telemetry Operations
  public getTelemetry(droneId: string): Telemetry | undefined {
    return this.telemetryCache.get(droneId);
  }

  public getAllTelemetry(): Telemetry[] {
    return Array.from(this.telemetryCache.values());
  }

  // Analytics
  public getFlightStats(): FlightStats {
    const totalFlightHours = this.drones.reduce(
      (sum, d) => sum + d.flightHours,
      0
    );
    const averageBattery =
      this.drones.reduce((sum, d) => sum + d.battery, 0) / this.drones.length;
    const completedMissions = this.missions.filter(
      (m) => m.status === 'completed'
    ).length;
    const totalMissions = this.missions.length;
    const missionSuccessRate =
      totalMissions > 0 ? (completedMissions / totalMissions) * 100 : 0;
    const activeDrones = this.drones.filter(
      (d) => d.status === 'online' || d.status === 'in-mission'
    ).length;
    const inactiveDrones = this.drones.length - activeDrones;

    return {
      totalFlightHours,
      averageBattery,
      missionSuccessRate,
      activeDrones,
      inactiveDrones,
      totalMissions,
    };
  }

  // Cleanup
  public destroy(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }
}

//  instance so it can be imported and used across the web
export const mockDb = new MockDatabase();

// Cleanup on process exit (only in Node.js environment)
if (typeof process !== 'undefined' && process.on) {
  process.on('exit', () => mockDb.destroy());
}
