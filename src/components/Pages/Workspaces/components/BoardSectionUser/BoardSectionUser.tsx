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
import ModalCreateWorkspace from '@/components/Navbar/components/ModalCreateWorkspace/ModalCreateWorkspace'
import { useMemo, useState } from 'react'
import { useWorkSpaceStore } from '@/context/useWorkSpace'
import { useAuth } from '@/context/useAuthContext'
import { useCreateWorkspace } from '@/hooks/useCreateWorkSpace'

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
				<CircularProgress size={60} />
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
