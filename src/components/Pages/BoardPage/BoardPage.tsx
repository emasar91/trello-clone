'use client'

import React from 'react'
import {
	BoardContentStyle,
	BoardImageStyle,
	BoardsPageContainerStyle,
	ErrorContainerStyle,
	LoadingContainerStyle,
} from './BoardPage.styles'
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
		return <Box sx={ErrorContainerStyle}>{error}</Box>
	}

	if (loading)
		return (
			<Box sx={LoadingContainerStyle}>
				<CircularProgress />
				Cargando tablero...
			</Box>
		)

	return (
		<Box component={'main'} sx={BoardsPageContainerStyle(theme)}>
			{board?.image && (
				<Box
					component="img"
					src={board?.image}
					alt={board?.name}
					sx={BoardImageStyle}
				/>
			)}
			<Box sx={BoardContentStyle}>
				<ManyItems />
			</Box>
			<NotificationContainer />
		</Box>
	)
}

export default BoardPage
