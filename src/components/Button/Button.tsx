import React from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@mui/material'
import { ButtonStyle } from './Button.style'

type Props = {
	text: string
	variant: 'text' | 'contained'
	color?: string
	bgColor?: string
	hoverColor?: string
}

/**
 * ButtonLogin component for rendering a customizable button.
 * Utilizes translations for button text.
 *
 * @param {string} text - The text to display on the button.
 * @param {'text' | 'contained'} variant - The variant of the button.
 * @param {string} [color='rgb(23, 43, 77)'] - The text color of the button.
 * @param {string} [bgColor='transparent'] - The background color of the button.
 * @param {string} [hoverColor='rgb(23, 43, 77)'] - The background color of the button on hover.
 * @returns {React.ReactElement} The rendered button component.
 */

export default function ButtonLogin({
	text,
	variant,
	color = 'rgb(23, 43, 77)',
	bgColor = 'transparent',
	hoverColor = 'rgb(23, 43, 77)',
}: Props) {
	const t = useTranslations('NavBarLogin.buttonLogin')

	return (
		<Button
			className="font-charlie "
			variant={variant}
			size="medium"
			sx={ButtonStyle(color, bgColor, hoverColor)}
		>
			{t(text)}
		</Button>
	)
}
