import { API } from '@/constants'
import { useCallback, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import api from '@/lib/axiosClient'

/**
 * Hook que devuelve una función para actualizar el último board abierto en un usuario.
 * La función devuelta actualiza el último board abierto en un usuario y devuelve un booleano indicando si el board se actualizó correctamente.
 * @returns {{function} updateLastOpened, boolean} - Función para actualizar el último board abierto en un usuario y un booleano indicando si el board se actualizó correctamente.
 */
export const useUpdateLastOpenedBoard = () => {
	const [loading, setLoading] = useState(false)
	const didFetch = useRef(false)

	const updateLastOpened = useCallback(async (boardId: string) => {
		if (didFetch.current) return

		didFetch.current = true
		setLoading(true)

		try {
			// 1️⃣ Actualizar último board abierto en la base de datos
			await api.patch(
				`${API.updateLastOpenedBoardUrl}?id=${boardId}`,
				{},
				{ withCredentials: true }
			)
		} catch (err) {
			console.error(err)
			toast.error('Error al actualizar último board abierto')
		} finally {
			setLoading(false)
			didFetch.current = false
		}
	}, [])

	return { updateLastOpened, loading }
}
