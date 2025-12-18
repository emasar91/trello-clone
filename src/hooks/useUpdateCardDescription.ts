import { API } from '@/constants'
import { useCallback, useRef, useState } from 'react'
import type { Items } from '@/components/Pages/BoardPage/MultipleContainers/MultipleContainers'
import { toast } from 'react-toastify'
import type { UniqueIdentifier } from '@dnd-kit/core'
import { useStoreBoard } from '@/context/useStoreBoard'
import api from '@/lib/axiosClient'

interface IUpdateCardDescriptionProps {
	setItems: React.Dispatch<React.SetStateAction<Items>>
	items: Items
	boardId: string
}

/**
 * Hook que devuelve una función para editar la descripción de una tarjeta en un board y actualizar el estado de las tarjetas correspondientes.
 * La función devuelta edita la descripción de una tarjeta en un board y devuelve un booleano indicando si la tarjeta se editó correctamente.
 * @param {function} setItems - Función para actualizar el estado de las tarjetas.
 * @param {Items} items - Tarjetas actuales.
 * @param {string} boardId - ID del board.
 * @returns {{function} updateCardDescription, boolean} - Función para editar la descripción de una tarjeta en un board y un booleano indicando si la tarjeta se editó correctamente.
 */
export const useUpdateCardDescription = ({
	setItems,
	items,
	boardId,
}: IUpdateCardDescriptionProps) => {
	const [loading, setLoading] = useState(false)
	const didFetch = useRef(false)
	const { setCardsForColumn } = useStoreBoard()

	const updateCardDescription = useCallback(
		async (cardId: UniqueIdentifier, newDescription: string) => {
			if (didFetch.current) return
			didFetch.current = true
			setLoading(true)

			// 1️⃣ Clonar items
			const prevItemsCopy = structuredClone(items)

			// 2️⃣ Encontrar columna de la tarjeta
			const columnId = Object.keys(prevItemsCopy).find((cid) =>
				prevItemsCopy[cid].items.some((c) => c.id === cardId)
			)

			// 3️⃣ Si no se encontro la columna → mostrar error
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

			// 4️⃣ Actualizar descripción
			prevItemsCopy[columnId].items[idx].description = newDescription
			setItems(prevItemsCopy)
			setCardsForColumn(columnId, prevItemsCopy[columnId].items)

			try {
				// 5️⃣ Actualizar descripción en la base de datos
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
				setItems(items)
			} finally {
				didFetch.current = false
				setLoading(false)
			}
		},
		[items, setItems, boardId, setCardsForColumn]
	)

	return { updateCardDescription, loading }
}
