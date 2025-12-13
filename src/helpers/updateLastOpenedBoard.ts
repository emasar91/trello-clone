import { ObjectId } from 'mongodb'
import type { IWorkspaceStore } from '@/types/workspaces'
import { getDB } from './getDB'
import { toObjectId } from './utils'

export async function updateLastOpenedBoard(
	boardId: string | ObjectId,
	userId: string | ObjectId
) {
	const db = await getDB()
	const workspacesCollection = db.collection<IWorkspaceStore>('workspaces')

	const boardObjectId = toObjectId(boardId)
	const userObjectId = toObjectId(userId)

	await workspacesCollection.updateOne(
		{
			userId: userObjectId,
			'boards.boardId': boardObjectId,
		},
		{
			$set: {
				'boards.$.lastOpenedAt': new Date(),
				updatedAt: new Date(),
			},
		}
	)
}
