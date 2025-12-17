'use client'

import { useAuth } from '@/context/useAuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
/**
 * AppTrelloPage es un componente que envuelve el componente AppTrello.
 * Verifica si el usuario está autenticado y si lo está, redirige al usuario a su página correspondiente.
 * Si el usuario no está autenticado, retorna null.
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
