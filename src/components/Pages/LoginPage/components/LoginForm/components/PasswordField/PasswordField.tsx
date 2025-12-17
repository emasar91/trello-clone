import { Box, TextField } from '@mui/material'
import React from 'react'
import ShowPassword from '../ShowPassword/ShowPassword'
import { PasswordFieldContainerStyle } from './PasswordField.styles'
import { useTranslations } from 'next-intl'

interface PasswordFieldProps {
	value: string
	onChange: (value: string) => void
	showPassword: boolean
	onToggleShow: () => void
}

/**
 * PasswordField es un componente que envuelve un TextField con un ShowPassword.
 * Muestra la contrasena como texto si showPassword es true, de lo contrario
 * muestra la contrasena como un input de contrasena.
 *
 * @param {PasswordFieldProps} props
 * @returns {React.ReactElement} un Box con el TextField y el ShowPassword
 */
const PasswordField: React.FC<PasswordFieldProps> = ({
	value,
	onChange,
	showPassword,
	onToggleShow,
}) => {
	const t = useTranslations('LoginPage')

	return (
		<Box sx={PasswordFieldContainerStyle}>
			<TextField
				label="Password"
				type={showPassword ? 'text' : 'password'}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={t('form.passwordPlaceholder')}
			/>

			<ShowPassword
				showPassword={showPassword}
				handleShowPassword={onToggleShow}
			/>
		</Box>
	)
}

export default PasswordField
