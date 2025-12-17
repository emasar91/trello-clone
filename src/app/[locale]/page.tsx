'use client'
'stric-mode'
import PageHome from '@/components/Pages/PageHome/PageHome'
import './globals.css'
import { ProtectedPage } from '@/components/ProtectedRoute/ProtectedRoute'

/**
 * HomePage que renderiza el componente PageHome protegido.
 * No está protegido y cualquier persona puede acceder a él.
 */
const HomePage = () => {
	return (
		<ProtectedPage isProtected={false}>
			<PageHome />
		</ProtectedPage>
	)
}

export default HomePage
