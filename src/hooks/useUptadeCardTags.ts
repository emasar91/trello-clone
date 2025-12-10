// hooks/useUpdateCardPriority.ts
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

export const useUpdateCardPriority = ({ setItems, items, boardId }: Props) => {
	const [loading, setLoading] = useState(false)
	const didFetch = useRef(false)
	const { setCardsForColumn } = useStoreBoard()

	const updateCardPriority = useCallback(
		async (cardId: UniqueIdentifier, newTags: string[]) => {
			if (didFetch.current) return
			didFetch.current = true
			setLoading(true)

			// 1️⃣ Copia para rollback si falla
			const prevItemsCopy = structuredClone(items)

			// 2️⃣ Buscar la columna & la card
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
			if (idx === -1) return

			// 3️⃣ Optimistic UI
			prevItemsCopy[columnId].items[idx].priorityColor = newTags
			setItems(prevItemsCopy)
			setCardsForColumn(columnId, prevItemsCopy[columnId].items)

			// 4️⃣ PUT a la DB
			try {
				await axios.put(
					API.updateCardUrl,
					{
						cardId,
						priorityColor: newTags, // 👈 ARRAY
						boardId,
						columnId,
					},
					{ withCredentials: true }
				)
			} catch (err) {
				console.error(err)
				toast.error('Error al actualizar tags')

				// ❗Rollback si la API falla
				setItems(items)
			} finally {
				didFetch.current = false
				setLoading(false)
			}
		},
		[items, setItems, boardId, setCardsForColumn]
	)

	return { updateCardPriority, loading }
}
