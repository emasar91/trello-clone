import { useStoreBoard } from '@/context/useStoreBoard'
import { MultipleContainers } from '../MultipleContainers/MultipleContainers'
import { useMemo } from 'react'

export const ManyItems = () => {
	const initials = {
		B: [
			{ id: 'B1', text: 'B1' },
			{ id: 'B2', text: 'B2' },
			{ id: 'B3', text: 'B3' },
		],
	}

	const itemsFormatted = () => {
		const { columns, cardsByColumn } = useStoreBoard()

		// 👇 transforma los datos en formato { A: [{ id, text }], B: [...] }
		const items = useMemo(() => {
			const result: Record<string, { id: string; text: string }[]> = {}

			columns.forEach((col) => {
				const colId = col.name.toString()
				const cards = cardsByColumn[colId] || []

				result[colId] = cards.map((card) => ({
					id: card._id.toString(),
					text: card.title || 'Sin título',
				}))
			})

			return result
		}, [columns, cardsByColumn])

		return items
	}

	const items = itemsFormatted()
	return (
		<MultipleContainers
			containerStyle={{
				maxHeight: '85vh',
			}}
			items={items}
			scrollable
		/>
	)
}
