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

		// 1️⃣ Filtrar IDs válidos
		const validIds = columnIds.filter(ObjectId.isValid)

		// 2️⃣ Validar si hay IDs válidos
		if (validIds.length === 0) return []

		// 3️⃣ Crear operaciones de actualización
		const ops = validIds.map((id, index) =>
			columnsCollection.updateOne(
				{ _id: new ObjectId(id) },
				{ $set: { order: index + 1, updatedAt: new Date() } }
			)
		)

		// 4️⃣ Ejecutar operaciones de actualización
		await Promise.all(ops)

		// 5️⃣ Retornar columnas actualizadas
		const updatedColumns = await columnsCollection
			.find({ _id: { $in: validIds.map((id) => new ObjectId(id)) } })
			.sort({ order: 1 })
			.toArray()

		// 6️⃣ Retornar columnas actualizadas
		return updatedColumns
	} catch (error) {
		console.error('❌ Error en updateColumnOrders:', error)
		return null
	}
}
