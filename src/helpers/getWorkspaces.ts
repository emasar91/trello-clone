import { ObjectId } from 'mongodb'
import { getDB } from './getDB'
import { toObjectId } from './utils'
import { IWorkspaceStore } from '@/types/workspaces'

export async function getWorkspaces(userId: string | ObjectId) {
	const db = await getDB()
	const workspacesCollection = db.collection<IWorkspaceStore>('workspaces')

	const userObjectId = toObjectId(userId)

	const workspaces = await workspacesCollection
		.find({ userId: userObjectId })
		.toArray()

	return workspaces
}
