import { API } from '@/constants'
import { useCallback, useRef, useState } from 'react'
import type { Items } from '@/components/Pages/BoardPage/MultipleContainers/MultipleContainers'
import { toast } from 'react-toastify'
import type { UniqueIdentifier } from '@dnd-kit/core'
import { useStoreBoard } from '@/context/useStoreBoard'
import api from '@/lib/axiosClient'

interface IUpdateCardPriorityProps {
	setItems: React.Dispatch<React.SetStateAction<Items>>
	items: Items
	boardId: string
}

/**
 * Hook que devuelve una función para actualizar los tags de una tarjeta en un board.
 * La función devuelta actualiza los tags de la tarjeta en el estado antes de la respuesta y devuelve un booleano indicando si la tarjeta se actualizó correctamente.
 * @param {UniqueIdentifier} cardId - ID de la tarjeta a actualizar.
 * @param {string[]} newTags - Nuevos tags a asignar.
 * @returns {Promise<boolean>} - Booleano indicando si la tarjeta se actualizó correctamente.
 * @example
 * const { updateCardPriority, loading } = useUpdateCardPriority({ setItems, items, boardId })
 * updateCardPriority(cardId, ['blue', 'red'])
 */
export const useUpdateCardPriority = ({
	setItems,
	items,
	boardId,
}: IUpdateCardPriorityProps) => {
	const [loading, setLoading] = useState(false)
	const didFetch = useRef(false)
	const { setCardsForColumn } = useStoreBoard()

	const updateCardPriority = useCallback(
		async (cardId: UniqueIdentifier, newTags: string[]) => {
			if (didFetch.current) return
			didFetch.current = true
			setLoading(true)

			// 1️⃣ Clonar items
			const prevItemsCopy = structuredClone(items)
			//2️⃣ Buscar la columna en la que se encuentra la tarjeta
			const columnId = Object.keys(prevItemsCopy).find((cid) =>
				prevItemsCopy[cid].items.some((c) => c.id === cardId)
			)
			//3️⃣ Si no se encuentra la tarjeta, mostrar un error y retornar
			if (!columnId) {
				toast.error('Card no encontrada')
				didFetch.current = false
				setLoading(false)
				return
			}

			const idx = prevItemsCopy[columnId].items.findIndex(
				(c) => c.id === cardId
			)
			//4️⃣ Si no se encuentra la tarjeta, mostrar un error y retornar
			if (idx === -1) return
			//5️⃣ Actualizar el estado de la tarjeta
			prevItemsCopy[columnId].items[idx].priorityColor = newTags
			setItems(prevItemsCopy)
			setCardsForColumn(columnId, prevItemsCopy[columnId].items)
			//6️⃣ Actualizar la tarjeta en la base de datos
			try {
				await api.put(
					API.updateCardUrl,
					{
						cardId,
						priorityColor: newTags,
						boardId,
						columnId,
					},
					{ withCredentials: true }
				)
			} catch (err) {
				console.error(err)
				toast.error('Error al actualizar tags')

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
