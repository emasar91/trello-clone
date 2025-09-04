import { DARK_THEME, LIGHT_THEME } from '@/constants'
import {
	Box,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Radio,
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

function ThemeMenu({
	themeAnchorEl,
	setThemeAnchorEl,
	themeOpen,
	handleSelect,
	selectedTheme,
}: IThemeMenu) {
	const t = useTranslations('NavbarLogged')

	return (
		<Menu
			anchorEl={themeAnchorEl}
			open={themeOpen}
			onClose={() => setThemeAnchorEl(null)}
			sx={AccountMenuThemeMenuStyle}
		>
			<MenuItem
				onClick={() => handleSelect(LIGHT_THEME)}
				disableRipple
				sx={AccountMenuThemeMenuContainerStyle(selectedTheme, LIGHT_THEME)}
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
						src="/assets/claro.svg"
						width={64}
						height={48}
						sx={AccountMenuThemeMenuItemIconStyle}
					/>
				</ListItemIcon>
				<ListItemText
					primary={t('menu.themeSelect.light')}
					sx={AccountMenuThemeMenuItemStyle}
				/>
			</MenuItem>

			<MenuItem
				onClick={() => handleSelect(DARK_THEME)}
				disableRipple
				sx={AccountMenuThemeMenuContainerStyle(selectedTheme, DARK_THEME)}
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
						src="/assets/obscuro.svg"
						width={64}
						height={48}
						sx={AccountMenuThemeMenuItemIconStyle}
					/>
				</ListItemIcon>
				<ListItemText
					primary={t('menu.themeSelect.dark')}
					sx={AccountMenuThemeMenuItemStyle}
				/>
			</MenuItem>
		</Menu>
	)
}

export default ThemeMenu
