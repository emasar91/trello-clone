// hooks/useProtectedRoute.ts
'use client'
import { useAuth } from '@/context/useAuthContext'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

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
