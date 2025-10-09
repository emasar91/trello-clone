import { ObjectId } from 'mongodb'
import { getDB } from './getDB'
import { getRandomAvatarColor } from '@/components/Pages/Workspaces/Utils'

interface WorkspaceRef {
	id: ObjectId
	name: string
}

interface User {
	_id: ObjectId
	uid: string
	email: string
	nombre?: string | null
	username?: string | null
	workspaces: WorkspaceRef[]
	// ... otros campos opcionales
}

/**
 * Crea un workspace para un usuario y lo agrega a su array de workspaces
 * @param {string|ObjectId} userId - ID del usuario
 * @param {string} name - nombre del workspace
 * @returns {Promise<Object>} - workspace creado
 */
export async function createWorkspaceForUser({
	userId,
	name,
	description,
}: {
	userId: string | ObjectId
	name: string
	description?: string
}) {
	const db = await getDB()
	const usersCollection = db.collection<User>('users')
	const workspacesCollection = db.collection('workspaces')

	const userObjectId =
		typeof userId === 'string' ? new ObjectId(userId) : userId

	// 1️⃣ Chequear que el usuario exista
	const user = await usersCollection.findOne({ _id: userObjectId })
	if (!user) throw new Error('Usuario no encontrado')

	// 2️⃣ Chequear si ya existe un workspace con ese nombre
	const existing = await workspacesCollection.findOne({
		userId: userObjectId,
		name,
	})
	if (existing) {
		throw new Error(`El usuario ya tiene un workspace con el nombre "${name}"`)
	}

	// 3️⃣ Crear el workspace
	const newWorkspace = {
		userId: userObjectId,
		name,
		description,
		createdAt: new Date(),
		updatedAt: null,
		lastOpenedAt: null,
		boards: [],
		avatarColor: getRandomAvatarColor(),
	}

	const result = await workspacesCollection.insertOne(newWorkspace)
	const workspaceId = result.insertedId

	// 4️⃣ Agregar referencia al usuario
	await usersCollection.updateOne(
		{ _id: userObjectId },
		{
			$push: {
				workspaces: { id: workspaceId, name },
			},
		}
	)

	return { ...newWorkspace, _id: workspaceId }
}
