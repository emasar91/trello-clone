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

interface ICreateCardProps {
	setItems: React.Dispatch<React.SetStateAction<Items>>
	boardId: string
	userId: ObjectId
	items: Items
}

/**
 * Hook que devuelve una función para crear una tarjeta en una columna.
 * La función devuelta crea una tarjeta en una columna y devuelve un booleano indicando si la tarjeta se creó correctamente.
 * @param {function} setItems - Función para actualizar el estado de las tarjetas.
 * @param {string} boardId - ID de la board.
 * @param {ObjectId} userId - ID del usuario que crea la tarjeta.
 * @param {Items} items - Tarjetas actuales.
 * @returns {{function} createCardInColumn, boolean} - Función para crear una tarjeta en una columna y un booleano indicando si la tarjeta se creó correctamente.
 */
export const useCreateCard = ({
	setItems,
	boardId,
	userId,
	items,
}: ICreateCardProps) => {
	const [loading, setLoading] = useState(false)
	const didFetch = useRef(false)

	const createCardInColumn = useCallback(
		(containerId: UniqueIdentifier) => {
			return async (title: string) => {
				if (didFetch.current) return
				// 1️⃣ Validar titulo
				if (!title?.trim()) return
				const tempId = `${containerId}-${Date.now()}`
				// 2️⃣ Crear tarjeta local
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
				// 3️⃣ Validar si el titulo ya existe
				const cardTitleAlreadyExists = Object.values(items).some((container) =>
					container.items.some((card) => card.text === title)
				)

				if (cardTitleAlreadyExists) {
					toast.error('Ya existe una tarjeta con el mismo nombre')
					return
				}

				didFetch.current = true
				setLoading(true)

				// 4️⃣ Optimistic UI
				setItems((prev) => ({
					...prev,
					[containerId]: {
						...prev[containerId],
						items: [...(prev[containerId]?.items ?? []), newLocalCard],
					},
				}))

				try {
					// 5️⃣ Crear tarjeta en la base de datos
					const { data } = await api.post(
						API.createCardUrl,
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

					const realCard = data.card

					// 6️⃣ Reemplazar ID temporal por el real de MongoDB
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
