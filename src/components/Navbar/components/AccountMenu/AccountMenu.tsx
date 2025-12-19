import { DARK_THEME, LIGHT_THEME } from '@/constants'
import { useAuth } from '@/context/useAuthContext'
import { useThemeStore } from '@/context/useTheme'
import { useWorkSpaceStore } from '@/context/useWorkSpace'
import { useCreateWorkspace } from '@/hooks/useCreateWorkSpace'
import { logout } from '@/services/AuthActions'
import {
	Avatar,
	Box,
	Divider,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Popover,
	Typography,
	useTheme,
} from '@mui/material'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'
import {
	AccountMenuAvatarContainerStyle,
	AccountMenuAvatarIconStyle,
	AccountMenuAvatarInfoStyle,
	AccountMenuDividerStyle,
	AccountMenuItemIconStyle,
	AccountMenuItemStyle,
	AccountMenuItemThemeStyle,
	AccountMenuItemWorkSpaceStyle,
	AccountMenuStyle,
	AccountMenuSubtitleAccountStyle,
	AccountMenuSubtitleTrelloStyle,
} from './AccountMenu.styles'
import { UserDefaultIcon } from '@/public/assets/icons/UserDefaultIcon'
import { ArrowRightIcon } from '@/public/assets/icons/ArrowRightIcon'
import { CreateWorkSpaceIcon } from '@/public/assets/icons/CreateWorkSpaceIcon'
import ThemeMenu from '../ThemeMenu/ThemeMenu'
import ModalCreateWorkspace from '../ModalCreateWorkspace/ModalCreateWorkspace'
import { toast } from 'react-toastify'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

/**
 * AccountMenu es un componente que renderiza un menu de opciones para el usuario autenticado.
 * @param {HTMLElement} anchorEl - El elemento que desencadena el menu.
 * @param {() => void} onClose - La funcion que se ejecuta al cerrar el menu.
 * @param {AppRouterInstance} router - El router de la aplicacion.
 */
export default function AccountMenu({
	anchorEl,
	onClose,
	router,
}: {
	anchorEl: HTMLElement
	onClose: () => void
	router: AppRouterInstance
}) {
	const { user } = useAuth()
	const locale = useLocale()
	const t = useTranslations('NavbarLogged')
	const theme = useTheme()
	const toggleTheme = useThemeStore((s) => s.setMode)
	const open = Boolean(anchorEl)

	const [themeAnchorEl, setThemeAnchorEl] = useState<HTMLElement | null>(null)
	const themeOpen = Boolean(themeAnchorEl)

	/**
	 * handleThemeClick es una funcion que se ejecuta al hacer click en el boton de theme.
	 * @param {React.MouseEvent<HTMLElement>} event - El evento de click.
	 */
	const handleThemeClick = (event: React.MouseEvent<HTMLElement>) => {
		setThemeAnchorEl(event.currentTarget)
	}

	/**
	 * handleLogout es una funcion que se ejecuta al hacer click en el boton de logout.
	 */
	const handleLogout = async () => {
		const { firebaseError } = await logout(locale)
		onClose()
		// UX primero: salir siempre
		router.replace('/')

		if (firebaseError) {
			toast.warning('Hubo un problema al cerrar sesión completamente')
		}
	}

	const [selectedTheme, setSelectedTheme] = useState<
		typeof LIGHT_THEME | typeof DARK_THEME
	>(theme.palette.mode === 'dark' ? DARK_THEME : LIGHT_THEME)

	/**
	 * handleSelect es una funcion que se ejecuta al seleccionar un theme.
	 * @param {typeof LIGHT_THEME | typeof DARK_THEME} value - El valor del theme seleccionado.
	 */
	const handleSelect = (value: typeof LIGHT_THEME | typeof DARK_THEME) => {
		setSelectedTheme(value)
		toggleTheme(value)
	}

	const [openModal, setOpenModal] = useState(false)
	const { setWorkSpaces } = useWorkSpaceStore()

	const { handleCreateWorkspace, loading: loadingWorkspace } =
		useCreateWorkspace(user, setWorkSpaces, setOpenModal)

	return (
		<>
			<Popover
				open={open}
				anchorEl={anchorEl}
				onClose={onClose}
				keepMounted={false}
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
							{!user?.photoURL && <UserDefaultIcon />}
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
					onClick={() => setOpenModal(true)}
				>
					<CreateWorkSpaceIcon />
					{t('menu.createWorkspace')}
				</MenuItem>

				<Divider sx={AccountMenuDividerStyle(theme)} />

				<MenuItem onClick={handleLogout} sx={AccountMenuItemStyle(theme)}>
					{t('menu.logout')}
				</MenuItem>
			</Popover>

			{themeOpen && (
				<ThemeMenu
					themeAnchorEl={themeAnchorEl}
					setThemeAnchorEl={setThemeAnchorEl}
					themeOpen={themeOpen}
					handleSelect={handleSelect}
					selectedTheme={selectedTheme}
				/>
			)}

			{openModal && (
				<ModalCreateWorkspace
					openModal={openModal}
					handleCloseModal={() => setOpenModal(false)}
					handleSubmit={handleCreateWorkspace}
					loading={loadingWorkspace}
				/>
			)}
		</>
	)
}
