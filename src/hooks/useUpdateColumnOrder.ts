// hooks/useUpdateColumnsOrder.ts
import { API } from '@/constants'
import { useCallback, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { UniqueIdentifier } from '@dnd-kit/core'
import api from '@/lib/axiosClient'

export const useUpdateColumnsOrder = (boardId: string) => {
	const [loading, setLoading] = useState(false)
	const didFetch = useRef(false)
	/** 🔹 TOMA SOLO EL ARRAY — MISMA ESTRUCTURA QUE useUpdateColumn */
	const updateColumnsOrder = useCallback(
		async (orderedColumns: UniqueIdentifier[]) => {
			// 🚫 Primera vez NO se ejecuta

			if (didFetch.current) return

			didFetch.current = true
			setLoading(true)

			try {
				await api.put(
					API.updateColumnUrl,
					{
						boardId,
						columnsOrder: orderedColumns, // 👈 YA VIENE ORDENADO
					},
					{ withCredentials: true }
				)
			} catch (err) {
				console.error(err)
				toast.error('Error al actualizar orden de columnas')
			} finally {
				setLoading(false)
				didFetch.current = false
			}
		},
		[boardId]
	) // 👈 solo depende del boardId

	return { updateColumnsOrder, loading }
}
