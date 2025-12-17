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

/**
 * Component to render a section for the workspaces.
 * It will render a avatar for the workspace, the name of the workspace and a button to edit the workspace.
 * It will also render a BoardGrid component with the boards of the workspace.
 * If the workspace has no boards, it will render a "Create board" button.
 *
 * @param {string} username - The username of the workspace.
 * @param {IWorkspace[]} workspaces - The list of workspaces.
 * @returns A JSX element with the section for the workspaces.
 */
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

	/**
	 * Opens the edit form for the workspace.
	 * This function sets the `openEditForm` state to `true`, which will render the edit form.
	 */
	const handleOpenEditForm = () => {
		setOpenEditForm(true)
	}

	/**
	 * Closes the edit form for the workspace.
	 */
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
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					height={'80dvh'}
				>
					<CircularProgress size={60} />
				</Box>
			) : (
				<Box sx={WorkSpacesStyle}>
					{/* Header workspace */}
					{openEditForm ? (
						<FormEditWorkspace
							handleClose={handleCloseEditForm}
							onSubmit={handleEditWorkspace}
							defaultName={workspace?.name || ''}
							defaultDescription={workspace?.description || ''}
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
