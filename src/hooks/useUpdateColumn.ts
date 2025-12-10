// hooks/useUpdateColumn.ts
import { Items } from '@/components/Pages/BoardPage/MultipleContainers/MultipleContainers'
import { API } from '@/constants'
import api from '@/lib/axiosClient'
import { UniqueIdentifier } from '@dnd-kit/core'
import { ObjectId } from 'mongodb'
import { useCallback, useRef, useState } from 'react'
import { toast } from 'react-toastify'

interface Props {
	setItems: React.Dispatch<React.SetStateAction<Items>>
	items: Items
}

interface UpdateData {
	newName?: string
	order?: number
}

export const useUpdateColumn = ({ setItems, items }: Props) => {
	const [loading, setLoading] = useState(false)
	const didFetch = useRef(false)

	/**   👇 retorna una función que recebe los datos a modificar   */
	const updateColumn = useCallback(
		(containerId: UniqueIdentifier, boardId: string | ObjectId) => {
			return async (data: UpdateData) => {
				if (didFetch.current) return
				if (!data.newName?.trim()) return

				const titleFixed = data.newName.trim()

				const titleAlreadyExists = Object.values(items).some(
					(container) => container.title === titleFixed
				)

				if (titleAlreadyExists) {
					toast.error('Ya existe una columna con el mismo nombre')
					return
				}

				didFetch.current = true
				setLoading(true)

				// 🟡 1) Optimistic UI
				setItems((prev) => ({
					...prev,
					[containerId]: {
						...prev[containerId],
						title: titleFixed,
					},
				}))

				// 🔥 Enviar al back
				try {
					await api.put(
						API.updateColumnUrl, // '/api/columns/update'
						{
							columnId: containerId,
							boardId: boardId.toString(),
							...data, // 👈 dinámico: name? order?
						},
						{ withCredentials: true }
					)
				} catch (err) {
					console.error(err)
					toast.error('Error al actualizar columna')

					// 🔴 revertir si falla
					setItems((prev) => ({
						...prev,
						[containerId]: {
							...prev[containerId],
							title: prev[containerId].title, // pero acá no tenés el viejo nombre!
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
