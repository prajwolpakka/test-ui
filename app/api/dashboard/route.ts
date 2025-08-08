import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    totalUsers: 1234,
    activeUsers: 856,
    newSignups: 42,
    recentActivity: [
      'User John Doe logged in',
      'User Jane Smith updated profile',
      'New user registered',
    ],
  });
}
