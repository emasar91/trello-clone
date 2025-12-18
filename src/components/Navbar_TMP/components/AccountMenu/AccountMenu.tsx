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
	useTheme,
} from '@mui/material'
import { useAuth } from '@/context/useAuthContext'
import { logout } from '@/services/AuthActions'
import { useLocale, useTranslations } from 'next-intl'
import { UserDefaultIcon } from '@/public/assets/icons/UserDefaultIcon'
import { CreateWorkSpaceIcon } from '@/public/assets/icons/CreateWorkSpaceIcon'
import { ArrowRightIcon } from '@/public/assets/icons/ArrowRightIcon'

import { DARK_THEME, LIGHT_THEME } from '@/constants'
import ThemeMenu from '../ThemeMenu/ThemeMenu'
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
import { useState } from 'react'
import ModalCreateWorkspace from '../ModalCreateWorkspace/ModalCreateWorkspace'
import { useWorkSpaceStore } from '@/context/useWorkSpace'
import { useCreateWorkspace } from '@/hooks/useCreateWorkSpace'
import { useThemeStore } from '@/context/useTheme'

export default function AccountMenu() {
	const { user } = useAuth()
	const locale = useLocale()
	const t = useTranslations('NavbarLogged')
	const theme = useTheme()
	const toggleTheme = useThemeStore((s) => s.setMode)

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
		setThemeAnchorEl(null)
	}

	const handleThemeClick = (event: React.MouseEvent<HTMLElement>) => {
		setThemeAnchorEl(event.currentTarget)
	}

	const handleLogout = async () => {
		await logout(locale)
	}

	const [selectedTheme, setSelectedTheme] = React.useState<
		typeof LIGHT_THEME | typeof DARK_THEME
	>(theme.palette.mode === 'dark' ? DARK_THEME : LIGHT_THEME)

	const handleSelect = (value: typeof LIGHT_THEME | typeof DARK_THEME) => {
		setSelectedTheme(value)
		toggleTheme(value)
	}

	const [openModal, setOpenModal] = useState(false)
	const handleOpenModal = () => setOpenModal(true)
	const handleCloseModal = () => setOpenModal(false)

	const { setWorkSpaces } = useWorkSpaceStore()

	const { handleCreateWorkspace, loading: loadingWorkspace } =
		useCreateWorkspace(user, setWorkSpaces, setOpenModal)

	return (
		<Box>
			<Box sx={AccountMenuNavbarAvatarContainerStyle(theme)}>
				<Avatar
					src={user?.photoURL || undefined}
					sx={AccountMenuNavbarAvatarStyle}
					onClick={handleClick}
				>
					{!user?.photoURL ? <UserDefaultIcon /> : null}
				</Avatar>
			</Box>

			{/* Menú principal */}
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				sx={AccountMenuStyle(theme)}
			>
				<Typography
					variant="caption"
					sx={AccountMenuSubtitleAccountStyle(theme)}
				>
					{t('menu.account').toUpperCase()}
				</Typography>
				<MenuItem sx={AccountMenuAvatarContainerStyle} disableRipple>
					<ListItemIcon>
						<Avatar
							src={user?.photoURL || undefined}
							sx={AccountMenuAvatarIconStyle}
						>
							{!user?.photoURL ? <UserDefaultIcon /> : null}
						</Avatar>
					</ListItemIcon>
					<ListItemText
						primary={user?.displayName || user?.email?.split('@')[0]}
						secondary={user?.email}
						sx={AccountMenuAvatarInfoStyle(theme)}
					/>
				</MenuItem>
				<Divider sx={AccountMenuDividerStyle(theme)} />

				<Typography
					variant="caption"
					sx={AccountMenuSubtitleTrelloStyle(theme)}
				>
					{t('menu.trello').toUpperCase()}
				</Typography>
				<MenuItem sx={AccountMenuItemStyle(theme)} disableRipple>
					{t('menu.profile')}
				</MenuItem>
				<MenuItem sx={AccountMenuItemStyle(theme)} disableRipple>
					{t('menu.activity')}
				</MenuItem>
				<MenuItem sx={AccountMenuItemStyle(theme)} disableRipple>
					{t('menu.cards')}
				</MenuItem>
				<MenuItem sx={AccountMenuItemStyle(theme)} disableRipple>
					{t('menu.settings')}
				</MenuItem>

				{/* Item que abre submenu */}
				<MenuItem
					onClick={handleThemeClick}
					sx={AccountMenuItemThemeStyle(themeOpen, theme)}
					disableRipple
				>
					{t('menu.theme')}
					<Box component="span" sx={AccountMenuItemIconStyle}>
						<ArrowRightIcon />
					</Box>
				</MenuItem>

				<Divider sx={AccountMenuDividerStyle(theme)} />

				<MenuItem
					sx={AccountMenuItemWorkSpaceStyle(theme)}
					disableRipple
					onClick={handleOpenModal}
				>
					<CreateWorkSpaceIcon />
					{t('menu.createWorkspace')}
				</MenuItem>

				<Divider sx={AccountMenuDividerStyle(theme)} />

				<MenuItem
					onClick={handleLogout}
					sx={AccountMenuItemStyle(theme)}
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

			<ModalCreateWorkspace
				openModal={openModal}
				handleCloseModal={handleCloseModal}
				handleSubmit={handleCreateWorkspace}
				loading={loadingWorkspace}
			/>
		</Box>
	)
}
