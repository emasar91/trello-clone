'use client'
import { Box, Divider, useTheme } from '@mui/material'
import Typography from '@mui/material/Typography'
import {
	MenuBoardsContainerStyle,
	MenuBoardsItemContainerStyle,
	MenuBoardsItemTextStyle,
	MenuBoardsItemTextWorkSpaceStyle,
} from './MenuBoards.styes'
import { TrelloLogoIcon } from '@/public/assets/icons/TrelloLogoIcon'
import { usePathname, useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useAuth } from '@/context/useAuthContext'
import MenuWorkSpaces from '../MenuWorkSpaces/MenuWorkSpaces'
import { IWorkspace } from '@/types/workspaces'

/**
 * Component to render the menu for the boards page.
 * It will render an item for the user's boards and another item for the workspaces.
 * When the user clicks on an item, it will navigate to the corresponding page.
 *
 * @param {IWorkspace[]} workspaces - The list of workspaces.
 *
 * @returns A JSX element with the menu for the boards page.
 */
const MenuBoards = ({ workspaces }: { workspaces: IWorkspace[] }) => {
	const theme = useTheme()
	const pathname = usePathname()
	const router = useRouter()
	const locale = useLocale()
	const { user } = useAuth()
	const t = useTranslations('BoardsPage')
	const currentLocale = locale || 'es'

	const username =
		user?.displayName?.toLowerCase().replace(/ /g, '') ||
		user?.email?.split('@')[0] ||
		'user'
	const menuActive = pathname === `/${currentLocale}/u/${username}/boards`

	/**
	 * Navigates to the boards page for the current user.
	 */
	const goToBoards = () => {
		router.push(`/${currentLocale}/u/${username}/boards?uid=${user?.uid}`)
	}

	/**
	 * Navigates to the boards page for the given workspace.
	 * @param {string} workspaceName - The name of the workspace.
	 */
	const goToWorkspaceBoards = (workspaceName: string) => {
		router.push(
			`/${currentLocale}/w/${workspaceName.toLowerCase()}/boards?uid=${
				user?.uid
			}`
		)
	}

	return (
		<Box component={'aside'} sx={MenuBoardsContainerStyle}>
			<Box>
				<Box
					sx={MenuBoardsItemContainerStyle(menuActive, theme)}
					onClick={goToBoards}
				>
					<TrelloLogoIcon
						color={
							menuActive
								? theme.palette.boardsMenu.textBoardsSelected
								: theme.palette.boardsMenu.textBoards
						}
					/>
					<Typography
						variant="h6"
						sx={MenuBoardsItemTextStyle(menuActive, theme)}
					>
						{t('boards')}
					</Typography>
				</Box>
				<Divider />
				<Typography variant="h6" sx={MenuBoardsItemTextWorkSpaceStyle(theme)}>
					{t('workspaces')}
				</Typography>
				<MenuWorkSpaces
					workSpaces={workspaces as unknown as IWorkspace[]}
					goToWorkspaceBoards={goToWorkspaceBoards}
				/>
			</Box>
		</Box>
	)
}

export default MenuBoards
