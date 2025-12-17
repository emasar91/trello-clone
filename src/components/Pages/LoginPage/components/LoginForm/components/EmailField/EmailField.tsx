import { Box, TextField } from '@mui/material'
import React from 'react'
import { EmailFieldContainerStyle } from './EmailField.styles'
import { useTranslations } from 'next-intl'

interface EmailFieldProps {
	value: string
	onChange: (value: string) => void
}

/**
 * EmailField es un componente que renderiza un TextField con un label de "Email" y un placeholder
 * de "Ingresa tu email". El componente usa el hook useTranslations para traducir
 * el texto del placeholder. El componente espera dos propiedades: value y onChange.
 * value es el valor del TextField y onChange es una funcion para llamar cuando el valor
 * del TextField cambia.
 * @param {EmailFieldProps} props
 * @returns {React.ReactElement} un Box con el TextField
 */
const EmailField: React.FC<EmailFieldProps> = ({ value, onChange }) => {
	const t = useTranslations('LoginPage')

	return (
		<Box sx={EmailFieldContainerStyle}>
			<TextField
				label="Email"
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={t('form.emailPlaceholder')}
			/>
		</Box>
	)
}

export default EmailField
