import { NextRequest, NextResponse } from 'next/server';

// Middleware without authentication
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- req required by Next.js middleware signature
export default function middleware(req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ]
};
