'use client'

import React, { forwardRef } from 'react'
import ButtonBase from '@mui/material/ButtonBase'
import type { CSSProperties } from 'react'
import { buttonStyles } from './Button.styles'
import { useTheme } from '@mui/material/styles'

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	active?: {
		fill: string
		background: string
	}
	cursor?: CSSProperties['cursor']
}

export const Button = forwardRef<HTMLButtonElement, Props>(
	({ active, cursor, style, ...props }, ref) => {
		const theme = useTheme()

		return (
			<ButtonBase
				ref={ref}
				{...props}
				disableRipple
				sx={buttonStyles({ active, cursor, theme })}
				style={style}
			/>
		)
	}
)

Button.displayName = 'Button'
