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

const RegisterPage = () => {
	const locale = useLocale()
	const router = useRouter()
	const t = useTranslations('Toast')

	const handleLogin = async (
		typeLogin: string,
		email?: string,
		password?: string
	) => {
		if (typeLogin === 'email' && email && password) {
			if (isValidEmail(email)) {
				try {
					await createUserWithEmailAndPassword(firebaseAuth, email, password)

					const result = await signInEmail(email, password, locale)
					if (result) {
						router.replace(`/${locale}/u`) // redirect inmediato
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
