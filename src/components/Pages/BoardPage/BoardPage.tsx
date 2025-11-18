'use client'

import React, { useEffect, useRef } from 'react'
import { BoardsPageContainerStyle } from './BoardPage.styles'
import { Box, useTheme } from '@mui/material'
import { useAuth } from '@/context/useAuthContext'
import { API } from '@/constants'
import axios from 'axios'
import { useStoreBoard } from '@/context/useStoreBoard'
import { IColumn } from '@/types/columns'
import { MultipleContainers } from './MultipleContainers/MultipleContainers'

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

	const fetchBoards = async () => {
		const { data } = await axios.get(
			`${API.getBoardByNameUrl}?uid=${
				user?.uid
			}&workspaceName=${encodeURIComponent(
				workspace
			)}&boardName=${encodeURIComponent(boardname)}`,
			{
				withCredentials: true,
			}
		)
		setBoard(data.board)
	}

	const fetchColumns = async () => {
		const { data } = await axios.get(
			`${API.getBoardColumnsUrl}?boardId=${board._id}`,
			{
				withCredentials: true,
			}
		)
		setColumns(data.columns)
	}

	const fetchCards = async (column: IColumn) => {
		const { data } = await axios.get(
			`${API.getCardsByColumnUrl}?columnId=${column._id}`,
			{
				withCredentials: true,
			}
		)
		setCardsForColumn(column._id.toString(), data.cards)
	}

	const fetched = useRef(false)

	useEffect(() => {
		if (!fetched.current && boardname && workspace) {
			fetched.current = true
			fetchBoards()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [boardname, workspace])

	const fetchedColumns = useRef(false)

	useEffect(() => {
		if (board._id && !fetchedColumns.current) {
			fetchedColumns.current = true
			fetchColumns()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [board._id])

	const fetchedCards = useRef(false)

	useEffect(() => {
		if (columns.length > 0 && columns) {
			fetchedCards.current = true
			columns.forEach((column) => fetchCards(column))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [columns])

	// const handleCreateColumn = async () => {
	// 	try {
	// 		const { data } = await axios.post(
	// 			API.createColumnUrl,
	// 			{
	// 				boardId: board._id,
	// 				userId: user?.uid,
	// 				name: 'New Column',
	// 				order: columns.length + 1,
	// 			},
	// 			{ withCredentials: true }
	// 		)

	// 		if (data.column) {
	// 			const { data } = await axios.get(
	// 				`${API.getWorkspacesUrl}?uid=${user?.uid}`,
	// 				{
	// 					withCredentials: true,
	// 				}
	// 			)
	// 			setColumns(data)
	// 		}
	// 		// opcional: actualizar UI con data.workspace
	// 	} catch (err) {
	// 		if (axios.isAxiosError(err)) toast.error(err.response?.data?.message)
	// 	}
	// }

	return (
		<Box component={'main'} sx={BoardsPageContainerStyle(theme)}>
			{board.image && (
				<Box
					component="img"
					src={board.image}
					alt={board.name}
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
				{/* tus componentes aquí */}
				<MultipleContainers itemCount={15} />
			</Box>
		</Box>
	)
}

export default BoardPage
