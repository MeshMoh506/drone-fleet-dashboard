import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/lib/mockDb';
import { delay } from '@/lib/utils';
import { DroneStatus } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    // Simulate network delay (200-500ms)
    await delay(Math.random() * 300 + 200);

    // Simulate 5% error rate
    if (Math.random() < 0.05) {
      return NextResponse.json(
        { error: 'Failed to fetch drones' },
        { status: 500 }
      );
    }

    // Get query parameters for filtering
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') as DroneStatus | null;
    const search = searchParams.get('search');
    const minBattery = searchParams.get('minBattery');
    const maxBattery = searchParams.get('maxBattery');

    // Build filters object
    const filters = {
      ...(status && { status }),
      ...(search && { search }),
      ...(minBattery && { minBattery: parseInt(minBattery) }),
      ...(maxBattery && { maxBattery: parseInt(maxBattery) }),
    };

    // Get drones from mock database
    const drones = mockDb.getDrones(
      Object.keys(filters).length > 0 ? filters : undefined
    );

    return NextResponse.json({
      data: drones,
      message: 'Drones fetched successfully',
    });
  } catch (error) {
    console.error('Error fetching drones:', error);
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
    if (!body.name || !body.model) {
      return NextResponse.json(
        { error: 'Name and model are required' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        data: body,
        message: 'Drone created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating drone:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
