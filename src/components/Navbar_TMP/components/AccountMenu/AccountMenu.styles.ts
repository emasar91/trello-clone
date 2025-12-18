import { SxProps, Theme } from '@mui/material'

export const AccountMenuDividerStyle = (theme: Theme): SxProps<Theme> => ({
	bgcolor: theme.palette.accountMenu.colorDividerMenu,
	my: 1,
})

export const AccountMenuItemStyle = (theme: Theme): SxProps<Theme> => ({
	color: theme.palette.accountMenu.itemsText,
	fontSize: '14px',
	lineHeight: '20px',
	margin: '0 -12px',
	'&:hover': { backgroundColor: theme.palette.accountMenu.itemsHover },
})

export const AccountMenuItemWorkSpaceStyle = (
	theme: Theme
): SxProps<Theme> => ({
	color: theme.palette.accountMenu.itemsText,
	fontSize: '14px',
	lineHeight: '20px',
	display: 'flex',
	alignItems: 'center',
	gap: 0.5,
	margin: '0 -12px',
	'&:hover': { backgroundColor: theme.palette.accountMenu.itemsHover },
})

export const AccountMenuItemIconStyle: SxProps<Theme> = { ml: 'auto' }

export const AccountMenuItemThemeStyle = (
	themeOpen: boolean,
	theme: Theme
): SxProps<Theme> => ({
	color: themeOpen
		? theme.palette.accountMenu.itemsTextSelected
		: theme.palette.accountMenu.itemsText,
	fontSize: '14px',
	lineHeight: '20px',
	margin: '0 -12px',
	opacity: 1,
	backgroundColor: themeOpen
		? theme.palette.accountMenu.backgroundColorItemSelected
		: 'transparent',
	borderLeft: themeOpen
		? `2px solid ${theme.palette.accountMenu.itemsTextSelected}`
		: '2px solid transparent',
	'&:hover': { backgroundColor: theme.palette.accountMenu.itemsHover },
})

export const AccountMenuSubtitleTrelloStyle = (
	theme: Theme
): SxProps<Theme> => ({
	px: 2,
	py: 0.5,
	color: theme.palette.accountMenu.menuTitle,
	margin: '0 -12px',
})

export const AccountMenuAvatarInfoStyle = (theme: Theme): SxProps<Theme> => ({
	'.MuiListItemText-primary': {
		color: `${theme.palette.accountMenu.avatarName} !important`,
		fontSize: '14px',
		lineHeight: '20px',
	},
	'.MuiListItemText-secondary': {
		color: `${theme.palette.accountMenu.avatarEmail} !important`,
		fontSize: '12px',
		lineHeight: '16px',
	},
})

export const AccountMenuAvatarIconStyle: SxProps<Theme> = {
	width: 40,
	height: 40,
	cursor: 'pointer',
}

export const AccountMenuAvatarContainerStyle: SxProps<Theme> = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	gap: 2,
	margin: '0 -12px',
}

export const AccountMenuSubtitleAccountStyle = (
	theme: Theme
): SxProps<Theme> => ({
	px: 2,
	py: 0.5,
	color: theme.palette.accountMenu.menuTitle,
	fontSize: '11px',
	lineHeight: '16px',
	margin: '0 -12px',
	fontWeight: 'bold',
})

export const AccountMenuStyle = (theme: Theme): SxProps<Theme> => ({
	position: 'absolute',
	top: '10px',
	left: '15px',
	'& .MuiPaper-root': {
		borderRadius: '8px',
		border: `${theme.palette.accountMenu.menuBorder} solid 1px`,
		overflow: 'hidden',
		opacity: 1,
		backgroundColor: `${theme.palette.accountMenu.menuBackground} !important`,
		padding: '12px',
		width: '304px',
	},
})

export const AccountMenuNavbarAvatarStyle: SxProps<Theme> = {
	width: 24,
	height: 24,
	cursor: 'pointer',
}

export const AccountMenuNavbarAvatarContainerStyle = (
	theme: Theme
): SxProps<Theme> => ({
	padding: '4px',
	position: 'relative',

	'&:hover': {
		backgroundColor: theme.palette.accountMenu.avatarMenuBackground,
	},
})
