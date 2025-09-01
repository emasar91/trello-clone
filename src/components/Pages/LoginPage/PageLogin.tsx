'use client'
import { useEffect } from 'react'
import LoginPageContainer from './components/LoginContainer.tsx/LoginContainer'
import LoginTitle from './components/LoginTitle/LoginTitle'
import LoginCreateAccount from './components/LoginCreateAccount/LoginCreateAccount'
import LoginForm from './components/LoginForm/LoginForm'
import PageContainer from '@/components/pageContainer/PageContainer'
import { colors } from '@/constants'
import { Box } from '@mui/material'
import { redirect } from 'next/navigation'
import { useStoreTrello } from '@/context/useStoreTrello'
import { signInEmail, signInGoogle } from './utils'
import { PageLoginContainerStyle } from './pageLogin.styles'
import { IUserInfo } from '@/types/user'

const PageLogin = () => {
	const { userInfo, setUserInfo: setUserInfoStore } = useStoreTrello()

	const setUserInfo = ({ displayName, email, photoURL }: IUserInfo) => {
		setUserInfoStore({ displayName, email, photoURL })
	}

	const handleLogin = async (
		typeLogin: string,
		emailForm?: string,
		passwordForm?: string
	) => {
		if (typeLogin === 'google') {
			signInGoogle({ setUserInfo })
		}

		if (typeLogin === 'email' && emailForm && passwordForm) {
			signInEmail({ setUserInfo, emailForm, passwordForm })
		}
	}

	const handleResetPassword = () => {
		redirect('/reset-password')
	}

	useEffect(() => {
		if (userInfo) {
			redirect('/appTrello')
		}
	}, [userInfo])

	return (
		<Box sx={PageLoginContainerStyle}>
			<PageContainer backgroundColor={colors.blueBackground}>
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
