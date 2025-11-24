// lib/db/columns.ts
import { ObjectId } from 'mongodb'
import { getDB } from './getDB'
import { toObjectId } from './utils'

export async function updateColumnName(
	columnId: string | ObjectId,
	newName: string,
	boardId: string | ObjectId
) {
	try {
		const db = await getDB()
		const columnsCollection = db.collection('columns')
		const boardsCollection = db.collection('boards')

		const _id = typeof columnId === 'string' ? new ObjectId(columnId) : columnId

		// 1) Actualizamos la columna
		const result = await columnsCollection.updateOne(
			{ _id },
			{
				$set: {
					name: newName,
					updatedAt: new Date(),
				},
			}
		)

		// ⚠ Si no modificó nada
		if (!result?.modifiedCount) return null

		await boardsCollection.updateOne(
			{ _id: toObjectId(boardId) as ObjectId },
			{ $set: { updatedAt: new Date() } }
		)

		// 2) Traemos el nuevo valor REAL
		const updated = await columnsCollection.findOne({ _id })
		return updated ?? null
	} catch (error) {
		console.error('❌ Error en updateColumnName:', error)
		return null
	}
}
