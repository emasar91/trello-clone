'use client'

import { useAuth } from '@/context/useAuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AppTrelloPage() {
	const { user, loading } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!loading && user?.displayName) {
			const nameUser = user.displayName.toLowerCase().replace(/ /g, '')
			router.replace(`/u/${nameUser}/boards`)
		}
		if (!loading && user?.displayName === null && user?.email) {
			const nameUser = user.email.toLowerCase().split('@')[0]
			router.replace(`/u/${nameUser}/boards`)
		}
	}, [loading, user, router])

	return null
}
