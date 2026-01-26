import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/lib/mockDb';
import { delay } from '@/lib/utils';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Simulate network delay
    await delay(Math.random() * 300 + 200);

    // Simulate 5% error rate
    if (Math.random() < 0.05) {
      return NextResponse.json(
        { error: 'Failed to fetch drone' },
        { status: 500 }
      );
    }

    // Get drone from mock database
    const drone = mockDb.getDrone(id);

    if (!drone) {
      return NextResponse.json({ error: 'Drone not found' }, { status: 404 });
    }

    return NextResponse.json({
      data: drone,
      message: 'Drone fetched successfully',
    });
  } catch (error) {
    console.error('Error fetching drone:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    await delay(Math.random() * 300 + 200);

    // Simulate 5% error rate
    if (Math.random() < 0.05) {
      return NextResponse.json(
        { error: 'Failed to update drone' },
        { status: 500 }
      );
    }

    const drone = mockDb.getDrone(id);

    if (!drone) {
      return NextResponse.json({ error: 'Drone not found' }, { status: 404 });
    }

    // Update drone status if provided
    if (body.status) {
      const updatedDrone = mockDb.updateDroneStatus(id, body.status);
      return NextResponse.json({
        data: updatedDrone,
        message: 'Drone updated successfully',
      });
    }

    return NextResponse.json({
      data: drone,
      message: 'No updates applied',
    });
  } catch (error) {
    console.error('Error updating drone:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
