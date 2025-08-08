import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function getCookie(request: NextRequest, name: string) {
  return request.cookies.get(name)?.value;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = pathname.startsWith('/dashboard') || pathname.startsWith('/users');
  const isLogin = pathname === '/login';

  const accessToken = getCookie(request, 'accessToken');
  const refreshToken = getCookie(request, 'refreshToken');

  // If user is authenticated, prevent accessing login
  if (isLogin && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Allow public routes
  if (!isProtected) return NextResponse.next();

  // If neither token exists, redirect to login
  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If access token exists, allow through (API will still check on server)
  if (accessToken) {
    return NextResponse.next();
  }

  // If access token missing but refresh exists, attempt refresh
  if (!accessToken && refreshToken) {
    try {
      const refreshUrl = new URL('/api/refresh', request.url);
      const res = await fetch(refreshUrl, {
        method: 'POST',
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
      });

      if (res.ok) {
        // Let it pass through; cookies were set by API route
        return NextResponse.next();
      } else {
        // Refresh failed; redirect to login
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/users/:path*'],
};