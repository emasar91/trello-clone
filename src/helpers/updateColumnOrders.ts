import { getDB } from './getDB'
import { ObjectId } from 'mongodb'

export async function updateColumnOrders(columnIds: string[]) {
	try {
		const db = await getDB()
		const columnsCollection = db.collection('columns')

		// 🔥 Recorremos el array y los actualizamos uno por uno
		const ops = columnIds.map((id, index) =>
			columnsCollection.updateOne(
				{ _id: new ObjectId(id) },
				{ $set: { order: index + 1, updatedAt: new Date() } }
			)
		)

		await Promise.all(ops) // ⚡ Corre en paralelo

		// 👀 Devuelvo todas las columnas actualizadas
		const updatedColumns = await columnsCollection
			.find({ _id: { $in: columnIds.map((id) => new ObjectId(id)) } })
			.sort({ order: 1 })
			.toArray()

		return updatedColumns
	} catch (error) {
		console.error('❌ Error en updateColumnOrders:', error)
		return null
	}
}
