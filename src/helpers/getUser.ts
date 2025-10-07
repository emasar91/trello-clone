import { getDB } from './getDB'

export async function getUser({ uid }: { uid?: string }) {
	const db = await getDB()
	const user = await db.collection('users').findOne({ uid })
	return user
}
