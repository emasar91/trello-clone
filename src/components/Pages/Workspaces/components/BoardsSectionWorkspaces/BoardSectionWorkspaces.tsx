import {
	Box,
	Typography,
	useTheme,
	Divider,
	CircularProgress,
} from '@mui/material'
import React, { useState } from 'react'
import BoardGrid from '../BoardsList/BoardsList'
import {
	DividerStyle,
	WorkSpacesAvatarContainerStyle,
	WorkSpacesAvatarStyle,
	WorkSpacesBoardsAvatarContainerStyle,
	WorkSpacesBoardsContainerStyle,
	WorkSpacesContainerStyle,
	WorkSpacesEditIconStyle,
	WorkSpacesStyle,
	WorkSpacesTitleBoardsStyle,
	WorkSpacesTitleStyle,
} from './BoardSectionWorkspaces.styles'
import { useTranslations } from 'next-intl'
import { UserIcon } from '@/public/assets/icons/UserIcon'
import { IWorkspace } from '@/types/workspaces'
import { EditIcon } from '@/public/assets/icons/EditIcon'
import FormEditWorkspace from '../FormEditWorkspace/FormEditWorkspace'
import { useAuth } from '@/context/useAuthContext'
import { useWorkSpaceStore } from '@/context/useWorkSpace'
import { useEditWorkspace } from '@/hooks/useEditWorkSpace'

function BoardSectionWorkspaces({
	username,
	workspaces,
}: {
	username: string
	workspaces: IWorkspace[]
}) {
	const theme = useTheme()
	const t = useTranslations('BoardsPage')
	const { user } = useAuth()

	const { setWorkSpaces } = useWorkSpaceStore()

	const [openEditForm, setOpenEditForm] = useState(false)
	const workspace: IWorkspace = workspaces.find(
		(ws) => ws.name.toLowerCase() === username
	)!

	const handleOpenEditForm = () => {
		setOpenEditForm(true)
	}

	const handleCloseEditForm = () => {
		setOpenEditForm(false)
	}
	const { handleEditWorkspace, loading: loadingWorkspace } = useEditWorkspace(
		user,
		workspace,
		setWorkSpaces,
		handleCloseEditForm
	)
	return (
		<Box sx={WorkSpacesContainerStyle}>
			{loadingWorkspace ? (
				<CircularProgress size={60} />
			) : (
				<Box sx={WorkSpacesStyle}>
					{/* Header workspace */}
					{openEditForm ? (
						<FormEditWorkspace
							handleClose={handleCloseEditForm}
							onSubmit={handleEditWorkspace}
							defaultName={workspace?.name || ''}
							loading={loadingWorkspace}
						/>
					) : (
						<Box sx={WorkSpacesAvatarContainerStyle}>
							<Box sx={WorkSpacesAvatarStyle(workspace?.avatarColor)}>
								{workspace?.name.charAt(0).toUpperCase()}
							</Box>
							<Typography variant="h6" sx={WorkSpacesTitleStyle(theme)}>
								{workspace?.name}
							</Typography>
							<Box sx={WorkSpacesEditIconStyle} onClick={handleOpenEditForm}>
								<EditIcon />
							</Box>
						</Box>
					)}

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
			)}
		</Box>
	)
}

export default BoardSectionWorkspaces
