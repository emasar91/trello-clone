import WorkspacesPage from '@/components/Pages/Workspaces/WorkspacesPage'
import { ProtectedPage } from '@/components/ProtectedRoute/ProtectedRoute'
import React from 'react'

/**
 * Page es un componente que renderiza el componente WorkspacesPage protegido.
 * @param {object} params - Object con type y username como propiedades.
 * @param {object} searchParams - Object con uid como propiedad.
 * @returns {JSX.Element} - ProtectedPage con WorkspacesPage como hijo.
 */
async function Page({
	params,
	searchParams,
}: {
	params: { type: string; username: string }
	searchParams?: { uid: string }
}) {
	const { type, username } = await params
	const { uid } = (await searchParams) ?? { uid: '' }

	return (
		<ProtectedPage isProtected>
			<WorkspacesPage type={type} username={username} uid={uid} />
		</ProtectedPage>
	)
}

export default Page
