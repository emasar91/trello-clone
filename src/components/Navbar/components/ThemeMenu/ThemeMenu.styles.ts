import { SxProps, Theme } from '@mui/material'

export const AccountMenuThemeMenuItemStyle = (
	openTheme: boolean,
	theme: Theme
): SxProps<Theme> => ({
	fontSize: '14px',
	lineHeight: '20px',
	'.MuiListItemText-primary': {
		color: openTheme
			? theme.palette.accountMenu.itemsTextSelected
			: theme.palette.accountMenu.itemsText,
		fontSize: '14px',
		lineHeight: '20px',
	},
})

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
	optionTheme: 'light' | 'dark',
	theme: Theme
): SxProps<Theme> => ({
	width: '232px',
	padding: '8px 12px',
	backgroundColor:
		selectedTheme === optionTheme
			? theme.palette.accountMenu.backgroundColorItemSelected
			: 'transparent',
	'&:hover': {
		backgroundColor:
			selectedTheme !== optionTheme
				? theme.palette.accountMenu.itemBackgroundHover
				: theme.palette.accountMenu.itemSelectedBackgroundHover,
	},

	borderLeft:
		selectedTheme === optionTheme
			? `2px solid ${theme.palette.accountMenu.itemsTextSelected}`
			: '2px solid transparent',
})

export const AccountMenuThemeMenuStyle = (theme: Theme): SxProps<Theme> => ({
	'& .MuiMenu-list': {
		backgroundColor: theme.palette.accountMenu.menuBackground,
	},
})
