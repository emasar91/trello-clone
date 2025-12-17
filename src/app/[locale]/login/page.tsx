import PageLogin from '@/components/Pages/LoginPage/PageLogin'
import { ProtectedPage } from '@/components/ProtectedRoute/ProtectedRoute'

/**
 * LoginPage component que renderiza el componente PageLogin protegido.
 * No está protegido y cualquier persona puede acceder a él.
 * @return {Promise<ReactNode>} - un componente React que representa la ruta
 */
const LoginPage = () => {
	return (
		<ProtectedPage isProtected={false}>
			<PageLogin />
		</ProtectedPage>
	)
}

export default LoginPage
