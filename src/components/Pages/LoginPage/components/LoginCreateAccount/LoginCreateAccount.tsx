import { Box, Button, Link, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { LoginCreateAccountContainerStyle } from './LogginCreateAccount.styles'

/**
 * Renders a box with a typography and a button to navigate to the register page
 *
 * @returns {React.ReactElement} A Box component with a Typography and a Button
 */
const LoginCreateAccount = ({}) => {
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
