import { ObjectId } from 'mongodb'
import { getDB } from './getDB'
import { toObjectId } from './utils'
import { IColumn } from '@/types/columns'

/**
 * Devuelve todas las columnas asociadas a un board.
 */
export async function getBoardColumns(boardId: string | ObjectId) {
	const db = await getDB()
	const columnsCollection = db.collection<IColumn>('columns')

	const boardObjectId = toObjectId(boardId) as ObjectId

	const columns = await columnsCollection
		.find({ boardId: boardObjectId })
		.sort({ order: 1 }) // opcional: ordenadas por posición
		.toArray()

	return columns
}
