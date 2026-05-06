import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const intlMiddleware = createIntlMiddleware(routing)

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // QBO CORS handling — run before intl middleware
  if (pathname.startsWith('/api/qbo')) {
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
    const res = NextResponse.next()
    res.headers.set('Access-Control-Allow-Origin', 'https://app.opervo.io')
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    return res
  }

  // Skip intl for non-localizable paths
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/admin/') ||
    pathname.startsWith('/p/') ||
    pathname.startsWith('/r/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/_vercel/') ||
    /\.(.*)$/.test(pathname)
  ) {
    return NextResponse.next()
  }

  return intlMiddleware(req)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}
