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
