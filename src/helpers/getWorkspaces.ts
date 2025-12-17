import { ObjectId } from 'mongodb'
import { getDB } from './getDB'
import { toObjectId } from './utils'
import { IWorkspaceStore } from '@/types/workspaces'

/**
 * Devuelve todas las workspaces de un usuario.
 * @param {string | ObjectId} userId - El id del usuario.
 * @returns {Promise<IWorkspaceStore[]>} - Un array de workspaces.
 */
export async function getWorkspaces(userId: string | ObjectId) {
	const db = await getDB()
	const workspacesCollection = db.collection<IWorkspaceStore>('workspaces')

	const userObjectId = toObjectId(userId)
	// 1️⃣ Buscar las workspaces del usuario
	const workspaces = await workspacesCollection
		.find({ userId: userObjectId })
		.toArray()

	// 2️⃣ Retornar las workspaces
	return workspaces
}
