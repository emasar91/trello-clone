import { useStoreBoard } from '@/context/useStoreBoard'
import {
	MultipleContainers,
	Items,
} from '../MultipleContainers/MultipleContainers'
import { useMemo } from 'react'
import { ICard } from '@/types/card'

export const ManyItems = () => {
	const { columns, cardsByColumn } = useStoreBoard()

	const itemsFormatted = useMemo(() => {
		const result: Items = {}

		// 🔹 Ordenar columnas por order antes de mapear
		const orderedColumns = [...columns].sort((a, b) => a.order - b.order)

		orderedColumns.forEach((col) => {
			const colId = col._id.toString()
			let cards = cardsByColumn[colId] || []

			// 🔹 Ordenar cards por order
			cards = [...cards].sort((a, b) => a.order - b.order)

			result[colId] = {
				title: col.name,
				items: cards.map((card: ICard) => ({
					id: card._id.toString(),
					text: card.title,
					...card,
				})),
			}
		})

		return result
	}, [columns, cardsByColumn])
	return (
		<MultipleContainers
			containerStyle={{
				maxHeight: '85vh',
			}}
			items={itemsFormatted}
			scrollable
		/>
	)
}
