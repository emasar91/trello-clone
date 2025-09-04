import { Box, TextField } from '@mui/material'
import React from 'react'
import { EmailFieldContainerStyle } from './EmailField.styles'
import { useTranslations } from 'next-intl'

interface EmailFieldProps {
	value: string
	onChange: (value: string) => void
}

/**
 * EmailField component renders a TextField with a label of "Email" and a placeholder
 * of "Ingresa tu email". The component uses the useTranslations hook to translate
 * the text of the placeholder. The component expects two properties: value and onChange.
 * value is the value of the TextField and onChange is a function to call when the value
 * of the TextField changes.
 *
 * @param {{ value: string, onChange: (value: string) => void }} props
 * @returns {React.ReactElement}
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
