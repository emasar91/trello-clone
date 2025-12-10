import { ObjectId } from 'mongodb'
import { getDB } from './getDB'
import { toObjectId } from './utils'
import { IWorkspaceStore } from '@/types/workspaces'
import { IBoard } from '@/types/boards'
import { getUser } from './getUser'

/**
 * Devuelve un board por nombre de workspace y nombre de board.
 * Busca primero el workspace para obtener su ID, y luego el board asociado.
 */
export async function getBoardByNames(
	userId: string | ObjectId,
	workspaceName: string,
	boardName: string
) {
	const db = await getDB()
	const workspacesCollection = db.collection<IWorkspaceStore>('workspaces')
	const boardsCollection = db.collection<IBoard>('boards')

	const userObjectId = toObjectId(userId) as ObjectId

	const user = await getUser({ uid: userObjectId.toString() })

	// 1️⃣ Buscar el workspace del usuario con ese nombre
	const workspace = await workspacesCollection.findOne({
		userId: user?._id,
		name: workspaceName,
	})

	if (!workspace) {
		throw new Error(`No se encontró el workspace con nombre "${workspaceName}"`)
	}

	// 2️⃣ Buscar el board dentro de la colección de boards
	const board = await boardsCollection.findOne({
		userId: user?._id,
		workspaceId: workspace._id,
		name: boardName.toLowerCase(),
	})

	if (!board) {
		throw new Error(
			`No se encontró el board "${boardName}" en el workspace "${workspaceName}"`
		)
	}

	// 3️⃣ Retornar el board junto con el workspace
	return { workspace, board }
}
