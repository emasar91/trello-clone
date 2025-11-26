// hooks/useUpdateCard.ts
import axios from 'axios'
import { API } from '@/constants'
import { useRef, useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import type { Items } from '@/components/Pages/BoardPage/MultipleContainers/MultipleContainers'

interface Props {
	setItems: React.Dispatch<React.SetStateAction<Items>>
	items: Items
}

export const useUpdateCard = ({ setItems, items }: Props) => {
	const [loading, setLoading] = useState(false)
	const didFetch = useRef(false)

	const updateCard = useCallback(
		(cardId: string, columnId: string, boardId: string) => {
			return async (cardData: any) => {
				// 👁 ya llega formateado desde el componente → listo para mandar
				if (didFetch.current) return

				const prevCard = items[columnId]?.items.find((c) => c.id === cardId)
				if (!prevCard) {
					toast.error('Card no encontrada')
					return
				}

				didFetch.current = true
				setLoading(true)

				try {
					// ▶ 1) Enviar al backend y ESPERAR la card actualizada
					const { data } = await axios.put(
						API.updateCardUrl,
						{
							cardId,
							columnId,
							boardId,
							...cardData, // 🔥 Enviás TODO lo que llega
						},
						{ withCredentials: true }
					)

					// ⚠ validación de backend
					if (!data?.card) {
						throw new Error('No llegó card actualizada')
					}

					const updatedCard = data.card

					// ▶ 2) Actualizar UI SOLO CUANDO EL BACK END RESPONDE OK
					setItems((prev) => {
						const copy = structuredClone(prev)
						const cards = copy[columnId]?.items
						if (!cards) return prev
						const index = cards.findIndex((c) => c.id === cardId)
						if (index !== -1) {
							cards[index] = updatedCard // 🟢 card real del back
						}
						return copy
					})

					toast.success('Card actualizada')
				} catch (err) {
					console.error(err)
					toast.error('Error al actualizar la card')
				} finally {
					didFetch.current = false
					setLoading(false)
				}
			}
		},
		[items, setItems]
	)

	return { updateCard, loading }
}
