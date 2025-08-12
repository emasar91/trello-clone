import { colors } from '@/constants'
import { SxProps, Theme } from '@mui/material'

export const NavBarContainerStyle: SxProps<Theme> = {
	position: 'fixed',
	top: '0px',
	display: 'flex',
	width: '100%',
	zIndex: '1300',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: colors.white,
	boxShadow:
		'0 0 #0000, 0 0 #0000, 0 10px 15px -3px rgb(0,0,0,0.1), 0 4px 6px -4px rgb(0,0,0,0.1)',
}

export const NavBarRowStyle: SxProps<Theme> = {
	display: 'flex',
	width: '100%',
	maxWidth: '1320px',
	justifyContent: 'space-between',
	overflow: 'hidden',
	backgroundColor: colors.white,
	alignItems: 'stretch',
	height: '60px',
	margin: '0px auto',
}

export const NavBarRowContentStyle: SxProps<Theme> = {
	display: 'flex',
	alignItems: 'center',
	height: '60px',
}

export const NavBarButtonsLoginStyle: SxProps<Theme> = {
	marginLeft: 'auto',
	display: 'flex',
	alignItems: 'stretch',
}

export const NavBarLogoStyle: SxProps<Theme> = {
	alignItems: 'center',
	alignSelf: 'stretch',
	display: 'flex',
	padding: '1rem',
}

export const NavBarRegisterStyle: SxProps<Theme> = {
	backgroundColor: 'rgb(0, 101, 255)',
	WebkitBoxAlign: 'center',
	alignItems: 'center',
	alignSelf: 'stretch',
	color: 'rgb(255, 255, 255)',
	display: 'flex',
	fontSize: '1.2rem',
	height: '100%',
	padding: '0.5rem 1.5rem',
	textDecoration: 'none',
}

export const NavBarLoginStyle: SxProps<Theme> = {
	alignItems: 'center',
	alignSelf: 'stretch',
	color: 'rgb(23, 43, 77)',
	display: 'flex',
	fontSize: '1.2rem',
	height: '100%',
	padding: '0.5rem 1.5rem',
	textDecoration: 'none',
}

export const NavBarLangSwitcherStyle: SxProps<Theme> = {
	display: 'flex',
	alignItems: 'center',
}
