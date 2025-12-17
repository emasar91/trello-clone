// hooks/useUpdateCardTitle.ts
import { API } from '@/constants'
import axios from 'axios'
import { useCallback, useRef, useState } from 'react'
import type { Items } from '@/components/Pages/BoardPage/MultipleContainers/MultipleContainers'
import { toast } from 'react-toastify'
import type { UniqueIdentifier } from '@dnd-kit/core'
import { useStoreBoard } from '@/context/useStoreBoard'
import api from '@/lib/axiosClient'

interface IUpdateCardTitleProps {
	setItems: React.Dispatch<React.SetStateAction<Items>>
	items: Items
	boardId: string
}

/**
 * Hook que devuelve una función para actualizar el título de una tarjeta en un board.
 * La función devuelta edita el título de una tarjeta en un board y devuelve un booleano indicando si la tarjeta se editó correctamente.
 * @param {function} setItems - Función para actualizar el estado de las tarjetas.
 * @param {Items} items - Tarjetas actuales.
 * @param {string} boardId - ID del board.
 * @returns {{function} updateCardTitle, boolean} - Función para editar el título de una tarjeta en un board y un booleano indicando si la tarjeta se editó correctamente.
 */
export const useUpdateCardTitle = ({
	setItems,
	items,
	boardId,
}: IUpdateCardTitleProps) => {
	const [loading, setLoading] = useState(false)
	const didFetch = useRef(false)
	const { setCardsForColumn } = useStoreBoard()

	const updateCardTitle = useCallback(
		async (cardId: UniqueIdentifier, newTitle: string) => {
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

			// 4️⃣ Encontrar índice de la tarjeta
			const idx = prevItemsCopy[columnId].items.findIndex(
				(c) => c.id === cardId
			)

			if (idx === -1) {
				toast.error('Card no encontrada en el índice')
				didFetch.current = false
				setLoading(false)
				return
			}

			// 5️⃣ Actualizar título
			prevItemsCopy[columnId].items[idx].text = newTitle
			setItems(prevItemsCopy)
			setCardsForColumn(columnId, prevItemsCopy[columnId].items)

			try {
				// 6️⃣ Actualizar título en la base de datos
				await api.put(
					API.updateCardUrl,
					{
						cardId,
						title: newTitle,
						boardId,
						columnId,
					},
					{ withCredentials: true }
				)
			} catch (err) {
				if (axios.isAxiosError(err) && err.status !== 401)
					toast.error(err.response?.data?.message)
				setItems(items)
			} finally {
				didFetch.current = false
				setLoading(false)
			}
		},
		[items, setItems, boardId, setCardsForColumn]
	)

	return { updateCardTitle, loading }
}
