// hooks/useProtectedRoute.ts
'use client'
import { useAuth } from '@/context/useAuthContext'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Hook to protect routes based on user authentication status.
 * If the user is not authenticated and the route is protected, it will redirect to the homepage.
 * If the user is authenticated and the route is not protected or is mock public, it will redirect to the user's homepage.
 * @param {boolean} isProtected - Whether the route is protected or not.
 * @param {boolean} [isMockPublic] - Whether the route is mock public or not. Defaults to false.
 * @returns {void}
 */
export const useProtectedRoute = (
	isProtected: boolean,
	isMockPublic?: boolean
) => {
	const { user, loading } = useAuth()
	const locale = useLocale()
	const router = useRouter()
	const pathname = usePathname()
	const currentLocale = locale || 'es'
	useEffect(() => {
		if (!loading) {
			if (isProtected && !user) {
				router.replace(`/${currentLocale}/`)
			}
			if (
				!isProtected &&
				user &&
				(pathname === `/${currentLocale}` || isMockPublic)
			) {
				router.replace(`/${currentLocale}/u`)
			}
		}
	}, [
		user,
		loading,
		router,
		isProtected,
		isMockPublic,
		locale,
		pathname,
		currentLocale,
	])
}
