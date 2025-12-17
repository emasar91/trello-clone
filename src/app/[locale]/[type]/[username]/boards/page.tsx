import WorkspacesPage from '@/components/Pages/Workspaces/WorkspacesPage'
import { ProtectedPage } from '@/components/ProtectedRoute/ProtectedRoute'
import React from 'react'

/**
 * Page component for Workspaces.
 *
 * @param {object} params - Object with type and username properties.
 * @param {object} searchParams - Object with uid property.
 *
 * @returns {JSX.Element} - ProtectedPage component with WorkspacesPage child.
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
