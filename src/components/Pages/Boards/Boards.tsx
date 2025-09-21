'use client'
import { Box, useTheme } from '@mui/material'
import React from 'react'
import { BoardsContainerStyle, BoardsSectionStyle } from './Boards.styles'
import MenuBoards from './components/MenuBoards/MenuBoards'
import BoardsSectionUser from './components/BoardSectionUser/BoardSectionUser'
import BoardSectionWorkspaces from './components/BoardsSectionWorkspaces/BoardSectionWorkspaces'

function Boards({ type }: { type: string }) {
	console.log('🚀 ~ Boards ~ type:', type)
	const theme = useTheme()

	return (
		<Box component={'nav'} sx={BoardsContainerStyle(theme)}>
			<MenuBoards />
			<Box component={'main'} sx={BoardsSectionStyle}>
				{type === 'w' ? <BoardSectionWorkspaces /> : <BoardsSectionUser />}
			</Box>
		</Box>
	)
}

export default Boards
