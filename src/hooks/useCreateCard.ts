// hooks/useCreateCard.ts
import { API } from '@/constants'
import axios from 'axios'
import { useCallback, useRef, useState } from 'react'
import type {
	Items,
	CardItem,
} from '@/components/Pages/BoardPage/MultipleContainers/MultipleContainers'
import { ObjectId } from 'mongodb'
import { UniqueIdentifier } from '@dnd-kit/core'
import { toast } from 'react-toastify'

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
				const newLocalCard: CardItem = { id: tempId, text: title }
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
					const { data } = await axios.post(
						API.createCardUrl, // ej: '/api/cards/create'
						{
							title,
							boardId,
							columnId: containerId,
							userId,
							description: null,
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
								id: String(realCard._id),
								text: realCard.title,
							}
						}

						return {
							...prev,
							[containerId]: { ...prev[containerId], items: updated },
						}
					})

					toast.success('Tarjeta creada')
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
