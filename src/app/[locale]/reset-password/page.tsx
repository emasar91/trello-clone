'use client'

import { sendPasswordResetEmail } from 'firebase/auth'
import { firebaseAuth } from '@/config/FireBaseConfig'
import LoginPageContainer from '@/components/Pages/LoginPage/components/LoginContainer.tsx/LoginContainer'
import LoginTitle from '@/components/Pages/LoginPage/components/LoginTitle/LoginTitle'
import LoginForm from '@/components/Pages/LoginPage/components/LoginForm/LoginForm'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { colorsLanding } from '@/constants'
import PageContainer from '@/components/pageContainer/PageContainer'
import { PageLoginContainerStyle } from '@/components/Pages/LoginPage/pageLogin.styles'
import { Box } from '@mui/material'
import { useTranslations } from 'next-intl'

/**
 * RecoverPassword component renders a form with an email input, a submit button, and a link to recover the password.
 *
 * The component uses the useTranslations hook to translate the text of the form.
 *
 * The component expects the following properties:
 * - handleResetPassword: a function to handle the reset password, receives the email as a parameter.
 * - handleRecoverPassword: a function to handle the recover password, receives the email as a parameter.
 * - register: a boolean to indicate if the form is for register or not, default is false.
 * - recoverPassword: a boolean to indicate if the form is for recover password or not, default is false.
 *
 * The component renders the following elements:
 * - An EmailField component with the email value and onChange function.
 * - A PasswordField component with the password value and onChange function, and showPassword and onToggleShow functions.
 * - A ResetPasswordLink component with the onClick function.
 * - A SubmitButton component with the onClick function, disabled property and text property.
 * - A GoogleLoginButton component with the onClick function and text property.
 * - A NotificationContainer component.
 */
const RecoverPassword = () => {
	const router = useRouter()
	const t = useTranslations('Toast')

	const handleResetPassword = async (email: string) => {
		try {
			await sendPasswordResetEmail(firebaseAuth, email)

			toast.success(t('login.sendEmail'))
			await new Promise((resolve) => setTimeout(resolve, 2000))

			router.replace('/login')
		} catch {
			toast.error(t('login.errorSendEmail'))
		}
	}

	return (
		<Box sx={PageLoginContainerStyle}>
			<PageContainer
				backgroundColor={colorsLanding.resetPasswordPageBackground}
			>
				<LoginPageContainer register={false} recover={true}>
					<LoginTitle recover={true} />
					<LoginForm
						handleResetPassword={handleResetPassword}
						handleRecoverPassword={handleResetPassword}
						recoverPassword={true}
					/>
				</LoginPageContainer>
			</PageContainer>
		</Box>
	)
}

export default RecoverPassword
