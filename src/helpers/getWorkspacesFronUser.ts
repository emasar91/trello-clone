import { ObjectId } from 'mongodb'
import { getDB } from './getDB'
import { getUser } from './getUser'

export async function getUserWorkspaces(uid: string) {
	const db = await getDB()

	const user = await getUser({ uid })
	if (!user?.workspaces) return []

	// traer solo los que están en el array de ids
	const ids = user.workspaces.map((w: { id: ObjectId }) => w.id)
	const workspaces = await db
		.collection('workspaces')
		.find({ _id: { $in: ids } })
		.toArray()

	return workspaces
}
