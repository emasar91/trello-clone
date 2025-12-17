// hooks/useCreateColumn.ts
import { API } from '@/constants'
import { useCallback, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import type { UniqueIdentifier } from '@dnd-kit/core'
import { User } from 'firebase/auth'
import { ICard } from '@/types/card'
import api from '@/lib/axiosClient'

interface ICreateColumnProps {
	setItems: React.Dispatch<
		React.SetStateAction<
			Record<
				string,
				{ title: string; items: (ICard & { id: string; text: string })[] }
			>
		>
	>
	setContainers: React.Dispatch<React.SetStateAction<UniqueIdentifier[]>>
	boardId: string
	user: User | null
}

/**
 * Hook que devuelve una función para crear una columna en un board y actualizar el estado de las columnas y tarjetas correspondientes.
 * La función devuelta crea una columna en un board y devuelve el ID de la columna creada.
 * @param {function} setItems - Función para actualizar el estado de las tarjetas.
 * @param {function} setContainers - Función para actualizar el estado de las columnas.
 * @param {string} boardId - ID del board.
 * @param {User | null} user - Usuario autenticado.
 * @returns {{function} createColumnInBoard, boolean} - Función para crear una columna en un board y un booleano indicando si la columna se creó correctamente.
 */
export const useCreateColumn = ({
	setItems,
	setContainers,
	boardId,
	user,
}: ICreateColumnProps) => {
	const [loading, setLoading] = useState(false)
	const didFetch = useRef(false)

	const createColumnInBoard = useCallback(() => {
		return async (title: string) => {
			if (!title?.trim()) return toast.error('El título es requerido')
			if (didFetch.current) return
			didFetch.current = true
			setLoading(true)

			// 1️⃣ Crear ID temporal
			const tempId = `col-${Date.now()}`
			// 2️⃣ Validar titulo
			const titleFixed = title.trim()

			// 3️⃣ Optimistic UI
			setContainers((prev) => [...prev, tempId])
			setItems((prev) => ({
				...prev,
				[tempId]: { title: titleFixed, items: [] },
			}))

			try {
				// 4️⃣ Crear columna en la base de datos
				const { data } = await api.post(
					API.createColumnUrl,
					{ boardId, userId: user?.uid, name: titleFixed },
					{ withCredentials: true }
				)

				const realId = String(data._id)

				// 5️⃣ Reemplazar ID temporal por real
				setContainers((prev) => prev.map((id) => (id === tempId ? realId : id)))

				setItems((prev) => {
					const copy = structuredClone(prev)
					copy[realId] = copy[tempId]
					delete copy[tempId]
					return copy
				})

				return realId
			} catch (err) {
				console.error(err)
				toast.error('Error al crear columna')

				// 6️⃣ Si falló → revertir Optimistic UI
				setContainers((prev) => prev.filter((id) => id !== tempId))
				setItems((prev) => {
					const copy = structuredClone(prev)
					delete copy[tempId]
					return copy
				})
			} finally {
				didFetch.current = false
				setLoading(false)
			}
		}
	}, [setItems, setContainers, boardId, user?.uid])

	return { createColumnInBoard, loading }
}
