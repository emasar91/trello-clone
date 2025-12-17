'use client'
import { Box, CircularProgress, useMediaQuery, useTheme } from '@mui/material'
import React, { useLayoutEffect } from 'react'
import {
	BoardsContainerStyle,
	BoardsSectionStyle,
} from './WorkspacesPage.styles'
import MenuBoards from './components/MenuBoards/MenuBoards'
import BoardsSectionUser from './components/BoardSectionUser/BoardSectionUser'
import BoardSectionWorkspaces from './components/BoardsSectionWorkspaces/BoardSectionWorkspaces'
import { useWorkSpaceStore } from '@/context/useWorkSpace'
import NotificationContainer from '@/components/Notifications/Notifications'
import { useGetWorkspaces } from '@/hooks/useGetWorkSpace'

/**
 * WorkspacesPage component
 *
 * @param {string} type - type of workspace page, can be 'w' for workspace or 'u' for user
 * @param {string} username - username of the user or workspace
 * @param {string} uid - uid of the user or workspace
 *
 * @returns JSX element
 */
function WorkspacesPage({
	type,
	username,
	uid,
}: {
	type: string
	username: string
	uid: string
}) {
	const theme = useTheme()

	const { setWorkSpaces, workspaces } = useWorkSpaceStore()

	const { getWorkspaces, loading: loadingWorkspace } = useGetWorkspaces()

	useLayoutEffect(() => {
		getWorkspaces(setWorkSpaces)
	}, [uid, getWorkspaces, setWorkSpaces])
	const width = useMediaQuery('(min-width:600px)')

	return (
		<Box component={'nav'} sx={BoardsContainerStyle(theme)}>
			{width && <MenuBoards workspaces={workspaces} />}
			<Box component="main" sx={BoardsSectionStyle}>
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
					<>
						{type === 'w' && (
							<BoardSectionWorkspaces
								username={username}
								workspaces={workspaces}
							/>
						)}

						{type === 'u' && <BoardsSectionUser workspaces={workspaces} />}

						{type !== 'w' && type !== 'u' && <span>error</span>}
					</>
				)}

				<NotificationContainer />
			</Box>
		</Box>
	)
}

export default WorkspacesPage
