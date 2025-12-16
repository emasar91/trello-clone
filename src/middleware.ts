import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { routing } from './i18n/routing'
import createMiddleware from 'next-intl/middleware'
import { routes as publicRoutes } from './constants'

export const COOKIE_NAME = 'authToken'

// Middleware de next-intl
const intlMiddleware = createMiddleware(routing)

const authRoutes: string[] = ['login', 'register', 'reset-password']

/**
 * Middleware que maneja las siguientes reglas:
 * - Si no está logueado y se intenta acceder a una ruta protegida, redirige a home del idioma
 * - Si está logueado y se intenta acceder a una ruta pública o a home, redirige a /u del idioma
 */
export function middleware(req: NextRequest) {
	const url = req.nextUrl.clone()

	const locale = url.locale ?? routing.defaultLocale

	// Quitar el locale de la ruta solo si realmente está presente
	let pathname = url.pathname

	// Caso: /es o /en solos → no son home
	const rootLocaleMatch = routing.locales.find((l) => pathname === `/${l}`)
	const isLocaleRoot = Boolean(rootLocaleMatch)

	// Remover el locale solo si está al inicio
	if (pathname.startsWith(`/${locale}/`)) {
		pathname = pathname.replace(`/${locale}/`, '/')
	} else if (pathname === `/${locale}`) {
		pathname = '/'
	}

	// Normalizar sin barra inicial
	const cleanPathname = pathname.replace(/^\//, '')

	const token = req.cookies.get(COOKIE_NAME)?.value

	const isProtected = cleanPathname.startsWith('u')
	const isAuthRoute = authRoutes.some((r) => cleanPathname.startsWith(r))
	const isPublicContent = publicRoutes.some((r) => cleanPathname.startsWith(r))

	// Home REAL: solo cuando pathname === '' y NO es /es o /en
	const isHome = cleanPathname === '' && !isLocaleRoot

	// ⭐ 1) Logueado y va a home / login / register / reset-password / rutas públicas → a /u
	if (token && (isHome || isAuthRoute || isPublicContent)) {
		url.pathname = `/${locale}/u`
		return NextResponse.redirect(url)
	}

	// ⭐ 2) No logueado y va a ruta protegida → a home del idioma
	if (!token && isProtected) {
		url.pathname = `/${locale}/`
		return NextResponse.redirect(url)
	}

	// ⭐ 3) Dejar next-intl manejar el resto
	return intlMiddleware(req)
}

export const config = {
	matcher: ['/((?!api|_next|.*\\..*).*)'],
}
