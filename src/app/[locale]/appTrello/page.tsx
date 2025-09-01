'use client'

import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute'

export default function AppTrelloPage() {
	return (
		<ProtectedRoute>
			<h1>Bienvenido a AppTrello 🚀</h1>
		</ProtectedRoute>
	)
}
