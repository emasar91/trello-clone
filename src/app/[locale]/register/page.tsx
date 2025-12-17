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
 * RegisterPage component renders a form with an email input, a password input, and a submit button.
 * The component uses the useTranslations hook to translate the text of the form.
 * The component expects the following properties:
 * - handleLogin: a function to handle the login, receives the type of login, email and password as parameters.
 * - register: a boolean to indicate if the form is for register or not, default is false.
 * - recoverPassword: a boolean to indicate if the form is for recover password or not, default is false.
 *
 * The component renders the following elements:
 * - An EmailField component with the email value and onChange function.
 * - A PasswordField component with the password value and onChange function.
 * - A SubmitButton component with the onClick function.
 * - A GoogleLoginButton component with the onClick function.
 * - A NotificationContainer component.
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
						router.replace(`/${currentLocale}/u`) // redirect inmediato
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
