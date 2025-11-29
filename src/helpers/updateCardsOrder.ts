// lib/cards/updateCardOrderBatch.ts
import { ObjectId } from 'mongodb'
import { getDB } from './getDB'

interface CardOrderUpdate {
	_id: string
	columnId: string
	boardId: string
	order: number
	updatedAt: Date
}

export async function updateCardsOrder(updates: CardOrderUpdate[]) {
	const db = await getDB()
	const cardsCollection = db.collection('cards')

	const bulkOps = updates.map(
		({ _id, columnId, boardId, order, updatedAt }) => ({
			updateOne: {
				filter: { _id: new ObjectId(_id) },
				update: {
					$set: {
						columnId: new ObjectId(columnId),
						boardId: new ObjectId(boardId),
						order,
						updatedAt: new Date(updatedAt),
					},
				},
			},
		})
	)

	if (bulkOps.length === 0) return null
	const result = await cardsCollection.bulkWrite(bulkOps)
	return result // { modifiedCount... }
}
