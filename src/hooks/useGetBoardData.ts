import { useEffect, useState, useCallback } from 'react'
import { API } from '@/constants'
import { IColumn } from '@/types/columns'
import { ICard } from '@/types/card'
import { IBoard } from '@/types/boards'
import api from '@/lib/axiosClient'

type UseBoardDataProps = {
	boardname: string
	workspace: string
	userUid?: string
	hacerFetch: boolean
	setHacerFetch: (v: boolean) => void

	// store setters
	setBoard: (board: IBoard) => void
	setColumns: (columns: IColumn[]) => void
	setCardsForColumn: (columnId: string, cards: ICard[]) => void
}

export const useBoardData = ({
	boardname,
	workspace,
	userUid,
	hacerFetch,
	setHacerFetch,
	setBoard,
	setColumns,
	setCardsForColumn,
}: UseBoardDataProps) => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	// 🔹 ESTADO LOCAL (orquestación)
	const [localBoard, setLocalBoard] = useState<IBoard | null>(null)
	const [localColumns, setLocalColumns] = useState<IColumn[]>([])

	/* ============================
     1️⃣ FETCH BOARD
  ============================ */
	const fetchBoard = useCallback(async () => {
		try {
			setLoading(true)
			setError(null)

			const { data } = await api.get(
				`${
					API.getBoardByNameUrl
				}?uid=${userUid}&workspaceName=${encodeURIComponent(
					workspace
				)}&boardName=${encodeURIComponent(boardname)}`,
				{ withCredentials: true }
			)

			if (!data?.board?._id) {
				throw new Error('No se encontró el tablero')
			}

			setLocalBoard(data.board)
			setBoard(data.board) // 🔁 sync store
		} catch {
			setError('Error al obtener el tablero')
			setLoading(false)
		}
	}, [boardname, workspace, userUid, setBoard])

	/* ============================
     2️⃣ FETCH COLUMNS (depende del board LOCAL)
  ============================ */
	const fetchColumns = useCallback(async () => {
		if (!localBoard?._id) return

		try {
			const { data } = await api.get(
				`${API.getBoardColumnsUrl}?boardId=${localBoard._id}`,
				{ withCredentials: true }
			)

			if (!data?.columns?.length) {
				throw new Error('Tablero sin columnas')
			}

			setLocalColumns(data.columns)
			setColumns(data.columns) // 🔁 sync store
		} catch {
			setError('Error al obtener columnas')
			setLoading(false)
		}
	}, [localBoard, setColumns])

	/* ============================
     3️⃣ FETCH CARDS (depende de columns LOCALES)
  ============================ */
	const fetchCards = useCallback(async () => {
		try {
			await Promise.all(
				localColumns.map(async (column) => {
					const { data } = await api.get(
						`${API.getCardsByColumnUrl}?columnId=${column._id}`,
						{ withCredentials: true }
					)
					setCardsForColumn(column._id, data.cards || [])
				})
			)

			setLoading(false)
			setHacerFetch(false) // ✅ ciclo terminado
		} catch {
			setError('Error al obtener tarjetas')
			setLoading(false)
		}
	}, [localColumns, setCardsForColumn, setHacerFetch])

	/* ============================
     🔁 ORQUESTACIÓN
  ============================ */

	// 👉 dispara todo
	useEffect(() => {
		if (hacerFetch) {
			setLocalBoard(null)
			setLocalColumns([])
			fetchBoard()
		}
	}, [hacerFetch, fetchBoard])

	useEffect(() => {
		if (localBoard) fetchColumns()
	}, [localBoard, fetchColumns])

	useEffect(() => {
		if (localColumns.length) fetchCards()
	}, [localColumns, fetchCards])

	return { loading, error }
}
