'use client'

import React, { useEffect } from 'react'
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
import { useTranslations } from 'next-intl'
import { useUpdateLastOpenedBoard } from '@/hooks/useUpdateLastOpenedBoards'

const BoardPage = ({
	boardname,
	workspace,
}: {
	boardname: string
	workspace: string
}) => {
	const theme = useTheme()
	const { user } = useAuth()
	const t = useTranslations('BoardsPage')

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

	const { updateLastOpened } = useUpdateLastOpenedBoard()

	useEffect(() => {
		if (board && board._id) {
			updateLastOpened(board._id)
		}
	}, [board, updateLastOpened])

	if (error) {
		return <Box sx={ErrorContainerStyle}>{error}</Box>
	}

	if (loading)
		return (
			<Box sx={LoadingContainerStyle}>
				<CircularProgress />
				{t('loadingBoard')}
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
