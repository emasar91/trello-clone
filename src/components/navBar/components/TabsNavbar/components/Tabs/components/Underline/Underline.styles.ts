import { colors } from '@/constants'
import { Theme } from '@emotion/react'
import { SxProps } from '@mui/material'

export const UnderlineStyle = (underlineStyle: {
	left: number
	width: number
	origin: string
	active: boolean
}): SxProps<Theme> => ({
	position: 'absolute',
	bottom: 0,
	left: `${underlineStyle.left}px`,
	width: `${underlineStyle.width}px`,
	height: '2px',
	backgroundColor: colors.primary,
	transform: underlineStyle.active ? 'scaleX(1)' : 'scaleX(0)',
	transformOrigin: 'left',
	opacity: underlineStyle.active ? 1 : 0,
	transition:
		'left 0.3s ease, width 0.3s ease, transform 0.3s ease, opacity 0.3s ease',
	pointerEvents: 'none',
})
