'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/AuthProvider'
import { CircularProgress } from '@mui/material'

/**
 * A client-side component that wraps the given children and only renders them
 * if the user is logged in. If the user is not logged in, it redirects to
 * '/login-required'. While the user is logging in, it displays a circular progress
 * indicator.
 *
 * @param {{ children: React.ReactNode }} props
 * @prop {React.ReactNode} children The children to render if the user is logged in.
 * @returns {React.ReactElement} A CircularProgress if the user is logging in, the
 * children if the user is logged in, or a redirect to '/login-required' if the user
 * is not logged in.
 */
export default function ProtectedRoute({
	children,
}: {
	children: React.ReactNode
}) {
	const { user, loading } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!loading && !user) {
			router.replace('/login-required')
		}
	}, [user, loading, router])

	if (loading) return <CircularProgress />

	return <>{children}</>
}
