import { Box, CircularProgress, Typography, useTheme } from '@mui/material'
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
import { IWorkspace } from '@/types/workspaces'
import CreateWorkspaceCard from '../CreateWorkspaceCard/CreateWorkspaceCard'

import { useMemo, useState } from 'react'
import { useWorkSpaceStore } from '@/context/useWorkSpace'
import { useAuth } from '@/context/useAuthContext'
import { useCreateWorkspace } from '@/hooks/useCreateWorkSpace'
import ModalCreateWorkspace from '@/components/Navbar/components/ModalCreateWorkspace/ModalCreateWorkspace'

/**
 * BoardSectionUser es un componente que renderiza una seccion para los tableros del usuario.
 * Renderiza un header con el titulo "Recientemente visto" y un BoardGrid con los tableros recientemente vistos.
 * Tambien renderiza un header con el titulo "Workspaces" y una lista de WorkspaceSection con los workspaces del usuario.
 * Si el usuario no tiene workspaces, renderiza un CreateWorkspaceCard.
 * @param {IWorkspace[]} workspaces - La lista de workspaces del usuario.
 * @returns Un JSX element con la seccion para los tableros del usuario.
 */
export default function BoardsSectionUser({
	workspaces,
}: {
	workspaces: IWorkspace[]
}) {
	const theme = useTheme()
	const t = useTranslations('BoardsPage')

	const recentBoards = useMemo(() => {
		return workspaces
			.flatMap((ws) => ws.boards)
			.filter((b) => b.lastOpenedAt)
			.sort(
				(a, b) =>
					new Date(b.lastOpenedAt!).getTime() -
					new Date(a.lastOpenedAt!).getTime()
			)
			.slice(0, 4)
	}, [workspaces])

	const [openModal, setOpenModal] = useState(false)

	/**
	 * handleCloseModal es una funcion que cierra el modal para crear un nuevo workspace.
	 */
	const handleCloseModal = () => {
		setOpenModal(false)
	}
	const { setWorkSpaces } = useWorkSpaceStore()
	const { user } = useAuth()

	const { handleCreateWorkspace, loading: loadingWorkspace } =
		useCreateWorkspace(user, setWorkSpaces, setOpenModal)

	return (
		<Box sx={BoardSectionUserStyle}>
			{loadingWorkspace ? (
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					height={400}
				>
					<CircularProgress size={60} />
				</Box>
			) : (
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
							workspaces.map((ws, index) => (
								<WorkspaceSection key={index} workspace={ws} />
							))
						) : (
							<Box onClick={() => setOpenModal(true)}>
								<CreateWorkspaceCard remainingBoards={4} />

								<ModalCreateWorkspace
									openModal={openModal}
									handleCloseModal={handleCloseModal}
									handleSubmit={handleCreateWorkspace}
									loading={loadingWorkspace}
								/>
							</Box>
						)}
					</Box>
				</>
			)}
		</Box>
	)
}
