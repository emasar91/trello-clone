import { colors } from '@/constants'
import { SxProps, Theme } from '@mui/material'

export const ExtraInfoButtonStyle: SxProps<Theme> = {
	userSelect: 'none',
	WebkitBoxAlign: 'center',
	alignItems: 'center',
	borderRadius: '0.3rem',
	cursor: 'pointer',
	display: 'inline-flex',
	textAlign: 'center',
	transition: '250ms ease-out',
	textDecoration: 'none',
	backgroundColor: colors.white,
	border: '1px solid rgb(101, 84, 192)',
	fontSize: '1rem',
	padding: '0.7rem 1rem 0.8rem',
	color: 'rgb(23, 43, 77) !important',

	'&:hover': {
		backgroundColor: 'rgb(234, 230, 255)',
	},
}
