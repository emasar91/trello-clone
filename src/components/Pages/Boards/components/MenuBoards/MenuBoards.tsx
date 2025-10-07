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

const MenuBoards = ({ workspaces }: { workspaces: IWorkspace[] }) => {
	const theme = useTheme()
	const pathname = usePathname()
	const router = useRouter()
	const locale = useLocale()
	const { user } = useAuth()
	const t = useTranslations('BoardsPage')

	const username =
		user?.displayName?.toLowerCase().replace(/ /g, '') ||
		user?.email?.split('@')[0] ||
		'user'
	const menuActive = pathname === `/${locale}/u/${username}/boards`

	const goToBoards = () => {
		router.push(`/${locale}/u/${username}/boards?uid=${user?.uid}`)
	}

	const goToWorkspaceBoards = (workspaceName: string) => {
		router.push(
			`/${locale}/w/${workspaceName.toLowerCase()}/boards?uid=${user?.uid}`
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
