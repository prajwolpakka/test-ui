import { NextRequest, NextResponse } from 'next/server';
import { issueTokens } from '@/lib/auth/jwt';

export async function POST(req: NextRequest) {
  try {
    const { email, id, name, role } = await req.json();
    
    if (!email || !id) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { accessToken, refreshToken } = issueTokens({
      id,
      email,
      name,
      role,
    });

    const response = NextResponse.json({ success: true });
    
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 15 * 60,
    });
    
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Error setting cookies:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}