import { SxProps, Theme } from '@mui/material'

export const ButtonStyle = (
	color: string,
	bgColor: string,
	hoverColor: string
): SxProps<Theme> => ({
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
})
