import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/lib/mockDb';
import { delay } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    // Minimal delay for telemetry (real-time data)
    await delay(Math.random() * 100 + 50);

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const droneId = searchParams.get('droneId');

    if (droneId) {
      // Get telemetry for specific drone
      const telemetry = mockDb.getTelemetry(droneId);

      if (!telemetry) {
        return NextResponse.json(
          { error: 'Telemetry not found for this drone' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        data: telemetry,
        message: 'Telemetry fetched successfully',
      });
    }

    // Get telemetry for all drones
    const allTelemetry = mockDb.getAllTelemetry();

    return NextResponse.json({
      data: allTelemetry,
      message: 'All telemetry fetched successfully',
    });
  } catch (error) {
    console.error('Error fetching telemetry:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
