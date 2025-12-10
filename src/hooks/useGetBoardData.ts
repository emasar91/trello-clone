// useBoardData.ts

import { useEffect, useRef, useState, useCallback } from 'react'
import { API } from '@/constants'
import { IColumn } from '@/types/columns'
import { ICard } from '@/types/card'
import { IBoard } from '@/types/boards'
import api from '@/lib/axiosClient'

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
	const [error, setError] = useState<string | null>(null) // 👈 Nuevo

	/** 🔹 Fetch Board */
	const fetchBoard = useCallback(async () => {
		try {
			const { data } = await api.get(
				`${
					API.getBoardByNameUrl
				}?uid=${userUid}&workspaceName=${encodeURIComponent(
					workspace
				)}&boardName=${encodeURIComponent(boardname)}`,
				{ withCredentials: true }
			)

			// 🛑 VALIDACIÓN: si no existe el tablero → error inmediato
			if (!data?.board || !data.board._id) {
				setError('No se encontró el tablero — Está roto o fue eliminado')
				return
			}

			setBoard(data.board)
		} catch {
			setError('Error al obtener el tablero')
		}
	}, [boardname, workspace, userUid, setBoard])

	/** 🔹 Fetch Columns */
	const fetchColumns = useCallback(async () => {
		try {
			const { data } = await api.get(
				`${API.getBoardColumnsUrl}?boardId=${board._id}`,
				{ withCredentials: true }
			)

			// 🛑 VALIDACIÓN: tablero sin columnas = tablero roto
			if (!data?.columns || data.columns.length === 0) {
				setError('El tablero está roto — No tiene columnas')
				return
			}

			setColumns(data.columns)
		} catch {
			setError('Error al obtener las columnas')
		}
	}, [board._id, setColumns])

	/** 🔹 Fetch Cards por columna */
	const fetchCards = useCallback(async () => {
		if (columns.length === 0) return // Ya está manejado arriba

		try {
			await Promise.all(
				columns.map(async (column) => {
					const { data } = await api.get(
						`${API.getCardsByColumnUrl}?columnId=${column._id}`,
						{ withCredentials: true }
					)
					setCardsForColumn(column._id.toString(), data.cards || [])
				})
			)
			setLoading(false)
		} catch {
			setError('Error al obtener las tarjetas')
		}
	}, [columns, setCardsForColumn])

	/** Strict Mode Control */
	const boardFetched = useRef(false)
	useEffect(() => {
		if (!boardFetched.current && boardname && workspace) {
			boardFetched.current = true
			fetchBoard()
		}
	}, [boardname, workspace, fetchBoard])

	const columnsFetched = useRef(false)
	useEffect(() => {
		if (board._id && !columnsFetched.current && !error) {
			columnsFetched.current = true
			fetchColumns()
		}
	}, [board._id, fetchColumns, error])

	const cardsFetched = useRef(false)
	useEffect(() => {
		if (columns.length > 0 && !cardsFetched.current && !error) {
			cardsFetched.current = true
			fetchCards()
		}
	}, [columns, fetchCards, error])

	return { loading, error } // 👈 IMPORTANTÍSIMO
}
