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
 * PasswordField is a component that wraps a TextField with a ShowPassword component.
 * It displays the password as text if showPassword is true, otherwise it displays
 * the password as a password input.
 *
 * @param {{ value: string, onChange: (value: string) => void, showPassword: boolean, onToggleShow: () => void }}
 */
const PasswordField: React.FC<PasswordFieldProps> = ({
	value,
	onChange,
	showPassword,
	onToggleShow,
}) => {
	const t = useTranslations('LoginForm')

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
