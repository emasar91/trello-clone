'use client'

import React from 'react'
import { BoardsPageContainerStyle } from './BoardPage.styles'
import { Box, useTheme } from '@mui/material'
import { useAuth } from '@/context/useAuthContext'
import { useStoreBoard } from '@/context/useStoreBoard'
import { ManyItems } from './ManyItems/ManyItems'
import { useBoardData } from '@/hooks/useGetBoardData'
import NotificationContainer from '@/components/Notifications/Notifications'

function BoardPage({
	boardname,
	workspace,
}: {
	boardname: string
	workspace: string
}) {
	const theme = useTheme()
	const { user } = useAuth()

	const { setBoard, board, setColumns, columns, setCardsForColumn } =
		useStoreBoard()

	const { loading } = useBoardData({
		boardname,
		workspace,
		userUid: user?.uid,
		board,
		columns,
		setBoard,
		setColumns,
		setCardsForColumn,
	})

	if (loading) return <div>Cargando...</div>
	return (
		<Box component={'main'} sx={BoardsPageContainerStyle(theme)}>
			{board?.image && (
				<Box
					component="img"
					src={board?.image}
					alt={board?.name}
					sx={{
						position: 'absolute',
						top: 48,
						left: 0,
						width: '100%',
						height: 'calc(100vh - 48px)',
						objectFit: 'cover',
						filter: 'brightness(0.8)', // opcional, para oscurecer un poco el fondo
					}}
				/>
			)}

			{/* Contenido encima */}
			<Box
				sx={{
					position: 'relative',
					overflowX: 'auto',
					zIndex: 1,
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'row',
					p: 2,
					color: 'white',
				}}
			>
				<ManyItems />
			</Box>
			<NotificationContainer />
		</Box>
	)
}

export default BoardPage
