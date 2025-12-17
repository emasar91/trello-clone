import { useStoreBoard } from '@/context/useStoreBoard'
import {
	MultipleContainers,
	Items,
} from '../MultipleContainers/MultipleContainers'
import { useMemo } from 'react'
import { ICard } from '@/types/card'
import { Box, Typography } from '@mui/material'
import { ManyItemsTitleBoardStyles } from './ManyItems.styles'

/**
 * Componente que representa una lista de items para un tablero dado.
 * @param {string} boardName - El nombre del tablero a renderizar.
 * @param {boolean} loading - Si el tablero está actualmente cargando.
 * @returns {JSX.Element} - Un JSX element representando la lista de items.
 */
export const ManyItems = ({
	boardName,
	loading,
}: {
	boardName: string
	loading: boolean
}) => {
	const { columns, cardsByColumn } = useStoreBoard()

	const itemsFormatted = useMemo(() => {
		const result: Items = {}

		const orderedColumns = [...columns].sort((a, b) => a.order - b.order)

		orderedColumns.forEach((col) => {
			const colId = col._id.toString()
			let cards = cardsByColumn[colId] || []

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
		!loading && (
			<Box>
				<Typography sx={ManyItemsTitleBoardStyles} variant="h5">
					{boardName}
				</Typography>

				<MultipleContainers
					containerStyle={{
						maxHeight: '85vh',
						marginTop: '48px',
					}}
					items={itemsFormatted}
					scrollable
					loadingBoard={loading}
				/>
			</Box>
		)
	)
}
