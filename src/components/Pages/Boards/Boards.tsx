'use client'
import { Box, useTheme } from '@mui/material'
import React from 'react'
import { BoardsContainerStyle } from './Boards.styles'
import MenuBoards from './components/MenuBoards/MenuBoards'

function Boards({ type }: { type: string }) {
	console.log('🚀 ~ Boards ~ type:', type)
	const theme = useTheme()

	return (
		<Box component={'nav'} sx={BoardsContainerStyle(theme)}>
			<MenuBoards />
			<Box
				component={'main'}
				sx={{
					flex: '1 1 calc(100vw - 320px)',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'start',
					padding: '0 48px 52px 48px',
					height: 'calc(100vh - 48px)',
				}}
			>
				{type === 'w' ? 'espacio de trabajo' : 'tableros'}
			</Box>
		</Box>
	)
}

export default Boards
