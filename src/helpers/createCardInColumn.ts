// lib/cards/createCard.ts
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
	priorityColor?: string | null
	order?: number
}

export async function createCard(data: CreateCardData) {
	const db = await getDB()
	const cardsCollection = db.collection<Omit<ICard, '_id'>>('cards')
	const columnsCollection = db.collection<IColumn>('columns')
	const boardsCollection = db.collection('boards')

	const now = new Date()
	const order = await getNextOrder(data.columnId)

	const newCard: Omit<ICard, '_id'> = {
		boardId: toObjectId(data.boardId) as ObjectId,
		columnId: toObjectId(data.columnId) as ObjectId,
		userId: toObjectId(data.userId) as ObjectId,
		title: data.title,
		description: data.description ?? null,
		priorityColor: data.priorityColor ?? null,
		createdAt: now,
		updatedAt: null,
		order: order, // si no se define, va al final

		// 👇 SECCIÓN OBLIGATORIA SEGÚN TU TIPO
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

	// Retorno formato completo
	return {
		_id: result.insertedId,
		...newCard,
	}
}
