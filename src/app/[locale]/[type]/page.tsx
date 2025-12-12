'use client'

import { useAuth } from '@/context/useAuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
export default function AppTrelloPage() {
	const { user, loading } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (loading) return

		if (!user) return

		const { uid, displayName, email } = user

		if (displayName) {
			const nameUser = displayName.toLowerCase().replace(/ /g, '')
			router.replace(`/u/${nameUser}/boards?uid=${uid}`)
			return
		}

		if (displayName === null && email) {
			const nameUser = email.toLowerCase().split('@')[0]
			router.replace(`/u/${nameUser}/boards?uid=${uid}`)
		}
	}, [loading, user, router])

	return null
}
