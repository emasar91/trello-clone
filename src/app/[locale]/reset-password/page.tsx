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
 * RecoverPassword component que renderiza un formulario con un campo de correo electrónico, un botón de envío y un enlace para recuperar la contraseña.
 * El componente utiliza el hook useTranslations para traducir el texto del formulario.
 * El componente espera las siguientes propiedades:
 * - handleResetPassword: una función para manejar el restablecimiento de la contraseña, recibe el correo electrónico como parámetro.
 * - handleRecoverPassword: a function to handle the recover password, receives the email as a parameter.
 * - register: a boolean to indicate if the form is for register or not, default is false.
 * - recoverPassword: a boolean to indicate if the form is for recover password or not, default is false.
 *
 * El componente renderiza los siguientes elementos:
 * - An EmailField con el valor del correo electrónico y la función onChange.
 * - A PasswordField con el valor de la contraseña y la función onChange, y showPassword y onToggleShow.
 * - A ResetPasswordLink con la función onClick.
 * - A SubmitButton con la función onClick, propiedad disabled y text.
 * - A GoogleLoginButton con la función onClick y text.
 * - A NotificationContainer componente.
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
