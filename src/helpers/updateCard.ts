import { ObjectId } from 'mongodb'
import { getDB } from './getDB'
import { toObjectId } from './utils'
import type { ICard } from '@/types/card'

type UpdateCardData = Partial<Omit<ICard, '_id'>> & {
	_id: string
}

/**
 * Actualiza una tarjeta en un board.
 * La función actualiza el título, descripción, prioridad y comentarios de una tarjeta en un board.
 * Si no se envían datos para actualizar, se lanza un error.
 * @param {UpdateCardData} data - Objeto con los datos para actualizar la tarjeta.
 * @returns {Promise<ICard>} - Promesa que se resuelve con la tarjeta actualizada.
 * @example
 * const result = await updateCard({ _id: cardId, title: 'Nueva tarjeta' })
 */
export async function updateCard(data: UpdateCardData) {
	const db = await getDB()
	const cardsCollection = db.collection<ICard>('cards')
	const boardsCollection = db.collection<ICard>('boards')
	const columnsCollection = db.collection<ICard>('columns')
	// 1️⃣ Validar ID obligatorio
	if (!data._id) throw new Error('El ID de la tarjeta es obligatorio')

	const fieldsToUpdate: Record<string, unknown> = {}
	// 2️⃣ Construir objeto dinámico SOLO con lo que venga
	const allowedFields: (keyof Omit<
		ICard,
		'_id' | 'boardId' | 'columnId' | 'userId' | 'createdAt'
	>)[] = ['title', 'description', 'priorityColor', 'comments', 'order']

	allowedFields.forEach((field) => {
		if (data[field] !== undefined) {
			fieldsToUpdate[field] = data[field]
		}
	})
	// 3️⃣ Si no vino ningún campo, evitar el update vacío
	if (Object.keys(fieldsToUpdate).length === 0) {
		throw new Error('No se enviaron datos para actualizar')
	}
	// 4️⃣ Actualizar updatedAt SIEMPRE
	fieldsToUpdate.updatedAt = new Date()

	const duplicateTitle = await cardsCollection.findOne({ title: data.title })
	if (duplicateTitle) {
		throw new Error('El título ya existe en otra card')
	}
	// 5️⃣ Ejecutar actualización
	const result = await cardsCollection.findOneAndUpdate(
		{ _id: toObjectId(data._id) as ObjectId },
		{ $set: fieldsToUpdate },
		{ returnDocument: 'after' }
	)
	// 6️⃣ Validar si la tarjeta existe
	if (!result) {
		throw new Error('Tarjeta no encontrada')
	} else {
		// 7️⃣ Actualizar board y column si se proporcionan
		if (data.boardId) {
			await boardsCollection.updateOne(
				{ _id: toObjectId(data.boardId) as ObjectId },
				{ $set: { updatedAt: new Date() } }
			)
		}
		// 8️⃣ Actualizar column si se proporciona
		if (data.columnId) {
			await columnsCollection.updateOne(
				{ _id: toObjectId(data.columnId) as ObjectId },
				{ $set: { updatedAt: new Date() } }
			)
		}
	}
	// 9️⃣ Retornar la tarjeta actualizada
	return result
}
