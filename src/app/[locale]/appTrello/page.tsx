'use client'

import { ProtectedPage } from '@/components/ProtectedRoute/ProtectedRoute'

export default function AppTrelloPage() {
	return (
		<ProtectedPage isProtected>
			<h1>Bienvenido a AppTrello 🚀</h1>
		</ProtectedPage>
	)
}
