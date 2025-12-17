import { getDB } from './getDB'

/**
 * Busca un usuario por su ID de Firebase.
 * @param {uid: string} - ID de Firebase del usuario.
 * @returns {Promise<User>} - El usuario encontrado, o null si no se encontr .
 */
export async function getUser({ uid }: { uid?: string }) {
	const db = await getDB()
	const user = await db.collection('users').findOne({ uid })
	return user
}
