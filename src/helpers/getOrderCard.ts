import { getDB } from './getDB'
import { toObjectId } from './utils'
import { ObjectId } from 'mongodb'

/**
 * Devuelve el próximo orden de una columna.
 * Busca la tarjeta con orden más alto en la columna y devuelve su orden + 1.
 * Si no encuentra tarjetas en la columna, devuelve 1.
 * @param {string} columnId - ID de la columna.
 * @returns {Promise<number>} - El próximo orden de la columna.
 */
export async function getNextOrder(columnId: string) {
	const db = await getDB()
	const cardsCollection = db.collection('cards')

	const lastCard = await cardsCollection
		.find({ columnId: toObjectId(columnId) as ObjectId })
		.sort({ order: -1 })
		.limit(1)
		.toArray()

	return lastCard.length > 0 ? lastCard[0].order + 1 : 1
}
