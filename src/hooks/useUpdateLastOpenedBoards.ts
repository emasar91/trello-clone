import { API } from '@/constants'
import { useCallback, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import api from '@/lib/axiosClient'

export const useUpdateLastOpenedBoard = () => {
	const [loading, setLoading] = useState(false)
	const didFetch = useRef(false)

	const updateLastOpened = useCallback(async (boardId: string) => {
		if (didFetch.current) return

		didFetch.current = true
		setLoading(true)

		try {
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
