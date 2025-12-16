// hooks/useDeleteColumn.ts
import { useState, useRef, useCallback } from 'react'
import { API } from '@/constants'
import { toast } from 'react-toastify'
import { Items } from '@/components/Pages/BoardPage/MultipleContainers/MultipleContainers'
import { UniqueIdentifier } from '@dnd-kit/core'
import api from '@/lib/axiosClient'

interface IDeleteColumnProps {
	setItems: React.Dispatch<React.SetStateAction<Items>>
}

/**
 * Hook que devuelve una función para eliminar una columna en un board y actualizar el estado de las columnas correspondientes.
 * La función devuelta elimina la columna del estado antes de la respuesta y devuelve un booleano indicando si la columna se eliminó correctamente.
 * @param {function} setItems - Función para actualizar el estado de las columnas correspondientes.
 * @returns {{function} deleteColumn, boolean} - Función para eliminar una columna en un board y un booleano indicando si la columna se eliminó correctamente.
 */
export const useDeleteColumn = ({ setItems }: IDeleteColumnProps) => {
	const [loading, setLoading] = useState(false)
	const didFetch = useRef(false)

	const deleteColumn = useCallback(
		async (columnId: UniqueIdentifier, boardId: string) => {
			if (didFetch.current) return
			didFetch.current = true
			setLoading(true)

			setItems((prev) => {
				const newItems = { ...prev }
				delete newItems[columnId]
				return newItems
			})

			try {
				await api.delete(API.deleteColumnUrl, {
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
