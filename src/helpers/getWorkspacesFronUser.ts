import { ObjectId } from 'mongodb'
import { getDB } from './getDB'
import { getUser } from './getUser'

/**
 * Devuelve todas las workspaces de un usuario.
 * @param {string} uid - El id del usuario.
 * @returns {Promise<IWorkspaceStore[]>} - Un array de workspaces.
 */
export async function getUserWorkspaces(uid: string) {
	const db = await getDB()
	// 1️⃣ Buscar el usuario
	const user = await getUser({ uid })
	if (!user?.workspaces) return []

	// 2️⃣ Buscar las workspaces
	const ids = user.workspaces.map((w: { id: ObjectId }) => w.id)
	const workspaces = await db
		.collection('workspaces')
		.find({ _id: { $in: ids } })
		.toArray()

	// 3️⃣ Retornar las workspaces
	return workspaces
}
