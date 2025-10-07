import { ObjectId } from 'mongodb'
import { getDB } from './getDB'
import { toObjectId } from './utils'
import { IWorkspaceStore } from '@/types/workspaces'

export async function createBoardinWorkspace({
	userId,
	workspaceId,
	name,
	description,
	image,
}: {
	userId: string | ObjectId
	workspaceId: ObjectId | string
	name: string
	description?: string
	image: string
}) {
	const db = await getDB()
	const usersCollection = db.collection('users')
	const workspacesCollection = db.collection<IWorkspaceStore>('workspaces')
	const boardsCollection = db.collection('boards')

	const userObjectId = toObjectId(userId) as ObjectId
	const workspaceObjectId = toObjectId(workspaceId) as ObjectId

	// 1️⃣ Validar usuario
	const user = await usersCollection.findOne({ _id: userObjectId })
	if (!user) throw new Error('Usuario no encontrado')

	// 2️⃣ Validar workspace existente y que pertenezca al usuario
	const workspace = await workspacesCollection.findOne({
		_id: workspaceObjectId,
		userId: userObjectId,
	})
	if (!workspace)
		throw new Error('Workspace no encontrado o no pertenece al usuario')

	// 3️⃣ Chequear duplicado (nombre)
	const existing = await boardsCollection.findOne({
		workspaceId: workspaceObjectId,
		name,
	})
	if (existing) {
		throw new Error(`El workspace ya tiene un tablero con el nombre "${name}"`)
	}

	// 4️⃣ Crear el board
	const newBoard = {
		workspaceId: workspaceObjectId,
		userId: userObjectId,
		name,
		description,
		createdAt: new Date(),
		updatedAt: null,
		lastOpenedAt: null,
		image,
	}

	const result = await boardsCollection.insertOne(newBoard)
	const boardId = result.insertedId

	// 5️⃣ Actualizar workspace con la referencia al nuevo tablero
	try {
		await workspacesCollection.updateOne(
			{ _id: workspaceObjectId },
			{
				$push: {
					boards: {
						boardId,
						name,
						description,
						image,
						lastOpenedAt: null,
					},
				},
			}
		)
	} catch (error) {
		console.log('🚀 ~ createBoardinWorkspace ~ error:', error)
	}

	return { ...newBoard, _id: boardId }
}
