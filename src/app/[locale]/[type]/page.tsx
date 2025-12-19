'use client'

import { useAuth } from '@/context/useAuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

/**
 * AppTrelloPage es un componente que redirige al usuario a su perfil si el usuario esta autenticado.
 * Si el usuario no esta autenticado, el componente no renderiza nada.
 * @param {ReactNode} children - El contenido a ser renderizado.
 */
export default function AppTrelloPage() {
	const { user, authReady } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!authReady) return
		if (!user) return

		const { uid, displayName, email } = user

		const username = displayName
			? displayName.toLowerCase().replace(/\s+/g, '')
			: email?.split('@')[0]

		if (!username) return

		router.replace(`/u/${username}/boards?uid=${uid}`)
	}, [authReady, user, router])

	return null
}
