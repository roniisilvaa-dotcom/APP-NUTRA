import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth

  // Páginas públicas (match exato)
  const publicPages = ['/', '/login', '/register', '/pricing']
  // APIs públicas (match por prefixo) — cadastro, auth e webhooks precisam ser acessíveis sem sessão
  const publicApiPrefixes = ['/api/register', '/api/auth', '/api/webhooks']

  const isPublic =
    publicPages.includes(pathname) ||
    publicApiPrefixes.some((p) => pathname.startsWith(p))

  if (!isLoggedIn && !isPublic) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (isLoggedIn && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
