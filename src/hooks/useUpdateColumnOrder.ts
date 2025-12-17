import { API } from '@/constants'
import { useCallback, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { UniqueIdentifier } from '@dnd-kit/core'
import api from '@/lib/axiosClient'

/**
 * Hook que devuelve una función para actualizar el orden de columnas en un board.
 * La función devuelta actualizar el orden de columnas en un board y devuelve un booleano indicando si la columna se creó correctamente.
 * @param {string} boardId - ID del board.
 * @returns {{function} updateColumnsOrder, boolean} - Función para actualizar el orden de columnas en un board y un booleano indicando si la columna se creó correctamente.
 */
export const useUpdateColumnsOrder = (boardId: string) => {
	const [loading, setLoading] = useState(false)
	const didFetch = useRef(false)
	const updateColumnsOrder = useCallback(
		async (orderedColumns: UniqueIdentifier[]) => {
			if (didFetch.current) return

			didFetch.current = true
			setLoading(true)

			try {
				// 1️⃣ Actualizar orden de columnas en la base de datos
				await api.put(
					API.updateColumnUrl,
					{
						boardId,
						columnsOrder: orderedColumns,
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
	)

	return { updateColumnsOrder, loading }
}
