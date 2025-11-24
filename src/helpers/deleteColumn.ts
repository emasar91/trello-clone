// /helpers/deleteColumn.ts
import { ObjectId } from 'mongodb'
import { getDB } from './getDB'
import { toObjectId } from './utils'

export async function deleteColumnAndCards(
	columnId: string | ObjectId,
	boardId: string | ObjectId
) {
	const db = await getDB()
	const columnsCollection = db.collection('columns')
	const cardsCollection = db.collection('cards')
	const boardsCollection = db.collection('boards')

	const columnCount = await columnsCollection.countDocuments({ boardId })
	if (columnCount === 1)
		throw new Error('El tablero no puede quedar sin columnas')

	// 1️⃣ Obtener cards de esa columna
	const cards = await cardsCollection
		.find({ columnId: toObjectId(columnId) })
		.toArray()
	const cardIds = cards.map((card) => card._id)

	// 2️⃣ Eliminar cards de esa columna
	await cardsCollection.deleteMany({ columnId: toObjectId(columnId) })

	// 3️⃣ Eliminar columna
	await columnsCollection.deleteOne({ _id: toObjectId(columnId) as ObjectId })

	// 4️⃣ Actualizar tablero — remover columna del board
	const columnObjectId = toObjectId(columnId)
	await boardsCollection.updateOne(
		{ _id: toObjectId(boardId) as ObjectId },
		{
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			$pull: { columns: columnObjectId as any },
			$set: { updatedAt: new Date() },
		}
	)

	return { columnId, cardIds }
}
