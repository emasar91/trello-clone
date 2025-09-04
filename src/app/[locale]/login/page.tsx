import PageLogin from '@/components/Pages/LoginPage/PageLogin'
import { ProtectedPage } from '@/components/ProtectedRoute/ProtectedRoute'

const LoginPage = () => {
	return (
		<ProtectedPage isProtected={false}>
			<PageLogin />
		</ProtectedPage>
	)
}

export default LoginPage
