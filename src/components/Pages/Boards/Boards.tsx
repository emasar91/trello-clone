'use client'
import { Box, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import { BoardsContainerStyle, BoardsSectionStyle } from './Boards.styles'
import MenuBoards from './components/MenuBoards/MenuBoards'
import BoardsSectionUser from './components/BoardSectionUser/BoardSectionUser'
import BoardSectionWorkspaces from './components/BoardsSectionWorkspaces/BoardSectionWorkspaces'
import axios from 'axios'
import { API } from '@/constants'
import { useWorkSpaceStore } from '@/context/useWorkSpace'
import NotificationContainer from '@/components/Notifications/Notifications'

function Boards({
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

	const fetchWorkspaces = async () => {
		const { data } = await axios.get(`${API.getWorkspacesUrl}?uid=${uid}`, {
			withCredentials: true,
		})
		setWorkSpaces(data)
	}

	useEffect(() => {
		fetchWorkspaces()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [type, username, uid])
	console.log('🚀 ~ Boards ~ type:', type)

	return (
		<Box component={'nav'} sx={BoardsContainerStyle(theme)}>
			<MenuBoards workspaces={workspaces} />
			<Box component={'main'} sx={BoardsSectionStyle}>
				{type === 'w' ? (
					<BoardSectionWorkspaces username={username} workspaces={workspaces} />
				) : type === 'u' ? (
					<BoardsSectionUser workspaces={workspaces} />
				) : (
					<span>error</span>
				)}
				<NotificationContainer />
			</Box>
		</Box>
	)
}

export default Boards
