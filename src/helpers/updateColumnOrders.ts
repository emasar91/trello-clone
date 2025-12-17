import { ObjectId } from 'mongodb'
import { getDB } from './getDB'

/**
 * Actualiza el orden de las columnas en un tablero.
 * Filtra solo los IDs de columna que son ObjectIds válidos y
 * actualiza el orden de las columnas reales. Devuelve un array
 * con las columnas actualizadas y ordenadas.
 * @param {string[]} columnIds - IDs de las columnas a actualizar.
 * @returns {Promise<Icolumn[]>} - Columnas actualizadas y ordenadas.
 */
export async function updateColumnOrders(columnIds: string[]) {
	try {
		const db = await getDB()
		const columnsCollection = db.collection('columns')

		const validIds = columnIds.filter(ObjectId.isValid)

		if (validIds.length === 0) return []

		const ops = validIds.map((id, index) =>
			columnsCollection.updateOne(
				{ _id: new ObjectId(id) },
				{ $set: { order: index + 1, updatedAt: new Date() } }
			)
		)

		await Promise.all(ops)

		const updatedColumns = await columnsCollection
			.find({ _id: { $in: validIds.map((id) => new ObjectId(id)) } })
			.sort({ order: 1 })
			.toArray()

		return updatedColumns
	} catch (error) {
		console.error('❌ Error en updateColumnOrders:', error)
		return null
	}
}
