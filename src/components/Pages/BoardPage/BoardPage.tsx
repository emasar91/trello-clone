'use client'

import React, { useEffect } from 'react'
import { BoardsPageContainerStyle } from './BoardPage.styles'
import { Box, useTheme } from '@mui/material'
import { useAuth } from '@/context/useAuthContext'
import { API } from '@/constants'
import axios from 'axios'
import { useBoardStore } from '@/context/useBoard'
import { toast } from 'react-toastify'

function BoardPage({
	boardname,
	workspace,
}: {
	boardname: string
	workspace: string
}) {
	const theme = useTheme()
	const { user } = useAuth()

	const { setBoard, board, setColumns, columns } = useBoardStore()
	console.log('🚀 ~ BoardPage ~ columns:', columns)

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

	useEffect(() => {
		fetchBoards()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [boardname, workspace])

	useEffect(() => {
		if (board._id !== '') fetchColumns()

		console.log('🚀 ~ BoardPage ~ useEffect:', board)
		// handleCreateColumn()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [board])

	const handleCreateColumn = async () => {
		try {
			const { data } = await axios.post(
				API.createColumnUrl,
				{
					boardId: board._id,
					userId: user?.uid,
					name: 'New Column',
					order: columns.length + 1,
				},
				{ withCredentials: true }
			)

			if (data.column) {
				const { data } = await axios.get(
					`${API.getWorkspacesUrl}?uid=${user?.uid}`,
					{
						withCredentials: true,
					}
				)
				setColumns(data)
			}
			// opcional: actualizar UI con data.workspace
		} catch (err) {
			if (axios.isAxiosError(err)) toast.error(err.response?.data?.message)
		}
	}

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
					zIndex: 1,
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					p: 2,
					color: 'white',
				}}
			>
				{/* tus componentes aquí */}
				<span>{board.name}</span>
				{/* ... resto del contenido */}
			</Box>
		</Box>
	)
}

export default BoardPage
