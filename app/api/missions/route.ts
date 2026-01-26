import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/lib/mockDb';
import { delay } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    // Simulate network delay
    await delay(Math.random() * 300 + 200);

    // Simulate 5% error rate
    if (Math.random() < 0.05) {
      return NextResponse.json(
        { error: 'Failed to fetch missions' },
        { status: 500 }
      );
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const droneId = searchParams.get('droneId');

    // Get missions from mock database
    const missions = mockDb.getMissions(droneId || undefined);

    return NextResponse.json({
      data: missions,
      message: 'Missions fetched successfully',
    });
  } catch (error) {
    console.error('Error fetching missions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await delay(Math.random() * 300 + 200);

    const body = await request.json();

    // Validate required fields
    if (
      !body.name ||
      !body.droneId ||
      !body.waypoints ||
      body.waypoints.length < 5
    ) {
      return NextResponse.json(
        {
          error:
            'Invalid mission data. Name, droneId, and at least 5 waypoints are required.',
        },
        { status: 400 }
      );
    }

    // Create mission in mock database
    const newMission = mockDb.createMission({
      name: body.name,
      droneId: body.droneId,
      status: body.status || 'pending',
      waypoints: body.waypoints,
      completedAt: null,
    });

    return NextResponse.json(
      {
        data: newMission,
        message: 'Mission created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating mission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await delay(Math.random() * 300 + 200);

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Mission ID is required' },
        { status: 400 }
      );
    }

    const deleted = mockDb.deleteMission(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Mission not found' }, { status: 404 });
    }

    return NextResponse.json({
      data: { id },
      message: 'Mission deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting mission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
