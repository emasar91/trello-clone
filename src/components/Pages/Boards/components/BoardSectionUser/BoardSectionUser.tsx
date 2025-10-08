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
import { IBoard, IWorkspace } from '@/types/workspaces'
import CreateWorkspaceCard from '../CreateWorkspaceCard/CreateWorkspaceCard'
import ModalCreateWorkspace from '@/components/Navbar/components/ModalCreateWorkspace/ModalCreateWorkspace'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { API } from '@/constants'
import { useWorkSpaceStore } from '@/context/useWorkSpace'
import { useAuth } from '@/context/useAuthContext'

export default function BoardsSectionUser({
	workspaces,
}: {
	workspaces: IWorkspace[]
}) {
	const theme = useTheme()
	const t = useTranslations('BoardsPage')

	const allBoards: IBoard[] = workspaces.flatMap((ws) => ws.boards)

	// 2. Filtrar solo los que tengan lastOpenedAt
	const openedBoards = allBoards.filter((b) => b.lastOpenedAt !== null)

	// 3. Ordenar del más reciente al más antiguo
	openedBoards?.sort((a, b) => {
		// Como lastOpenedAt no es null aquí, podemos usar !
		return b.lastOpenedAt!.getTime() - a.lastOpenedAt!.getTime()
	})

	// 4. Tomar solo los 4 primeros
	const recentBoards = openedBoards.length > 0 ? openedBoards.slice(0, 4) : []

	const [openModal, setOpenModal] = useState(false)
	const handleCloseModal = () => {
		setOpenModal(false)
	}
	const { setWorkSpaces } = useWorkSpaceStore()
	const { user } = useAuth()

	const [loading, setLoading] = useState(false)

	const handleSubmit = async (
		workspaceName: string,
		workspaceDescription: string,
		resetForm: () => void
	) => {
		try {
			const { data } = await axios.post(
				API.createWorkspacesUrl,
				{
					name: workspaceName.trim(),
					description: workspaceDescription.trim(),
				},
				{ withCredentials: true }
			)

			if (data.workspace) {
				resetForm()
				setOpenModal(false)
				toast.success(t('menuBaord.successCreate'))

				const { data } = await axios.get(
					`${API.getWorkspacesUrl}?uid=${user?.uid}`,
					{
						withCredentials: true,
					}
				)
				setWorkSpaces(data)
			}
			// opcional: actualizar UI con data.workspace
		} catch (err) {
			if (axios.isAxiosError(err)) toast.error(err.response?.data?.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Box sx={BoardSectionUserStyle}>
			{!loading && (
				<>
					<Box>
						{recentBoards.length > 0 && (
							<>
								<Box sx={BoardSectionUserTitleContainerStyle}>
									<ClockIcon />
									<Typography
										variant="h6"
										sx={BoardSectionUserTitleStyle(theme)}
									>
										{t('recentlyViewed')}
									</Typography>
								</Box>
								<BoardGrid
									boards={recentBoards}
									createBoard={false}
									workspaceName={t('recently')}
								/>
							</>
						)}
					</Box>

					<Box>
						<Typography
							variant="h6"
							sx={BoardSectionUserTitleContainerWorkspaceStyle(theme)}
						>
							{t('workspacesUser')}
						</Typography>
						{workspaces.length > 0 ? (
							workspaces.map((ws) => (
								<WorkspaceSection key={ws._id} workspace={ws} />
							))
						) : (
							<Box onClick={() => setOpenModal(true)}>
								<CreateWorkspaceCard remainingBoards={4} />
								<ModalCreateWorkspace
									openModal={openModal}
									handleCloseModal={handleCloseModal}
									handleSubmit={handleSubmit}
								/>
							</Box>
						)}
					</Box>
				</>
			)}
		</Box>
	)
}
