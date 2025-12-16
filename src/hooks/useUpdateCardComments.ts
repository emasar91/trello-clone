// hooks/useUpdateCardComments.ts
import { API } from '@/constants'
import { useCallback, useRef, useState } from 'react'
import type { Items } from '@/components/Pages/BoardPage/MultipleContainers/MultipleContainers'
import type { ICardComment } from '@/types/card'
import { toast } from 'react-toastify'
import { UniqueIdentifier } from '@dnd-kit/core'
import api from '@/lib/axiosClient'

interface IUpdateCardCommentsProps {
	setItems: React.Dispatch<React.SetStateAction<Items>>
	items: Items
	boardId: string
}

/**
 * Hook que devuelve una función para crear o editar comentarios en una tarjeta.
 * La función devuelta crea o edita comentarios en una tarjeta y devuelve un booleano indicando si la tarjeta se creó correctamente.
 * @param {function} setItems - Función para actualizar el estado de las tarjetas.
 * @param {Items} items - Tarjetas actuales.
 * @param {string} boardId - ID de la board.
 * @returns {{function} updateCardComments, boolean} - Función para crear o editar comentarios en una tarjeta y un booleano indicando si la tarjeta se creó correctamente.
 */
export const useUpdateCardComments = ({
	setItems,
	items,
	boardId,
}: IUpdateCardCommentsProps) => {
	const [loading, setLoading] = useState(false)
	const didFetch = useRef(false)

	const updateCardComments = useCallback(
		async (
			cardId: UniqueIdentifier,
			newComments: ICardComment[],
			type: 'new' | 'edit' | 'delete'
		) => {
			if (didFetch.current) return
			didFetch.current = true
			setLoading(true)

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
