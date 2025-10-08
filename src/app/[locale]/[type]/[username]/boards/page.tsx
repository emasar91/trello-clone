import Boards from '@/components/Pages/Boards/Boards'
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
	console.log('🚀 ~ Page ~ username:', username)
	console.log('🚀 ~ Page ~ type:', type)
	const { uid } = (await searchParams) ?? { uid: '' }

	return (
		<ProtectedPage isProtected>
			<Boards type={type} username={username} uid={uid} />
		</ProtectedPage>
	)
}

export default Page
