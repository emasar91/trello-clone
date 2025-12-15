import { ObjectId } from 'mongodb'
import { getDB } from './getDB'

export async function updateColumnOrders(columnIds: string[]) {
	try {
		const db = await getDB()
		const columnsCollection = db.collection('columns')

		// 🧼 1️⃣ Filtrar SOLO ObjectIds válidos (ignora col-xxxx)
		const validIds = columnIds.filter(ObjectId.isValid)

		// 🛑 Nada para actualizar
		if (validIds.length === 0) return []

		// 🔥 2️⃣ Actualizar orden SOLO de columnas reales
		const ops = validIds.map((id, index) =>
			columnsCollection.updateOne(
				{ _id: new ObjectId(id) },
				{ $set: { order: index + 1, updatedAt: new Date() } }
			)
		)

		await Promise.all(ops)

		// 👀 3️⃣ Devolver columnas actualizadas y ordenadas
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
