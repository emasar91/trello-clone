// hooks/useUpdateCardTitle.ts
import { API } from '@/constants'
import axios from 'axios'
import { useCallback, useRef, useState } from 'react'
import type { Items } from '@/components/Pages/BoardPage/MultipleContainers/MultipleContainers'
import { toast } from 'react-toastify'
import type { UniqueIdentifier } from '@dnd-kit/core'
import { useStoreBoard } from '@/context/useStoreBoard'

interface Props {
	setItems: React.Dispatch<React.SetStateAction<Items>>
	items: Items
	boardId: string
}

export const useUpdateCardTitle = ({ setItems, items, boardId }: Props) => {
	const [loading, setLoading] = useState(false)
	const didFetch = useRef(false)
	const { setCardsForColumn } = useStoreBoard()

	const updateCardTitle = useCallback(
		async (cardId: UniqueIdentifier, newTitle: string) => {
			if (didFetch.current) return
			didFetch.current = true
			setLoading(true)

			// 1️⃣ Copia para rollback
			const prevItemsCopy = structuredClone(items)

			// 2️⃣ Buscamos columna + card
			const columnId = Object.keys(prevItemsCopy).find((cid) =>
				prevItemsCopy[cid].items.some((c) => c.id === cardId)
			)

			if (!columnId) {
				toast.error('Card no encontrada')
				didFetch.current = false
				setLoading(false)
				return
			}

			const idx = prevItemsCopy[columnId].items.findIndex(
				(c) => c.id === cardId
			)

			if (idx === -1) {
				toast.error('Card no encontrada en el índice')
				didFetch.current = false
				setLoading(false)
				return
			}

			// 3️⃣ Optimistic UI
			prevItemsCopy[columnId].items[idx].text = newTitle
			setItems(prevItemsCopy)
			setCardsForColumn(columnId, prevItemsCopy[columnId].items)

			// 4️⃣ PUT a la DB
			try {
				await axios.put(
					API.updateCardUrl,
					{
						cardId,
						title: newTitle, // 👈 SOLO CAMBIA ESTO
						boardId,
						columnId,
					},
					{ withCredentials: true }
				)

				toast.success('Título actualizado')
			} catch (err) {
				if (axios.isAxiosError(err)) toast.error(err.response?.data?.message)
				setItems(items) // rollback
			} finally {
				didFetch.current = false
				setLoading(false)
			}
		},
		[items, setItems, boardId, setCardsForColumn]
	)

	return { updateCardTitle, loading }
}
