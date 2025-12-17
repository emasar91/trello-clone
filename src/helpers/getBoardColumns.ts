import { ObjectId } from 'mongodb'
import { getDB } from './getDB'
import { toObjectId } from './utils'
import { IColumn } from '@/types/columns'

/**
 * Devuelve las columnas de un board.
 * @param {string | ObjectId} boardId - El ID del board.
 * @returns {Promise<IColumn[]>} - Un array de columnas asociadas al board.
 */

export async function getBoardColumns(boardId: string | ObjectId) {
	const db = await getDB()
	const columnsCollection = db.collection<IColumn>('columns')

	const boardObjectId = toObjectId(boardId) as ObjectId

	// 1️⃣ Buscar las columnas del board
	const columns = await columnsCollection
		.find({ boardId: boardObjectId })
		.sort({ order: 1 })
		.toArray()

	// 2️⃣ Retornar las columnas
	return columns
}
