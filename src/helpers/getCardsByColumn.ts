import { ObjectId } from 'mongodb'
import { getDB } from './getDB'
import { toObjectId } from './utils'
import { ICard } from '@/types/card'

/**
 * Devuelve todas las tarjetas de una columna.
 * @param {string | ObjectId} columnId - ID de la columna.
 * @returns {Promise<ICard[]>} - Un array de tarjetas asociadas a la columna.
 */
export async function getCardsByColumn(columnId: string | ObjectId) {
	const db = await getDB()
	const cardsCollection = db.collection<ICard>('cards')

	const columnObjectId = toObjectId(columnId) as ObjectId
	const cards = await cardsCollection
		.find({ columnId: columnObjectId })
		.sort({ order: 1 })
		.toArray()

	return cards
}
