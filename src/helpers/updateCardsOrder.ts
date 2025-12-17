import { ObjectId } from 'mongodb'
import { getDB } from './getDB'

interface CardOrderUpdate {
	_id: string
	columnId: string
	boardId: string
	order: number
	updatedAt: Date
}

/**
 * Actualiza el orden de las tarjetas en el tablero.
 * @param {CardOrderUpdate[]} updates - Array de objetos con la información de las tarjetas a actualizar.
 * @returns {Promise<{modifiedCount: number}>} - Resultado de la actualización de las tarjetas.
 */
export async function updateCardsOrder(updates: CardOrderUpdate[]) {
	const db = await getDB()
	const cardsCollection = db.collection('cards')

	// 1️⃣ Crear operaciones de actualización
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

	// 2️⃣ Ejecutar operaciones de actualización
	const result = await cardsCollection.bulkWrite(bulkOps)

	// 3️⃣ Retornar resultado
	return result
}
