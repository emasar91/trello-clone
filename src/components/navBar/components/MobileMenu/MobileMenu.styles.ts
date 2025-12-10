import { colorsLanding } from '@/constants'
import { SxProps, Theme } from '@mui/material'

export const MobileMenuContainerStyle: SxProps<Theme> = {
	width: '100%',
	height: '100%',
	overflowY: 'auto',
	backgroundColor: colorsLanding.backgroundNavbar,
}

export const MobileMenuListStyle: SxProps<Theme> = {
	margin: '0 1rem 1.5rem 1rem',
	textDecoration: 'none',
}

export const MobileMenuTitleStyle: SxProps<Theme> = {
	display: 'flex',
	alignItems: 'center',
	padding: '1rem 0',
	textAlign: 'left',
	textDecoration: 'none',
	borderBottom: '1px solid rgba(0,0,0,0.1)',
	borderTop: '1px solid rgba(0,0,0,0.1)',
	minHeight: '70px',
	marginTop: '10px',
}

export const MobileMenuExtraInfoStyle: SxProps<Theme> = {
	backgroundColor: colorsLanding.boxInfoExtraInfoBackground,
	marginTop: '1rem',
	padding: '1rem',
}

export const MobileMenuDescriptionItemStyle: SxProps<Theme> = {
	color: colorsLanding.boxInfoItemDescription,
	fontSize: '0.75rem',
	lineHeight: '1rem',
	margin: '0px !important',
}

export const MobileMenuTitleItemStyle: SxProps<Theme> = {
	lineHeight: '1.5rem',
	color: colorsLanding.boxInfoItemTitle,
	fontSize: '1rem',
	fontWeight: 'normal',
	margin: '0px !important',
	textTransform: 'none',
	textDecoration: 'none',
	underline: 'none',
}

export const MobileMenuTitleContainerStyle: SxProps<Theme> = {
	display: 'flex',
	alignItems: 'center',
	gap: '1rem',
	marginBottom: '0.5rem',
}

export const MobileMenuItemStyle: SxProps<Theme> = {
	display: 'block',
	padding: '1rem 0',
	textAlign: 'left',
	textDecoration: 'none',
	borderBottom: '1px solid rgba(0,0,0,0.1)',
}
