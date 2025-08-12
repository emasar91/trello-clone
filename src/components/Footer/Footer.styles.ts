import { SxProps, Theme } from '@mui/material'

export const FooterSubTitleStyle: SxProps<Theme> = {
	textDecoration: 'none',
	color: 'rgb(255,255,255)',
	lineHeight: '1rem',
	fontSize: '0.75rem',
}

export const FooterTitleStyle: SxProps<Theme> = {
	color: 'rgb(255,255,255)',
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
	'&:hover': { backgroundColor: 'rgb(52, 69, 99)' },
}

export const FooterItemRowStyle: SxProps<Theme> = {
	display: 'flex',
	width: '83.3333%',
	flexDirection: 'row',
}

export const FooterLogInStyle: SxProps<Theme> = {
	color: 'rgb(255,255,255)',
	'&:hover': { borderBottom: '1px solid rgb(255,255,255)' },
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
