'use client'
'stric-mode'
import PageHome from '@/components/Pages/PageHome/PageHome'
import './globals.css'
import { ProtectedPage } from '@/components/ProtectedRoute/ProtectedRoute'

/**
 * HomePage component that renders the protected PageHome component.
 * It is unprotected and anyone can access it.
 */
const HomePage = () => {
	return (
		<ProtectedPage isProtected={false}>
			<PageHome />
		</ProtectedPage>
	)
}

export default HomePage
