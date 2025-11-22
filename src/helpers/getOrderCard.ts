import { getDB } from './getDB'
import { toObjectId } from './utils'
import { ObjectId } from 'mongodb'

export async function getNextOrder(columnId: string) {
	const db = await getDB()
	const cardsCollection = db.collection('cards')

	const lastCard = await cardsCollection
		.find({ columnId: toObjectId(columnId) as ObjectId })
		.sort({ order: -1 }) // la más grande
		.limit(1)
		.toArray()

	return lastCard.length > 0 ? lastCard[0].order + 1 : 1
}
