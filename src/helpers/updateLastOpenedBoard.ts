import { ObjectId } from 'mongodb'
import type { IWorkspaceStore } from '@/types/workspaces'
import { getDB } from './getDB'
import { toObjectId } from './utils'

/**
 * Updates the last opened at timestamp for a board in a workspace.
 * @param {string | ObjectId} boardId - The id of the board to update.
 * @param {string | ObjectId} userId - The id of the user who owns the workspace.
 * @returns {Promise<void>} - A promise that resolves when the update is complete.
 */
export async function updateLastOpenedBoard(
	boardId: string | ObjectId,
	userId: string | ObjectId
) {
	const db = await getDB()
	const workspacesCollection = db.collection<IWorkspaceStore>('workspaces')

	const boardObjectId = toObjectId(boardId)
	const userObjectId = toObjectId(userId)

	// 1️⃣ Actualizar lastOpenedAt
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
