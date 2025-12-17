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
 * LoginForm es el componente del formulario de login.
 * Renderiza un formulario con un input de correo electronico, un input de contrasena y un boton de submit.
 * El componente utiliza el hook useTranslations para traducir el texto del formulario.
 * El componente espera las siguientes propiedades:
 * - handleResetPassword: una funcion para manejar el reset de contrasena, recibe el correo electronico como parametro.
 * - handleLogin: una funcion para manejar el login, recibe el tipo de login (email o google) y el correo electronico y contrasena como parametros.
 * - handleRecoverPassword: una funcion para manejar el restablecimiento de contrasena, recibe el correo electronico como parametro.
 * - register: un booleano para indicar si el formulario es para registro o no, por defecto es false.
 * - recoverPassword: un booleano para indicar si el formulario es para restablecimiento de contrasena o no, por defecto es false.
 *
 * El componente renderiza los siguientes elementos:
 * - Un EmailField con el valor del correo electronico y la funcion onChange.
 * - Un PasswordField con el valor de la contrasena y la funcion onChange, y las funciones showPassword y onToggleShow.
 * - Un ResetPasswordLink con la funcion onClick.
 * - Un SubmitButton con la funcion onClick, la propiedad disabled y el texto.
 * - Un GoogleLoginButton con la funcion onClick y el texto.
 * - Un NotificationContainer.
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

	/**
	 * onSubmit es la funcion que se ejecuta cuando se hace submit en el formulario.
	 * Si es para restablecimiento de contrasena, valida el correo electronico y llama a handleRecoverPassword.
	 * Si es para login, llama a handleLogin.
	 */
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
