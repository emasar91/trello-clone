import { Theme } from '@emotion/react'
import { SxProps } from '@mui/material'

export const UnderlineStyle = (underlineStyle: {
	left: number
	width: number
	origin: 'left' | 'right'
	active: boolean
}): SxProps<Theme> => ({
	position: 'absolute',
	bottom: 0,
	left: `${underlineStyle.left}px`,
	width: `${underlineStyle.width}px`,
	height: '2px',
	backgroundColor: 'rgb(0, 101, 255)',
	transform: underlineStyle.active ? 'scaleX(1)' : 'scaleX(0)',
	transformOrigin: 'left',
	opacity: underlineStyle.active ? 1 : 0,
	transition:
		'left 0.3s ease, width 0.3s ease, transform 0.3s ease, opacity 0.3s ease',
	pointerEvents: 'none',
})
