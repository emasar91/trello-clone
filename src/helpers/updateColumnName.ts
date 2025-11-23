// lib/db/columns.ts
import { ObjectId } from 'mongodb'
import { getDB } from './getDB'

export async function updateColumnName(
	columnId: string | ObjectId,
	newName: string
) {
	try {
		const db = await getDB()
		const columnsCollection = db.collection('columns')

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

		// 2) Traemos el nuevo valor REAL
		const updated = await columnsCollection.findOne({ _id })
		return updated ?? null
	} catch (error) {
		console.error('❌ Error en updateColumnName:', error)
		return null
	}
}
