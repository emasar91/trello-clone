import { colorsLanding } from '@/constants'
import { SxProps, Theme } from '@mui/material'

export const FooterSubTitleStyle: SxProps<Theme> = {
	textDecoration: 'none',
	color: colorsLanding.footerTitle,
	lineHeight: '1rem',
	fontSize: '0.75rem',
}

export const FooterTitleStyle: SxProps<Theme> = {
	color: colorsLanding.footerSubtitle,
	textDecoration: 'none',
	paddingBottom: '0.6rem',
	textAlign: 'start',
}

export const FooterItemsContainerStyle: SxProps<Theme> = {
	padding: '1rem',
	width: '25%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'start',
	flexDirection: 'column',
	textDecoration: 'none',
	'&:hover': { backgroundColor: colorsLanding.footerItemHover },
}

export const FooterItemRowStyle: SxProps<Theme> = {
	display: 'flex',
	width: '83.3333%',
	flexDirection: 'row',
}

export const FooterLogInStyle: SxProps<Theme> = {
	color: colorsLanding.footerTitle,
	'&:hover': { borderBottom: `1px solid ${colorsLanding.footerTitleBorder}` },
}

export const FooterLogInLinkStyle: SxProps<Theme> = {
	display: 'flex',
	justifyContent: 'start',
	textDecoration: 'none',
}

export const FooterLogInContainerStyle: SxProps<Theme> = {
	display: 'flex',
	width: '16.6667%',
	gap: '1rem',
	flexDirection: 'column',
	position: 'relative',
	top: '25px',
}

export const FooterContentStyle: SxProps<Theme> = {
	display: 'flex',
	height: '130px',
	padding: '1rem ',
	margin: '2rem 0',
}

export const FooterContainerStyle: SxProps<Theme> = { display: 'flex' }
