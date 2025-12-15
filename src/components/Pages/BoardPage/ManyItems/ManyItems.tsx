import { useStoreBoard } from '@/context/useStoreBoard'
import {
	MultipleContainers,
	Items,
} from '../MultipleContainers/MultipleContainers'
import { useMemo } from 'react'
import { ICard } from '@/types/card'
import { Box, Typography } from '@mui/material'

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

	console.log('🚀 ~ ManyItems ~ loading:', loading)
	return (
		!loading && (
			<Box>
				<Typography
					sx={{
						backgroundColor: '#d3d2d6',
						width: '100%',
						padding: '0.5rem',
						position: 'absolute',
						top: '48px',
						marginLeft: '-16px',
						fontSize: '16px',
						lineHeight: '32px',
						paddingLeft: '16px',
					}}
					variant="h5"
				>
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
