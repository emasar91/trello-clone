import { ObjectId } from 'mongodb'
import { getDB } from './getDB'
import { toObjectId } from './utils'

interface UpdateData {
	name?: string
	order?: number
}

/**
 * Actualiza una columna en un board.
 * La función actualiza el título y el orden de una columna en un board.
 * Si no se envían datos para actualizar, se lanza un error.
 * @param {string | ObjectId} columnId - ID de la columna a actualizar.
 * @param {string | ObjectId} boardId - ID del board al que pertenece la columna.
 * @param {UpdateData} data - Objeto con los datos para actualizar la columna.
 * @returns {Promise<IColumn | null>} - Promesa que se resuelve con la columna actualizada o null si no se proporcionaron datos para actualizar.
 * @example
 * const result = await updateColumn({ _id: columnId, name: 'Nueva columna' })
 */
export async function updateColumn(
	columnId: string | ObjectId,
	boardId: string | ObjectId,
	data: UpdateData
) {
	try {
		const db = await getDB()
		const columnsCollection = db.collection('columns')
		const boardsCollection = db.collection('boards')

		// 1️⃣ Validar si el columnId es válido
		const _id = typeof columnId === 'string' ? new ObjectId(columnId) : columnId

		// 2️⃣ Validar si hay datos para actualizar
		if (!data || Object.keys(data).length === 0) {
			return null
		}

		// 3️⃣ Preparar datos para actualizar
		const setData: UpdateData & { updatedAt: Date } = {
			...data,
			updatedAt: new Date(),
		}

		// 4️⃣ Ejecutar actualización
		const result = await columnsCollection.updateOne({ _id }, { $set: setData })

		// 5️⃣ Validar si la columna existe
		if (!result?.modifiedCount) return null

		// 6️⃣ Actualizar board
		await boardsCollection.updateOne(
			{ _id: toObjectId(boardId) as ObjectId },
			{ $set: { updatedAt: new Date() } }
		)

		// 7️⃣ Retornar la columna actualizada
		const updated = await columnsCollection.findOne({ _id })

		return updated ?? null
	} catch (error) {
		console.error('❌ Error en updateColumn:', error)
		return null
	}
}
