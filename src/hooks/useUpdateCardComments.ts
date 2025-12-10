// hooks/useUpdateCardComments.ts
import { API } from '@/constants'
import { useCallback, useRef, useState } from 'react'
import type { Items } from '@/components/Pages/BoardPage/MultipleContainers/MultipleContainers'
import type { ICardComment } from '@/types/card'
import { toast } from 'react-toastify'
import { UniqueIdentifier } from '@dnd-kit/core'
import api from '@/lib/axiosClient'

interface Props {
	setItems: React.Dispatch<React.SetStateAction<Items>>
	items: Items
	boardId: string
}

export const useUpdateCardComments = ({ setItems, items, boardId }: Props) => {
	const [loading, setLoading] = useState(false)
	const didFetch = useRef(false)

	/**
	 * Función async directa:
	 * updateCardComments(cardId, newComments)  // 👈 se usa así
	 */
	const updateCardComments = useCallback(
		async (
			cardId: UniqueIdentifier,
			newComments: ICardComment[],
			type: 'new' | 'edit' | 'delete'
		) => {
			if (didFetch.current) return
			didFetch.current = true
			setLoading(true)

			// 1️⃣ Optimistic UI
			const prevItemsCopy = structuredClone(items)

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

			prevItemsCopy[columnId].items[idx].comments = newComments
			setItems(prevItemsCopy)

			try {
				await api.put(
					API.updateCardUrl,
					{
						cardId,
						comments: newComments,
						boardId,
						columnId,
					},
					{ withCredentials: true }
				)

				const message =
					type === 'new'
						? 'Comentario creado'
						: type === 'edit'
						? 'Comentario editado'
						: 'Comentario eliminado'

				toast.success(message)
			} catch (err) {
				console.error(err)
				toast.error('Error al crear comentario')
			} finally {
				didFetch.current = false
				setLoading(false)
			}
		},
		[items, setItems, boardId]
	)

	return { updateCardComments, loading }
}
