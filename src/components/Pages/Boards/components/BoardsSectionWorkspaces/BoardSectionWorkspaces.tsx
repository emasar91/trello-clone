import { Box, Typography, useTheme, Divider } from '@mui/material'
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
import { useLocale, useTranslations } from 'next-intl'
import { UserIcon } from '@/public/assets/icons/UserIcon'
import { IWorkspace } from '@/types/workspaces'
import { EditIcon } from '@/public/assets/icons/EditIcon'
import FormEditWorkspace from '../FormEditWorkspace/FormEditWorkspace'
import { API } from '@/constants'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '@/context/useAuthContext'
import { useWorkSpaceStore } from '@/context/useWorkSpace'
import { useRouter } from 'next/navigation'

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
	console.log('🚀 ~ BoardSectionWorkspaces ~ workspaces:', workspaces)

	const [openEditForm, setOpenEditForm] = useState(false)

	const handleOpenEditForm = () => {
		setOpenEditForm(true)
	}

	const handleCloseEditForm = () => {
		setOpenEditForm(false)
	}

	const { user } = useAuth()

	const { setWorkSpaces } = useWorkSpaceStore()

	const [loading, setLoading] = useState(false)

	const router = useRouter()
	const locale = useLocale()

	const handleOnSubmit = async (
		newName: string,
		newDescription: string,
		resetForm: () => void
	) => {
		try {
			const { data } = await axios.put(
				API.updateWorkspacesUrl,
				{
					name: newName.trim(),
					description: newDescription.trim(),
					workspaceId: workspace?._id,
				},
				{ withCredentials: true }
			)

			if (data.workspace) {
				resetForm()
				toast.success(t('editWorkspaceSuccess'))

				const { data } = await axios.get(
					`${API.getWorkspacesUrl}?uid=${user?.uid}`,
					{
						withCredentials: true,
					}
				)
				setWorkSpaces(data)
				router.replace(
					`/${locale}/w/${newName.toLowerCase().trim()}/boards?uid=${user?.uid}`
				)
			}
			handleCloseEditForm()
			// opcional: actualizar UI con data.workspace
		} catch (err) {
			if (axios.isAxiosError(err)) toast.error(err.response?.data?.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Box sx={WorkSpacesContainerStyle}>
			{!loading && (
				<Box sx={WorkSpacesStyle}>
					{/* Header workspace */}
					{openEditForm ? (
						<FormEditWorkspace
							handleClose={handleCloseEditForm}
							onSubmit={handleOnSubmit}
							defaultName={workspace?.name || ''}
							loading={loading}
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
