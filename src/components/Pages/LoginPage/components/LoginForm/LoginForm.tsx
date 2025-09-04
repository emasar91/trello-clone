'use client'

import { useState } from 'react'
import { Box } from '@mui/material'
import { useTranslations } from 'next-intl'

import NotificationContainer from '@/components/Notifications/Notifications'
import EmailField from './components/EmailField/EmailField'
import PasswordField from './components/PasswordField/PasswordField'
import ResetPasswordLink from './components/ResetPasswordLink/ResetPasswordLink'
import SubmitButton from './components/SubmitButton/SubmitButton'
import GoogleLoginButton from './components/GoogleLoginButton/GoogleLoginButton'
import { toast } from 'react-toastify'

interface ILoginFormProps {
	handleResetPassword?: (email: string) => void
	handleLogin?: (
		typeLogin: 'google' | 'email',
		email?: string,
		password?: string
	) => void
	handleRecoverPassword?: (email: string) => void
	register?: boolean
	recoverPassword?: boolean
}

const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
export const isValidEmail = (email: string): boolean => {
	return emailRegex.test(email)
}

/**
 * LoginForm component renders a form with an email input, a password input, a submit button, and a link to recover the password.
 *
 * The component uses the useTranslations hook to translate the text of the form.
 *
 * The component expects the following properties:
 * - handleResetPassword: a function to handle the reset password, receives the email as a parameter.
 * - handleLogin: a function to handle the login, receives the type of login (email or google) and the email and password as parameters.
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
const LoginForm: React.FunctionComponent<ILoginFormProps> = ({
	handleResetPassword = () => {},
	handleLogin = () => {},
	handleRecoverPassword = () => {},
	register = false,
	recoverPassword = false,
}) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)

	const t = useTranslations('LoginPage')
	const tt = useTranslations('Toast')

	const textSubmitButton = recoverPassword
		? t('form.recoverPassword')
		: t('form.login')
	const disableButton = recoverPassword ? !email : !email || !password

	const onSubmit = (
		type: 'google' | 'email',
		email: string,
		password: string
	) => {
		if (recoverPassword) {
			const validEmail = isValidEmail(email)
			if (validEmail) {
				handleRecoverPassword(email)
			} else {
				toast.error(tt('login.invalidEmail'))
			}
		} else {
			handleLogin(type, email, password)
		}
	}

	return (
		<Box sx={{ width: '100%' }}>
			<EmailField value={email} onChange={setEmail} />

			{!recoverPassword && (
				<PasswordField
					value={password}
					onChange={setPassword}
					showPassword={showPassword}
					onToggleShow={() => setShowPassword(!showPassword)}
				/>
			)}

			{!register && !recoverPassword && (
				<ResetPasswordLink onClick={() => handleResetPassword(email)} />
			)}

			<SubmitButton
				onClick={() => onSubmit('email', email, password)}
				disabled={disableButton}
				text={textSubmitButton}
			/>

			{!register && !recoverPassword && (
				<GoogleLoginButton
					onClick={() => handleLogin('google')}
					text={t('form.google')}
				/>
			)}

			<NotificationContainer />
		</Box>
	)
}

export default LoginForm
