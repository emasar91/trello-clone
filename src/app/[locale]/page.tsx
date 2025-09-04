'use client'
import PageHome from '@/components/Pages/PageHome/PageHome'
import './globals.css'
import { ProtectedPage } from '@/components/ProtectedRoute/ProtectedRoute'

const HomePage = () => {
	return (
		<ProtectedPage isProtected={false}>
			<PageHome />
		</ProtectedPage>
	)
}

export default HomePage
