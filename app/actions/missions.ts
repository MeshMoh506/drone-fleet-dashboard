'use server';

import { revalidatePath } from 'next/cache';
import { mockDb } from '@/lib/mockDb';
import { Mission, Waypoint, MissionStatus } from '@/lib/types';
import { delay } from '@/lib/utils';

// Create a new mission
export async function createMission(formData: FormData) {
  try {
    // Simulate network delay
    await delay(Math.random() * 300 + 200);

    // Extract data from FormData
    const name = formData.get('name') as string;
    const droneId = formData.get('droneId') as string;
    const waypointsJson = formData.get('waypoints') as string;

    // Validate required fields
    if (!name || !droneId || !waypointsJson) {
      return {
        success: false,
        error: 'Missing required fields',
      };
    }

    // Parse waypoints
    let waypoints: Waypoint[];
    try {
      waypoints = JSON.parse(waypointsJson);
    } catch {
      return {
        success: false,
        error: 'Invalid waypoints format',
      };
    }

    // Validate minimum waypoints
    if (waypoints.length < 5) {
      return {
        success: false,
        error: 'At least 5 waypoints are required',
      };
    }

    // Create mission in mock database
    const newMission = mockDb.createMission({
      name,
      droneId,
      status: 'pending',
      waypoints,
      completedAt: null,
    });

    // Revalidate the missions page cache
    revalidatePath('/missions');
    revalidatePath('/missions/new');

    return {
      success: true,
      data: newMission,
      message: 'Mission created successfully',
    };
  } catch (error) {
    console.error('Error creating mission:', error);
    return {
      success: false,
      error: 'Failed to create mission',
    };
  }
}

// Create mission from JSON (for programmatic usage)
export async function createMissionFromJson(data: {
  name: string;
  droneId: string;
  waypoints: Waypoint[];
}) {
  try {
    await delay(Math.random() * 300 + 200);

    // Validate
    if (
      !data.name ||
      !data.droneId ||
      !data.waypoints ||
      data.waypoints.length < 5
    ) {
      return {
        success: false,
        error:
          'Invalid mission data. Name, droneId, and at least 5 waypoints are required.',
      };
    }

    // Create mission
    const newMission = mockDb.createMission({
      name: data.name,
      droneId: data.droneId,
      status: 'pending',
      waypoints: data.waypoints,
      completedAt: null,
    });

    // Revalidate cache
    revalidatePath('/missions');
    revalidatePath('/missions/new');

    return {
      success: true,
      data: newMission,
      message: 'Mission created successfully',
    };
  } catch (error) {
    console.error('Error creating mission:', error);
    return {
      success: false,
      error: 'Failed to create mission',
    };
  }
}

// Update mission
export async function updateMission(
  missionId: string,
  updates: {
    name?: string;
    status?: MissionStatus;
    waypoints?: Waypoint[];
  }
) {
  try {
    await delay(Math.random() * 300 + 200);

    // Simulate 5% error rate
    if (Math.random() < 0.05) {
      return {
        success: false,
        error: 'Network error. Please try again.',
      };
    }

    const updatedMission = mockDb.updateMission(missionId, updates);

    if (!updatedMission) {
      return {
        success: false,
        error: 'Mission not found',
      };
    }

    // Revalidate cache
    revalidatePath('/missions');
    revalidatePath(`/missions/${missionId}`);

    return {
      success: true,
      data: updatedMission,
      message: 'Mission updated successfully',
    };
  } catch (error) {
    console.error('Error updating mission:', error);
    return {
      success: false,
      error: 'Failed to update mission',
    };
  }
}

// Delete mission
export async function deleteMission(missionId: string) {
  try {
    await delay(Math.random() * 300 + 200);

    // Simulate 5% error rate
    if (Math.random() < 0.05) {
      return {
        success: false,
        error: 'Network error. Please try again.',
      };
    }

    const deleted = mockDb.deleteMission(missionId);

    if (!deleted) {
      return {
        success: false,
        error: 'Mission not found',
      };
    }

    // Revalidate cache
    revalidatePath('/missions');

    return {
      success: true,
      data: { id: missionId },
      message: 'Mission deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting mission:', error);
    return {
      success: false,
      error: 'Failed to delete mission',
    };
  }
}

// Complete mission
export async function completeMission(missionId: string) {
  try {
    await delay(Math.random() * 300 + 200);

    const mission = mockDb.getMission(missionId);

    if (!mission) {
      return {
        success: false,
        error: 'Mission not found',
      };
    }

    // Calculate duration if not already completed
    const duration = mission.duration || Math.floor(Math.random() * 3000) + 600;

    const updatedMission = mockDb.updateMission(missionId, {
      status: 'completed',
      completedAt: new Date(),
      duration,
    });

    // Revalidate cache
    revalidatePath('/missions');
    revalidatePath(`/missions/${missionId}`);

    return {
      success: true,
      data: updatedMission,
      message: 'Mission completed successfully',
    };
  } catch (error) {
    console.error('Error completing mission:', error);
    return {
      success: false,
      error: 'Failed to complete mission',
    };
  }
}
