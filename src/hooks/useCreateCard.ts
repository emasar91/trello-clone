// hooks/useCreateCard.ts
import { API } from '@/constants'
import { useCallback, useRef, useState } from 'react'
import type {
	Items,
	ColumnItem,
} from '@/components/Pages/BoardPage/MultipleContainers/MultipleContainers'
import type { ObjectId } from 'mongodb'
import { UniqueIdentifier } from '@dnd-kit/core'
import { toast } from 'react-toastify'
import api from '@/lib/axiosClient'

interface Props {
	setItems: React.Dispatch<React.SetStateAction<Items>>
	boardId: string
	userId: ObjectId
	items: Items
}

export const useCreateCard = ({ setItems, boardId, userId, items }: Props) => {
	const [loading, setLoading] = useState(false)
	const didFetch = useRef(false) // evita doble submit

	const createCardInColumn = useCallback(
		(containerId: UniqueIdentifier) => {
			return async (title: string) => {
				if (didFetch.current) return
				if (!title?.trim()) return

				const tempId = `${containerId}-${Date.now()}`
				const newLocalCard: ColumnItem = {
					id: tempId,
					text: title,
					_id: 'temp-id' as unknown as ObjectId,
					boardId: boardId as unknown as ObjectId,
					columnId: containerId as unknown as ObjectId,
					userId,
					title,
					description: '',
					priorityColor: [],
					createdAt: new Date(),
					updatedAt: null,
					comments: [],
					order: items[containerId]?.items?.length || 0,
				}
				const cardTitleAlreadyExists = Object.values(items).some((container) =>
					container.items.some((card) => card.text === title)
				)

				if (cardTitleAlreadyExists) {
					toast.error('Ya existe una tarjeta con el mismo nombre')
					return
				}

				didFetch.current = true
				setLoading(true)

				// 1️⃣ Optimistic UI
				setItems((prev) => ({
					...prev,
					[containerId]: {
						...prev[containerId],
						items: [...(prev[containerId]?.items ?? []), newLocalCard],
					},
				}))

				try {
					const { data } = await api.post(
						API.createCardUrl, // ej: '/api/cards/create'
						{
							title,
							boardId,
							columnId: containerId,
							userId,
							description: '',
							priorityColor: null,
						},
						{ withCredentials: true }
					)

					const realCard = data.card // tu api devuelve { card }

					// 2️⃣ Reemplazar ID temporal por el real de MongoDB
					setItems((prev) => {
						const updated = [...prev[containerId].items]
						const i = updated.findIndex((c) => c.id === tempId)

						if (i !== -1) {
							updated[i] = {
								...realCard,
								id: String(realCard._id),
								text: realCard.title,
								_id: realCard._id as unknown as ObjectId,
								boardId: realCard.boardId as unknown as ObjectId,
								columnId: realCard.columnId as unknown as ObjectId,
								userId: realCard.userId as unknown as ObjectId,
								createdAt: new Date(realCard.createdAt),
								updatedAt: realCard.updatedAt
									? new Date(realCard.updatedAt)
									: null,
							}
						}

						return {
							...prev,
							[containerId]: { ...prev[containerId], items: updated },
						}
					})
				} catch (err) {
					console.error(err)
					toast.error('Error al crear tarjeta')
				} finally {
					didFetch.current = false
					setLoading(false)
				}
			}
		},
		[setItems, boardId, userId, items]
	)

	return { createCardInColumn, loading }
}
