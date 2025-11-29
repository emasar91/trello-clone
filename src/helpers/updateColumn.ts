// lib/db/columns.ts
import { ObjectId } from 'mongodb'
import { getDB } from './getDB'
import { toObjectId } from './utils'

interface UpdateData {
	name?: string
	order?: number
}

export async function updateColumn(
	columnId: string | ObjectId,
	boardId: string | ObjectId,
	data: UpdateData
) {
	try {
		const db = await getDB()
		const columnsCollection = db.collection('columns')
		const boardsCollection = db.collection('boards')

		const _id = typeof columnId === 'string' ? new ObjectId(columnId) : columnId

		// ⚠ Nada para actualizar: devolver null controlado
		if (!data || Object.keys(data).length === 0) {
			return null
		}

		// 🛠 Armamos el $set dinámico
		const setData: Record<string, any> = {
			...data,
			updatedAt: new Date(),
		}

		// 1) Actualizamos la columna
		const result = await columnsCollection.updateOne({ _id }, { $set: setData })

		if (!result?.modifiedCount) return null

		// 2) Actualizamos updatedAt del board
		await boardsCollection.updateOne(
			{ _id: toObjectId(boardId) as ObjectId },
			{ $set: { updatedAt: new Date() } }
		)

		// 3) Traemos el nuevo valor REAL
		const updated = await columnsCollection.findOne({ _id })

		return updated ?? null
	} catch (error) {
		console.error('❌ Error en updateColumn:', error)
		return null
	}
}
