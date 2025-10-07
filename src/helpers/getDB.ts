import clientPromise from '@/config/mongodb'

export async function getDB() {
	const client = await clientPromise
	return client.db() // usa el default DB que definiste en la URI
}
