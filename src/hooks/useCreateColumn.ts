// hooks/useCreateColumn.ts
import { API } from '@/constants'
import { useCallback, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import type { UniqueIdentifier } from '@dnd-kit/core'
import { User } from 'firebase/auth'
import { ICard } from '@/types/card'
import api from '@/lib/axiosClient'

interface Props {
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

export const useCreateColumn = ({
	setItems,
	setContainers,
	boardId,
	user,
}: Props) => {
	const [loading, setLoading] = useState(false)
	const didFetch = useRef(false)

	// 🔥 igual que createCardInColumn → se llama createColumnInBoard
	const createColumnInBoard = useCallback(() => {
		return async (title: string) => {
			if (!title?.trim()) return toast.error('El título es requerido')
			if (didFetch.current) return
			didFetch.current = true
			setLoading(true)

			// 1️⃣ Crear ID temporal
			const tempId = `col-${Date.now()}`
			const titleFixed = title.trim()

			// 2️⃣ Optimistic UI
			setContainers((prev) => [...prev, tempId])
			setItems((prev) => ({
				...prev,
				[tempId]: { title: titleFixed, items: [] },
			}))

			try {
				const { data } = await api.post(
					API.createColumnUrl, // '/api/columns/create'
					{ boardId, userId: user?.uid, name: titleFixed },
					{ withCredentials: true }
				)

				// Mongo devuelve 📌 `_id`
				const realId = String(data._id)

				// 3️⃣ Reemplazar ID temporal por real
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

				// ❌ Si falló → revertir Optimistic UI
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
