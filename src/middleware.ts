import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { routing } from './i18n/routing'
import createMiddleware from 'next-intl/middleware'
import { routes as publicRoutes } from './constants'

export const COOKIE_NAME = 'authToken'

const intlMiddleware = createMiddleware(routing)

const authRoutes: string[] = ['login', 'register', 'reset-password']

export function middleware(req: NextRequest) {
	const url = req.nextUrl.clone()
	const locale = url.locale ?? routing.defaultLocale
	const pathname = url.pathname.replace(`/${locale}/`, '').replace(/^\//, '')
	const token = req.cookies.get(COOKIE_NAME)?.value

	const isProtected = pathname.startsWith('appTrello')
	const isAuthRoute = authRoutes.some((r) => pathname.startsWith(r))
	const isPublicContent = publicRoutes.some((r) => pathname.startsWith(r))
	const isHome = pathname === '' || pathname === '/'

	// 1️⃣ Si logueado y va a home / login / register / reset-password / rutas públicas → redirige a appTrello
	if (token && (isHome || isAuthRoute || isPublicContent)) {
		url.pathname = `/${locale}/appTrello`
		return NextResponse.redirect(url)
	}

	// 2️⃣ Si NO logueado y va a ruta protegida → redirige al home
	if (!token && isProtected) {
		url.pathname = `/${locale}/`
		return NextResponse.redirect(url)
	}

	// 3️⃣ Dejar que next-intl maneje locales
	return intlMiddleware(req)
}

export const config = {
	matcher: ['/((?!api|_next|.*\\..*).*)'],
}
