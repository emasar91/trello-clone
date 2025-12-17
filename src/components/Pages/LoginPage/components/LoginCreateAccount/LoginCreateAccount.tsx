import { Box, Button, Link, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { LoginCreateAccountContainerStyle } from './LogginCreateAccount.styles'

/**
 * LoginCreateAccount es un componente que renderiza un Box con un Typography y un Button
 * para navegar a la pagina de registro.
 * @returns {React.ReactElement} un Box con el Typography y el Button
 */
const LoginCreateAccount = () => {
	const t = useTranslations('LoginPage')

	return (
		<Box sx={LoginCreateAccountContainerStyle}>
			<Typography>{t('noAccount')}</Typography>
			<Button component={Link} href="/register">
				{t('record')}
			</Button>
		</Box>
	)
}

export default LoginCreateAccount
