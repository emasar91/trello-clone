import { Box, Button } from '@mui/material'
import React from 'react'
import { ResetPasswordLinkStyle } from './ResetPasswordLink.styles'
import { useTranslations } from 'next-intl'

interface ResetPasswordLinkProps {
	onClick: () => void
}

/**
 * ResetPasswordLink es un componente que renderiza un enlace para restablecer la contrasena.
 * @param {ResetPasswordLinkProps} props
 * @prop {() => void} onClick - La funcion a ejecutar cuando se hace click en el enlace.
 * @returns {React.ReactElement} un Box con el Button
 */
const ResetPasswordLink: React.FC<ResetPasswordLinkProps> = ({ onClick }) => {
	const t = useTranslations('LoginPage')

	return (
		<Box sx={ResetPasswordLinkStyle}>
			<Button onClick={onClick}>{t('form.forgotPassword')}</Button>
		</Box>
	)
}

export default ResetPasswordLink
