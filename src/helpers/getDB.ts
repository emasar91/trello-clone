import clientPromise from '@/config/mongodb'

/**
 * Devuelve la conexión a la base de datos de MongoDB.
 * @returns {Promise<MongoDB>} - La conexión a la base de datos.
 */
export async function getDB() {
	const client = await clientPromise
	return client.db()
}
