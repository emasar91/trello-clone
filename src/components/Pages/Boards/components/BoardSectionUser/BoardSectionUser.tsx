import { Box, Typography, useTheme } from '@mui/material'
import BoardGrid from '../BoardsList/BoardsList'
import WorkspaceSection from '../WorkSpaces/WorkSpaces'
import { ClockIcon } from '@/public/assets/icons/ClockIcon'
import {
	BoardSectionUserStyle,
	BoardSectionUserTitleContainerStyle,
	BoardSectionUserTitleContainerWorkspaceStyle,
	BoardSectionUserTitleStyle,
} from './BoardSectionUser.styles'
import { useTranslations } from 'next-intl'
type Board = {
	id: string
	title: string
	image?: string
}
type Workspace = {
	id: string
	name: string
	color: string
	boards: Board[]
}

export default function BoardsSectionUser() {
	const theme = useTheme()
	const t = useTranslations('BoardsPage')

	const recentBoards: Board[] = [
		{ id: '1', title: 'Sirena trello', image: 'fondo1.jpg' },
		{ id: '2', title: 'Nonprofit Project Management', image: '/fondo2.jpg' },
		{ id: '3', title: 'Lean Canvas', image: '/fondo3.jpg' },
		{ id: '4', title: 'Tier List', image: '/fondo6.jpg' },
	]

	const workspaces: Workspace[] = [
		{
			id: 'w1',
			name: 'Sirena',
			color: 'royalblue',
			boards: [
				{ id: 'b1', title: 'Sirena trello', image: '/sirena.png' },
				{ id: 'b2', title: 'TEST cambio', image: '/test.png' },
			],
		},
		{
			id: 'w2',
			name: 'testt',
			color: 'orangered',
			boards: [], // este no tiene tableros
		},
	]

	return (
		<Box sx={BoardSectionUserStyle}>
			{/* Sección Visto recientemente */}
			<Box>
				<Box sx={BoardSectionUserTitleContainerStyle}>
					<ClockIcon />
					<Typography variant="h6" sx={BoardSectionUserTitleStyle(theme)}>
						{t('recentlyViewed')}
					</Typography>
				</Box>
				<BoardGrid
					boards={recentBoards}
					createBoard={false}
					workspaceName={t('recently')}
				/>
			</Box>

			{/* Sección Workspaces */}
			<Box>
				<Typography
					variant="h6"
					sx={BoardSectionUserTitleContainerWorkspaceStyle(theme)}
				>
					{t('workspacesUser')}
				</Typography>
				{workspaces.map((ws) => (
					<WorkspaceSection key={ws.id} workspace={ws} />
				))}
			</Box>
		</Box>
	)
}
