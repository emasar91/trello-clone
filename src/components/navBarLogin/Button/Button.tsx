import React from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@mui/material'

type Props = {
	text: string
	variant: 'text' | 'contained'
	color?: string
	bgColor?: string
	hoverColor?: string
}

export default function ButtonLogin({
	text,
	variant,
	color,
	bgColor,
	hoverColor,
}: Props) {
	const t = useTranslations('NavBarLogin.ButtonLogin')

	return (
		<Button
			className="font-charlie "
			variant={variant}
			size="medium"
			sx={{
				color: color,
				fontSize: '19px',
				lineHeight: '29px',
				fontWeight: '400',
				height: '60px',
				rounded: '0px',
				borderRadius: '0px',
				backgroundColor: bgColor,
				padding: '8px 24px',
				'&:hover': {
					backgroundColor: hoverColor,
				},
			}}
		>
			{t(text)}
		</Button>
	)
}
