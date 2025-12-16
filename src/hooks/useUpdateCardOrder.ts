// hooks/useUpdateAllOrders.ts
import { API } from '@/constants'
import { useState } from 'react'
import { toast } from 'react-toastify'
import type { Items } from '@/components/Pages/BoardPage/MultipleContainers/MultipleContainers'
import api from '@/lib/axiosClient'

/**
 * Actualiza el orden de todas las tarjetas de un tablero
 * @param {string} boardId - Identificador del tablero
 * @param {Items} items - Tarjetas del tablero
 * @returns {() => Promise<void>} - Función que actualiza el orden
 * @returns {loading: boolean} - Estado de carga
 */
export const useUpdateAllOrders = (boardId: string) => {
	const [loading, setLoading] = useState(false)

	const updateAllOrders = async (items: Items) => {
		setLoading(true)

		const payload = buildOrderPayload(items, boardId)

		try {
			await api.put(API.updateCardUrl, payload, { withCredentials: true })
		} catch (err) {
			console.error(err)
			toast.error('Error al actualizar orden')
		} finally {
			setLoading(false)
		}
	}

	return { updateAllOrders, loading }
}

export const buildOrderPayload = (items: Items, boardId: string) => {
	return Object.entries(items).flatMap(([colId, colData]) =>
		colData.items.map((card, index) => ({
			_id: card._id,
			columnId: colId,
			boardId,
			order: index + 1,
			updatedAt: new Date(),
		}))
	)
}
