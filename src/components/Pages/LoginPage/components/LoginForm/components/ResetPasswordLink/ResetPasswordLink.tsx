import { Box, Button } from '@mui/material'
import React from 'react'
import { ResetPasswordLinkStyle } from './ResetPasswordLink.styles'
import { useTranslations } from 'next-intl'

interface ResetPasswordLinkProps {
	onClick: () => void
}

/**
 * A component to render a link to reset password.
 *
 * @param {ResetPasswordLinkProps} props
 * @prop {() => void} onClick - The function to call when the link is clicked.
 *
 * @returns {React.ReactElement} A Box component with a Button inside.
 */
const ResetPasswordLink: React.FC<ResetPasswordLinkProps> = ({ onClick }) => {
	const t = useTranslations('LoginForm')

	return (
		<Box sx={ResetPasswordLinkStyle}>
			<Button onClick={onClick}>{t('form.forgotPassword')}</Button>
		</Box>
	)
}

export default ResetPasswordLink
