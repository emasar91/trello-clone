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
