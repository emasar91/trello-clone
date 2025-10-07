import { Box, Typography, useTheme, Divider } from '@mui/material'
import React from 'react'
import BoardGrid from '../BoardsList/BoardsList'
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
import { IWorkspace } from '@/types/workspaces'

function BoardSectionWorkspaces({
	username,
	workspaces,
}: {
	username: string
	workspaces: IWorkspace[]
}) {
	const theme = useTheme()
	const t = useTranslations('BoardsPage')

	//buscar espadcios de trabajo segun la url
	const workspace = workspaces.find((ws) => ws.name.toLowerCase() === username)
	console.log('🚀 ~ BoardSectionWorkspaces ~ workspace:', workspace)

	return (
		<Box sx={WorkSpacesContainerStyle}>
			<Box sx={WorkSpacesStyle}>
				{/* Header workspace */}
				<Box sx={WorkSpacesAvatarContainerStyle}>
					<Box sx={WorkSpacesAvatarStyle(workspace?.avatarColor)}>
						{workspace?.name.charAt(0).toUpperCase()}
					</Box>
					<Typography variant="h6" sx={WorkSpacesTitleStyle(theme)}>
						{workspace?.name}
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
					<BoardGrid
						boards={workspace?.boards || []}
						workspaceName={workspace?.name || ''}
						createBoard={workspace?.boards.length === 0}
					/>
				</Box>
			</Box>
		</Box>
	)
}

export default BoardSectionWorkspaces
