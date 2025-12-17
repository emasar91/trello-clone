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
 * ProtectedPage es un componente que renderiza el contenido solo si el usuario esta autenticado y la ruta esta protegida.
 * Si la ruta es protegida, pero el usuario no esta autenticado, el contenido no sera renderizado.
 * Si la ruta no es protegida, pero el usuario esta autenticado, el contenido no sera renderizado.
 * @param {ReactNode} children - El contenido a ser renderizado.
 * @param {boolean} isProtected - Si la ruta es protegida esta definida. Por defecto es true.
 * @param {boolean} isMockPublic - Si la ruta es protegida no esta definida. Por defecto es false.
 */
export function ProtectedPage({
	children,
	isProtected = true,
	isMockPublic = false,
}: ProtectedPageProps) {
	const { user, loading } = useAuth()
	useProtectedRoute(isProtected, isMockPublic)

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
