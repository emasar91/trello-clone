import PageLogin from '@/components/Pages/LoginPage/PageLogin'
import { ProtectedPage } from '@/components/ProtectedRoute/ProtectedRoute'

/**
 * LoginPage component that renders the protected PageLogin component.
 * It is unprotected and anyone can access it.
 * @return {Promise<ReactNode>} - a React component representing the route
 */
const LoginPage = () => {
	return (
		<ProtectedPage isProtected={false}>
			<PageLogin />
		</ProtectedPage>
	)
}

export default LoginPage
