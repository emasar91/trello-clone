import { SxProps, Theme } from '@mui/material'

export const ExtraInfoItemContainerStyle: SxProps<Theme> = {
	textAlign: 'left',
	margin: '-1rem',
	padding: '1.5rem 1rem',
	cursor: 'pointer',
	textDecoration: 'none',
	'&:hover .hover-arrow': {
		opacity: 1,
		transform: 'translateX(0)',
	},
}

export const ExtraInfoItemTitleStyle: SxProps<Theme> = {
	transition: 'all 0.3s ease',
	color: 'rgb(23, 43, 77)',
	fontSize: '1rem',
	fontWeight: 'normal',
	lineHeight: '1.5rem',
	paddingRight: '0.3rem',
	paddingBottom: '0.6rem',
}

export const ExtraInfoItemDescriptionStyle: SxProps<Theme> = {
	fontSize: '0.75rem',
}
