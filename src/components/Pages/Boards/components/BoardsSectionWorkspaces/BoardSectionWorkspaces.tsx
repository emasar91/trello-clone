import { Box, Typography, useTheme, Divider } from '@mui/material'
import React from 'react'
import BoardGrid from '../BoardsList/BoardsList'
import { getRandomAvatarColor } from '../../Utils'
import {
	DividerStyle,
	WorkSpacesAvatarContainerStyle,
	WorkSpacesAvatarStyle,
	WorkSpacesBoardsAvatarContainerStyle,
	WorkSpacesBoardsContainerStyle,
	WorkSpacesContainerStyle,
	WorkSpacesStyle,
	WorkSpacesTitleBoardsStyle,
	WorkSpacesTitleStyle,
} from './BoardSectionWorkspaces.styles'
import { useTranslations } from 'next-intl'
import { UserIcon } from '@/public/assets/icons/UserIcon'

type IWorkspace = {
	id: string
	name: string
	color: string
	boards: {
		id: string
		title: string
		image?: string
	}[]
}

function BoardSectionWorkspaces() {
	const theme = useTheme()
	const color = getRandomAvatarColor()
	const t = useTranslations('BoardsPage')

	//buscar espadcios de trabajo segun la url
	const workspace: IWorkspace = {
		id: 'w1',
		name: 'Sirena',
		color: 'royalblue',
		boards: [
			{ id: 'b1', title: 'Sirena trello', image: '/sirena.png' },
			{ id: 'b2', title: 'TEST cambio', image: '/test.png' },
		],
	}

	return (
		<Box sx={WorkSpacesContainerStyle}>
			<Box sx={WorkSpacesStyle}>
				{/* Header workspace */}
				<Box sx={WorkSpacesAvatarContainerStyle}>
					<Box sx={WorkSpacesAvatarStyle(color)}>
						{workspace.name.charAt(0).toUpperCase()}
					</Box>
					<Typography variant="h6" sx={WorkSpacesTitleStyle(theme)}>
						{workspace.name}
					</Typography>
				</Box>

				<Divider sx={DividerStyle} />

				<Box sx={WorkSpacesBoardsContainerStyle}>
					<Box sx={WorkSpacesBoardsAvatarContainerStyle}>
						<UserIcon />
						<Typography variant="h6" sx={WorkSpacesTitleBoardsStyle(theme)}>
							{t('yourBoards')}
						</Typography>
					</Box>
					<BoardGrid boards={workspace.boards} workspaceName={workspace.name} />
				</Box>
			</Box>
		</Box>
	)
}

export default BoardSectionWorkspaces
