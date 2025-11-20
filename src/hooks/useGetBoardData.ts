import { useEffect, useRef, useState, useCallback } from 'react'
import axios from 'axios'
import { API } from '@/constants'
import { IColumn } from '@/types/columns'
import { ICard } from '@/types/card'
import { IBoard } from '@/types/boards'
import { toast } from 'react-toastify'

type UseBoardDataProps = {
	boardname: string
	workspace: string
	userUid?: string
	board: IBoard
	columns: IColumn[]
	setBoard: (board: IBoard) => void
	setColumns: (columns: IColumn[]) => void
	setCardsForColumn: (columnId: string, cards: ICard[]) => void
}

export const useBoardData = ({
	boardname,
	workspace,
	userUid,
	board,
	columns,
	setBoard,
	setColumns,
	setCardsForColumn,
}: UseBoardDataProps) => {
	const [loading, setLoading] = useState(true)

	/** 🔹 Fetch Board */
	const fetchBoard = useCallback(async () => {
		try {
			const { data } = await axios.get(
				`${
					API.getBoardByNameUrl
				}?uid=${userUid}&workspaceName=${encodeURIComponent(
					workspace
				)}&boardName=${encodeURIComponent(boardname)}`,
				{ withCredentials: true }
			)
			setBoard(data.board)
		} catch (err) {
			if (axios.isAxiosError(err)) {
				toast.error(
					err.response?.data?.message || 'Error al obtener el tablero'
				)
			} else {
				toast.error('Error inesperado')
			}
		}
	}, [boardname, workspace, userUid, setBoard])

	/** 🔹 Fetch Columns */
	const fetchColumns = useCallback(async () => {
		try {
			const { data } = await axios.get(
				`${API.getBoardColumnsUrl}?boardId=${board._id}`,
				{ withCredentials: true }
			)
			setColumns(data.columns)
		} catch (err) {
			if (axios.isAxiosError(err)) {
				toast.error(
					err.response?.data?.message || 'Error al obtener las columnas'
				)
			} else {
				toast.error('Error inesperado')
			}
		}
	}, [board._id, setColumns])

	/** 🔹 Fetch Cards por columna */
	const fetchCards = useCallback(async () => {
		try {
			await Promise.all(
				columns.map(async (column) => {
					const { data } = await axios.get(
						`${API.getCardsByColumnUrl}?columnId=${column._id}`,
						{ withCredentials: true }
					)
					setCardsForColumn(column._id.toString(), data.cards)
				})
			)
			setLoading(false) // 👈 SOLO ACÁ
		} catch (err) {
			if (axios.isAxiosError(err)) {
				toast.error(
					err.response?.data?.message || 'Error al obtener las tarjetas'
				)
			} else {
				toast.error('Error inesperado')
			}
		}
	}, [columns, setCardsForColumn])

	/** ⛔ Control Strict Mode */
	const boardFetched = useRef(false)
	useEffect(() => {
		if (!boardFetched.current && boardname && workspace) {
			boardFetched.current = true
			fetchBoard()
		}
	}, [boardname, workspace, fetchBoard])

	const columnsFetched = useRef(false)
	useEffect(() => {
		if (board._id && !columnsFetched.current) {
			columnsFetched.current = true
			fetchColumns()
		}
	}, [board._id, fetchColumns])

	const cardsFetched = useRef(false)
	useEffect(() => {
		if (columns.length > 0 && !cardsFetched.current) {
			cardsFetched.current = true
			fetchCards()
		}
	}, [columns, fetchCards])

	return { loading }
}
