'use client'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth } from '@/config/FireBaseConfig'
import LoginPageContainer from '@/components/Pages/LoginPage/components/LoginContainer.tsx/LoginContainer'
import LoginTitle from '@/components/Pages/LoginPage/components/LoginTitle/LoginTitle'
import LoginForm, {
	isValidEmail,
} from '@/components/Pages/LoginPage/components/LoginForm/LoginForm'
import { toast } from 'react-toastify'
import { colorsLanding } from '@/constants'
import PageContainer from '@/components/pageContainer/PageContainer'
import { PageLoginContainerStyle } from '@/components/Pages/LoginPage/pageLogin.styles'
import { Box } from '@mui/material'
import { useLocale, useTranslations } from 'next-intl'
import { signInEmail } from '@/services/AuthActions'
import { useRouter } from 'next/navigation'
import { FirebaseError } from 'firebase/app'

/**
 * RegisterPage component que renderiza un formulario con un campo de correo electrónico, un campo de contraseña y un botón de envío.
 * El componente utiliza el hook useTranslations para traducir el texto del formulario.
 * El componente espera las siguientes propiedades:
 * - handleLogin: una función para manejar el inicio de sesión, recibe el tipo de inicio de sesión, correo electrónico y contraseña como parámetros.
 * - register: un booleano para indicar si el formulario es para registro o no, por defecto es false.
 * - recoverPassword: un booleano para indicar si el formulario es para recuperar la contraseña o no, por defecto es false.
 *
 * El componente renderiza los siguientes elementos:
 * - An EmailField con el valor del correo electrónico y la función onChange.
 * - A PasswordField con el valor de la contraseña y la función onChange.
 * - A SubmitButton con la función onClick.
 * - A GoogleLoginButton con la función onClick.
 *
 * @returns {JSX.Element} The component element.
 */
const RegisterPage = () => {
	const locale = useLocale()
	const router = useRouter()
	const t = useTranslations('Toast')
	const currentLocale = locale || 'es'

	const handleLogin = async (
		typeLogin: string,
		email?: string,
		password?: string
	) => {
		if (typeLogin === 'email' && email && password) {
			if (isValidEmail(email)) {
				try {
					await createUserWithEmailAndPassword(firebaseAuth, email, password)

					const result = await signInEmail(email, password, currentLocale)
					if (result) {
						router.replace(`/${currentLocale}/u`)
					}
				} catch (error: unknown) {
					const firebaseError = error as FirebaseError

					if (firebaseError.code === 'auth/weak-password') {
						toast.error(t('login.weakPassword'))
					}
					if (firebaseError.code === 'auth/email-already-in-use') {
						toast.error(t('login.emailAlreadyInUse'))
					}
				}
			} else {
				toast.error(t('login.invalidEmail'))
			}
		}
	}
	return (
		<Box sx={PageLoginContainerStyle}>
			<PageContainer backgroundColor={colorsLanding.registerPageBackground}>
				<LoginPageContainer register={true} recover={false}>
					<LoginTitle register={true} />
					<LoginForm handleLogin={handleLogin} register={true} />
				</LoginPageContainer>
			</PageContainer>
		</Box>
	)
}

export default RegisterPage
