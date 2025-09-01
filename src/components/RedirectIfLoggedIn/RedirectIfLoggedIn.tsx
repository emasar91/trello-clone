'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/providers/AuthProvider'
import { CircularProgress } from '@mui/material'

/**
 * A client-side component that redirects the user to /appTrello if they are logged in.
 * If the user is not logged in, it renders the children.
 *
 * @param {{ children: React.ReactNode }} props
 * @prop {React.ReactNode} children The children to render if the user is not logged in.
 * @returns {React.ReactElement} A CircularProgress if the user is logging in, the children if not, or a redirect to /appTrello if the user is logged in.
 */
export default function RedirectIfLoggedIn({
	children,
}: {
	children: React.ReactNode
}) {
	const { user, loading } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!loading && user) {
			router.replace('/appTrello')
		}
	}, [user, loading, router])

	if (loading) return <CircularProgress />

	return <>{children}</>
}
