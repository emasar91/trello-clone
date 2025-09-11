import Boards from '@/components/Pages/Boards/Boards'
import { ProtectedPage } from '@/components/ProtectedRoute/ProtectedRoute'
import React from 'react'

async function page({ params }: { params: { type: string } }) {
	const { type } = await params

	return (
		<ProtectedPage isProtected>
			<Boards type={type} />
		</ProtectedPage>
	)
}

export default page
