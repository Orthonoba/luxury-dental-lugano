import { NextRequest, NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './src/i18n/routing'
import { decodeTokenEdge } from './src/lib/auth-edge'

const intlMiddleware = createIntlMiddleware(routing)

const PORTAL_COOKIE = 'portal_session'

function isPortalRoute(pathname: string): boolean {
  return /^\/(?:en|es|it|de|fr)\/portal(?:\/|$)/.test(pathname)
}

function isPortalLoginRoute(pathname: string): boolean {
  return /^\/(?:en|es|it|de|fr)\/portal\/login(?:\/|$)/.test(pathname)
}

function isPortalAuthRoute(pathname: string): boolean {
  return /^\/(?:en|es|it|de|fr)\/portal\/(?:login|forgot-password|reset-password)(?:\/|$)/.test(pathname)
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Let i18n middleware handle locale routing first for non-API routes
  if (/\.(ico|png|jpg|jpeg|svg|css|js|woff2?)$/.test(pathname)) {
    return NextResponse.next()
  }

  // Portal route protection
  if (isPortalRoute(pathname)) {
    const token = request.cookies.get(PORTAL_COOKIE)?.value
    const session = token ? decodeTokenEdge(token) : null

    // Valid session → allow through (including to login page → redirect to dashboard)
    if (session) {
      if (isPortalLoginRoute(pathname)) {
        const locale = pathname.split('/')[1]
        return NextResponse.redirect(new URL(`/${locale}/portal`, request.url))
      }
      return intlMiddleware(request)
    }

    // No session → only allow auth pages
    if (!isPortalAuthRoute(pathname)) {
      const locale = pathname.split('/')[1]
      const loginUrl = new URL(`/${locale}/portal/login`, request.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|crm|_next|_vercel|.*\\..*).*)'],
}
