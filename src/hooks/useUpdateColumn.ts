// hooks/useUpdateColumn.ts
import { Items } from '@/components/Pages/BoardPage/MultipleContainers/MultipleContainers'
import { API } from '@/constants'
import api from '@/lib/axiosClient'
import { UniqueIdentifier } from '@dnd-kit/core'
import { ObjectId } from 'mongodb'
import { useCallback, useRef, useState } from 'react'
import { toast } from 'react-toastify'

interface IUpdateColumnProps {
	setItems: React.Dispatch<React.SetStateAction<Items>>
	items: Items
}

interface UpdateData {
	newName?: string
	order?: number
}

/**
 * Hook que devuelve una función para actualizar una columna en un board y actualizar el estado de las columnas correspondientes.
 * La función devuelta actualiza la columna del estado antes de la respuesta y devuelve un booleano indicando si la columna se actualizó correctamente.
 * @param {UniqueIdentifier} containerId - ID de la columna a actualizar.
 * @param {string|ObjectId} boardId - ID del board.
 * @param {UpdateData} data - Datos a actualizar (nombre, orden).
 * @returns {Promise<boolean>} - Booleano indicando si la columna se actualizó correctamente.
 * @example
 * const { updateColumn, loading } = useUpdateColumn({ setItems, items })
 * updateColumn(containerId, boardId)({ newName: 'nuevo nombre' })
 */
export const useUpdateColumn = ({ setItems, items }: IUpdateColumnProps) => {
	const [loading, setLoading] = useState(false)
	const didFetch = useRef(false)

	const updateColumn = useCallback(
		(containerId: UniqueIdentifier, boardId: string | ObjectId) => {
			return async (data: UpdateData) => {
				if (didFetch.current) return
				if (!data.newName?.trim()) return

				// 1️⃣ Limpiar nombre
				const titleFixed = data.newName.trim()

				// 2️⃣ Verificar si el nombre ya existe
				const titleAlreadyExists = Object.values(items).some(
					(container) => container.title === titleFixed
				)

				// 3️⃣ Si el nombre ya existe → mostrar error
				if (titleAlreadyExists) {
					toast.error('Ya existe una columna con el mismo nombre')
					return
				}

				didFetch.current = true
				setLoading(true)

				// 4️⃣ Optimistic UI actualizar nombre
				setItems((prev) => ({
					...prev,
					[containerId]: {
						...prev[containerId],
						title: titleFixed,
					},
				}))

				try {
					// 5️⃣ Actualizar nombre en la base de datos
					await api.put(
						API.updateColumnUrl,
						{
							columnId: containerId,
							boardId: boardId.toString(),
							...data,
						},
						{ withCredentials: true }
					)
				} catch (err) {
					console.error(err)
					toast.error('Error al actualizar columna')

					// 6️⃣ Optimistic UI revertir nombre
					setItems((prev) => ({
						...prev,
						[containerId]: {
							...prev[containerId],
							title: prev[containerId].title,
						},
					}))
				} finally {
					setLoading(false)
					didFetch.current = false
				}
			}
		},
		[setItems, items]
	)

	return { updateColumn, loading }
}
