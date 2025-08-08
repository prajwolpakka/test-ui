import { NextResponse } from 'next/server';
import { issueTokens, verifyRefreshToken } from '@/lib/auth/jwt';

export async function POST(req: Request) {
  const refreshToken = req.headers
    .get('cookie')
    ?.split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith('refreshToken='))
    ?.split('=')[1];

  if (!refreshToken) {
    return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
  }

  try {
    const payload = verifyRefreshToken(refreshToken);
    const { accessToken, refreshToken: newRefreshToken } = issueTokens({
      id: String(payload.sub),
      email: String(payload.email),
      role: String(payload.role || ''),
      name: '',
    });

    const res = NextResponse.json({ ok: true });

    res.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 15 * 60,
    });
    res.cookies.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return res;
  } catch {
    return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
  }
}