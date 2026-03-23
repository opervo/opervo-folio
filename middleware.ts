// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  // Only apply CORS to /api/qbo/* routes
  if (!req.nextUrl.pathname.startsWith('/api/qbo')) {
    return NextResponse.next()
  }

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': 'https://app.opervo.io',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    })
  }

  // Add CORS headers to actual response
  const res = NextResponse.next()
  res.headers.set('Access-Control-Allow-Origin', 'https://app.opervo.io')
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return res
}

export const config = {
  matcher: '/api/qbo/:path*',
}
