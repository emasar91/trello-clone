import clientPromise from '@/config/mongodb'

/**
 * Devuelve la conexión a la base de datos de MongoDB.
 * @returns {Promise<MongoDB>} - La conexión a la base de datos.
 */
export async function getDB() {
	// 1️⃣ Obtener la conexión a la base de datos
	const client = await clientPromise
	// 2️⃣ Retornar la base de datos
	return client.db()
}
