import { colorsLanding } from '@/constants'
import { SxProps, Theme } from '@mui/material'

export const ItemFullWidthContainerStyle: SxProps<Theme> = {
	width: '100%',
}

export const ItemFullWidthContentContainerStyle: SxProps<Theme> = {
	textalign: 'left',
	padding: ' 1.5rem',
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	margin: '0px auto',
	gap: '1rem',
	maxWidth: '712px',
	backgroundColor: colorsLanding.boxInfoFullWidthButtonContainer,
	boxSizing: 'border-box',
}

export const ItemFullWidthButtonStyle: SxProps<Theme> = {
	userselect: 'none',
	alignItems: 'center',
	borderRadius: '0.3rem',
	cursor: 'pointer',
	display: 'inline-flex',
	textAlign: 'center',
	transition: '250ms ease-out',
	textDecoration: 'none',
	backgroundColor: colorsLanding.boxInfoFullWidthButtonBackground,
	border: `1px solid ${colorsLanding.boxInfoFullWidthButtonBorder}`,
	fontSize: '1rem',
	padding: '0.7rem 1rem 0.8rem',
	color: `${colorsLanding.boxInfoFullWidthButtonText} !important`,
	'&:hover': {
		backgroundColor: colorsLanding.boxInfoFullWidthButtonHover,
	},
}

export const ItemFullWidthDescriptionStyle: SxProps<Theme> = {
	color: colorsLanding.boxInfoFullWidthButtonContainerTitle,
	fontSize: '0.75rem',
	lineHeight: '1rem',
	marginBottom: '1.5rem',
}

export const ItemFullWidthTitleStyle: SxProps<Theme> = {
	lineHeight: '1.5rem',
	paddingRight: '0.3rem',
	color: colorsLanding.boxInfoFullWidthButtonContainerDescription,
	fontSize: '1rem',
	fontWeight: 'normal',
	margin: '0.5rem !important',
}

export const ItemFullWidthTitleContainerStyle: SxProps<Theme> = {
	display: 'flex',
	lineHeight: '1rem',
	paddingBottom: '0.25rem',
}

export const ItemFullWidthIconContainerStyle: SxProps<Theme> = {
	padding: '0.14rem 0.71rem 0px 0.15rem',
}
