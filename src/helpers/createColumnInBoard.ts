import { ObjectId } from 'mongodb'
import { getDB } from './getDB'
import { toObjectId } from './utils'
import type { IColumn } from '@/types/columns'
import { getUser } from './getUser'

/**
 * Crea una nueva columna y actualiza el `updatedAt` del board correspondiente.
 */
export async function createColumn(
	boardId: string | ObjectId,
	userId: string | ObjectId,
	name: string,
	order?: number
) {
	const db = await getDB()
	const columnsCollection = db.collection<IColumn>('columns')
	const boardsCollection = db.collection('boards')

	const boardObjectId = toObjectId(boardId) as ObjectId
	const userObjectId = toObjectId(userId) as ObjectId
	const user = await getUser({ uid: userObjectId.toString() })

	const createdAt = new Date()

	// 1️⃣ Crear la nueva columna
	const newColumn: IColumn = {
		boardId: boardObjectId,
		userId: user?._id,
		name,
		order: order ?? 0,
		createdAt,
		updatedAt: null,
	}

	const result = await columnsCollection.insertOne(newColumn)
	const columnId = result.insertedId

	// 2️⃣ Actualizar el campo updatedAt del board
	await boardsCollection.updateOne(
		{ _id: boardObjectId },
		{ $set: { updatedAt: createdAt } }
	)

	// 3️⃣ Retornar la columna creada
	return { ...newColumn, _id: columnId }
}
