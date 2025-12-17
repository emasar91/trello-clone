import { ObjectId } from 'mongodb'
import { getDB } from './getDB'
import { IWorkspaceStore } from '@/types/workspaces'
import { IBoard } from '@/types/boards'
import { getUser } from './getUser'

/**
 * Busca un board por su nombre en un workspace determinado.
 * @param {string | ObjectId} userId - ID del usuario.
 * @param {string} workspaceName - Nombre del workspace.
 * @param {string} boardName - Nombre del board.
 * @returns {Promise<{workspace: IWorkspaceStore, board: IBoard}>} - El board encontrado junto con su workspace.
 * @throws {Error} Si no se encontr  el board o el workspace.
 */
export async function getBoardByNames(
	userId: string | ObjectId,
	workspaceName: string,
	boardName: string
) {
	const db = await getDB()
	const workspacesCollection = db.collection<IWorkspaceStore>('workspaces')
	const boardsCollection = db.collection<IBoard>('boards')

	// 1️⃣ Buscar el usuario
	const user = await getUser({ uid: userId.toString() })

	// 2️⃣ Buscar el workspace del usuario con ese nombre
	const workspace = await workspacesCollection.findOne({
		userId: user?._id,
		name: workspaceName,
	})

	if (!workspace) {
		throw new Error(`No se encontró el workspace con nombre "${workspaceName}"`)
	}

	// 3️⃣ Buscar el board dentro de la colección de boards
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

	// 4️⃣ Retornar el board junto con el workspace
	return { workspace, board }
}
