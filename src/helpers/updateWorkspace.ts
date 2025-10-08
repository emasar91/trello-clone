import { ObjectId } from 'mongodb'
import { getDB } from './getDB'
import { toObjectId } from './utils'
import { IWorkspace, IWorkspaceStore } from '@/types/workspaces'

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

export async function editWorkspace({
	userId,
	workspaceId,
	name,
	description,
}: {
	userId: string | ObjectId
	workspaceId: string | ObjectId
	name?: string
	description?: string
}) {
	const db = await getDB()
	const usersCollection = db.collection<User>('users')
	const workspacesCollection = db.collection<IWorkspaceStore>('workspaces')

	const userObjectId = toObjectId(userId) as ObjectId
	const workspaceObjectId = toObjectId(workspaceId) as ObjectId

	// 1️⃣ Validar usuario
	const user = await usersCollection.findOne({ _id: userObjectId })
	if (!user) throw new Error('Usuario no encontrado')

	// 2️⃣ Validar workspace existente y propiedad
	const workspace = await workspacesCollection.findOne({
		_id: workspaceObjectId,
		userId: userObjectId,
	})
	if (!workspace)
		throw new Error('Workspace no encontrado o no pertenece al usuario')

	// 3️⃣ Armar los campos a actualizar
	const updateFields: Partial<IWorkspace> = {}
	if (name) updateFields.name = name
	if (description !== undefined) updateFields.description = description
	updateFields.updatedAt = new Date()

	// 4️⃣ Ejecutar actualización
	const result = await workspacesCollection.updateOne(
		{ _id: workspaceObjectId },
		{ $set: updateFields }
	)

	if (result.modifiedCount === 0) throw new Error('No se aplicaron cambios')

	return {
		...workspace,
		...updateFields,
	}
}
