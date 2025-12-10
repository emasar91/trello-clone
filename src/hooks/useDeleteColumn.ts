// hooks/useDeleteColumn.ts
import axios from 'axios'
import { useState, useRef, useCallback } from 'react'
import { API } from '@/constants'
import { toast } from 'react-toastify'
import { Items } from '@/components/Pages/BoardPage/MultipleContainers/MultipleContainers'
import { UniqueIdentifier } from '@dnd-kit/core'

export const useDeleteColumn = ({
	setItems,
}: {
	setItems: React.Dispatch<React.SetStateAction<Items>>
}) => {
	const [loading, setLoading] = useState(false)
	const didFetch = useRef(false)

	const deleteColumn = useCallback(
		async (columnId: UniqueIdentifier, boardId: string) => {
			if (didFetch.current) return
			didFetch.current = true
			setLoading(true)

			// 🟡 OPTIMISTIC UI: eliminar la columna del estado antes de la respuesta
			setItems((prev) => {
				const newItems = { ...prev }
				delete newItems[columnId]
				return newItems
			})

			try {
				await axios.delete(API.deleteColumnUrl, {
					data: { columnId, boardId },
					withCredentials: true,
				})
			} catch {
				toast.error('Error al eliminar columna')
			} finally {
				setLoading(false)
				didFetch.current = false
			}
		},
		[setItems]
	)

	return { deleteColumn, loading }
}
