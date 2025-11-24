'use client'

import React from 'react'
import { BoardsPageContainerStyle } from './BoardPage.styles'
import { Box, CircularProgress, useTheme } from '@mui/material'
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

	const { loading, error } = useBoardData({
		boardname,
		workspace,
		userUid: user?.uid,
		board,
		columns,
		setBoard,
		setColumns,
		setCardsForColumn,
	})

	if (error) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					gap: 2,
				}}
			>
				{error}
			</Box>
		)
	}

	if (loading)
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					gap: 2,
				}}
			>
				<CircularProgress />
				Cargando tablero...
			</Box>
		)

	console.log('🚀 ~ BoardPage ~ loading:', loading)
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
