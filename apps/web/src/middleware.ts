import { cookiesStorage } from '@treviaz/cookies'
import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const response = NextResponse.next()

  if (pathname.startsWith('/condominium')) {
    const [, , slug] = pathname.split('/')

    response.cookies.set(cookiesStorage.CURRENT_CONDOMINIUM, slug)
  } else {
    response.cookies.delete(cookiesStorage.CURRENT_CONDOMINIUM)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
