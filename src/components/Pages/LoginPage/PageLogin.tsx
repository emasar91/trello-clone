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
 * PageLogin component renders a form with an email input, a password input, and a submit button.
 * The component uses the useTranslations hook to translate the text of the form.
 * The component expects the following properties:
 * - handleLogin: a function to handle the login, receives the type of login, email and password as parameters.
 * - handleResetPassword: a function to handle the reset password, receives the email as a parameter.
 * - register: a boolean to indicate if the form is for register or not, default is false.
 * - recoverPassword: a boolean to indicate if the form is for recover password or not, default is false.
 *
 * The component renders the following elements:
 * - An EmailField component with the email value and onChange function.
 * - A PasswordField component with the password value and onChange function, and showPassword and onToggleShow functions.
 * - A SubmitButton component with the onClick function, disabled property and text property.
 * - A GoogleLoginButton component with the onClick function and text property.
 * - A NotificationContainer component.
 * - A LoginCreateAccount component with the onClick function, disabled property and text property.
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
	 * Redirects the user to the password reset page.
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
