'use client'
import LoginPageContainer from './components/LoginContainer.tsx/LoginContainer'
import LoginTitle from './components/LoginTitle/LoginTitle'
import LoginCreateAccount from './components/LoginCreateAccount/LoginCreateAccount'
import LoginForm from './components/LoginForm/LoginForm'
import PageContainer from '@/components/pageContainer/PageContainer'
import { colorsLanding } from '@/constants'
import { Box } from '@mui/material'
import { useRouter } from 'next/navigation'
import { PageLoginContainerStyle } from './pageLogin.styles'
import { signInEmail, signInGoogle } from '@/services/AuthActions'
import { useLocale, useTranslations } from 'next-intl'
import { toast } from 'react-toastify'
import { FirebaseError } from 'firebase/app'

/**
 * PageLogin es el componente de la pagina de login.
 * Renderiza un formulario con un input de correo electronico, un input de contrasena y un boton de submit.
 * El componente utiliza el hook useTranslations para traducir el texto del formulario.
 * El componente espera las siguientes propiedades:
 * - handleLogin: una funcion para manejar el login, recibe el tipo de login, correo electronico y contrasena como parametros.
 * - handleResetPassword: una funcion para manejar el reset de contrasena, recibe el correo electronico como parametro.
 * - register: un booleano para indicar si el formulario es para registro o no, por defecto es false.
 * - recoverPassword: un booleano para indicar si el formulario es para recuperar contrasena o no, por defecto es false.
 *
 * El componente renderiza los siguientes elementos:
 * - Un EmailField con el valor del correo electronico y la funcion onChange.
 * - Un PasswordField con el valor de la contrasena y la funcion onChange, y las funciones showPassword y onToggleShow.
 * - Un SubmitButton con la funcion onClick, la propiedad disabled y el texto.
 * - Un GoogleLoginButton con la funcion onClick y el texto.
 * - Un LoginCreateAccount con la funcion onClick, la propiedad disabled y el texto.
 */
const PageLogin = () => {
	const router = useRouter()
	const locale = useLocale()
	const t = useTranslations('Toast')
	const currentLocale = locale || 'es'

	const handleLogin = async (
		typeLogin: 'google' | 'email',
		emailForm?: string,
		passwordForm?: string
	) => {
		try {
			if (typeLogin === 'google') {
				const result = await signInGoogle(locale)
				if (result) {
					router.replace(`/${currentLocale}/u`)
				}
			}

			if (typeLogin === 'email' && emailForm && passwordForm) {
				const result = await signInEmail(emailForm, passwordForm, locale)
				if (result) {
					router.replace(`/${currentLocale}/u`)
				}
			}
		} catch (error: unknown) {
			const firebaseError = error as FirebaseError

			if (firebaseError.code === 'auth/invalid-credential') {
				toast.error(t('login.invalidCredential'))
			} else {
				toast.error(t('login.error'))
			}
		}
	}

	/**
	 * Redirecciona al usuario a la pagina de restablecimiento de contrasena.
	 */
	const handleResetPassword = () => {
		router.push('/reset-password')
	}

	return (
		<Box sx={PageLoginContainerStyle}>
			<PageContainer backgroundColor={colorsLanding.loginPageBackground}>
				<LoginPageContainer register={false} recover={false}>
					<LoginTitle />

					<LoginForm
						handleResetPassword={handleResetPassword}
						handleLogin={handleLogin}
						recoverPassword={false}
					/>

					<LoginCreateAccount />
				</LoginPageContainer>
			</PageContainer>
		</Box>
	)
}
export default PageLogin
