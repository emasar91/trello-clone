import { colors } from '@/constants'
import { SxProps, Theme } from '@mui/material'

export const NavbarLoggedCreateButtonStyle: SxProps<Theme> = {
	height: '32px',
	padding: '0 8px',
	backgroundColor: colors.primary,
	color: colors.white,
	lineHeight: '32px',
	maxWidth: '57px !important',
	margin: '0 !important',
	minWidth: '57px !important',
}

export const NavbarLoggedAdormentIconStyle: SxProps<Theme> = { ml: -2 }

export const NavbarLoggedSearchInputStyle: SxProps<Theme> = {
	height: '32px',
	border: `1px solid ${colors.gray}`,
	borderRadius: '4px',
	color: colors.gray,
	padding: '0 12px 0 30px',
	width: '100%',
	backgroundColor: '#22272b',
	'&:hover': {
		backgroundColor: '#282e33',
	},
	'& .MuiInputBase-input': {
		color: colors.gray,
		p: 0,
		fontSize: '14px',
		lineHeight: '20px',
	},
	'.MuiInputBase-input::placeholder': {
		color: colors.gray,
		opacity: 1,
	},
}

export const NavbarLoggedSearchContainerStyle: SxProps<Theme> = {
	flex: 1,
	minWidth: 0,
}

export const NavbarLoggedActionsStyle: SxProps<Theme> = {
	display: 'flex',
	gap: 1,
	justifyContent: 'center',
	alignItems: 'center',
}

export const NavbarLoggedSearchSectionStyle: SxProps<Theme> = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	width: '100%',
	gap: 1,
}

export const NavbarLoggedSearchWrapperStyle: SxProps<Theme> = {
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	maxWidth: '780px',
	width: '100%',
}

export const NavbarLoggedLogoWrapperStyle: SxProps<Theme> = {
	display: 'flex',
	justifyContent: 'space-between',
	flexDirection: 'row',
	alignItems: 'center',
	height: '100%',
	padding: '0 8px',
	'&:hover': {
		cursor: 'pointer',
		backgroundColor: '#333c43',
	},
}

export const NavbarLoggedInnerWrapperStyle: SxProps<Theme> = {
	display: 'flex',
	justifyContent: 'space-between',
	flexDirection: 'row',
	alignItems: 'center',
	width: '100%',
	height: '32px',
}

export const NavbarLoggedContainerStyle: SxProps<Theme> = {
	height: '48px',
	width: '100%',
	backgroundColor: colors.blackBackground,
	display: 'flex',
	alignItems: 'center',
	padding: '0 8px',
}
