import { colors } from '@/constants'
import { SxProps, Theme } from '@mui/material'

export const AccountMenuThemeMenuItemStyle: SxProps<Theme> = {
	fontSize: '14px',
	lineHeight: '20px',
	'.MuiListItemText-primary': {
		color: `${colors.textAccountMenu} !important`,
		fontSize: '14px',
		lineHeight: '20px',
	},
}

export const AccountMenuThemeMenuItemIconStyle: SxProps<Theme> = {
	borderRadius: '8px',
	marginRight: '8px',
}

export const AccountMenuThemeMenuItemRadioStyle: SxProps<Theme> = {
	padding: '0',
	marginRight: '8px',
}

export const AccountMenuThemeMenuContainerStyle = (
	selectedTheme: 'light' | 'dark',
	optionTheme: 'light' | 'dark'
): SxProps<Theme> => ({
	width: '232px',
	padding: '8px 12px',
	backgroundColor:
		selectedTheme === optionTheme
			? colors.accountMenuSelectedItem
			: 'transparent',
	'&:hover': {
		backgroundColor:
			selectedTheme !== optionTheme
				? colors.hoverItemAccountMenu
				: colors.accountMenuSelectedItem,
	},
	borderLeft:
		selectedTheme === optionTheme
			? `2px solid ${colors.primary}`
			: '2px solid transparent',
})

export const AccountMenuThemeMenuStyle: SxProps<Theme> = {
	position: 'absolute',
	top: '-33px',
	left: '-238px',
	'& .MuiMenu-list': {
		backgroundColor: colors.backgroundAccountMenu,
	},
}
