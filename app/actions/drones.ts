'use server';

import { revalidatePath } from 'next/cache';
import { mockDb } from '@/lib/mockDb';
import { DroneStatus } from '@/lib/types';
import { delay } from '@/lib/utils';

// Update drone status
export async function updateDroneStatus(droneId: string, status: DroneStatus) {
  try {
    // Simulate network delay
    await delay(Math.random() * 300 + 200);

    // Simulate 5% error rate
    if (Math.random() < 0.05) {
      return {
        success: false,
        error: 'Network error. Please try again.',
      };
    }

    const updatedDrone = mockDb.updateDroneStatus(droneId, status);

    if (!updatedDrone) {
      return {
        success: false,
        error: 'Drone not found',
      };
    }

    // Revalidate cache
    revalidatePath('/fleet');
    revalidatePath(`/drones/${droneId}`);
    revalidatePath('/map');

    return {
      success: true,
      data: updatedDrone,
      message: `Drone status updated to ${status}`,
    };
  } catch (error) {
    console.error('Error updating drone status:', error);
    return {
      success: false,
      error: 'Failed to update drone status',
    };
  }
}

// Send command to drone (ARM, TAKEOFF, LAND, RTL)
export async function sendDroneCommand(
  droneId: string,
  command: 'ARM' | 'TAKEOFF' | 'LAND' | 'RTL'
) {
  try {
    await delay(Math.random() * 500 + 300);

    const drone = mockDb.getDrone(droneId);

    if (!drone) {
      return {
        success: false,
        error: 'Drone not found',
      };
    }

    // Simulate command execution
    let newStatus: DroneStatus = drone.status;

    switch (command) {
      case 'ARM':
        newStatus = 'online';
        break;
      case 'TAKEOFF':
        if (drone.battery < 20) {
          return {
            success: false,
            error: 'Battery too low for takeoff',
          };
        }
        newStatus = 'in-mission';
        break;
      case 'LAND':
      case 'RTL':
        newStatus = 'online';
        break;
    }

    // Update status
    const updatedDrone = mockDb.updateDroneStatus(droneId, newStatus);

    // Revalidate cache
    revalidatePath('/fleet');
    revalidatePath(`/drones/${droneId}`);
    revalidatePath('/map');

    return {
      success: true,
      data: updatedDrone,
      message: `Command ${command} executed successfully`,
    };
  } catch (error) {
    console.error('Error sending drone command:', error);
    return {
      success: false,
      error: 'Failed to execute command',
    };
  }
}

// Emergency stop
export async function emergencyStop(droneId: string) {
  try {
    await delay(100); // Minimal delay for emergency

    const drone = mockDb.getDrone(droneId);

    if (!drone) {
      return {
        success: false,
        error: 'Drone not found',
      };
    }

    // Set to offline immediately
    const updatedDrone = mockDb.updateDroneStatus(droneId, 'offline');

    // Revalidate cache
    revalidatePath('/fleet');
    revalidatePath(`/drones/${droneId}`);
    revalidatePath('/map');

    return {
      success: true,
      data: updatedDrone,
      message: 'Emergency stop activated',
    };
  } catch (error) {
    console.error('Error executing emergency stop:', error);
    return {
      success: false,
      error: 'Failed to execute emergency stop',
    };
  }
}
