import { ObjectId } from 'mongodb'
import { getDB } from './getDB'
import { getUser } from './getUser'

/**
 * Gets all workspaces for a given user.
 * @param {string} uid - The user id to get workspaces for.
 * @returns {Promise<IWorkspaceStore[]>} - A promise that resolves with an array of workspaces.
 */
export async function getUserWorkspaces(uid: string) {
	const db = await getDB()

	const user = await getUser({ uid })
	if (!user?.workspaces) return []

	const ids = user.workspaces.map((w: { id: ObjectId }) => w.id)
	const workspaces = await db
		.collection('workspaces')
		.find({ _id: { $in: ids } })
		.toArray()

	return workspaces
}
