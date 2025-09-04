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
	useEffect(() => {
		if (!loading) {
			if (isProtected && !user) {
				router.replace(`/${locale}/`)
			}
			if (!isProtected && user && (pathname === `/${locale}` || isMockPublic)) {
				router.replace(`/${locale}/appTrello`)
			}
		}
	}, [user, loading, router, isProtected, isMockPublic, locale, pathname])
}
