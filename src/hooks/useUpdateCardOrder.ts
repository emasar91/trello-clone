// hooks/useUpdateAllOrders.ts
import axios from 'axios'
import { API } from '@/constants'
import { useState } from 'react'
import { toast } from 'react-toastify'
import type { Items } from '@/components/Pages/BoardPage/MultipleContainers/MultipleContainers'

export const useUpdateAllOrders = (boardId: string) => {
	const [loading, setLoading] = useState(false)

	const updateAllOrders = async (items: Items) => {
		setLoading(true)

		const payload = buildOrderPayload(items, boardId) // 👈 PASO boardId

		try {
			await axios.put(API.updateCardUrl, payload, { withCredentials: true })
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
	// El VALID schema necesita: _id, columnId, boardId, updatedAt
	return Object.entries(items).flatMap(([colId, colData]) =>
		colData.items.map((card, index) => ({
			_id: card._id, // string
			columnId: colId,
			boardId,
			order: index + 1,
			updatedAt: new Date(),
		}))
	)
}
