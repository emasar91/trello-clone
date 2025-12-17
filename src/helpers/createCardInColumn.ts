import { ObjectId } from 'mongodb'
import { getDB } from './getDB'
import { toObjectId } from './utils'
import type { ICard } from '@/types/card'
import { getNextOrder } from './getOrderCard'
import { IColumn } from '@/types/columns'

type CreateCardData = {
	boardId: string
	columnId: string
	userId: string
	title: string
	description?: string | null
	priorityColor?: string[] | null
	order?: number
}

/**
 * Crea una nueva tarjeta y actualiza el `updatedAt` del board y de la columna correspondientes.
 * @param {CreateCardData} data - Objeto con los datos para crear la tarjeta.
 * @returns {Promise<ICard>} - Promesa que se resuelve con la tarjeta creada.
 */

export async function createCard(data: CreateCardData) {
	const db = await getDB()
	const cardsCollection = db.collection<Omit<ICard, '_id'>>('cards')
	const columnsCollection = db.collection<IColumn>('columns')
	const boardsCollection = db.collection('boards')

	const now = new Date()
	const order = await getNextOrder(data.columnId)
	// 1️⃣ Crear la nueva tarjeta
	const newCard: Omit<ICard, '_id'> = {
		boardId: toObjectId(data.boardId) as ObjectId,
		columnId: toObjectId(data.columnId) as ObjectId,
		userId: toObjectId(data.userId) as ObjectId,
		title: data.title,
		description: data.description ?? null,
		priorityColor: data.priorityColor ?? null,
		createdAt: now,
		updatedAt: null,
		order: order,
		comments: [],
	}

	const result = await cardsCollection.insertOne(newCard)

	// 2️⃣ Actualizar el campo updatedAt del board
	await columnsCollection.updateOne(
		{ _id: toObjectId(data.columnId) as ObjectId },
		{ $set: { updatedAt: now } }
	)

	// 3️⃣ Actualizar el campo updatedAt del board
	await boardsCollection.updateOne(
		{ _id: toObjectId(data.boardId) as ObjectId },
		{ $set: { updatedAt: now } }
	)

	// 4️⃣ Retornar la tarjeta creada
	return {
		_id: result.insertedId,
		...newCard,
	}
}
