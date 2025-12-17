import { ObjectId } from 'mongodb'
import { getDB } from './getDB'
import { toObjectId } from './utils'

/**
 * Elimina una columna y todas las tarjetas asociadas a ella.
 * Lanza un error si el tablero no puede quedar sin columnas.
 * @param {string | ObjectId} columnId - ID de la columna a eliminar.
 * @param {string | ObjectId} boardId - ID del tablero al que pertenece la columna.
 * @returns {Promise<{columnId: ObjectId, cardIds: ObjectId[]}>} - ID de la columna eliminada y los IDs de las tarjetas eliminadas.
 */
export async function deleteColumnAndCards(
	columnId: string | ObjectId,
	boardId: string | ObjectId
) {
	const db = await getDB()
	const columnsCollection = db.collection('columns')
	const cardsCollection = db.collection('cards')
	const boardsCollection = db.collection('boards')

	// 1️⃣ Chequear que el tablero no quede sin columnas
	const columnCount = await columnsCollection.countDocuments({ boardId })
	if (columnCount === 1)
		throw new Error('El tablero no puede quedar sin columnas')

	// 2️⃣ Obtener cards de esa columna
	const cards = await cardsCollection
		.find({ columnId: toObjectId(columnId) })
		.toArray()
	const cardIds = cards.map((card) => card._id)

	// 3️⃣ Eliminar cards de esa columna
	await cardsCollection.deleteMany({ columnId: toObjectId(columnId) })

	// 4️⃣ Eliminar columna
	await columnsCollection.deleteOne({ _id: toObjectId(columnId) as ObjectId })

	// 5️⃣ Actualizar tablero — remover columna del board
	const columnObjectId = toObjectId(columnId)
	await boardsCollection.updateOne(
		{ _id: toObjectId(boardId) as ObjectId },
		{
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			$pull: { columns: columnObjectId as any },
			$set: { updatedAt: new Date() },
		}
	)

	// 6️⃣ Retornar el ID de la columna eliminada y los IDs de las tarjetas eliminadas
	return { columnId, cardIds }
}
