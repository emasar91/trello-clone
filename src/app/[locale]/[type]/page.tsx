'use client'

import { useAuth } from '@/context/useAuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
/**
 * AppTrelloPage is a higher-order component that wraps the AppTrello component.
 * It checks if the user is logged in and if so, redirects the user to their corresponding page.
 * If the user is not logged in, it returns null.
 * @param {Object} user - The user object from the useAuth hook.
 * @param {Object} loading - The loading state from the useAuth hook.
 * @param {Object} router - The useRouter hook from Next.js.
 * @returns {null} - If the user is not logged in, it returns null.
 */
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
