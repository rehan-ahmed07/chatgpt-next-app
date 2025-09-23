import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Read the cookie value (request.cookies.get returns a CookieValue object)
  const token = request.cookies.get('token')?.value ?? null;
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Run middleware for all app routes except Next internals and api
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
};