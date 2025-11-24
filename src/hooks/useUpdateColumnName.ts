// hooks/useUpdateColumnName.ts
import { Items } from '@/components/Pages/BoardPage/MultipleContainers/MultipleContainers'
import { API } from '@/constants'
import { UniqueIdentifier } from '@dnd-kit/core'
import axios from 'axios'
import { ObjectId } from 'mongodb'
import { useCallback, useRef, useState } from 'react'
import { toast } from 'react-toastify'

interface Props {
	setItems: React.Dispatch<React.SetStateAction<Items>>
	items: Items
}

export const useUpdateColumnName = ({ setItems, items }: Props) => {
	const [loading, setLoading] = useState(false)
	const didFetch = useRef(false)

	const updateColumnName = useCallback(
		(containerId: UniqueIdentifier, boardId: string | ObjectId) => {
			return async (newName: string) => {
				if (didFetch.current) return
				if (!newName?.trim()) return

				const titleFixed = newName.trim()

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

				try {
					await axios.put(
						API.updateColumnUrl, // '/api/columns/update'
						{
							columnId: containerId,
							newName: titleFixed,
							boardId: boardId.toString(),
						},
						{ withCredentials: true }
					)

					toast.success('Columna actualizada')
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

	return { updateColumnName, loading }
}
