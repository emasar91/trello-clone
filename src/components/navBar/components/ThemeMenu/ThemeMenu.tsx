import { DARK_THEME, LIGHT_THEME } from '@/constants'
import {
	Box,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Radio,
	useTheme,
} from '@mui/material'
import { useTranslations } from 'next-intl'
import React from 'react'
import {
	AccountMenuThemeMenuContainerStyle,
	AccountMenuThemeMenuItemIconStyle,
	AccountMenuThemeMenuItemRadioStyle,
	AccountMenuThemeMenuItemStyle,
	AccountMenuThemeMenuStyle,
} from './ThemeMenu.styles'

type IThemeMenu = {
	themeAnchorEl: null | HTMLElement
	setThemeAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>
	themeOpen: boolean
	handleSelect: (value: typeof LIGHT_THEME | typeof DARK_THEME) => void
	selectedTheme: 'light' | 'dark'
}

/**
 * ThemeMenu is a component that allows the user to select between light and dark theme.
 * It includes two menu items with radio buttons, each corresponding to a different theme.
 * The component also includes a close icon that is displayed when the menu is open.
 * The component uses the useTheme hook from @mui/material to get the current theme.
 * The component also uses the useTranslations hook from next-intl to get the translation of the menu items.
 * The component is passed the following props:
 * - themeAnchorEl: The element that the menu is anchored to.
 * - setThemeAnchorEl: A function that sets the themeAnchorEl.
 * - themeOpen: A boolean that indicates whether the menu is open or not.
 * - handleSelect: A function that is called when a menu item is selected.
 * - selectedTheme: The theme that is currently selected.
 * @returns A Menu component with two menu items and a close icon.
 */
function ThemeMenu({
	themeAnchorEl,
	setThemeAnchorEl,
	themeOpen,
	handleSelect,
	selectedTheme,
}: IThemeMenu) {
	const t = useTranslations('NavbarLogged')

	const theme = useTheme()

	return (
		<Menu
			anchorEl={themeAnchorEl}
			open={themeOpen}
			onClose={() => setThemeAnchorEl(null)}
			sx={AccountMenuThemeMenuStyle(theme)}
		>
			<MenuItem
				onClick={() => handleSelect(LIGHT_THEME)}
				disableRipple
				sx={AccountMenuThemeMenuContainerStyle(
					selectedTheme,
					LIGHT_THEME,
					theme
				)}
			>
				<Radio
					checked={selectedTheme === LIGHT_THEME}
					value="light"
					size="medium"
					sx={AccountMenuThemeMenuItemRadioStyle}
				/>
				<ListItemIcon>
					<Box
						component="img"
						loading="lazy"
						src="/assets/claro.svg"
						width={64}
						height={48}
						sx={AccountMenuThemeMenuItemIconStyle}
					/>
				</ListItemIcon>
				<ListItemText
					primary={t('menu.themeSelect.light')}
					sx={AccountMenuThemeMenuItemStyle(
						selectedTheme === LIGHT_THEME,
						theme
					)}
				/>
			</MenuItem>

			<MenuItem
				onClick={() => handleSelect(DARK_THEME)}
				disableRipple
				sx={AccountMenuThemeMenuContainerStyle(
					selectedTheme,
					DARK_THEME,
					theme
				)}
			>
				<Radio
					checked={selectedTheme === DARK_THEME}
					value="dark"
					size="medium"
					sx={AccountMenuThemeMenuItemRadioStyle}
				/>

				<ListItemIcon>
					<Box
						component="img"
						loading="lazy"
						src="/assets/obscuro.svg"
						width={64}
						height={48}
						sx={AccountMenuThemeMenuItemIconStyle}
					/>
				</ListItemIcon>
				<ListItemText
					primary={t('menu.themeSelect.dark')}
					sx={AccountMenuThemeMenuItemStyle(
						selectedTheme === DARK_THEME,
						theme
					)}
				/>
			</MenuItem>
		</Menu>
	)
}

export default ThemeMenu
