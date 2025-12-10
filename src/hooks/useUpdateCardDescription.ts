// hooks/useUpdateCardDescription.ts
import { API } from '@/constants'
import { useCallback, useRef, useState } from 'react'
import type { Items } from '@/components/Pages/BoardPage/MultipleContainers/MultipleContainers'
import { toast } from 'react-toastify'
import type { UniqueIdentifier } from '@dnd-kit/core'
import { useStoreBoard } from '@/context/useStoreBoard'
import api from '@/lib/axiosClient'

interface Props {
	setItems: React.Dispatch<React.SetStateAction<Items>>
	items: Items
	boardId: string
}

export const useUpdateCardDescription = ({
	setItems,
	items,
	boardId,
}: Props) => {
	const [loading, setLoading] = useState(false)
	const didFetch = useRef(false)
	const { setCardsForColumn } = useStoreBoard()

	const updateCardDescription = useCallback(
		async (cardId: UniqueIdentifier, newDescription: string) => {
			if (didFetch.current) return
			didFetch.current = true
			setLoading(true)

			// 1️⃣ Copia para rollback
			const prevItemsCopy = structuredClone(items)

			// 2️⃣ Buscamos columna & card
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
			prevItemsCopy[columnId].items[idx].description = newDescription
			setItems(prevItemsCopy)
			setCardsForColumn(columnId, prevItemsCopy[columnId].items)

			// 4️⃣ PUT a la DB
			try {
				await api.put(
					API.updateCardUrl,
					{
						cardId,
						description: newDescription,
						boardId,
						columnId,
					},
					{ withCredentials: true }
				)
			} catch (err) {
				console.error(err)
				toast.error('Error al actualizar la descripción')
				setItems(items) // rollback
			} finally {
				didFetch.current = false
				setLoading(false)
			}
		},
		[items, setItems, boardId, setCardsForColumn]
	)

	return { updateCardDescription, loading }
}
