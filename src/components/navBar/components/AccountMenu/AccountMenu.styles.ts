import { colors } from '@/constants'
import { SxProps, Theme } from '@mui/material'

export const AccountMenuDividerStyle: SxProps<Theme> = {
	bgcolor: colors.grayBordersAccountMenu,
	my: 1,
}

export const AccountMenuItemStyle: SxProps<Theme> = {
	color: colors.textAccountMenu,
	fontSize: '14px',
	lineHeight: '20px',
	margin: '0 -12px',
	'&:hover': { backgroundColor: colors.hoverItemAccountMenu },
}

export const AccountMenuItemWorkSpaceStyle: SxProps<Theme> = {
	color: colors.textAccountMenu,
	fontSize: '14px',
	lineHeight: '20px',
	display: 'flex',
	alignItems: 'center',
	gap: 0.5,
	margin: '0 -12px',
	'&:hover': { backgroundColor: colors.hoverItemAccountMenu },
}

export const AccountMenuItemIconStyle: SxProps<Theme> = { ml: 'auto' }

export const AccountMenuItemThemeStyle = (
	themeOpen: boolean
): SxProps<Theme> => ({
	color: colors.textAccountMenu,
	fontSize: '14px',
	lineHeight: '20px',
	margin: '0 -12px',
	backgroundColor: themeOpen
		? colors.accountMenuSelectedItem
		: colors.backgroundAccountMenu,
	borderLeft: themeOpen
		? `2px solid ${colors.primary}`
		: '2px solid transparent',
	'&:hover': { backgroundColor: colors.hoverItemAccountMenu },
})

export const AccountMenuSubtitleTrelloStyle: SxProps<Theme> = {
	px: 2,
	py: 0.5,
	color: colors.grayBordersAccountMenu,
	margin: '0 -12px',
}

export const AccountMenuAvatarInfoStyle: SxProps<Theme> = {
	'.MuiListItemText-primary': {
		color: `${colors.avatarPrimaryText} !important`,
		fontSize: '14px',
		lineHeight: '20px',
	},
	'.MuiListItemText-secondary': {
		color: `${colors.avatarSecondaryText} !important`,
		fontSize: '12px',
		lineHeight: '16px',
	},
}

export const AccountMenuAvatarIconStyle: SxProps<Theme> = {
	width: 40,
	height: 40,
	cursor: 'pointer',
	color: colors.grayBordersAccountMenu,
}

export const AccountMenuAvatarContainerStyle: SxProps<Theme> = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	gap: 2,
	margin: '0 -12px',
}

export const AccountMenuSubtitleAccountStyle: SxProps<Theme> = {
	px: 2,
	py: 0.5,
	color: colors.grayBordersAccountMenu,
	fontSize: '11px',
	lineHeight: '16px',
	margin: '0 -12px',
	fontWeight: 'bold',
}

export const AccountMenuStyle: SxProps<Theme> = {
	position: 'absolute',
	top: '10px',
	left: '15px',
	'& .MuiPaper-root': {
		borderRadius: '8px',
		border: `${colors.borderMenuAccount} solid 1px`,
		overflow: 'hidden',
		backgroundColor: colors.backgroundAccountMenu,
		padding: '12px',
		width: '304px',
	},
}

export const AccountMenuNavbarAvatarStyle: SxProps<Theme> = {
	width: 24,
	height: 24,
	cursor: 'pointer',
}

export const AccountMenuNavbarAvatarContainerStyle: SxProps<Theme> = {
	padding: '4px',
	position: 'relative',
	'&:hover': {
		backgroundColor: colors.grayBackgroundNavbarLoggedHover,
	},
}
