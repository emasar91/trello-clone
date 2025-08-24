import { colors } from '@/constants'
import { SxProps, Theme } from '@mui/material'

export const ExtraInfoContainerLinkStyle: SxProps<Theme> = {
	display: 'flex',
	cursor: 'pointer',
	alignItems: 'center',
	'&:hover .hover-arrow': {
		transform: 'translateX(5px)',
	},
}

export const ExtraInfoLinkStyle: SxProps<Theme> = {
	color: `${colors.darkBlue} !important`,
	textDecoration: 'none',
}

export const ExtraInfoItemTitleStyle: SxProps<Theme> = {
	transition: 'transform 0.3s ease',
	marginLeft: '0.5rem',
	color: colors.darkBlue,
	fontSize: '1rem',
	fontWeight: 'normal',
	lineHeight: '1.5rem',
	padding: '0',
}
