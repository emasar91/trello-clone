'use client'

import { sendPasswordResetEmail } from 'firebase/auth'
import { firebaseAuth } from '@/config/FireBaseConfig'
import LoginPageContainer from '@/components/Pages/LoginPage/components/LoginContainer.tsx/LoginContainer'
import LoginTitle from '@/components/Pages/LoginPage/components/LoginTitle/LoginTitle'
import LoginForm from '@/components/Pages/LoginPage/components/LoginForm/LoginForm'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { colors } from '@/constants'
import PageContainer from '@/components/pageContainer/PageContainer'
import { PageLoginContainerStyle } from '@/components/Pages/LoginPage/pageLogin.styles'
import { Box } from '@mui/material'
import { useTranslations } from 'next-intl'

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
			<PageContainer backgroundColor={colors.blueBackground}>
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
