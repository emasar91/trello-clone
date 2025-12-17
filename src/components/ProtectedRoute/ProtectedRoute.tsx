'use client'

import { ReactNode } from 'react'
import { useAuth } from '@/context/useAuthContext'
import { useProtectedRoute } from '@/hooks/useProtectedRoute'
import { Box, CircularProgress } from '@mui/material'
import { ProtectedRouteStyles } from './ProtectedRoute.styles'

interface ProtectedPageProps {
	children: ReactNode
	isProtected?: boolean
	isMockPublic?: boolean
}

/**
 * Componente que renderiza o conteúdo apenas se o usuário estiver
 * autenticado e a rota for protegida estiver definida.
 * Se a rota for protegida for definida, mas o usuário
 * não estiver autenticado, o conteúdo não ser  renderizado.
 * Se a rota for protegida não for definida, mas o usuário
 * estiver autenticado, o conteúdo não ser  renderizado.
 * Se a rota for protegida for definida e o usuário estiver
 * autenticado, o conteúdo ser  renderizado.
 * Se a rota for protegida não for definida, mas o usuário
 * não estiver autenticado, o conteúdo ser  renderizado.
 *
 * @param {ReactNode} children - O conteúdo a ser renderizado.
 * @param {boolean} isProtected - Se a rota for protegida estiver
 *                        definida. O padr o   true.
 * @param {boolean} isMockPublic - Se a rota for protegida for
 *                        p blica. O padr o   false.
 */
export function ProtectedPage({
	children,
	isProtected = true,
	isMockPublic = false,
}: ProtectedPageProps) {
	const { user, loading } = useAuth()
	useProtectedRoute(isProtected, isMockPublic)

	// Mientras carga auth o no hay usuario en ruta protegida → no renderizamos nada
	if (loading) {
		return (
			<Box sx={ProtectedRouteStyles}>
				<CircularProgress size={60} />
			</Box>
		)
	}
	if (!user && !loading && isProtected) {
		return null
	}
	if (user && !loading && !isProtected) {
		return null
	}

	return <>{children}</>
}
