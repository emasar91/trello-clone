import * as React from 'react'
import {
	Menu,
	MenuItem,
	Divider,
	ListItemIcon,
	ListItemText,
	Typography,
	Box,
	Avatar,
} from '@mui/material'
import { useAuth } from '@/context/useAuthContext'
import { logout } from '@/services/AuthActions'
import { useLocale, useTranslations } from 'next-intl'
import { UserDefaultIcon } from '@/public/assets/icons/UserDefaultIcon'
import { CreateWorkSpaceIcon } from '@/public/assets/icons/CreateWorkSpaceIcon'
import { ArrowRightIcon } from '@/public/assets/icons/ArrowRightIcon'

import { DARK_THEME, LIGHT_THEME } from '@/constants'
import ThemeMenu from '../ThemeMenu/ThemMenu'
import {
	AccountMenuAvatarContainerStyle,
	AccountMenuAvatarIconStyle,
	AccountMenuAvatarInfoStyle,
	AccountMenuDividerStyle,
	AccountMenuItemIconStyle,
	AccountMenuItemStyle,
	AccountMenuItemThemeStyle,
	AccountMenuItemWorkSpaceStyle,
	AccountMenuNavbarAvatarContainerStyle,
	AccountMenuNavbarAvatarStyle,
	AccountMenuStyle,
	AccountMenuSubtitleAccountStyle,
	AccountMenuSubtitleTrelloStyle,
} from './AccountMenu.styles'

export default function AccountMenu() {
	const { user } = useAuth()
	const locale = useLocale()
	const t = useTranslations('NavbarLogged')

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const [themeAnchorEl, setThemeAnchorEl] = React.useState<null | HTMLElement>(
		null
	)

	const open = Boolean(anchorEl)
	const themeOpen = Boolean(themeAnchorEl)

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
		setThemeAnchorEl(null) // cierro ambos
	}

	const handleThemeClick = (event: React.MouseEvent<HTMLElement>) => {
		setThemeAnchorEl(event.currentTarget)
	}

	const handleLogout = async () => {
		await logout(locale)
	}

	const [selectedTheme, setSelectedTheme] = React.useState<
		typeof LIGHT_THEME | typeof DARK_THEME
	>(LIGHT_THEME)

	const handleSelect = (value: typeof LIGHT_THEME | typeof DARK_THEME) => {
		setSelectedTheme(value)
		console.log('🌞 Tema elegido:', value)
	}

	return (
		<Box>
			<Box sx={AccountMenuNavbarAvatarContainerStyle}>
				<Avatar
					src={user?.photoURL || undefined}
					sx={AccountMenuNavbarAvatarStyle}
					onClick={handleClick}
				>
					{!user?.photoURL && <UserDefaultIcon />}
				</Avatar>
			</Box>

			{/* Menú principal */}
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				sx={AccountMenuStyle}
			>
				<Typography variant="caption" sx={AccountMenuSubtitleAccountStyle}>
					{t('menu.account').toUpperCase()}
				</Typography>
				<MenuItem sx={AccountMenuAvatarContainerStyle}>
					<ListItemIcon>
						<Avatar
							src={user?.photoURL || undefined}
							sx={AccountMenuAvatarIconStyle}
						>
							{!user?.photoURL && <UserDefaultIcon />}
						</Avatar>
					</ListItemIcon>
					<ListItemText
						primary={user?.displayName || user?.email?.split('@')[0]}
						secondary={user?.email}
						sx={AccountMenuAvatarInfoStyle}
					/>
				</MenuItem>
				<Divider sx={AccountMenuDividerStyle} />

				<Typography variant="caption" sx={AccountMenuSubtitleTrelloStyle}>
					{t('menu.trello').toUpperCase()}
				</Typography>
				<MenuItem sx={AccountMenuItemStyle} disableRipple>
					{t('menu.profile')}
				</MenuItem>
				<MenuItem sx={AccountMenuItemStyle} disableRipple>
					{t('menu.activity')}
				</MenuItem>
				<MenuItem sx={AccountMenuItemStyle} disableRipple>
					{t('menu.cards')}
				</MenuItem>
				<MenuItem sx={AccountMenuItemStyle} disableRipple>
					{t('menu.settings')}
				</MenuItem>

				{/* Item que abre submenu */}
				<MenuItem
					onClick={handleThemeClick}
					sx={AccountMenuItemThemeStyle(themeOpen)}
					disableRipple
				>
					{t('menu.theme')}
					<Box component="span" sx={AccountMenuItemIconStyle}>
						<ArrowRightIcon />
					</Box>
				</MenuItem>

				<Divider sx={AccountMenuDividerStyle} />

				<MenuItem sx={AccountMenuItemWorkSpaceStyle} disableRipple>
					<CreateWorkSpaceIcon />
					{t('menu.createWorkspace')}
				</MenuItem>

				<Divider sx={AccountMenuDividerStyle} />

				<MenuItem
					onClick={handleLogout}
					sx={AccountMenuItemStyle}
					disableRipple
				>
					{t('menu.logout')}
				</MenuItem>
			</Menu>

			<ThemeMenu
				themeAnchorEl={themeAnchorEl}
				setThemeAnchorEl={setThemeAnchorEl}
				themeOpen={themeOpen}
				handleSelect={handleSelect}
				selectedTheme={selectedTheme}
			/>
		</Box>
	)
}
