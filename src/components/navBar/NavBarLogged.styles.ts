import { SxProps, Theme } from '@mui/material'

export const NavbarLoggedCreateButtonStyle = (
	theme: Theme
): SxProps<Theme> => ({
	height: '32px',
	padding: '0 8px',
	backgroundColor: theme.palette.navbar.createButtonBackground,
	color: theme.palette.navbar.createButtonText,
	lineHeight: '32px',
	maxWidth: '57px !important',
	margin: '0 !important',
	minWidth: '57px !important',
	'&:hover': {
		backgroundColor: theme.palette.navbar.createButtonBackgroundHover,
	},
})

export const NavbarLoggedAdormentIconStyle: SxProps<Theme> = { ml: -2 }

export const NavbarLoggedSearchInputStyle = (theme: Theme): SxProps<Theme> => ({
	height: '32px',
	border: `1px solid ${theme.palette.navbar.searchInputBorder}`,
	borderRadius: '4px',
	padding: '0 12px 0 24px',
	width: '100%',
	backgroundColor: 'transparent',
	transition: 'background-color 0.3s ease',
	'&:hover': {
		backgroundColor: theme.palette.navbar.searchInputBackgroundHover,
	},
	'& .MuiInputBase-input': {
		color: theme.palette.navbar.searchInputText,
		p: 0,
		fontSize: '14px',
		lineHeight: '20px',
	},
	'.MuiInputBase-input::placeholder': {
		color: theme.palette.navbar.searchInputPlaceholder,
		opacity: 1,
	},
})

export const NavbarLoggedSearchContainerStyle: SxProps<Theme> = {
	flex: 1,
	minWidth: 0,
}

export const NavbarLoggedActionsStyle: SxProps<Theme> = {
	display: 'flex',
	gap: 1,
	justifyContent: 'center',
	alignItems: 'center',
	marginLeft: '1rem',
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

export const NavbarLoggedLogoWrapperStyle = (theme: Theme): SxProps<Theme> => ({
	display: 'flex',
	justifyContent: 'space-between',
	flexDirection: 'row',
	alignItems: 'center',
	height: '100%',
	padding: '0 8px',
	'&:hover': {
		cursor: 'pointer',
		backgroundColor: theme.palette.navbar.logoHover,
		borderRadius: '4px',
	},
})

export const NavbarLoggedInnerWrapperStyle: SxProps<Theme> = {
	display: 'flex',
	justifyContent: 'space-between',
	flexDirection: 'row',
	alignItems: 'center',
	width: '100%',
	height: '32px',
}

export const NavbarLoggedContainerStyle = (theme: Theme): SxProps<Theme> => ({
	height: '48px',
	width: '100%',
	backgroundColor: theme.palette.navbar.containerBackground,
	display: 'flex',
	alignItems: 'center',
	padding: '0 8px',
})
