import WorkspacesPage from '@/components/Pages/Workspaces/WorkspacesPage'
import { ProtectedPage } from '@/components/ProtectedRoute/ProtectedRoute'
import React from 'react'

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
